import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";

// Renders post Markdown with the same type scale as the work articles.
const components: Components = {
  h2: ({ children }) => (
    <h2 className="text-primary mt-4 mb-4 text-2xl leading-8 font-bold">{children}</h2>
  ),
  h3: ({ children }) => <h3 className="text-primary mb-2 font-bold">{children}</h3>,
  p: ({ children }) => <p className="mb-8">{children}</p>,
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-primary decoration-[#2e2e2e] decoration-[3px] underline-offset-4 hover:underline dark:decoration-[#444]"
    >
      {children}
    </a>
  ),
  strong: ({ children }) => <strong className="text-primary font-semibold">{children}</strong>,
  ul: ({ children }) => <ul className="mb-8 flex list-disc flex-col gap-2 pl-6">{children}</ul>,
  ol: ({ children }) => <ol className="mb-8 flex list-decimal flex-col gap-2 pl-6">{children}</ol>,
  blockquote: ({ children }) => (
    <blockquote className="text-primary mb-8 border-l-2 border-current/20 pl-5">
      {children}
    </blockquote>
  ),
  img: ({ src, alt }) => (
    // eslint-disable-next-line @next/next/no-img-element -- post images have unknown dimensions
    <img src={src as string} alt={alt ?? ""} className="mt-3 mb-9 w-full rounded-2xl" />
  ),
  hr: () => <hr className="mb-8 border-current/10" />,
};

export function Markdown({ children }: { children: string }) {
  return (
    <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
      {children}
    </ReactMarkdown>
  );
}
