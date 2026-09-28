// Work entries that have their own article page, in the order "Next" cycles through them.
// Add new articles here; the last one's "Next" loops back to the first.
export const workArticles = [
  { slug: "indah-puri", title: "Indah Puri Golf Resort" },
  { slug: "brin", title: "BRIN" },
] as const;

export type WorkArticleSlug = (typeof workArticles)[number]["slug"];

export function getNextWorkArticle(slug: WorkArticleSlug) {
  const index = workArticles.findIndex((article) => article.slug === slug);
  return workArticles[(index + 1) % workArticles.length];
}
