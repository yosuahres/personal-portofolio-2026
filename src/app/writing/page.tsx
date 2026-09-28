import type { Metadata } from "next";

import {
  List,
  ListItem,
  ListItemLabel,
  Section,
  SectionHeading,
} from "@/components/shared/ListComponents";
import { PageTitle } from "@/components/Typography";
import { createMetadata } from "@/lib/metadata";
import { getAllWritingPosts } from "@/lib/writing";

export const metadata: Metadata = createMetadata({
  title: "Writing",
  description:
    "Thoughts on design, engineering, and building products. Essays and reflections from Yosua Hares.",
  path: "/writing",
});

export const revalidate = 3600;

export default async function WritingPage() {
  const posts = await getAllWritingPosts();

  // Group posts by year
  const postsByYear: Record<string, typeof posts> = {};
  posts.forEach((post) => {
    const year = new Date(post.publishedAt).getFullYear().toString();
    if (!postsByYear[year]) {
      postsByYear[year] = [];
    }
    postsByYear[year].push(post);
  });

  // Sort years in descending order
  const sortedYears = Object.keys(postsByYear).sort((a, b) => parseInt(b) - parseInt(a));

  return (
    <div data-scrollable className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-10 py-16 leading-[1.6]">
        <Section>
          <PageTitle>Writing</PageTitle>
        </Section>
        {posts.length === 0 && (
          <Section>
            <p className="text-tertiary text-xl text-pretty">
              Nothing here yet. Turns out shipping code is easier than finishing a blog post, but
              the first one is on its way.
            </p>
          </Section>
        )}
        {sortedYears.map((year) => (
          <Section key={year}>
            <SectionHeading>{year}</SectionHeading>
            <List>
              {postsByYear[year].map((post) => (
                <ListItem key={post.id} href={`/writing/${post.slug}`}>
                  <ListItemLabel className="line-clamp-none">{post.title}</ListItemLabel>
                </ListItem>
              ))}
            </List>
          </Section>
        ))}
      </div>
    </div>
  );
}
