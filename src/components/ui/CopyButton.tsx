"use client";

import { useEffect, useState } from "react";
import { Icon } from "./Icon";

export function CopyButton({
  value,
  label = "Copy",
  className = "",
}: {
  value: string | (() => string);
  label?: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(t);
  }, [copied]);

  return (
    <button
      type="button"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(
            typeof value === "function" ? value() : value,
          );
          setCopied(true);
        } catch {
          setCopied(false);
        }
      }}
      className={`inline-flex shrink-0 items-center gap-1.5 rounded-md border border-white/[0.1] px-2 py-1 text-xs font-medium transition-colors hover:border-white/25 hover:bg-white/[0.05] ${
        copied ? "text-emerald-400" : "text-zinc-300"
      } ${className}`}
      aria-live="polite"
    >
      <Icon name={copied ? "check" : "copy"} className="h-3.5 w-3.5" />
      {copied ? "Copied" : label}
    </button>
  );
}
