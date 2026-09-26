import { ogImage } from "@/lib/og";

export function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = (searchParams.get("title") || "noadmin.info").slice(0, 80);
  const subtitle = (
    searchParams.get("subtitle") || "Discord bot permission tools"
  ).slice(0, 140);
  return ogImage({ title, subtitle });
}
