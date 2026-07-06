import type { MDXComponents } from "mdx/types";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-tight text-[var(--text)] mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-xl font-bold text-[var(--text)] mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-lg font-semibold text-[var(--text)] mt-4 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="text-[var(--text-secondary)] leading-relaxed mb-3">{children}</p>
    ),
    strong: ({ children }) => (
      <strong className="font-semibold text-[var(--text)]">{children}</strong>
    ),
    ul: ({ children }) => (
      <ul className="list-disc list-inside space-y-1 mb-3 text-[var(--text-secondary)]">{children}</ul>
    ),
    li: ({ children }) => <li className="leading-relaxed">{children}</li>,
    code: ({ children }) => (
      <code className="px-1.5 py-0.5 bg-[var(--surface-hover)] border border-[var(--border)] rounded text-xs font-mono text-[var(--text)]">
        {children}
      </code>
    ),
  };
}
