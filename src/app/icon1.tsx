import { ImageResponse } from "next/og";
import { logoDataUrl } from "@/lib/brand";

export const contentType = "image/png";

const SIZES = [32, 192, 512];

export function generateImageMetadata() {
  return SIZES.map((px) => ({
    id: String(px),
    size: { width: px, height: px },
    contentType,
  }));
}

const TILE = logoDataUrl("tile");

export default async function Icon({ id }: { id: Promise<string> }) {
  const px = Number(await id);
  return new ImageResponse(
    // biome-ignore lint/performance/noImgElement: next/og renders plain img elements
    <img src={TILE} width={px} height={px} alt="" />,
    { width: px, height: px },
  );
}
