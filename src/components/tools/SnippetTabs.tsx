"use client";

import { useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { SNIPPETS } from "@/lib/snippets";

export function SnippetTabs({
  value,
  clientId,
}: {
  value: bigint;
  clientId: string;
}) {
  const [active, setActive] = useState(SNIPPETS[0].id);
  const snippet = SNIPPETS.find((s) => s.id === active) ?? SNIPPETS[0];
  const code = snippet.code(value, clientId || "YOUR_CLIENT_ID");

  return (
    <div className="overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-950">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-2">
        <div
          className="flex min-w-0 flex-1 gap-1 overflow-x-auto overflow-y-hidden py-2"
          role="tablist"
          aria-label="Library"
        >
          {SNIPPETS.map((s) => (
            <button
              key={s.id}
              type="button"
              role="tab"
              aria-selected={s.id === active}
              onClick={() => setActive(s.id)}
              className={`shrink-0 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                s.id === active
                  ? "bg-white/[0.1] text-white"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              {s.label}
            </button>
          ))}
        </div>
        <CopyButton value={code} />
      </div>
      <pre className="max-h-80 overflow-auto p-4 text-[13px] leading-relaxed text-zinc-200">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}
