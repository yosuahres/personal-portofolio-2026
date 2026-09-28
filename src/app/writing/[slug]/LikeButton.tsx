"use client";

import { useState, useSyncExternalStore, useTransition } from "react";

import { Heart } from "@/components/icons/Heart";
import { cn } from "@/lib/utils";

import { likePost } from "./actions";

const storageKey = (slug: string) => `liked-post:${slug}`;

const noopSubscribe = () => () => {};

const readLiked = (slug: string) => {
  try {
    return localStorage.getItem(storageKey(slug)) === "1";
  } catch {
    return false;
  }
};

const rememberLiked = (slug: string) => {
  try {
    localStorage.setItem(storageKey(slug), "1");
  } catch {
    // Storage can be unavailable (private mode); the like still counts, it just isn't remembered.
  }
};

// One like per browser; the count updates immediately and is saved in Supabase.
export function LikeButton({ slug, initialCount }: { slug: string; initialCount: number }) {
  const [count, setCount] = useState(initialCount);
  const [justLiked, setJustLiked] = useState(false);
  const [, startTransition] = useTransition();

  // Read the remembered like from storage; the server render assumes "not liked yet".
  const likedBefore = useSyncExternalStore(
    noopSubscribe,
    () => readLiked(slug),
    () => false,
  );
  const liked = likedBefore || justLiked;

  const handleClick = () => {
    if (liked) return;

    setJustLiked(true);
    setCount((current) => current + 1);
    rememberLiked(slug);

    startTransition(async () => {
      const saved = await likePost(slug);
      if (saved !== null) setCount(saved);
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={liked}
      aria-label={liked ? `Liked. ${count} likes.` : `Like this post. ${count} likes.`}
      className={cn(
        "bg-elevated flex h-8 w-fit cursor-pointer items-center gap-1.5 rounded-full pr-3.5 pl-2.5 text-sm font-medium tabular-nums shadow-sm ring-[0.5px] ring-black/10 transition-colors select-none dark:ring-white/10",
        liked ? "cursor-default text-red-500" : "text-quaternary hover:text-secondary",
      )}
    >
      <Heart size={18} className={cn("transition-all", liked && "fill-current")} />
      <span>{count}</span>
    </button>
  );
}
