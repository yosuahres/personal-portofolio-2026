import type { Metadata } from "next";
import Image from "next/image";

import {
  List,
  ListItem,
  ListItemLabel,
  ListItemSubLabel,
  Section,
} from "@/components/shared/ListComponents";
import { PageTitle } from "@/components/Typography";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About Yosua Hares: work at Saga Music Lab and BRIN, and selected projects.",
  path: "/about",
});

type Job = {
  company: string;
  href: string;
  role: string;
  period: string;
  // Omit to show the company's initials until a logo is added.
  logo?: string;
  showArrow?: boolean;
};

const jobs: Job[] = [
  {
    company: "Saga Music Lab",
    href: "https://sagamusiclab.com",
    role: "Software Engineer",
    period: "Now",
    logo: "/img/saga-music-lab-logo.png",
    showArrow: true,
  },
  {
    company: "Databiota",
    href: "https://databiota.com",
    role: "Freelance",
    period: "Now",
    logo: "/img/databiota-logo-full.png",
    showArrow: true,
  },
  {
    company: "Indah Puri Golf Resort",
    href: "/about/indah-puri",
    role: "Freelance",
    period: "2025–2026",
    logo: "/img/indah-puri-logo-full.png",
  },
  {
    company: "BRIN",
    href: "/about/brin",
    role: "AI Researcher Assistant Intern",
    period: "2025",
    logo: "/img/brin.png",
  },
];

type Project = {
  name: string;
  year: string;
  role: string;
  href?: string;
};

// Add projects here, newest first.
const projects: Project[] = [
  {
    name: "ISPhOA 2026",
    year: "2026",
    role: "Web Developer",
    href: "https://isphoa2026.org",
  },
  {
    name: "Rover Robot",
    year: "2025–2026",
    role: "Ground Station Engineer",
    href: "https://arek.its.ac.id/rival/",
  },
  {
    name: "Waste Sorting Robot",
    year: "2024",
    role: "Computer Vision Developer",
    href: "https://arek.its.ac.id/rival/",
  },
];

export default function AboutPage() {
  return (
    <div data-scrollable className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-2xl flex-1 flex-col gap-10 py-16 leading-[1.6]">
        <Section>
          <PageTitle>Work</PageTitle>
        </Section>

        <Section>
          <List className="gap-8">
            {jobs.map(({ company, href, role, period, logo, showArrow }) => (
              <ListItem key={company} href={href} className="items-start gap-3">
                {logo ? (
                  <Image
                    src={logo}
                    alt={company}
                    width={40}
                    height={40}
                    draggable={false}
                    className="mt-1 size-6 shrink-0 rounded-md select-none"
                  />
                ) : (
                  <LogoFallback name={company} />
                )}
                <div className="flex min-w-0 flex-1 flex-col">
                  <ListItemLabel>
                    {company}
                    {showArrow && " ↗"}
                  </ListItemLabel>
                  <ListItemSubLabel>{period}</ListItemSubLabel>
                  <ListItemSubLabel className="text-tertiary">{role}</ListItemSubLabel>
                </div>
              </ListItem>
            ))}
          </List>
        </Section>

        <Section>
          <PageTitle>Projects</PageTitle>
        </Section>

        <Section>
          {projects.length > 0 ? (
            <List className="gap-8">
              {projects.map(({ name, year, role, href }) => (
                <ListItem key={name} href={href} className="flex-col items-start gap-0">
                  <ListItemLabel>
                    {name}
                    {href?.startsWith("http") && " ↗"}
                  </ListItemLabel>
                  <ListItemSubLabel>{year}</ListItemSubLabel>
                  <ListItemSubLabel className="text-tertiary">{role}</ListItemSubLabel>
                </ListItem>
              ))}
            </List>
          ) : (
            <p className="text-quaternary text-xl">Coming soon.</p>
          )}
        </Section>
      </div>
    </div>
  );
}

function LogoFallback({ name }: { name: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((word) => word[0])
    .join("");

  return (
    <span
      aria-hidden
      className="bg-tertiary text-tertiary mt-1 flex size-6 shrink-0 items-center justify-center rounded-md text-[10px] font-semibold select-none"
    >
      {initials}
    </span>
  );
}
