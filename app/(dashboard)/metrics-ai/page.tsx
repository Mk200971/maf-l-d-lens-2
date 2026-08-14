'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Loader2, BarChart3 } from 'lucide-react';
import MetricsChart from '@/components/MetricsChart';
import { AIChatInput } from '@/components/ui/ai-chat-input';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

export default function MetricsAIPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);

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
      setMessages((prev) => [...prev, { id: assistantId, role: 'assistant', content: '' }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulated = '';

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        accumulated += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: accumulated } : m))
        );
      }

      if (!accumulated) {
        setMessages((prev) =>
          prev.map((m) => (m.id === assistantId ? { ...m, content: 'No response received' } : m))
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
                    onClick={() => sendMessage(question)}
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

        {/* Input Area - New AIChatInput Component */}
        <div className="border-t border-border p-6 bg-card">
          <AIChatInput 
            onSendMessage={(message, options) => {
              console.log('Think:', options?.think, 'Deep Search:', options?.deepSearch);
              sendMessage(message);
            }}
            disabled={isLoading}
          />
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
