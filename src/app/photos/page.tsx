import type { Metadata } from "next";
import Image from "next/image";

import { Section } from "@/components/shared/ListComponents";
import { PageTitle } from "@/components/Typography";
import { createMetadata } from "@/lib/metadata";

export const metadata: Metadata = createMetadata({
  title: "Photos",
  description: "Photos taken by and of Yosua Hares.",
  path: "/photos",
});

type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
};

// Newest first. Drop full-resolution files in public/img/photos and add them here.
const photos: Photo[] = [
  {
    src: "/img/photos/taman-safari.jpg",
    alt: "Yosua standing in front of the Cowboy Tombstone sign at Taman Safari",
    width: 2400,
    height: 1600,
    caption: "Taman Safari",
  },
];

export default function PhotosPage() {
  return (
    <div data-scrollable className="flex-1 overflow-y-auto">
      <div className="mx-auto flex max-w-4xl flex-1 flex-col gap-10 py-16 leading-[1.6]">
        <Section>
          <PageTitle>Photos</PageTitle>
        </Section>

        <Section className="gap-12">
          {photos.map(({ src, alt, width, height, caption }) => (
            <figure key={src} className="flex flex-col gap-3">
              <Image
                src={src}
                alt={alt}
                width={width}
                height={height}
                unoptimized
                className="w-full rounded-2xl"
              />
              {caption && <figcaption className="text-quaternary text-base">{caption}</figcaption>}
            </figure>
          ))}
        </Section>
      </div>
    </div>
  );
}
