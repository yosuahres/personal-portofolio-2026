import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { Markdown } from "@/components/Markdown";
import { List, ListItem, ListItemLabel } from "@/components/shared/ListComponents";
import { PageTitle } from "@/components/Typography";
import { createArticleJsonLd, createMetadata, truncateDescription } from "@/lib/metadata";
import { getAllWritingPosts, getWritingPostBySlug } from "@/lib/writing";

import { LikeButton } from "./LikeButton";

export const revalidate = 3600;

export async function generateStaticParams() {
  const posts = await getAllWritingPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await props.params;
  const post = await getWritingPostBySlug(slug);
  if (!post) return {};

  return createMetadata({
    title: post.title,
    description: truncateDescription(post.excerpt || "A post by Yosua Hares"),
    path: `/writing/${slug}`,
    image: `/writing/${slug}/opengraph-image`,
    type: "article",
    publishedTime: post.publishedAt,
  });
}

function getRandomPosts<T>(posts: T[], count: number): T[] {
  const shuffled = [...posts].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

export default async function WritingPostPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const post = await getWritingPostBySlug(slug);
  if (!post) notFound();

  const allPosts = await getAllWritingPosts();
  const readNext = getRandomPosts(
    allPosts.filter((other) => other.slug !== slug),
    5,
  );

  const articleJsonLd = createArticleJsonLd({
    title: post.title,
    description: post.excerpt || "A post by Yosua Hares",
    path: `/writing/${slug}`,
    publishedTime: post.publishedAt,
  });

  const publishedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <div data-scrollable className="flex-1 overflow-y-auto">
        <article className="text-secondary mx-auto flex max-w-[680px] flex-col px-4 py-16 text-[19px] leading-[30px] text-pretty">
          <p className="text-tertiary mb-3 text-base">{publishedDate}</p>
          <PageTitle className="text-primary mb-6">{post.title}</PageTitle>
          <div className="mb-12">
            <LikeButton slug={post.slug} initialCount={post.likeCount} />
          </div>
          <Markdown>{post.content}</Markdown>
        </article>

        {readNext.length > 0 && (
          <div className="mx-auto flex max-w-[680px] flex-col gap-4 px-4 pb-16">
            <h2 className="text-tertiary text-base">Read next</h2>
            <List>
              {readNext.map((other) => (
                <ListItem key={other.id} href={`/writing/${other.slug}`}>
                  <ListItemLabel>{other.title}</ListItemLabel>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    </>
  );
}
