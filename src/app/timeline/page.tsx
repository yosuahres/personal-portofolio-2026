import type { Metadata } from "next";
import Image from "next/image";

import { Section, SectionHeading } from "@/components/shared/ListComponents";
import { PageTitle } from "@/components/Typography";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Timeline",
  description: "A year-by-year timeline of what Yosua Hares has been working on.",
  path: "/timeline",
});

type Milestone = {
  text: string;
  link?: { label: string; href: string };
  // Text that follows the link, e.g. a degree after the university name.
  after?: string;
};

type TimelineEntry = {
  period: string;
  image?: string;
  milestones: Milestone[];
};

// Newest first. Add an image (e.g. "/img/timeline/2025.jpg") to show a photo beside a year.
const timeline: TimelineEntry[] = [
  {
    period: "2026",
    milestones: [
      {
        text: "Graduated from",
        link: { label: "Institut Teknologi Sepuluh Nopember", href: "https://www.its.ac.id" },
        after: "— BA Informatics Engineering",
      },
      { text: "Leader of RIVAL ITS" },
      { text: "Joined RIVAL ITS Robotics Team" },
    ],
  },
];

export default function TimelinePage() {
  return (
    <div data-scrollable className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-10 py-16 leading-[1.6]">
        <Section>
          <PageTitle>Timeline</PageTitle>
        </Section>

        {timeline.map(({ period, image, milestones }) => (
          <Section key={period} className="sm:flex-row sm:items-start sm:justify-between sm:gap-8">
            <div className="flex flex-col gap-3">
              <SectionHeading>{period}</SectionHeading>
              <ul className="text-secondary flex list-disc flex-col gap-1.5 pl-5 text-xl">
                {milestones.map(({ text, link, after }) => (
                  <li key={text} className="text-pretty">
                    {text}
                    {link && (
                      <>
                        {" "}
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary underline-offset-4 hover:underline"
                        >
                          {link.label}
                        </a>
                      </>
                    )}
                    {after && ` ${after}`}
                  </li>
                ))}
              </ul>
            </div>
            {image && (
              <Image
                src={image}
                alt={period}
                width={348}
                height={348}
                className="w-3/4 shrink-0 rounded-lg sm:w-44"
              />
            )}
          </Section>
        ))}
      </div>
    </div>
  );
}
