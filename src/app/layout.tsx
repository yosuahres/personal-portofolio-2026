import "./globals.css";

import type { Metadata } from "next";
import { Source_Serif_4 } from "next/font/google";
import { PropsWithChildren } from "react";

import { ClientShell } from "@/components/ClientShell";
import { DEFAULT_METADATA, SITE_CONFIG } from "@/lib/metadata";

import { Providers } from "./providers";

const ptSerif = Source_Serif_4({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  ...DEFAULT_METADATA,
  alternates: {
    types: {
      "application/rss+xml": `${SITE_CONFIG.url}/writing/rss.xml`,
    },
  },
};

export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en" suppressHydrationWarning className="bg-main subpixel-antialiased">
      <head>
        <meta name="theme-color" content="#fafafa" media="(prefers-color-scheme: light)" />
        <meta name="theme-color" content="#171717" media="(prefers-color-scheme: dark)" />
      </head>
      <body className={ptSerif.variable}>
        <Providers>
          <ClientShell>{children}</ClientShell>
        </Providers>
      </body>
    </html>
  );
}
