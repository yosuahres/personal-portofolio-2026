import type { MetadataRoute } from "next";

import { workArticles } from "@/app/about/workArticles";
import { SITE_CONFIG } from "@/lib/metadata";
import { getAllWritingPosts } from "@/lib/writing";

export const revalidate = 3600;

const STATIC_PATHS = ["", "/about", "/writing", "/timeline", "/photos", "/links"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllWritingPosts();

  const staticRoutes = STATIC_PATHS.map((path) => ({
    url: `${SITE_CONFIG.url}${path}`,
    priority: path === "" ? 1 : 0.8,
  }));

  const workRoutes = workArticles.map((article) => ({
    url: `${SITE_CONFIG.url}/about/${article.slug}`,
    priority: 0.6,
  }));

  const postRoutes = posts.map((post) => ({
    url: `${SITE_CONFIG.url}/writing/${post.slug}`,
    lastModified: post.publishedAt,
    priority: 0.6,
  }));

  return [...staticRoutes, ...workRoutes, ...postRoutes];
}
