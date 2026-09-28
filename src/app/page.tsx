import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PropsWithChildren } from "react";

import { createMetadata, createPersonJsonLd } from "@/lib/metadata";
import { cn } from "@/lib/utils";

export const metadata: Metadata = createMetadata({
  title: "Yosua Hares",
  description:
    "Yosua Hares is a fullstack AI developer living in Batam, currently making mobile app products at Saga Music Lab.",
  path: "/",
});

export default function Home() {
  const personJsonLd = createPersonJsonLd();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <div className="flex flex-1 flex-col overflow-y-auto">
        <div className="mx-6 my-12 flex flex-1 flex-col justify-center min-[881px]:mx-12 min-[881px]:my-0 min-[881px]:pb-[12vh] min-[941px]:mx-auto min-[941px]:w-full min-[941px]:max-w-[850px] min-[1360px]:max-w-[935px]">
          <div className="flex flex-col gap-8 min-[881px]:flex-row min-[881px]:items-start min-[881px]:gap-12 min-[941px]:gap-16 min-[1360px]:gap-[92px]">
            <div className="w-2/5 min-w-[180px] shrink-0 min-[881px]:w-60 min-[941px]:w-[300px]">
              <Portrait src="/img/yosua-portrait-light.jpg" className="dark:hidden" />
              <Portrait src="/img/yosua-portrait-dark.jpg" className="hidden dark:block" />
            </div>

            <div className="flex flex-1 flex-col gap-7 text-[19px] leading-[30px] text-pretty text-[#888] antialiased [text-rendering:optimizeLegibility] sm:text-[21px] sm:leading-[34px] dark:text-[#a1a1a1]">
              <h1 className="text-[32px] leading-10 font-bold text-[#111] sm:text-4xl sm:leading-[42px] dark:text-[#dfdfdf]">
                Yosua Hares
              </h1>

              <p>
                I build products with a focus on <Highlight>AI</Highlight>,{" "}
                <Highlight>mobile</Highlight>, and <Highlight>craft</Highlight>, living in Batam.
              </p>

              <p>
                I work on mobile apps at{" "}
                <TextLink href="https://sagamusiclab.com">Saga Music Lab</TextLink>.
              </p>

              <p>
                Previously, I was an AI Researcher Assistant Intern at{" "}
                <TextLink href="https://www.brin.go.id/en">BRIN</TextLink>.
              </p>

              <div className="flex flex-row gap-6">
                <TextLink href="https://github.com/yosuahres">GitHub</TextLink>
                <TextLink href="https://www.linkedin.com/in/yosuahares">LinkedIn</TextLink>
                <TextLink href="https://www.instagram.com/yosuahres/">Instagram</TextLink>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function Portrait({ src, className }: { src: string; className: string }) {
  return (
    <Image
      src={src}
      alt="Yosua Hares"
      width={680}
      height={680}
      priority
      unoptimized
      draggable={false}
      className={cn("w-full rounded-2xl select-none min-[881px]:rounded-3xl", className)}
    />
  );
}

function Highlight({ children }: PropsWithChildren) {
  return <span className="text-[#111] dark:text-[#dfdfdf]">{children}</span>;
}

function TextLink({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <Link
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-normal text-[#111] decoration-[#2e2e2e] decoration-[3px] underline-offset-4 hover:underline dark:text-[#dfdfdf] dark:decoration-[#444]"
    >
      {children}
    </Link>
  );
}
