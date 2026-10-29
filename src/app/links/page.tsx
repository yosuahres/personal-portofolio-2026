import type { Metadata } from "next";

import { PageTitle } from "@/components/Typography";
import { createMetadata } from "@/lib/metadata";

import { LinksSubnav } from "./LinksSubnav";

export const metadata: Metadata = createMetadata({
  title: "Links",
  description: "Papers, awards, education and profiles of Yosua Hares.",
  path: "/links",
});

type LinkEntry = {
  title: string;
  href?: string;
  year?: string;
  detail?: string;
};

type LinkSection = {
  id: string;
  heading: string;
  entries: LinkEntry[];
};

const sections: LinkSection[] = [
  {
    id: "paper",
    heading: "Paper",
    entries: [
      {
        title: "Augmented Reality-Based Fibula Osteotomy Training Using visionOS",
        href: "https://ieeexplore.ieee.org/document/11621473",
        detail: "IEEE Xplore",
      },
    ],
  },
  {
    id: "awards",
    heading: "Awards",
    entries: [
      {
        title: "Best Rookie Team",
        year: "2026",
        detail: "Australian Rover Challenge",
      },
      {
        title: "13th Place, International Level",
        year: "2025",
        detail: "European Rover Challenge Remote",
      },
      {
        title: "1st Place, National Level",
        year: "2024",
        detail: "Indonesian Robot Contest (KRI) – Thematic Category",
      },
      {
        title: "4th Place, National Level",
        year: "2023",
        detail: "Indonesian Robot Contest (KRI) – Thematic Category",
      },
      {
        title: "2nd Place, Region II",
        year: "2023",
        detail: "Indonesian Robot Contest (KRI) – Thematic Category",
      },
    ],
  },
  {
    id: "education",
    heading: "Education",
    entries: [
      {
        title: "Institut Teknologi Sepuluh Nopember",
        href: "https://www.its.ac.id",
        detail: "BA – Informatics Engineering",
      },
    ],
  },
  {
    id: "profiles",
    heading: "Profiles",
    entries: [
      { title: "GitHub", href: "https://github.com/yosuahres" },
      { title: "LinkedIn", href: "https://www.linkedin.com/in/yosuahares" },
      { title: "Instagram", href: "https://www.instagram.com/yosuahres/" },
    ],
  },
];

export default function LinksPage() {
  return (
    <div data-scrollable className="flex-1 overflow-y-auto scroll-smooth">
      <LinksSubnav sections={sections.map(({ id, heading }) => ({ id, label: heading }))} />

      <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-10 px-4 py-16 text-xl leading-8">
        <PageTitle>Links</PageTitle>

        {sections.map(({ id, heading, entries }) => (
          <section key={id} id={id} className="flex scroll-mt-20 flex-col gap-6">
            <h2 className="text-primary text-2xl font-bold">{heading}</h2>
            <ul className="flex flex-col gap-6">
              {entries.map(({ title, href, year, detail }) => (
                <li key={title} className="text-secondary text-pretty">
                  <EntryTitle title={title} href={href} />
                  {year && <span className="ml-2 text-[#888] opacity-70">{year}</span>}
                  {detail && <div>{detail}</div>}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}

function EntryTitle({ title, href }: { title: string; href?: string }) {
  if (!href) return <span className="text-primary">{title}</span>;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-primary decoration-[#2e2e2e] decoration-[3px] underline-offset-4 hover:underline dark:decoration-[#444]"
    >
      {title}
    </a>
  );
}
