import { json, preflight } from "@/lib/api";
import { OPENAPI } from "@/lib/openapi";

export function GET() {
  return json(OPENAPI);
}

export const OPTIONS = preflight;
