import Link from "next/link";
import type { ReactNode } from "react";
import type { Risk } from "@/lib/permissions";
import { Icon, type IconName } from "./Icon";

export const RISK_TONE: Record<
  Risk,
  { label: string; text: string; soft: string; dot: string; bar: string }
> = {
  low: {
    label: "Low",
    text: "text-emerald-400",
    soft: "border-emerald-500/25 bg-emerald-500/[0.07]",
    dot: "bg-emerald-500",
    bar: "bg-emerald-500",
  },
  medium: {
    label: "Medium",
    text: "text-amber-400",
    soft: "border-amber-400/25 bg-amber-400/[0.07]",
    dot: "bg-amber-400",
    bar: "bg-amber-400",
  },
  high: {
    label: "High",
    text: "text-orange-400",
    soft: "border-orange-500/25 bg-orange-500/[0.07]",
    dot: "bg-orange-500",
    bar: "bg-orange-500",
  },
  critical: {
    label: "Critical",
    text: "text-red-400",
    soft: "border-red-500/30 bg-red-500/[0.08]",
    dot: "bg-red-500",
    bar: "bg-red-500",
  },
};

export const TONE = {
  ok: "border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-300",
  info: "border-sky-400/25 bg-sky-400/[0.07] text-sky-300",
  warn: "border-amber-400/25 bg-amber-400/[0.07] text-amber-300",
  high: "border-orange-500/25 bg-orange-500/[0.07] text-orange-300",
  danger: "border-red-500/30 bg-red-500/[0.08] text-red-300",
  crit: "border-red-500/30 bg-red-500/[0.08] text-red-300",
  muted: "border-white/[0.08] bg-white/[0.03] text-zinc-300",
} as const;

export function Container({
  children,
  className = "",
  width = "lg",
}: {
  children: ReactNode;
  className?: string;
  width?: "md" | "lg" | "xl";
}) {
  const max =
    width === "md" ? "max-w-3xl" : width === "xl" ? "max-w-6xl" : "max-w-5xl";
  return (
    <div className={`mx-auto w-full px-4 sm:px-6 ${max} ${className}`}>
      {children}
    </div>
  );
}

export function Card({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-xl border border-white/[0.08] bg-zinc-900/60 ${className}`}
    >
      {children}
    </div>
  );
}

export function PageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="pb-8 pt-10 sm:pb-10 sm:pt-14">
      {eyebrow && (
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
          {eyebrow}
        </p>
      )}
      <h1 className="text-balance text-3xl font-semibold tracking-tight text-white sm:text-4xl">
        {title}
      </h1>
      {description && (
        <p className="mt-3 max-w-2xl text-pretty text-base text-zinc-400">
          {description}
        </p>
      )}
      {children}
    </header>
  );
}

export function SectionTitle({
  children,
  action,
  id,
}: {
  children: ReactNode;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div className="mb-4 flex items-end justify-between gap-3">
      <h2
        id={id}
        className="text-xs font-medium uppercase tracking-widest text-zinc-400"
      >
        {children}
      </h2>
      {action}
    </div>
  );
}

export function RiskBadge({
  risk,
  className = "",
}: {
  risk: Risk;
  className?: string;
}) {
  const tone = RISK_TONE[risk];
  return (
    <span
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.soft} ${tone.text} ${className}`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${tone.dot}`}
        aria-hidden="true"
      />
      {tone.label}
    </span>
  );
}

export function Callout({
  tone,
  title,
  children,
  icon,
}: {
  tone: keyof typeof TONE;
  title: string;
  children: ReactNode;
  icon?: IconName;
}) {
  const iconName: IconName =
    icon ??
    (tone === "ok"
      ? "shieldCheck"
      : tone === "info" || tone === "muted"
        ? "info"
        : "alert");
  return (
    <div className={`flex gap-3 rounded-xl border p-4 ${TONE[tone]}`}>
      <Icon name={iconName} className="mt-0.5 h-4 w-4 shrink-0" />
      <div className="min-w-0">
        <p className="text-sm font-medium">{title}</p>
        <div className="mt-1 text-sm leading-relaxed text-zinc-300">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  icon,
  external = false,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  icon?: IconName;
  external?: boolean;
}) {
  const cls =
    variant === "primary"
      ? "bg-white text-black hover:bg-zinc-200"
      : "border border-white/[0.12] text-zinc-100 hover:border-white/25 hover:bg-white/[0.04]";
  const content = (
    <>
      {children}
      {icon && <Icon name={icon} className="h-4 w-4" />}
    </>
  );
  const className = `inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors ${cls}`;
  return external ? (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {content}
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

export function CodeBlock({
  code,
  label,
  action,
}: {
  code: string;
  label?: string;
  action?: ReactNode;
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-950">
      {(label || action) && (
        <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2">
          <span className="text-xs text-zinc-400">{label}</span>
          {action}
        </div>
      )}
      <pre className="overflow-x-auto overflow-y-hidden p-4 text-[13px] leading-relaxed text-zinc-200">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

export function StatTile({
  label,
  value,
  hint,
  valueClass = "text-white",
}: {
  label: string;
  value: ReactNode;
  hint?: ReactNode;
  valueClass?: string;
}) {
  return (
    <Card className="min-w-0 p-4 sm:p-5">
      <p className="truncate text-xs text-zinc-400">{label}</p>
      <p
        className={`mt-1.5 break-all font-mono text-xl font-semibold tabular-nums sm:text-2xl ${valueClass}`}
      >
        {value}
      </p>
      {hint && <div className="mt-1 text-xs text-zinc-500">{hint}</div>}
    </Card>
  );
}
