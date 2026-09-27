import { catalog, json, preflight } from "@/lib/api";

export function GET() {
  return json(catalog());
}

export const OPTIONS = preflight;
