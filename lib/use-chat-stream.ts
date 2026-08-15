'use client'

import { useCallback, useRef, useState } from 'react'
import type { ChartSpec } from '@/lib/chart-spec'
import type { ChatScope } from '@/lib/chat-scope'

export type ChatRole = 'user' | 'assistant'

export interface ChatMessage {
  id: string
  role: ChatRole
  content: string
  charts?: ChartSpec[]
  /** Original user text, used for retry button on failure. */
  _retryContent?: string
}

export interface SendOptions {
  think?: boolean
  forceChart?: boolean
}

export interface UseChatStreamOptions {
  /** Optional scope to send with every request (page filters etc.) */
  scope?: ChatScope
  /** Optional callback fired when an assistant response finishes arriving. */
  onResponseComplete?: () => void
}

/**
 * Shared NDJSON streaming chat hook.
 *
 * Used by BOTH:
 *   - the full Metrics AI page (app/(dashboard)/metrics-ai/page.tsx)
 *   - the floating mini assistant (components/dashboard/floating-assistant.tsx)
 *
 * Do not write a second parser. Fixing every future bug twice is the
 * alternative, and that is a bug, not a feature.
 *
 * Key design points (carried over from the original metrics-ai page):
 *   - buffers partial lines, splits on '\n', keeps the trailing fragment
 *   - JSON.parse complete lines in try/catch, silently skips malformed ones
 *   - handles {"type":"text"|"chart"|"error"|"done"}
 *   - tracks receivedText / receivedCharts in LOCAL variables, not React
 *     state — reading React state after an await returns a stale closure
 *     and previously destroyed every response in this exact code path
 *   - exposes an AbortController so a stream can be cancelled mid-flight
 */
export function useChatStream({ scope, onResponseComplete }: UseChatStreamOptions = {}) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const abortRef = useRef<AbortController | null>(null)

  const cancel = useCallback(() => {
    if (abortRef.current) {
      abortRef.current.abort()
      abortRef.current = null
    }
    setIsLoading(false)
  }, [])

  const reset = useCallback(() => {
    cancel()
    setMessages([])
  }, [cancel])

  const sendMessage = useCallback(
    async (content: string, options: SendOptions = {}) => {
      const trimmed = content.trim()
      if (!trimmed) return

      // Cancel any in-flight stream before starting a new one.
      if (abortRef.current) {
        abortRef.current.abort()
        abortRef.current = null
      }

      const controller = new AbortController()
      abortRef.current = controller

      const userMessage: ChatMessage = {
        id: Date.now().toString(),
        role: 'user',
        content: trimmed,
      }

      // Snapshot the current message list synchronously so the POST body
      // reflects the conversation the user actually sees.
      let baseMessages: ChatMessage[] = []
      setMessages((prev) => {
        baseMessages = [...prev, userMessage]
        return baseMessages
      })

      // setMessages above is async; baseMessages is set synchronously inside
      // the updater (React runs the updater immediately during setState in
      // React 18+ for the purpose of returning the new state, but the actual
      // render is deferred). Either way, we have what we need.
      if (baseMessages.length === 0) {
        // Fallback in case the updater didn't run synchronously (it should).
        baseMessages = [userMessage]
      }

      setIsLoading(true)

      const assistantId = (Date.now() + 1).toString()
      try {
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          signal: controller.signal,
          body: JSON.stringify({
            messages: baseMessages.map((m) => ({
              role: m.role,
              content: m.content,
            })),
            scope,
            forceChart: options?.forceChart === true,
          }),
        })

        if (!response.ok || !response.body) {
          console.error('[chat] API error:', response.status, response.statusText)
          throw new Error(`API error: ${response.status}`)
        }

        // Insert the empty assistant message that we'll stream into.
        setMessages((prev) => [
          ...prev,
          { id: assistantId, role: 'assistant', content: '', charts: [] },
        ])

        const reader = response.body.getReader()
        const decoder = new TextDecoder()
        let buffer = ''
        // LOCAL counters — never read React state after an await.
        let receivedText = ''
        let receivedCharts = 0

        while (true) {
          const { done, value } = await reader.read()
          if (done) break

          buffer += decoder.decode(value, { stream: true })
          const lines = buffer.split('\n')
          buffer = lines.pop() || '' // keep the trailing partial line

          for (const line of lines) {
            if (!line.trim()) continue
            try {
              const event = JSON.parse(line)
              if (event.type === 'text') {
                receivedText += event.value
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId ? { ...m, content: m.content + event.value } : m
                  )
                )
              } else if (event.type === 'chart') {
                receivedCharts += 1
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, charts: [...(m.charts || []), event.value] }
                      : m
                  )
                )
              } else if (event.type === 'error') {
                receivedText += `\n\n*Error: ${event.value}*`
                setMessages((prev) =>
                  prev.map((m) =>
                    m.id === assistantId
                      ? { ...m, content: m.content + `\n\n*Error: ${event.value}*` }
                      : m
                  )
                )
              } else if (event.type === 'done') {
                break
              }
            } catch {
              // Silently skip malformed lines.
            }
          }
        }

        // If nothing was streamed back, show a retry message.
        if (!receivedText && receivedCharts === 0) {
          setMessages((prev) =>
            prev.map((m) =>
              m.id === assistantId
                ? {
                    ...m,
                    content: "I couldn't reach the analysis service.",
                    _retryContent: trimmed,
                  }
                : m
            )
          )
        }

        onResponseComplete?.()
      } catch (error) {
        if ((error as Error)?.name === 'AbortError') {
          // Silent on user-initiated cancel.
          return
        }
        console.error('[chat] Error sending message:', error)
        const errorMessage: ChatMessage = {
          id: (Date.now() + 2).toString(),
          role: 'assistant',
          content: `Sorry, I encountered an error: ${
            error instanceof Error ? error.message : 'Unknown error'
          }. Please try again.`,
        }
        setMessages((prev) => [...prev, errorMessage])
      } finally {
        if (abortRef.current === controller) {
          abortRef.current = null
        }
        setIsLoading(false)
      }
    },
    [scope, onResponseComplete]
  )

  return { messages, setMessages, isLoading, sendMessage, cancel, reset }
}
