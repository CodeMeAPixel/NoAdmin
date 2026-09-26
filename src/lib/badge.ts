import { analyze } from "./analyze";
import { parsePermissionInput } from "./permissions";

export interface BadgeState {
  message: string;
  color: string;
}

export function badgeState(input: string, detail: boolean): BadgeState {
  const parsed = parsePermissionInput(input);
  if (parsed.error || parsed.value === null)
    return { message: "unknown", color: "#52525b" };
  const report = analyze(parsed.value, parsed.scopes);
  const count = report.permissions.length;
  const suffix = detail ? ` · ${count} perm${count === 1 ? "" : "s"}` : "";
  if (report.verdict === "administrator")
    return { message: "requests admin", color: "#dc2626" };
  if (report.verdict === "excessive")
    return { message: `no admin${suffix}`, color: "#ea580c" };
  if (report.verdict === "broad")
    return { message: `no admin${suffix}`, color: "#ca8a04" };
  return { message: `no admin${suffix}`, color: "#16a34a" };
}

const escapeXml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
const width = (s: string) => Math.round(s.length * 6.4 + 12);

export function renderBadge(label: string, state: BadgeState): string {
  const lw = width(label);
  const mw = width(state.message);
  const total = lw + mw;
  const title = `${label}: ${state.message}`;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${total}" height="20" role="img" aria-label="${escapeXml(title)}"><title>${escapeXml(title)}</title><linearGradient id="s" x2="0" y2="100%"><stop offset="0" stop-color="#bbb" stop-opacity=".1"/><stop offset="1" stop-opacity=".1"/></linearGradient><clipPath id="r"><rect width="${total}" height="20" rx="3" fill="#fff"/></clipPath><g clip-path="url(#r)"><rect width="${lw}" height="20" fill="#18181b"/><rect x="${lw}" width="${mw}" height="20" fill="${state.color}"/><rect width="${total}" height="20" fill="url(#s)"/></g><g fill="#fff" text-anchor="middle" font-family="Verdana,Geneva,DejaVu Sans,sans-serif" font-size="11"><text x="${lw / 2}" y="14">${escapeXml(label)}</text><text x="${lw + mw / 2}" y="14">${escapeXml(state.message)}</text></g></svg>`;
}
