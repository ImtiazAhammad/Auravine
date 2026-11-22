import ReactMarkdown, { type Components } from 'react-markdown';
import remarkGfm from 'remark-gfm';

/** Same look as the blog's previous plain-text renderer: ## headings and spaced paragraphs. */
const components: Components = {
    h1: ({ children }) => <h2 className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">{children}</h2>,
    h2: ({ children }) => <h2 className="text-3xl font-bold mb-6 text-foreground scroll-mt-32">{children}</h2>,
    h3: ({ children }) => <h3 className="text-2xl font-bold mb-4 text-foreground scroll-mt-32">{children}</h3>,
    p: ({ children }) => <p className="mb-8">{children}</p>,
    ul: ({ children }) => <ul className="mb-8 list-disc pl-6 space-y-2">{children}</ul>,
    ol: ({ children }) => <ol className="mb-8 list-decimal pl-6 space-y-2">{children}</ol>,
    a: ({ href, children }) => (
        <a href={href} className="underline underline-offset-4" rel="noopener noreferrer" target="_blank">
            {children}
        </a>
    ),
    blockquote: ({ children }) => <blockquote className="mb-8 border-l-4 border-border pl-4 italic">{children}</blockquote>,
    table: ({ children }) => <div className="mb-8 overflow-x-auto"><table className="w-full text-left text-sm">{children}</table></div>,
};

/** Markdown with raw HTML switched off (skipHtml) and unsafe link schemes stripped by the library. */
export function Markdown({ source }: { source: string }) {
    return (
        <ReactMarkdown remarkPlugins={[remarkGfm]} skipHtml components={components}>
            {source}
        </ReactMarkdown>
    );
}
