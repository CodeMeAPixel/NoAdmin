"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CopyButton } from "@/components/ui/CopyButton";
import { Icon, type IconName } from "@/components/ui/Icon";
import { Card, RISK_TONE, RiskBadge, TONE } from "@/components/ui/primitives";
import { analyze, type Finding, VERDICT_COPY } from "@/lib/analyze";
import { hex, parsePermissionInput, type Risk } from "@/lib/permissions";

const FINDING_STYLE: Record<
  Finding["level"],
  { tone: keyof typeof TONE; icon: IconName }
> = {
  critical: { tone: "danger", icon: "shieldAlert" },
  warning: { tone: "warn", icon: "alert" },
  info: { tone: "muted", icon: "info" },
  good: { tone: "ok", icon: "shieldCheck" },
};

const EXAMPLES = [
  {
    label: "permissions=8",
    value:
      "https://discord.com/oauth2/authorize?client_id=1234567890123456789&permissions=8&scope=bot",
  },
  { label: "Music bot", value: "3165184" },
  { label: "Moderation bot", value: "1099511721094" },
];

export function Analyzer({ initial }: { initial: string }) {
  const [input, setInput] = useState(initial);
  const parsed = useMemo(() => parsePermissionInput(input), [input]);
  const report = useMemo(
    () => (parsed.value !== null ? analyze(parsed.value, parsed.scopes) : null),
    [parsed],
  );

  useEffect(() => {
    const t = setTimeout(() => {
      const params = new URLSearchParams();
      if (parsed.value !== null && !parsed.error) {
        if (parsed.source === "url") params.set("invite", input.trim());
        else params.set("p", parsed.value.toString());
      }
      const qs = params.toString();
      window.history.replaceState(
        null,
        "",
        qs ? `?${qs}` : window.location.pathname,
      );
    }, 300);
    return () => clearTimeout(t);
  }, [parsed, input]);

  return (
    <div className="space-y-6">
      <Card className="p-4 sm:p-5">
        <label
          htmlFor="analyze-input"
          className="mb-2 block text-sm font-medium text-white"
        >
          Bot invite link or permission number
        </label>
        <div className="relative">
          <Icon
            name="link"
            className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-zinc-500"
          />
          <textarea
            id="analyze-input"
            rows={2}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="https://discord.com/oauth2/authorize?client_id=...&permissions=...&scope=bot"
            spellCheck={false}
            className="w-full resize-none rounded-lg border border-white/[0.1] bg-black py-2.5 pl-9 pr-3 font-mono text-sm text-white placeholder:text-zinc-600 focus:border-white/30 focus:outline-none"
          />
        </div>
        {parsed.error && (
          <p className="mt-2 text-sm text-amber-400">{parsed.error}</p>
        )}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-zinc-500">
          Try:
          {EXAMPLES.map((ex) => (
            <button
              key={ex.label}
              type="button"
              onClick={() => setInput(ex.value)}
              className="rounded-md border border-white/[0.08] px-2 py-0.5 text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
            >
              {ex.label}
            </button>
          ))}
        </div>
        <p className="mt-3 text-xs text-zinc-500">
          Everything runs in your browser. Nothing you paste is sent anywhere.
        </p>
      </Card>

      {report && !parsed.error && (
        <>
          <section
            className={`rounded-2xl border p-5 sm:p-6 ${TONE[VERDICT_COPY[report.verdict].tone]}`}
            aria-live="polite"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-widest opacity-80">
                  Verdict
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
                  {VERDICT_COPY[report.verdict].label}
                </h2>
                <p className="mt-1.5 max-w-xl text-sm text-zinc-300">
                  {VERDICT_COPY[report.verdict].blurb}
                </p>
              </div>
              <div className="text-right">
                <p className="font-mono text-lg font-semibold tabular-nums text-white">
                  {report.value.toString()}
                </p>
                <p className="font-mono text-xs text-zinc-400">
                  {hex(report.value)}
                </p>
              </div>
            </div>
            <div className="mt-5 grid grid-cols-2 gap-2 sm:grid-cols-4">
              {(["critical", "high", "medium", "low"] as Risk[]).map((r) => (
                <div
                  key={r}
                  className="rounded-lg border border-white/[0.08] bg-black/30 px-3 py-2"
                >
                  <p className={`text-xs ${RISK_TONE[r].text}`}>
                    {RISK_TONE[r].label} risk
                  </p>
                  <p className="text-xl font-semibold tabular-nums text-white">
                    {report.byRisk[r].length}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex flex-wrap gap-2 border-t border-white/[0.08] pt-4">
              <Link
                href={`/calculator?p=${report.value}${parsed.clientId ? `&client_id=${parsed.clientId}` : ""}`}
                className="inline-flex items-center gap-1.5 rounded-md bg-white px-3 py-1.5 text-xs font-medium text-black hover:bg-zinc-200"
              >
                <Icon name="calculator" className="h-3.5 w-3.5" /> Edit in
                calculator
              </Link>
              <CopyButton
                value={() => window.location.href}
                label="Copy report link"
              />
              {parsed.clientId && (
                <a
                  href={`https://omniplex.gg/bots/${parsed.clientId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.1] px-2 py-1 text-xs font-medium text-zinc-300 hover:border-white/25 hover:bg-white/[0.05]"
                >
                  Look up on Omniplex{" "}
                  <Icon name="external" className="h-3.5 w-3.5" />
                </a>
              )}
            </div>
            {parsed.source === "url" && (
              <p className="mt-3 text-xs text-zinc-400">
                {parsed.clientId && (
                  <>
                    Client ID{" "}
                    <span className="font-mono text-zinc-300">
                      {parsed.clientId}
                    </span>{" "}
                    ·{" "}
                  </>
                )}
                Scopes:{" "}
                <span className="font-mono text-zinc-300">
                  {parsed.scopes.join(", ") || "none"}
                </span>
              </p>
            )}
          </section>

          {report.findings.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
                Findings
              </h2>
              <div className="space-y-2">
                {report.findings.map((f) => {
                  const style = FINDING_STYLE[f.level];
                  return (
                    <div
                      key={f.title}
                      className={`flex gap-3 rounded-xl border p-4 ${TONE[style.tone]}`}
                    >
                      <Icon
                        name={style.icon}
                        className="mt-0.5 h-4 w-4 shrink-0"
                      />
                      <div className="min-w-0">
                        <p className="text-sm font-medium">{f.title}</p>
                        <p className="mt-0.5 text-sm leading-relaxed text-zinc-300">
                          {f.body}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          {report.closest && (
            <Card className="p-4 sm:p-5">
              <p className="text-sm text-zinc-300">
                This looks like a{" "}
                <span className="font-medium text-white">
                  {report.closest.template.name.toLowerCase()}
                </span>
                .
                {report.closest.extra.length > 0 ? (
                  <>
                    {" "}
                    Compared with our example, it also asks for{" "}
                    <span className="text-white">
                      {report.closest.extra.map((perm) => perm.name).join(", ")}
                    </span>
                    .
                  </>
                ) : (
                  " Its sensitive permissions match what that kind of bot needs."
                )}
              </p>
              <Link
                href={`/examples/${report.closest.template.slug}`}
                className="mt-2 inline-flex items-center gap-1 text-xs text-zinc-300 hover:text-white"
              >
                Compare with the example{" "}
                <Icon name="arrowRight" className="h-3.5 w-3.5" />
              </Link>
            </Card>
          )}

          {report.permissions.length > 0 && (
            <section>
              <h2 className="mb-3 text-xs font-medium uppercase tracking-widest text-zinc-400">
                {report.permissions.length} permission
                {report.permissions.length === 1 ? "" : "s"} requested
              </h2>
              <Card className="divide-y divide-white/[0.05] overflow-hidden">
                {(["critical", "high", "medium", "low"] as Risk[]).flatMap(
                  (r) =>
                    report.byRisk[r].map((perm) => (
                      <Link
                        key={perm.key}
                        href={`/permissions/${perm.slug}`}
                        className="group block px-4 py-3.5 transition-colors hover:bg-white/[0.02] sm:px-5"
                      >
                        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
                          <span className="text-sm font-medium text-zinc-100 group-hover:text-white">
                            {perm.name}
                          </span>
                          <RiskBadge risk={perm.risk} />
                        </div>
                        <p className="mt-1 text-sm text-zinc-400">
                          {perm.detail}
                        </p>
                        {perm.abuse &&
                          (perm.risk === "high" ||
                            perm.risk === "critical") && (
                            <p className="mt-1.5 text-xs text-zinc-500">
                              <span className={RISK_TONE[perm.risk].text}>
                                If the token leaks:
                              </span>{" "}
                              {perm.abuse}
                            </p>
                          )}
                      </Link>
                    )),
                )}
              </Card>
            </section>
          )}
        </>
      )}
    </div>
  );
}
