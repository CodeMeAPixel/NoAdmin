import {
  BY_KEY,
  decode,
  flag,
  type Permission,
  type Risk,
} from "./permissions";
import { type BotTemplate, TEMPLATES, templateValue } from "./templates";

export type Verdict =
  | "none"
  | "minimal"
  | "reasonable"
  | "broad"
  | "excessive"
  | "administrator";

export interface Finding {
  level: "critical" | "warning" | "info" | "good";
  title: string;
  body: string;
}

export interface Analysis {
  value: bigint;
  permissions: Permission[];
  unknownBits: number[];
  byRisk: Record<Risk, Permission[]>;
  verdict: Verdict;
  score: number;
  findings: Finding[];
  closest: { template: BotTemplate; extra: Permission[] } | null;
}

export const VERDICT_COPY: Record<
  Verdict,
  {
    label: string;
    tone: "ok" | "warn" | "high" | "crit" | "muted";
    blurb: string;
  }
> = {
  none: {
    label: "No permissions",
    tone: "ok",
    blurb:
      "The bot is invited without any permissions. Great for slash-command-only bots.",
  },
  minimal: {
    label: "Minimal",
    tone: "ok",
    blurb:
      "Only low-risk permissions. This is what a well-scoped bot looks like.",
  },
  reasonable: {
    label: "Reasonable",
    tone: "ok",
    blurb:
      "A focused set with a few sensitive permissions. Make sure each one is used.",
  },
  broad: {
    label: "Broad",
    tone: "warn",
    blurb:
      "Several powerful permissions. Normal for moderation or setup bots, but make sure every one is used.",
  },
  excessive: {
    label: "Excessive",
    tone: "high",
    blurb:
      "More high-risk permissions than any common bot type needs. A leaked token would do serious damage.",
  },
  administrator: {
    label: "Administrator",
    tone: "crit",
    blurb: "Full, unrestricted control of every server this bot joins.",
  },
};

const has = (value: bigint, key: string) => {
  const perm = BY_KEY.get(key);
  return perm ? (value & flag(perm)) !== 0n : false;
};

export function analyze(value: bigint, scopes: string[] = []): Analysis {
  const { permissions, unknownBits } = decode(value);
  const byRisk: Record<Risk, Permission[]> = {
    low: [],
    medium: [],
    high: [],
    critical: [],
  };
  for (const perm of permissions) byRisk[perm.risk].push(perm);

  const score = byRisk.high.length * 3 + byRisk.medium.length;
  let verdict: Verdict;
  if (byRisk.critical.length) verdict = "administrator";
  else if (!permissions.length) verdict = "none";
  else if (score === 0) verdict = "minimal";
  else if (score <= 4) verdict = "reasonable";
  else if (score <= 12) verdict = "broad";
  else verdict = "excessive";

  const findings: Finding[] = [];
  const add = (level: Finding["level"], title: string, body: string) =>
    findings.push({ level, title, body });

  if (has(value, "ADMINISTRATOR")) {
    add(
      "critical",
      "Requests Administrator",
      `Administrator overrides every other permission and ignores all channel restrictions.${
        permissions.length > 1
          ? ` The other ${permissions.length - 1} permissions in this value are redundant while it is set.`
          : ""
      } Remove it and keep only what the bot uses.`,
    );
  }
  if (unknownBits.length) {
    add(
      "warning",
      "Unknown permission bits",
      `Bits ${unknownBits.join(", ")} are not defined by Discord. They are ignored, but usually mean the value was built by hand incorrectly.`,
    );
  }
  if (has(value, "MANAGE_GUILD")) {
    add(
      "warning",
      "Manage Server is rarely needed",
      "Reading server information needs no permission. Manage Server is only for changing server settings.",
    );
  }
  if (has(value, "MANAGE_WEBHOOKS") && has(value, "MENTION_EVERYONE")) {
    add(
      "warning",
      "Webhooks plus @everyone",
      "Together these let a compromised bot create webhooks that mass-ping the server with any name and avatar, and keep doing it after the bot is kicked.",
    );
  }
  if (has(value, "MANAGE_ROLES")) {
    add(
      "info",
      "Role position matters",
      "Manage Roles only affects roles below the bot's highest role. Server owners should keep the bot's role below moderator roles.",
    );
  }
  if (has(value, "MANAGE_MESSAGES") && !has(value, "ADMINISTRATOR")) {
    add(
      "info",
      "Only pinning?",
      "If Manage Messages is only used to pin, request Pin Messages instead.",
    );
  }
  if (has(value, "MANAGE_GUILD_EXPRESSIONS")) {
    add(
      "info",
      "Only uploading?",
      "Create Expressions lets a bot upload and manage its own emojis without touching anyone else's.",
    );
  }
  if (has(value, "MANAGE_EVENTS")) {
    add(
      "info",
      "Only creating events?",
      "Create Events lets a bot create and manage its own events without touching others.",
    );
  }
  if (has(value, "USE_APPLICATION_COMMANDS")) {
    add(
      "info",
      "Use Application Commands is for members",
      "Bots do not need it to register or answer slash commands. It controls whether members can use commands.",
    );
  }
  if (has(value, "USE_EXTERNAL_APPS")) {
    add(
      "info",
      "Use External Apps is for members",
      "It controls members' user-installed apps. Your bot does not need it.",
    );
  }
  if (
    (has(value, "SEND_MESSAGES") || has(value, "ADD_REACTIONS")) &&
    !has(value, "VIEW_CHANNEL") &&
    !has(value, "ADMINISTRATOR")
  ) {
    add(
      "warning",
      "Missing View Channels",
      "The bot cannot send messages or react in channels it cannot see.",
    );
  }
  const mfa = permissions.filter((perm) => perm.requires2fa);
  if (mfa.length && !has(value, "ADMINISTRATOR")) {
    add(
      "info",
      `${mfa.length} permission${mfa.length === 1 ? "" : "s"} affected by server 2FA`,
      `In servers that require 2FA for moderation, the bot owner's account needs 2FA enabled for ${mfa.map((m) => m.name).join(", ")} to work.`,
    );
  }
  if (scopes.length && !scopes.includes("bot") && value > 0n) {
    add(
      "warning",
      "Permissions without the bot scope",
      "Permissions are only granted when the invite includes the bot scope, so this value has no effect.",
    );
  }
  if (verdict === "minimal" || verdict === "none") {
    add(
      "good",
      "Least privilege",
      "Nothing here could seriously damage a server if the bot token leaked.",
    );
  }

  let closest: Analysis["closest"] = null;
  if (permissions.length && !byRisk.critical.length) {
    let best = -1;
    for (const template of TEMPLATES) {
      const tv = templateValue(template);
      const overlap = decode(value & tv).permissions.length;
      if (overlap > best) {
        best = overlap;
        closest = {
          template,
          extra: decode(value & ~tv).permissions.filter(
            (perm) => perm.risk !== "low",
          ),
        };
      }
    }
    if (best < 2) closest = null;
  }

  return {
    value,
    permissions,
    unknownBits,
    byRisk,
    verdict,
    score,
    findings,
    closest,
  };
}
