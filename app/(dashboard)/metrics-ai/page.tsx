'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2, BarChart3 } from 'lucide-react';
import MetricsChart from '@/components/MetricsChart';

export default function MetricsAIPage() {
  const { messages, input, handleInputChange, handleSubmit, isLoading } = useChat({
    api: '/api/chat',
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const suggestedQuestions = [
    'What does learning hours measure and how is it calculated?',
    'How is satisfaction rate different from average satisfaction?',
    'Explain the completion rate metric and what it tells us',
    'What are the NPS calculations and how should I interpret them?',
    'How does the dashboard normalize metrics across different scales?',
    'What is the difference between unique learners and completions?',
  ];

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-3 gap-0 bg-background">
      {/* Chat Interface */}
      <div className="lg:col-span-2 flex flex-col bg-background border-r border-border min-h-screen lg:min-h-full">
        <div className="border-b border-border p-4 bg-card">
          <div className="flex items-center gap-2 mb-2">
            <BarChart3 className="w-5 h-5 text-primary" />
            <h1 className="text-xl font-semibold">Metrics Assistant</h1>
          </div>
          <p className="text-sm text-muted-foreground">
            Ask me about your learning metrics, calculations, and how the dashboard interprets them
          </p>
        </div>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 flex flex-col">
          {messages.length === 0 && (
            <div className="flex flex-col items-center justify-center flex-1 text-center py-12">
              <BarChart3 className="w-12 h-12 text-muted-foreground mb-4" />
              <h2 className="text-lg font-semibold mb-2">Welcome to Metrics Assistant</h2>
              <p className="text-muted-foreground mb-6 max-w-sm">
                Ask questions about your learning metrics, calculations, and dashboard findings.
              </p>
              <div className="space-y-2 w-full max-w-md">
                <p className="text-xs font-semibold text-muted-foreground mb-3">Suggested questions:</p>
                {suggestedQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      handleInputChange({ target: { value: question } } as any);
                    }}
                    className="w-full text-left p-3 rounded-lg bg-card border border-border hover:bg-accent transition-colors text-sm"
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
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-3 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-primary text-primary-foreground rounded-br-none'
                      : 'bg-card border border-border rounded-bl-none'
                  }`}
                >
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}

          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-card border border-border px-4 py-3 rounded-lg rounded-bl-none">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span className="text-sm text-muted-foreground">Thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="border-t border-border p-4 bg-card">
          <form onSubmit={handleSubmit} className="flex gap-2">
            <input
              value={input}
              onChange={handleInputChange}
              placeholder="Ask about metrics, calculations, or findings..."
              className="flex-1 px-4 py-2 rounded-lg bg-background border border-border focus:outline-none focus:ring-2 focus:ring-primary text-sm"
              disabled={isLoading}
            />
            <Button
              type="submit"
              disabled={isLoading}
              className="gap-2"
            >
              <Send className="w-4 h-4" />
              Send
            </Button>
          </form>
        </div>
      </div>

      {/* Metrics Visualization */}
      <div className="hidden lg:flex flex-col bg-card border-l border-border min-h-screen">
        <div className="border-b border-border p-4">
          <h2 className="font-semibold mb-2">Key Metrics</h2>
          <p className="text-xs text-muted-foreground">
            Your current dashboard metrics
          </p>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
          <MetricsChart />
        </div>
      </div>
    </div>
  );
}
