"use server";

import { revalidatePath } from "next/cache";

import { likeWritingPost } from "@/lib/writing";

export async function likePost(slug: string): Promise<number | null> {
  const likeCount = await likeWritingPost(slug);
  if (likeCount !== null) revalidatePath(`/writing/${slug}`);
  return likeCount;
}
