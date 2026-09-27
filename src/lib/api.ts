import { analyze, VERDICT_COPY, type Verdict } from "./analyze";
import {
  hex,
  PERMISSIONS,
  type Permission,
  parsePermissionInput,
  type Risk,
} from "./permissions";
import { SITE_URL } from "./site";

export const API_VERSION = "1";
export const MAX_BATCH = 50;
export const MAX_INPUT_LENGTH = 4096;

export interface ApiPermission {
  key: string;
  name: string;
  bit: number;
  value: string;
  risk: Risk;
  requires_2fa: boolean;
  url: string;
}

export interface ApiReport {
  input: string;
  valid: true;
  source: "integer" | "url";
  client_id: string | null;
  scopes: string[];
  permissions: string;
  permissions_hex: string;
  administrator: boolean;
  verdict: Verdict;
  verdict_label: string;
  summary: string;
  score: number;
  counts: Record<Risk, number>;
  granted: ApiPermission[];
  unknown_bits: number[];
  findings: { level: string; title: string; body: string }[];
  closest_example: {
    slug: string;
    name: string;
    url: string;
    extra: string[];
  } | null;
  report_url: string;
  badge_url: string;
}

export interface ApiInvalid {
  input: string;
  valid: false;
  error: string;
}

export type ApiResult = ApiReport | ApiInvalid;

export function toApiPermission(perm: Permission): ApiPermission {
  return {
    key: perm.key,
    name: perm.name,
    bit: perm.bit,
    value: (1n << BigInt(perm.bit)).toString(),
    risk: perm.risk,
    requires_2fa: perm.requires2fa,
    url: `${SITE_URL}/permissions/${perm.slug}`,
  };
}

export function reportUrl(input: string, source: "integer" | "url"): string {
  const params = new URLSearchParams(
    source === "url" ? { invite: input } : { p: input },
  );
  return `${SITE_URL}/analyze?${params.toString()}`;
}

export function buildResult(raw: string): ApiResult {
  const input = raw.trim();
  if (!input) return { input, valid: false, error: "No input was provided." };
  if (input.length > MAX_INPUT_LENGTH)
    return { input: "", valid: false, error: "The input is too long." };

  const parsed = parsePermissionInput(input);
  if (parsed.error || parsed.value === null || parsed.source === "empty")
    return {
      input,
      valid: false,
      error: parsed.error ?? "Enter a permission number or a bot invite link.",
    };

  const report = analyze(parsed.value, parsed.scopes);
  const value = parsed.value.toString();
  const reportInput = parsed.source === "url" ? input : value;
  const badge = new URLSearchParams(
    parsed.source === "url" ? { invite: input } : { permissions: value },
  );

  return {
    input,
    valid: true,
    source: parsed.source,
    client_id: parsed.clientId,
    scopes: parsed.scopes,
    permissions: value,
    permissions_hex: hex(parsed.value),
    administrator: report.byRisk.critical.length > 0,
    verdict: report.verdict,
    verdict_label: VERDICT_COPY[report.verdict].label,
    summary: VERDICT_COPY[report.verdict].blurb,
    score: report.score,
    counts: {
      low: report.byRisk.low.length,
      medium: report.byRisk.medium.length,
      high: report.byRisk.high.length,
      critical: report.byRisk.critical.length,
    },
    granted: report.permissions.map(toApiPermission),
    unknown_bits: report.unknownBits,
    findings: report.findings,
    closest_example: report.closest
      ? {
          slug: report.closest.template.slug,
          name: report.closest.template.name,
          url: `${SITE_URL}/examples/${report.closest.template.slug}`,
          extra: report.closest.extra.map((perm) => perm.key),
        }
      : null,
    report_url: reportUrl(reportInput, parsed.source),
    badge_url: `${SITE_URL}/api/badge?${badge.toString()}`,
  };
}

export function catalog() {
  return {
    permissions: PERMISSIONS.map((perm) => ({
      ...toApiPermission(perm),
      summary: perm.summary,
      category: perm.category,
      channels: perm.channels,
    })),
  };
}

export const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Max-Age": "86400",
};

export function json(
  body: unknown,
  status = 200,
  cache = "public, max-age=3600, s-maxage=86400",
): Response {
  return Response.json(body, {
    status,
    headers: {
      ...CORS_HEADERS,
      "Cache-Control": status === 200 ? cache : "no-store",
      "X-Content-Type-Options": "nosniff",
      "X-NoAdmin-Api-Version": API_VERSION,
    },
  });
}

export function preflight(): Response {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
