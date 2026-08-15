"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { memo } from "react";

interface MarkdownMessageProps {
  content: string;
}

export const MarkdownMessage = memo(function MarkdownMessage({ content }: MarkdownMessageProps) {
  return (
    <div className="text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => <h1 className="text-base font-semibold mb-2" {...props} />,
          h2: ({ node, ...props }) => <h2 className="text-sm font-semibold mb-2" {...props} />,
          h3: ({ node, ...props }) => <h3 className="text-sm font-semibold mb-1" {...props} />,
          p: ({ node, ...props }) => <p className="text-sm leading-relaxed mb-2" {...props} />,
          ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 mb-2" {...props} />,
          ol: ({ node, ...props }) => <ol className="list-decimal pl-5 space-y-1 mb-2" {...props} />,
          strong: ({ node, ...props }) => <strong className="font-semibold text-foreground" {...props} />,
          code: ({ node, inline, ...props }: any) =>
            inline ? (
              <code className="rounded bg-black/5 px-1 py-0.5 text-[13px]" {...props} />
            ) : (
              <code className="block bg-black/5 rounded p-3 my-2 text-sm" {...props} />
            ),
          table: ({ node, ...props }) => (
            <div className="overflow-x-auto my-2">
              <table className="min-w-full text-sm border-collapse" {...props} />
            </div>
          ),
          th: ({ node, ...props }) => (
            <th className="border px-3 py-2 text-left font-semibold bg-muted" {...props} />
          ),
          td: ({ node, ...props }) => (
            <td className="border px-3 py-2 text-left" {...props} />
          ),
          a: ({ node, ...props }) => (
            <a className="text-brand-burgundy underline" {...props} />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
});
