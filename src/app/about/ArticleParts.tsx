import { PropsWithChildren } from "react";

import { PageTitle } from "@/components/Typography";

import { WorkArticleNav } from "./WorkArticleNav";
import type { WorkArticleSlug } from "./workArticles";

// Shared layout and building blocks for work article pages (e.g. /about/brin).
export function WorkArticle({
  slug,
  title,
  children,
}: PropsWithChildren<{ slug: WorkArticleSlug; title: string }>) {
  return (
    <div data-scrollable className="flex-1 overflow-x-hidden overflow-y-auto">
      <article className="text-secondary mx-auto flex max-w-[680px] flex-col px-4 py-16 text-[19px] leading-[30px] text-pretty">
        <PageTitle className="text-primary mb-6">{title}</PageTitle>
        {children}
        <WorkArticleNav slug={slug} />
      </article>
    </div>
  );
}

export function Heading({ children }: PropsWithChildren) {
  return <h2 className="text-primary mt-4 mb-4 text-2xl leading-8 font-bold">{children}</h2>;
}

export function Subheading({ children }: PropsWithChildren) {
  return <h3 className="text-primary mb-2 font-bold">{children}</h3>;
}

export function Paragraph({ children }: PropsWithChildren) {
  return <p className="mb-8">{children}</p>;
}

// Media is wider than the text column (up to 780px), centred on it, and shrinks to fit small screens.
const MEDIA_WIDTH = "relative left-1/2 w-[min(780px,calc(100vw-2rem))] -translate-x-1/2";

// Stand-in until the real image is added; the label says which image goes here.
export function MediaPlaceholder({ label }: { label: string }) {
  return (
    <div
      className={`${MEDIA_WIDTH} bg-tertiary text-quaternary mt-3 mb-9 flex aspect-video items-center justify-center rounded-2xl px-6 text-center text-base`}
    >
      {label}
    </div>
  );
}
