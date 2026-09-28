"use client";

import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

type SubnavSection = { id: string; label: string };

// Fixed section index on wide screens; highlights the section currently in view.
export function LinksSubnav({ sections }: { sections: SubnavSection[] }) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting);
        if (visible) setActiveId(visible.target.id);
      },
      { rootMargin: "0px 0px -70% 0px" },
    );

    sections.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [sections]);

  return (
    <nav className="fixed top-1/2 right-12 z-10 hidden w-44 -translate-y-1/2 text-right xl:block">
      <ul>
        {sections.map(({ id, label }) => (
          <li key={id}>
            <a
              href={`#${id}`}
              className={cn(
                "text-base leading-8 text-[#888] transition-colors hover:text-[#111] dark:hover:text-[#dfdfdf]",
                activeId === id && "text-[#111] dark:text-[#dfdfdf]",
              )}
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
