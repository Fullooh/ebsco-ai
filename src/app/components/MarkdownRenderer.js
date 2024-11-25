"use client";
import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { vs } from "react-syntax-highlighter/dist/esm/styles/prism";

// Preprocessing function to bolden specific placeholders
function preprocessContent(content) {
  return content
    .replace(/\[Recipient's Name\]/g, `**[Recipient's Name]**`)
    .replace(/\[Your Name\]/g, `**[Your Name]**`)
    .replace(/\[Contact Name\]/g, `**[Contact Name]**`)
    .replace(/\[Company Name\]/g, `## [Company Name]`)
    .replace(/\[Name\]/g, `**[Name]**`);
}

export default function MarkdownRenderer({ content }) {
  return (
    <ReactMarkdown
      components={{
        h2: ({ node, ...props }) => (
          <h2 className="text-lg font-bold text-blue-600 my-4" {...props} />
        ),
        h3: ({ node, ...props }) => (
          <h3 className="text-md font-semibold text-gray-800 my-3" {...props} />
        ),
        code({ node, inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <SyntaxHighlighter
              style={vs}
              language={match[1]}
              PreTag="div"
              wrapLines={true}
              wrapLongLines={true}
              {...props}
            >
              {String(children).replace(/\n$/, "")}
            </SyntaxHighlighter>
          ) : (
            <code
              className={`bg-gray-200 text-sm px-1 rounded ${className}`}
              {...props}
            >
              {children}
            </code>
          );
        },
      }}
    >
      {preprocessContent(content)}
    </ReactMarkdown>
  );
}
