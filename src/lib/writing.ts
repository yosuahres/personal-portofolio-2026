import { supabase } from "@/lib/supabase";

// A published post from the `writing_posts` table. `content` is Markdown.
export type WritingPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  featureImage: string | null;
  content: string;
  publishedAt: string;
  likeCount: number;
};

type WritingPostRow = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  feature_image: string | null;
  content: string;
  published_at: string;
  like_count: number;
};

const COLUMNS = "id, slug, title, excerpt, feature_image, content, published_at, like_count";

const toWritingPost = (row: WritingPostRow): WritingPost => ({
  id: row.id,
  slug: row.slug,
  title: row.title,
  excerpt: row.excerpt,
  featureImage: row.feature_image,
  content: row.content,
  publishedAt: row.published_at,
  likeCount: row.like_count,
});

// Published posts, newest first. Row level security already hides drafts and future posts.
export async function getAllWritingPosts(): Promise<WritingPost[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from("writing_posts")
    .select(COLUMNS)
    .order("published_at", { ascending: false });

  if (error) {
    console.error("Error fetching writing posts:", error.message);
    return [];
  }

  return (data as WritingPostRow[]).map(toWritingPost);
}

export async function getWritingPostBySlug(slug: string): Promise<WritingPost | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("writing_posts")
    .select(COLUMNS)
    .eq("slug", slug)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching writing post "${slug}":`, error.message);
    return null;
  }

  return data ? toWritingPost(data as WritingPostRow) : null;
}

// Adds one like to a published post and returns the new total, or null if it failed.
export async function likeWritingPost(slug: string): Promise<number | null> {
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("like_writing_post", { post_slug: slug });

  if (error) {
    console.error(`Error liking writing post "${slug}":`, error.message);
    return null;
  }

  return typeof data === "number" ? data : null;
}
