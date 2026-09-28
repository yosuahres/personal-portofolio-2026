import Link from "next/link";

import { getNextWorkArticle, type WorkArticleSlug } from "./workArticles";

const LINK_CLASS_NAME =
  "text-primary font-medium decoration-[#2e2e2e] decoration-[3px] underline-offset-4 hover:underline dark:decoration-[#444]";

// Footer for work articles: back to the Work list, and on to the next article.
export function WorkArticleNav({ slug }: { slug: WorkArticleSlug }) {
  const next = getNextWorkArticle(slug);

  return (
    <nav className="mt-8 flex items-center justify-between text-[21px]">
      <Link href="/about" className={LINK_CLASS_NAME}>
        ← Back to Work
      </Link>
      <Link
        href={`/about/${next.slug}`}
        className={LINK_CLASS_NAME}
        aria-label={`Next: ${next.title}`}
      >
        Next →
      </Link>
    </nav>
  );
}
