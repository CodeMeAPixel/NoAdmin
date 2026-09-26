"use client";

import { useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { badgeState, renderBadge } from "@/lib/badge";
import { parsePermissionInput } from "@/lib/permissions";
import { SITE_URL } from "@/lib/site";

export function BadgeBuilder() {
  const [input, setInput] = useState("");
  const [detail, setDetail] = useState(false);
  const parsed = useMemo(() => parsePermissionInput(input), [input]);

  const valid = parsed.value !== null && !parsed.error;
  const param =
    parsed.source === "url"
      ? `invite=${encodeURIComponent(input.trim())}`
      : `permissions=${parsed.value ?? 0}`;
  const badgeUrl = `${SITE_URL}/api/badge?${param}${detail ? "&detail=1" : ""}`;
  const reportUrl = `${SITE_URL}/analyze?${parsed.source === "url" ? `invite=${encodeURIComponent(input.trim())}` : `p=${parsed.value ?? 0}`}`;
  const svg = renderBadge("noadmin", badgeState(input, detail));
  const markdown = `[![NoAdmin](${badgeUrl})](${reportUrl})`;
  const html = `<a href="${reportUrl}"><img src="${badgeUrl}" alt="NoAdmin" /></a>`;

  return (
    <div className="space-y-5">
      <div>
        <label
          htmlFor="badge-input"
          className="mb-2 block text-sm font-medium text-white"
        >
          Your bot&apos;s invite link or permission number
        </label>
        <input
          id="badge-input"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="https://discord.com/oauth2/authorize?client_id=...&permissions=..."
          spellCheck={false}
          className="w-full rounded-lg border border-white/[0.1] bg-black px-3 py-2.5 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none"
        />
        {input && parsed.error && (
          <p className="mt-2 text-sm text-amber-400">{parsed.error}</p>
        )}
        <label className="mt-3 flex cursor-pointer items-center gap-2 text-sm text-zinc-300">
          <input
            type="checkbox"
            className="accent-white"
            checked={detail}
            onChange={(e) => setDetail(e.target.checked)}
          />
          Include the permission count
        </label>
      </div>

      <div className="flex min-h-20 items-center justify-center rounded-xl border border-white/[0.08] bg-zinc-900/60 p-6">
        {/* biome-ignore lint/performance/noImgElement: a local data URL, nothing for next/image to optimize */}
        <img
          src={`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`}
          alt={`Badge preview: ${badgeState(input, detail).message}`}
          height={20}
        />
      </div>

      {valid && (
        <div className="space-y-3">
          {[
            { label: "Markdown", code: markdown },
            { label: "HTML", code: html },
            { label: "Image URL", code: badgeUrl },
          ].map((row) => (
            <div
              key={row.label}
              className="overflow-hidden rounded-xl border border-white/[0.08] bg-zinc-950"
            >
              <div className="flex items-center justify-between gap-3 border-b border-white/[0.06] px-4 py-2">
                <span className="text-xs text-zinc-400">{row.label}</span>
                <CopyButton value={row.code} />
              </div>
              <pre className="overflow-x-auto overflow-y-hidden p-4 text-xs leading-relaxed text-zinc-200">
                <code className="font-mono">{row.code}</code>
              </pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
