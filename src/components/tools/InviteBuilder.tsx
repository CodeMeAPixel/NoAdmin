"use client";

import { CopyButton } from "@/components/ui/CopyButton";
import { Icon } from "@/components/ui/Icon";
import { buildInviteUrl, CLIENT_ID_PATTERN } from "@/lib/permissions";

const SCOPES = [
  {
    id: "bot",
    label: "bot",
    hint: "Adds a bot user. Required for permissions.",
  },
  {
    id: "applications.commands",
    label: "applications.commands",
    hint: "Lets the app register slash commands.",
  },
];

export function InviteBuilder({
  value,
  clientId,
  scopes,
  onClientId,
  onScopes,
}: {
  value: bigint;
  clientId: string;
  scopes: string[];
  onClientId: (id: string) => void;
  onScopes: (scopes: string[]) => void;
}) {
  const valid = CLIENT_ID_PATTERN.test(clientId);
  const url = buildInviteUrl({ clientId, value, scopes });

  return (
    <div className="space-y-3">
      <div>
        <label
          htmlFor="client-id"
          className="mb-1.5 block text-xs text-zinc-400"
        >
          Application (client) ID
        </label>
        <input
          id="client-id"
          inputMode="numeric"
          autoComplete="off"
          placeholder="e.g. 1098765432109876543"
          value={clientId}
          onChange={(e) =>
            onClientId(e.target.value.replace(/\D/g, "").slice(0, 20))
          }
          className={`w-full rounded-lg border bg-black px-3 py-2 font-mono text-sm text-white placeholder:text-zinc-600 focus:outline-none ${
            clientId && !valid
              ? "border-amber-400/50"
              : "border-white/[0.1] focus:border-white/30"
          }`}
        />
        {clientId && !valid && (
          <p className="mt-1 text-xs text-amber-400">
            Client IDs are 17 to 20 digits.
          </p>
        )}
      </div>

      <fieldset>
        <legend className="mb-1.5 text-xs text-zinc-400">Scopes</legend>
        <div className="space-y-1.5">
          {SCOPES.map((s) => (
            <label
              key={s.id}
              className="flex cursor-pointer items-start gap-2.5 text-sm"
            >
              <input
                type="checkbox"
                className="mt-1 accent-white"
                checked={scopes.includes(s.id)}
                onChange={(e) =>
                  onScopes(
                    e.target.checked
                      ? [...scopes, s.id]
                      : scopes.filter((x) => x !== s.id),
                  )
                }
              />
              <span>
                <span className="font-mono text-zinc-100">{s.label}</span>
                <span className="block text-xs text-zinc-500">{s.hint}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="rounded-lg border border-white/[0.08] bg-black p-3">
        <code className="block break-all font-mono text-xs leading-relaxed text-zinc-300">
          {url}
        </code>
      </div>
      <div className="flex flex-wrap gap-2">
        <CopyButton value={url} label="Copy link" />
        {valid && scopes.length > 0 && (
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-md border border-white/[0.1] px-2 py-1 text-xs font-medium text-zinc-300 transition-colors hover:border-white/25 hover:bg-white/[0.05]"
          >
            Open invite <Icon name="external" className="h-3.5 w-3.5" />
          </a>
        )}
      </div>
      {!scopes.length && (
        <p className="text-xs text-amber-400">Pick at least one scope.</p>
      )}
      {!clientId && (
        <p className="text-xs text-zinc-500">
          Find it under General Information in the{" "}
          <a
            href="https://discord.com/developers/applications"
            target="_blank"
            rel="noopener noreferrer"
            className="text-zinc-300 underline underline-offset-2 hover:text-white"
          >
            Developer Portal
          </a>
          .
        </p>
      )}
    </div>
  );
}
