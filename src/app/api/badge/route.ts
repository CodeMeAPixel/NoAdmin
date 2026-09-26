import { badgeState, renderBadge } from "@/lib/badge";

export function GET(request: Request) {
  const url = new URL(request.url);
  const input =
    url.searchParams.get("invite") ??
    url.searchParams.get("permissions") ??
    url.searchParams.get("p") ??
    "";
  const label = (url.searchParams.get("label") ?? "noadmin").slice(0, 32);
  const detail = url.searchParams.get("detail") === "1";

  return new Response(renderBadge(label, badgeState(input, detail)), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
