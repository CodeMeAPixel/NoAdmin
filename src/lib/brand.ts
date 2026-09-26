export const BRAND = {
  red: "#ef4444",
  ink: "#09090b",
  paper: "#fafafa",
  tile: "#09090b",
  tileBorder: "#27272a",
};

const SHIELD =
  "M32 6.5 L51.5 13.5 V30 C51.5 43.2 43 52 32 57.5 C21 52 12.5 43.2 12.5 30 V13.5 Z";
const LETTER = "M22.5 46 L32 19.5 L41.5 46 M25.2 40 H38.8";
const SLASH = "M18 22.5 L46 39.5";

function mark() {
  return [
    `<defs><mask id="na-cut"><rect width="64" height="64" fill="#fff"/><path d="${SLASH}" stroke="#000" stroke-width="8.5" stroke-linecap="round"/></mask></defs>`,
    `<path d="${SHIELD}" fill="${BRAND.paper}"/>`,
    `<path d="${LETTER}" stroke="${BRAND.ink}" stroke-width="5.4" fill="none" stroke-linecap="round" stroke-linejoin="round" mask="url(#na-cut)"/>`,
    `<path d="${SLASH}" stroke="${BRAND.red}" stroke-width="4.2" stroke-linecap="round"/>`,
  ].join("");
}

export function logoSvg(variant: "mark" | "tile" | "square" = "mark"): string {
  const background =
    variant === "tile"
      ? `<rect width="64" height="64" rx="14" fill="${BRAND.tile}"/><rect x=".5" y=".5" width="63" height="63" rx="13.5" fill="none" stroke="${BRAND.tileBorder}"/>`
      : variant === "square"
        ? `<rect width="64" height="64" fill="${BRAND.tile}"/>`
        : "";
  const inner =
    variant === "square"
      ? `<g transform="translate(6.4 6.4) scale(.8)">${mark()}</g>`
      : mark();
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">${background}${inner}</svg>`;
}

export function logoDataUrl(
  variant: "mark" | "tile" | "square" = "mark",
): string {
  return `data:image/svg+xml;base64,${Buffer.from(logoSvg(variant)).toString("base64")}`;
}
