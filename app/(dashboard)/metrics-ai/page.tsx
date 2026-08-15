'use client';

import { useState, useRef, useEffect } from 'react';
import { BarChart3, RotateCcw, Loader2 } from 'lucide-react';
import { AIChatInput } from '@/components/ui/ai-chat-input';
import { MarkdownMessage } from '@/components/chat/markdown-message';
import { DynamicChart } from '@/components/chat/dynamic-chart';
import type { ChartSpec } from '@/lib/chart-spec';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  charts?: ChartSpec[];
  _retryContent?: string;
}

export default function MetricsAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
        }),
      });

      if (!response.ok || !response.body) {
        console.error('[chat] API error:', response.status, response.statusText);
        throw new Error(`API error: ${response.status}`);
      }

      const assistantId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '', charts: [] }]);
      setIsLoading(false);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = '';
      // Track what we actually received during streaming — don't read `messages` state
      // (it's the snapshot captured when sendMessage started, so it never contains
      // the assistant message we're streaming into).
      let receivedText = '';
      let receivedCharts = 0;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        
        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() || ''; // Keep partial line in buffer
        
        for (const line of lines) {
          if (!line.trim()) continue;
          try {
            const event = JSON.parse(line);
            if (event.type === 'text') {
              receivedText += event.value;
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + event.value } : m))
              );
            } else if (event.type === 'chart') {
              receivedCharts += 1;
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, charts: [...(m.charts || []), event.value] } : m))
              );
            } else if (event.type === 'error') {
              receivedText += `\n\n*Error: ${event.value}*`;
              setMessages((prev) =>
                prev.map((m) => (m.id === assistantId ? { ...m, content: m.content + `\n\n*Error: ${event.value}*` } : m))
              );
            } else if (event.type === 'done') {
              break;
            }
          } catch (e) {
            // Silently skip malformed lines
          }
        }
      }

      // If nothing was streamed back, show a retry message.
      // Use local counters, not `messages` state (which is stale here).
      if (!receivedText && receivedCharts === 0) {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { 
            ...m, 
            content: 'I couldn\'t reach the analysis service.',
            _retryContent: content 
          } : m))
        );
      }
    } catch (error) {
      console.error('[chat] Error sending message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: `Sorry, I encountered an error: ${error instanceof Error ? error.message : 'Unknown error'}. Please try again.`,
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    'What does learning hours measure and how is it calculated?',
    'How is satisfaction rate different from average satisfaction?',
    'Explain the completion rate metric and what it tells us',
    'What are the NPS calculations and how should I interpret them?',
    'How does the dashboard normalize metrics across different scales?',
    'What is the difference between unique learners and completions?',
  ];

  return (
    <div className="flex h-full min-h-0 flex-col bg-background overflow-hidden">
      {/* Chat Interface */}
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

        {/* Messages Area */}
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
          {messages.map((message) => (
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
                {message.role === 'assistant' && message.content.includes('I couldn\'t reach the analysis service') && (
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
                {message.role !== 'assistant' || !message.content.includes('I couldn\'t reach the analysis service') ? (
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
          ))}

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

        {/* Input Area - New AIChatInput Component */}
        <div className="shrink-0 border-t border-border p-6 bg-card pb-[max(1rem,env(safe-area-inset-bottom))]">
          <AIChatInput 
            onSendMessage={(message, options) => {
              console.log('Think:', options?.think, 'Deep Search:', options?.deepSearch);
              sendMessage(message);
            }}
            disabled={isLoading}
          />
        </div>
      </div>

    </div>
  );
}
