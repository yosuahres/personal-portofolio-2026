import { SITE_HOST } from "@/lib/metadata";
import { generateOGImage } from "@/lib/og-utils";

export const runtime = "nodejs";
export const revalidate = 86400; // 24 hours
export const alt = "Yosua Hares";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return generateOGImage({
    title: "Yosua Hares",
    url: SITE_HOST,
  });
}
