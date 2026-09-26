import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { logoDataUrl } from "./brand";

export const OG_SIZE = { width: 1200, height: 630 };

const fontDir = join(process.cwd(), "assets/fonts");
const [regular, semibold, bold, mono] = await Promise.all([
  readFile(join(fontDir, "Geist-Regular.ttf")),
  readFile(join(fontDir, "Geist-SemiBold.ttf")),
  readFile(join(fontDir, "Geist-Bold.ttf")),
  readFile(join(fontDir, "GeistMono-Medium.ttf")),
]);

const FONTS = [
  {
    name: "Geist",
    data: regular,
    weight: 400 as const,
    style: "normal" as const,
  },
  {
    name: "Geist",
    data: semibold,
    weight: 600 as const,
    style: "normal" as const,
  },
  { name: "Geist", data: bold, weight: 700 as const, style: "normal" as const },
  {
    name: "Geist Mono",
    data: mono,
    weight: 500 as const,
    style: "normal" as const,
  },
];

const LOGO = logoDataUrl("tile");

export const ACCENT = {
  low: "#10b981",
  medium: "#fbbf24",
  high: "#f97316",
  critical: "#ef4444",
  neutral: "#a1a1aa",
} as const;

export type Accent = keyof typeof ACCENT;

export interface OgChip {
  label: string;
  accent?: Accent;
  mono?: boolean;
}

export interface OgOptions {
  title: string;
  eyebrow?: string;
  subtitle?: string;
  accent?: Accent;
  path?: string;
  chips?: OgChip[];
}

function clamp(text: string, max: number) {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).replace(/[\s,.;:]+$/, "")}…`;
}

export function ogImage({
  title,
  eyebrow,
  subtitle,
  accent = "neutral",
  path = "",
  chips = [],
}: OgOptions) {
  const color = ACCENT[accent];
  const titleSize = title.length > 48 ? 58 : title.length > 28 ? 68 : 84;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "64px 72px",
        backgroundColor: "#000",
        backgroundImage: `radial-gradient(circle at 100% 0%, ${color}24 0%, transparent 45%)`,
        fontFamily: "Geist",
        color: "#fafafa",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          {/* biome-ignore lint/performance/noImgElement: next/og renders plain img elements */}
          <img src={LOGO} width={60} height={60} alt="" />
          <div
            style={{
              display: "flex",
              fontSize: 34,
              fontWeight: 600,
              letterSpacing: -0.8,
            }}
          >
            noadmin
            <span style={{ color: "#71717a" }}>.info</span>
          </div>
        </div>
        {eyebrow && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "10px 20px",
              borderRadius: 999,
              border: `1px solid ${color}55`,
              backgroundColor: `${color}14`,
              color,
              fontFamily: "Geist Mono",
              fontSize: 22,
              textTransform: "uppercase",
              letterSpacing: 2,
            }}
          >
            <div
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                backgroundColor: color,
              }}
            />
            {eyebrow}
          </div>
        )}
      </div>

      <div style={{ display: "flex", flexDirection: "column", maxWidth: 1000 }}>
        <div
          style={{
            fontSize: titleSize,
            fontWeight: 700,
            letterSpacing: -1.2,
            lineHeight: 1.04,
          }}
        >
          {clamp(title, 80)}
        </div>
        {subtitle && (
          <div
            style={{
              marginTop: 26,
              fontSize: 30,
              lineHeight: 1.4,
              color: "#a1a1aa",
            }}
          >
            {clamp(subtitle, 175)}
          </div>
        )}
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            display: "flex",
            fontFamily: "Geist Mono",
            fontSize: 24,
            color: "#71717a",
          }}
        >
          {path ? `noadmin.info${path}` : ""}
        </div>
        <div style={{ display: "flex", gap: 12 }}>
          {chips.map((chip) => {
            const c = chip.accent ? ACCENT[chip.accent] : "#d4d4d8";
            return (
              <div
                key={chip.label}
                style={{
                  display: "flex",
                  padding: "8px 18px",
                  borderRadius: 12,
                  border: "1px solid #27272a",
                  backgroundColor: "#18181b",
                  color: c,
                  fontSize: 24,
                  fontFamily: chip.mono ? "Geist Mono" : "Geist",
                  fontWeight: chip.mono ? 500 : 600,
                }}
              >
                {chip.label}
              </div>
            );
          })}
        </div>
      </div>
    </div>,
    { ...OG_SIZE, fonts: FONTS },
  );
}
