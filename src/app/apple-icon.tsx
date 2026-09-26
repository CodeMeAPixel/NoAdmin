import { ImageResponse } from "next/og";
import { logoDataUrl } from "@/lib/brand";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

const SQUARE = logoDataUrl("square");

export default function AppleIcon() {
  return new ImageResponse(
    // biome-ignore lint/performance/noImgElement: next/og renders plain img elements
    <img src={SQUARE} width={180} height={180} alt="" />,
    size,
  );
}
