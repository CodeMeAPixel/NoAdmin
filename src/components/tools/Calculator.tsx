"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { InviteBuilder } from "@/components/tools/InviteBuilder";
import { SnippetTabs } from "@/components/tools/SnippetTabs";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/components/ui/Icon";
import { Card, RISK_TONE, RiskBadge, TONE } from "@/components/ui/primitives";
import { analyze, VERDICT_COPY } from "@/lib/analyze";
import {
  CATEGORIES,
  decode,
  encode,
  hex,
  PERMISSIONS,
  parsePermissionInput,
  type Risk,
} from "@/lib/permissions";
import { TEMPLATES, templateValue } from "@/lib/templates";

const RISK_FILTERS: ("all" | Risk)[] = [
  "all",
  "low",
  "medium",
  "high",
  "critical",
];

export function Calculator() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [query, setQuery] = useState("");
  const [riskFilter, setRiskFilter] = useState<"all" | Risk>("all");
  const [clientId, setClientId] = useState("");
  const [scopes, setScopes] = useState<string[]>([
    "bot",
    "applications.commands",
  ]);
  const [importText, setImportText] = useState("");
  const [importError, setImportError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const p = params.get("p");
    if (p && /^\d+$/.test(p))
      setSelected(
        new Set(decode(BigInt(p)).permissions.map((perm) => perm.key)),
      );
    const template = params.get("template");
    if (!p && template) {
      const t = TEMPLATES.find((x) => x.slug === template);
      if (t)
        setSelected(
          new Set(decode(templateValue(t)).permissions.map((perm) => perm.key)),
        );
    }
    const id = params.get("client_id");
    if (id && /^\d+$/.test(id)) setClientId(id);
    const scope = params.get("scope");
    if (scope !== null) setScopes(scope.split(/[\s,+]+/).filter(Boolean));
    setReady(true);
  }, []);

  const value = useMemo(() => encode(selected), [selected]);
  const analysis = useMemo(() => analyze(value, scopes), [value, scopes]);

  useEffect(() => {
    if (!ready) return;
    const params = new URLSearchParams();
    if (value > 0n) params.set("p", value.toString());
    if (clientId) params.set("client_id", clientId);
    if (scopes.join(",") !== "bot,applications.commands")
      params.set("scope", scopes.join(","));
    const qs = params.toString();
    window.history.replaceState(
      null,
      "",
      qs ? `?${qs}` : window.location.pathname,
    );
  }, [ready, value, clientId, scopes]);

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PERMISSIONS.filter(
      (perm) =>
        (riskFilter === "all" || perm.risk === riskFilter) &&
        (!q ||
          perm.name.toLowerCase().includes(q) ||
          perm.key.toLowerCase().includes(q) ||
          perm.summary.toLowerCase().includes(q)),
    );
  }, [query, riskFilter]);

  const toggle = (key: string) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const importValue = () => {
    const parsed = parsePermissionInput(importText);
    if (parsed.error || parsed.value === null) {
      setImportError(
        parsed.error ?? "Enter a permission number or invite link.",
      );
      return;
    }
    setSelected(
      new Set(decode(parsed.value).permissions.map((perm) => perm.key)),
    );
    if (parsed.clientId) setClientId(parsed.clientId);
    if (parsed.scopes.length) setScopes(parsed.scopes);
    setImportError(null);
    setImportText("");
  };

  const verdict = VERDICT_COPY[analysis.verdict];
  const shareUrl = () => window.location.href;

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem]">
      <div className="min-w-0 space-y-4">
        <Card className="p-4">
          <p className="mb-2 text-xs text-zinc-400">Start from a bot type</p>
          <div className="flex flex-wrap gap-1.5">
            {TEMPLATES.map((t) => (
              <button
                key={t.slug}
                type="button"
                onClick={() =>
                  setSelected(
                    new Set(
                      decode(templateValue(t)).permissions.map(
                        (perm) => perm.key,
                      ),
                    ),
                  )
                }
                className="rounded-md border border-white/[0.08] bg-white/[0.02] px-2.5 py-1 text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
              >
                {t.name}
              </button>
            ))}
          </div>
          <div className="mt-4 border-t border-white/[0.06] pt-4">
            <label
              htmlFor="import"
              className="mb-1.5 block text-xs text-zinc-400"
            >
              Or import a permission number or invite link
            </label>
            <div className="flex gap-2">
              <input
                id="import"
                value={importText}
                onChange={(e) => {
                  setImportText(e.target.value);
                  setImportError(null);
                }}
                onKeyDown={(e) => e.key === "Enter" && importValue()}
                placeholder="8 or https://discord.com/oauth2/authorize?..."
                className="min-w-0 flex-1 rounded-lg border border-white/[0.1] bg-black px-3 py-2 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none"
              />
              <button
                type="button"
                onClick={importValue}
                className="shrink-0 rounded-lg border border-white/[0.12] px-3 py-2 text-sm text-zinc-100 transition-colors hover:bg-white/[0.05]"
              >
                Import
              </button>
            </div>
            {importError && (
              <p className="mt-1.5 text-xs text-amber-400">{importError}</p>
            )}
          </div>
        </Card>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative min-w-0 flex-1">
            <Icon
              name="search"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500"
            />
            <input
              type="search"
              aria-label="Search permissions"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search permissions"
              className="w-full rounded-lg border border-white/[0.1] bg-zinc-900/60 py-2 pl-9 pr-3 text-sm text-white placeholder:text-zinc-500 focus:border-white/30 focus:outline-none"
            />
          </div>
          <fieldset className="flex min-w-0 gap-1 overflow-x-auto overflow-y-hidden">
            <legend className="sr-only">Filter by risk</legend>
            {RISK_FILTERS.map((r) => (
              <button
                key={r}
                type="button"
                aria-pressed={riskFilter === r}
                onClick={() => setRiskFilter(r)}
                className={`shrink-0 rounded-md px-2.5 py-1.5 text-xs font-medium capitalize transition-colors ${
                  riskFilter === r
                    ? "bg-white/[0.1] text-white"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {r}
              </button>
            ))}
          </fieldset>
        </div>

        {CATEGORIES.map((cat) => {
          const perms = visible.filter((perm) => perm.category === cat.id);
          if (!perms.length) return null;
          return (
            <section key={cat.id} aria-labelledby={`cat-${cat.id}`}>
              <h3
                id={`cat-${cat.id}`}
                className="mb-2 text-xs font-medium uppercase tracking-widest text-zinc-500"
              >
                {cat.name}
              </h3>
              <Card className="divide-y divide-white/[0.05] overflow-hidden">
                {perms.map((perm) => {
                  const on = selected.has(perm.key);
                  const critical = perm.risk === "critical";
                  return (
                    <div
                      key={perm.key}
                      className={`flex items-start gap-3 px-4 py-3 transition-colors ${
                        on
                          ? critical
                            ? "bg-red-500/[0.08]"
                            : "bg-white/[0.04]"
                          : "hover:bg-white/[0.02]"
                      }`}
                    >
                      <input
                        id={`perm-${perm.key}`}
                        type="checkbox"
                        checked={on}
                        onChange={() => toggle(perm.key)}
                        className={`mt-1 h-4 w-4 shrink-0 ${critical ? "accent-red-500" : "accent-white"}`}
                      />
                      <label
                        htmlFor={`perm-${perm.key}`}
                        className="min-w-0 flex-1 cursor-pointer"
                      >
                        <span className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span
                            className={`text-sm font-medium ${on ? "text-white" : "text-zinc-200"}`}
                          >
                            {perm.name}
                          </span>
                          <RiskBadge risk={perm.risk} />
                          {perm.requires2fa && (
                            <span
                              className="text-[11px] text-zinc-500"
                              title="Requires 2FA in servers with moderation 2FA enabled"
                            >
                              2FA
                            </span>
                          )}
                        </span>
                        <span className="mt-0.5 block text-xs leading-relaxed text-zinc-400">
                          {perm.detail}
                        </span>
                      </label>
                      <Link
                        href={`/permissions/${perm.slug}`}
                        className="mt-0.5 shrink-0 rounded-md p-1 text-zinc-500 transition-colors hover:bg-white/[0.06] hover:text-white"
                        aria-label={`About ${perm.name}`}
                      >
                        <Icon name="info" className="h-4 w-4" />
                      </Link>
                    </div>
                  );
                })}
              </Card>
            </section>
          );
        })}
        {!visible.length && (
          <p className="py-8 text-center text-sm text-zinc-500">
            No permissions match your search.
          </p>
        )}
      </div>

      <aside className="min-w-0 space-y-4 lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:self-start lg:overflow-y-auto lg:pr-1">
        <Card className="p-4 sm:p-5">
          <div className="flex items-center justify-between gap-2">
            <p className="text-xs text-zinc-400">Permission value</p>
            {selected.size > 0 && (
              <button
                type="button"
                onClick={() => setSelected(new Set())}
                className="text-xs text-zinc-400 hover:text-white"
              >
                Clear ({selected.size})
              </button>
            )}
          </div>
          <p className="mt-1.5 break-all font-mono text-3xl font-semibold tabular-nums text-white">
            {value.toString()}
          </p>
          <p className="mt-0.5 font-mono text-xs text-zinc-500">{hex(value)}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <CopyButton value={value.toString()} label="Copy value" />
            <CopyButton value={shareUrl} label="Copy share link" />
          </div>

          <div
            className={`mt-4 rounded-lg border px-3 py-2.5 ${TONE[verdict.tone]}`}
          >
            <p className="text-sm font-medium">{verdict.label}</p>
            <p className="mt-0.5 text-xs text-zinc-300">{verdict.blurb}</p>
          </div>
          {selected.size > 0 && (
            <div
              className="mt-3 flex h-2 overflow-hidden rounded-full bg-white/[0.06]"
              aria-hidden="true"
            >
              {(["low", "medium", "high", "critical"] as Risk[]).map((r) =>
                analysis.byRisk[r].length ? (
                  <span
                    key={r}
                    className={RISK_TONE[r].bar}
                    style={{
                      width: `${(analysis.byRisk[r].length / selected.size) * 100}%`,
                    }}
                  />
                ) : null,
              )}
            </div>
          )}
          {selected.size > 0 && (
            <Link
              href={`/analyze?p=${value}`}
              className="mt-3 inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white"
            >
              Full analysis <Icon name="arrowRight" className="h-3.5 w-3.5" />
            </Link>
          )}
        </Card>

        {selected.has("ADMINISTRATOR") && (
          <div className={`rounded-xl border p-4 ${TONE.danger}`}>
            <p className="text-sm font-medium">
              Administrator makes everything else pointless
            </p>
            <p className="mt-1 text-xs text-zinc-300">
              It overrides every other permission and every channel restriction.
            </p>
            <button
              type="button"
              onClick={() => toggle("ADMINISTRATOR")}
              className="mt-3 rounded-md border border-red-500/40 px-2.5 py-1 text-xs font-medium text-red-300 hover:bg-red-500/10"
            >
              Remove Administrator
            </button>
          </div>
        )}

        <Card className="p-4 sm:p-5">
          <h3 className="mb-3 text-sm font-medium text-white">Invite link</h3>
          <InviteBuilder
            value={value}
            clientId={clientId}
            scopes={scopes}
            onClientId={setClientId}
            onScopes={setScopes}
          />
        </Card>

        <div>
          <h3 className="mb-2 text-sm font-medium text-white">
            Use it in code
          </h3>
          <SnippetTabs value={value} clientId={clientId} />
        </div>
      </aside>
    </div>
  );
}
