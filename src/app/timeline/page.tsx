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
  image?: { src: string; alt: string };
  milestones: Milestone[];
};

const ITS = { label: "Institut Teknologi Sepuluh Nopember", href: "https://www.its.ac.id" };
const RIVAL_ITS = { label: "RIVAL ITS", href: "https://arek.its.ac.id/rival/" };

// Newest first. Add an image (e.g. "/img/timeline/2025.jpg") to show a photo beside a year.
const timeline: TimelineEntry[] = [
  {
    period: "2026",
    image: {
      src: "/img/timeline/2026.jpg",
      alt: "Yosua Hares in an Institut Teknologi Sepuluh Nopember graduation gown",
    },
    milestones: [
      {
        text: "Started work at",
        link: { label: "Saga Music Lab", href: "https://sagamusiclab.com" },
      },
      { text: "Shipped", link: { label: "CRM Product", href: "https://majorsales.id" } },
      { text: "Shipped TrackOut Music Studio" },
      {
        text: "Started freelance work at",
        link: { label: "Databiota", href: "https://databiota.com" },
      },
      { text: "Won Best Rookie Team at Australian Rover Challenge with", link: RIVAL_ITS },
      { text: "Graduated from", link: ITS, after: "— BA Informatics Engineering" },
    ],
  },
  {
    period: "2025",
    image: {
      src: "/img/timeline/2025.webp",
      alt: "The RIVAL ITS rover digging in sand at the Australian Rover Challenge",
    },
    milestones: [
      { text: "Leader of", link: RIVAL_ITS },
      { text: "Won 13th place at European Rover Challenge Remote International" },
    ],
  },
  {
    period: "2024",
    image: {
      src: "/img/timeline/2024.jpg",
      alt: "Yosua Hares with the RIVAL ITS robot and the Kontes Robot Indonesia 2024 first-place award",
    },
    milestones: [{ text: "Won 1st place at Kontes Robot Indonesia National" }],
  },
  {
    period: "2023",
    image: {
      src: "/img/timeline/2023.jpg",
      alt: "Award ceremony on stage at Kontes Robot Indonesia 2023, with winners holding trophies",
    },
    milestones: [
      { text: "Won 4th place at Kontes Robot Indonesia National" },
      { text: "Won 2nd place at Kontes Robot Indonesia Region II" },
    ],
  },
  {
    period: "2022",
    milestones: [
      { text: "Started uni at", link: ITS },
      { text: "Joined", link: RIVAL_ITS },
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
          <Section key={period} className="gap-3">
            <SectionHeading>{period}</SectionHeading>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:gap-8">
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
              {image ? (
                // Starts halfway between the year and the first milestone, and grows with longer lists (4:3 at minimum, capped for the longest years).
                <div className="relative aspect-[4/3] w-3/4 shrink-0 sm:-mt-5 sm:aspect-auto sm:max-h-56 sm:min-h-33 sm:w-44">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(min-width: 640px) 176px, 75vw"
                    className="rounded-lg object-cover object-[center_40%]"
                  />
                </div>
              ) : (
                // Keep the image column on wide screens so every year's text wraps at the same width.
                <div aria-hidden className="hidden shrink-0 sm:block sm:w-44" />
              )}
            </div>
          </Section>
        ))}
      </div>
    </div>
  );
}
