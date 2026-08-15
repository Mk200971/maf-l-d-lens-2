'use client'

import { useEffect, useRef, useState } from 'react'
import { BarChart3, RotateCcw, Loader2 } from 'lucide-react'
import { AIChatInput } from '@/components/ui/ai-chat-input'
import { MarkdownMessage } from '@/components/chat/markdown-message'
import { DynamicChart } from '@/components/chat/dynamic-chart'
import { useChatStream } from '@/lib/use-chat-stream'
import type { ChatScope } from '@/lib/chat-scope'

const RETRY_MARKER = "I couldn't reach the analysis service"

export default function MetricsAIPage() {
  // Persistent scope for the chat session — survives multiple messages.
  // The full page owns its own scope (unlike the mini assistant which
  // inherits the page filters).
  const [scope, setScope] = useState<ChatScope>({
    years: [],
    bus: [],
    countries: [],
    roles: [],
    programs: [],
  })

  const { messages, isLoading, sendMessage } = useChatStream({ scope })

  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const suggestedQuestions = [
    'What does learning hours measure and how is it calculated?',
    'How is satisfaction rate different from average satisfaction?',
    'Explain the completion rate metric and what it tells us',
    'What are the NPS calculations and how should I interpret them?',
    'How does the dashboard normalize metrics across different scales?',
    'What is the difference between unique learners and completions?',
  ]

  return (
    <div className="flex h-full min-h-0 flex-col bg-background overflow-hidden">
      <div className="flex h-full min-h-0 flex-col">
        <div className="shrink-0 glass-panel border-x-0 border-t-0 rounded-none p-4">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold">Metrics Assistant</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Ask me about your learning metrics, calculations, and how the dashboard interprets them
          </p>
        </div>

        {/* Messages Area — flex-1 min-h-0 is the scroll-container rule */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-6">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold mb-2">Welcome to Metrics Assistant</h2>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Ask questions about your learning metrics, calculations, and dashboard findings.
              </p>
              <div className="space-y-2 w-full max-w-md">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Suggested questions:</p>
                {suggestedQuestions.slice(0, 4).map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => sendMessage(question)}
                    className="w-full text-left px-4 py-2 rounded-full glass-pill glass-hover text-xs transition-colors"
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}
          {messages.map((message) => {
            const isRetry = message.role === 'assistant' && message.content.includes(RETRY_MARKER)
            return (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} mb-4`}
              >
                <div
                  className={`px-5 py-4 rounded-3xl ${
                    message.role === 'user'
                      ? 'max-w-[85%] rounded-br-lg bg-[var(--brand-burgundy)] text-white shadow-lg'
                      : 'max-w-[46rem] rounded-bl-lg glass-panel'
                  }`}
                >
                  {isRetry && (
                    <div className="flex items-center gap-2 mb-2">
                      <p className="text-sm">{message.content}</p>
                      <button
                        onClick={() => sendMessage(message._retryContent || '')}
                        className="p-1 hover:bg-white/20 rounded-full transition"
                        title="Retry"
                      >
                        <RotateCcw size={14} />
                      </button>
                    </div>
                  )}
                  {!isRetry ? (
                    message.role === 'assistant' ? (
                      <MarkdownMessage content={message.content} />
                    ) : (
                      <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                    )
                  ) : null}
                  {message.charts && message.charts.length > 0 && (
                    <div className="space-y-4 mt-4">
                      {message.charts.map((chart, idx) => (
                        <DynamicChart key={idx} spec={chart} />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}

          {isLoading && (
            <div className="flex justify-start mb-4">
              <div className="glass-panel px-5 py-4 rounded-3xl rounded-bl-lg">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area — shrink-0 so composer stays pinned */}
        <div className="shrink-0 border-t border-border p-6 bg-card pb-[max(1rem,env(safe-area-inset-bottom))]">
          <AIChatInput
            onSendMessage={(message, options) => sendMessage(message, options)}
            disabled={isLoading}
            scope={scope}
            onScopeChange={setScope}
          />
        </div>
      </div>
    </div>
  )
}
