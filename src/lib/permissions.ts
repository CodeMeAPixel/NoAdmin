export type Risk = "low" | "medium" | "high" | "critical";
export type Category =
  | "general"
  | "membership"
  | "text"
  | "voice"
  | "apps"
  | "events"
  | "advanced";
export type ChannelType = "text" | "voice" | "stage";

export interface Permission {
  key: string;
  slug: string;
  name: string;
  bit: number;
  summary: string;
  detail: string;
  abuse?: string;
  alternative?: string;
  risk: Risk;
  category: Category;
  channels: ChannelType[];
  requires2fa: boolean;
}

export const CATALOG_VERIFIED = "2026-09-26";
export const DISCORD_DOCS_URL =
  "https://docs.discord.com/developers/topics/permissions";

const T: ChannelType = "text";
const V: ChannelType = "voice";
const S: ChannelType = "stage";

function p(
  key: string,
  name: string,
  bit: number,
  risk: Risk,
  category: Category,
  channels: ChannelType[],
  requires2fa: boolean,
  summary: string,
  detail: string,
  extra: { abuse?: string; alternative?: string } = {},
): Permission {
  return {
    key,
    slug: key.toLowerCase().replaceAll("_", "-"),
    name,
    bit,
    risk,
    category,
    channels,
    requires2fa,
    summary,
    detail,
    ...extra,
  };
}

export const PERMISSIONS: Permission[] = [
  p(
    "CREATE_INSTANT_INVITE",
    "Create Invite",
    0,
    "low",
    "membership",
    [T, V, S],
    false,
    "Allows creation of instant invites.",
    "Lets the bot generate invite links to the server. Rarely needed unless the bot posts invites for users.",
    {
      abuse:
        "A compromised bot could generate invites and leak them publicly, letting unwanted users join.",
    },
  ),
  p(
    "KICK_MEMBERS",
    "Kick Members",
    1,
    "high",
    "membership",
    [],
    true,
    "Allows kicking members.",
    "Lets the bot remove members from the server. They can rejoin with a new invite. Only members whose highest role is below the bot's highest role can be kicked.",
    {
      abuse:
        "A leaked token can be used to kick every member below the bot's role in seconds.",
    },
  ),
  p(
    "BAN_MEMBERS",
    "Ban Members",
    2,
    "high",
    "membership",
    [],
    true,
    "Allows banning members.",
    "Lets the bot ban members and delete their recent messages. Bans persist until manually removed. Role hierarchy still applies.",
    {
      abuse:
        "A leaked token can mass-ban the community, and bans must be undone one by one.",
    },
  ),
  p(
    "ADMINISTRATOR",
    "Administrator",
    3,
    "critical",
    "advanced",
    [],
    true,
    "Allows all permissions and bypasses channel permission overwrites.",
    "Grants every permission, including ones added to Discord in the future, and ignores every channel-level deny a server owner sets. There is no way for a server to restrict a bot that holds it.",
    {
      abuse:
        "Full takeover: delete channels, ban members, create webhooks for phishing, change server settings, grant roles. Nothing in the server can stop it.",
      alternative:
        "Request the specific permissions your features use. The calculator and bot examples show how.",
    },
  ),
  p(
    "MANAGE_CHANNELS",
    "Manage Channels",
    4,
    "high",
    "general",
    [T, V, S],
    true,
    "Allows management and editing of channels.",
    "Lets the bot create, edit and delete channels and categories. Needed for ticket, temp-voice and setup bots.",
    {
      abuse:
        "A leaked token can delete every channel, wiping message history permanently.",
    },
  ),
  p(
    "MANAGE_GUILD",
    "Manage Server",
    5,
    "high",
    "general",
    [],
    true,
    "Allows management and editing of the guild.",
    "Lets the bot change the server name, icon, region, verification level, AutoMod rules and more. Almost no bot needs this.",
    {
      abuse:
        "A leaked token can rename the server, disable verification, and rewrite or remove AutoMod rules.",
      alternative:
        "Most bots that ask for this only read settings. Reading guild data needs no permission at all.",
    },
  ),
  p(
    "ADD_REACTIONS",
    "Add Reactions",
    6,
    "low",
    "text",
    [T, V, S],
    false,
    "Allows for adding new reactions to messages.",
    "Lets the bot add new reactions to messages, for example to seed a poll or a reaction-role menu.",
  ),
  p(
    "VIEW_AUDIT_LOG",
    "View Audit Log",
    7,
    "medium",
    "general",
    [],
    false,
    "Allows for viewing of audit logs.",
    "Lets the bot read the server audit log to see who did what. Used by logging and anti-nuke bots.",
    {
      abuse:
        "Exposes moderator actions and reasons, which may contain private information.",
    },
  ),
  p(
    "PRIORITY_SPEAKER",
    "Priority Speaker",
    8,
    "low",
    "voice",
    [V],
    false,
    "Allows for using priority speaker in a voice channel.",
    "Lets the bot lower other speakers' volume while it talks. Almost never needed by bots.",
  ),
  p(
    "STREAM",
    "Video",
    9,
    "low",
    "voice",
    [V, S],
    false,
    "Allows the user to go live.",
    "Lets the bot share video or go live in a voice channel. Bots generally cannot use this.",
  ),
  p(
    "VIEW_CHANNEL",
    "View Channels",
    10,
    "low",
    "general",
    [T, V, S],
    false,
    "Allows guild members to view a channel.",
    "Lets the bot see channels. Almost every bot needs this, and server owners can still hide specific channels with overwrites.",
  ),
  p(
    "SEND_MESSAGES",
    "Send Messages",
    11,
    "low",
    "text",
    [T, V, S],
    false,
    "Allows for sending messages in a channel and creating threads.",
    "Lets the bot post messages. Note that replying to slash commands does not need this permission.",
  ),
  p(
    "SEND_TTS_MESSAGES",
    "Send Text-to-Speech Messages",
    12,
    "low",
    "text",
    [T, V, S],
    false,
    "Allows for sending of /tts messages.",
    "Lets the bot send messages read aloud to people viewing the channel. Rarely useful and often annoying.",
  ),
  p(
    "MANAGE_MESSAGES",
    "Manage Messages",
    13,
    "medium",
    "text",
    [T, V, S],
    true,
    "Allows for deletion of other users messages.",
    "Lets the bot delete other people's messages and remove their reactions. Used by moderation and auto-mod bots.",
    {
      abuse:
        "A leaked token can bulk-delete messages across every channel it can see.",
      alternative:
        "If you only need to pin messages, request Pin Messages instead.",
    },
  ),
  p(
    "EMBED_LINKS",
    "Embed Links",
    14,
    "low",
    "text",
    [T, V, S],
    false,
    "Links sent by users with this permission will be auto-embedded.",
    "Lets links the bot posts show a preview, and is required for bots that send rich embeds.",
  ),
  p(
    "ATTACH_FILES",
    "Attach Files",
    15,
    "low",
    "text",
    [T, V, S],
    false,
    "Allows for uploading images and files.",
    "Lets the bot upload images and files, such as rank cards or generated images.",
  ),
  p(
    "READ_MESSAGE_HISTORY",
    "Read Message History",
    16,
    "low",
    "text",
    [T, V, S],
    false,
    "Allows for reading of message history.",
    "Lets the bot fetch messages sent before it was looking. Needed to edit or react to older messages.",
  ),
  p(
    "MENTION_EVERYONE",
    "Mention @everyone, @here, and All Roles",
    17,
    "medium",
    "text",
    [T, V, S],
    false,
    "Allows for using the @everyone tag to notify all users.",
    "Lets the bot ping @everyone, @here and roles that are not normally mentionable.",
    {
      abuse:
        "A leaked token can mass-ping the whole server with scam or phishing links.",
    },
  ),
  p(
    "USE_EXTERNAL_EMOJIS",
    "Use External Emoji",
    18,
    "low",
    "text",
    [T, V, S],
    false,
    "Allows the usage of custom emojis from other servers.",
    "Lets the bot use emojis from its own servers, commonly used for branded buttons and reactions.",
  ),
  p(
    "VIEW_GUILD_INSIGHTS",
    "View Server Insights",
    19,
    "medium",
    "general",
    [],
    false,
    "Allows for viewing guild insights.",
    "Lets the bot read server analytics such as growth and engagement. Rarely needed.",
    {
      abuse:
        "Exposes server growth and activity data the owner may consider private.",
    },
  ),
  p(
    "CONNECT",
    "Connect",
    20,
    "low",
    "voice",
    [V, S],
    false,
    "Allows for joining of a voice channel.",
    "Lets the bot join voice channels. Required for music and voice bots.",
  ),
  p(
    "SPEAK",
    "Speak",
    21,
    "low",
    "voice",
    [V],
    false,
    "Allows for speaking in a voice channel.",
    "Lets the bot transmit audio in voice channels.",
  ),
  p(
    "MUTE_MEMBERS",
    "Mute Members",
    22,
    "medium",
    "voice",
    [V, S],
    false,
    "Allows for muting members in a voice channel.",
    "Lets the bot server-mute people in voice channels.",
    { abuse: "A leaked token can server-mute everyone in voice." },
  ),
  p(
    "DEAFEN_MEMBERS",
    "Deafen Members",
    23,
    "medium",
    "voice",
    [V],
    false,
    "Allows for deafening of members in a voice channel.",
    "Lets the bot server-deafen people in voice channels.",
    { abuse: "A leaked token can server-deafen everyone in voice." },
  ),
  p(
    "MOVE_MEMBERS",
    "Move Members",
    24,
    "medium",
    "voice",
    [V, S],
    false,
    "Allows for moving of members between voice channels.",
    "Lets the bot move or disconnect people from voice channels. Used by temp-voice bots.",
    { abuse: "A leaked token can repeatedly disconnect people from voice." },
  ),
  p(
    "USE_VAD",
    "Use Voice Activity",
    25,
    "low",
    "voice",
    [V],
    false,
    "Allows for using voice-activity-detection in a voice channel.",
    "Lets the bot speak without push-to-talk. Bots usually do not need this.",
  ),
  p(
    "CHANGE_NICKNAME",
    "Change Nickname",
    26,
    "low",
    "membership",
    [],
    false,
    "Allows for modification of own nickname.",
    "Lets the bot change its own nickname in the server.",
  ),
  p(
    "MANAGE_NICKNAMES",
    "Manage Nicknames",
    27,
    "medium",
    "membership",
    [],
    false,
    "Allows for modification of other users nicknames.",
    "Lets the bot change other members' nicknames, for example to strip hoisting characters.",
    {
      abuse:
        "A leaked token can rename members to offensive or impersonating names.",
    },
  ),
  p(
    "MANAGE_ROLES",
    "Manage Roles",
    28,
    "high",
    "general",
    [T, V, S],
    true,
    "Allows management and editing of roles.",
    "Lets the bot create, edit, assign and delete roles below its own highest role, and edit channel permission overwrites. Used by reaction-role, verification and leveling bots.",
    {
      abuse:
        "A leaked token can hand out any role below the bot's, including moderator roles, and edit channel overwrites to expose private channels.",
      alternative:
        "Keep the bot's role just above the roles it manages, never above moderator roles.",
    },
  ),
  p(
    "MANAGE_WEBHOOKS",
    "Manage Webhooks",
    29,
    "high",
    "general",
    [T, V, S],
    true,
    "Allows management and editing of webhooks.",
    "Lets the bot create, edit and delete webhooks. Used by bots that post with custom names and avatars.",
    {
      abuse:
        "A leaked token can create webhooks that keep posting phishing messages under any name, even after the bot is removed.",
    },
  ),
  p(
    "MANAGE_GUILD_EXPRESSIONS",
    "Manage Expressions",
    30,
    "medium",
    "general",
    [],
    true,
    "Allows for editing and deleting emojis, stickers, and soundboard sounds.",
    "Lets the bot edit and delete any emoji, sticker or soundboard sound in the server.",
    {
      abuse: "A leaked token can delete every custom emoji and sticker.",
      alternative:
        "If the bot only uploads new expressions, request Create Expressions instead.",
    },
  ),
  p(
    "USE_APPLICATION_COMMANDS",
    "Use Application Commands",
    31,
    "low",
    "apps",
    [T, V, S],
    false,
    "Allows members to use application commands.",
    "Controls whether members can use slash commands. Your bot does not need it to register or respond to commands; that is what the applications.commands scope is for.",
  ),
  p(
    "REQUEST_TO_SPEAK",
    "Request to Speak",
    32,
    "low",
    "voice",
    [S],
    false,
    "Allows for requesting to speak in stage channels.",
    "Lets the bot request to speak in a stage channel.",
  ),
  p(
    "MANAGE_EVENTS",
    "Manage Events",
    33,
    "medium",
    "events",
    [V, S],
    false,
    "Allows for editing and deleting scheduled events.",
    "Lets the bot edit and cancel any scheduled event in the server.",
    {
      abuse: "A leaked token can cancel or rewrite every scheduled event.",
      alternative:
        "If the bot only creates its own events, request Create Events instead.",
    },
  ),
  p(
    "MANAGE_THREADS",
    "Manage Threads",
    34,
    "medium",
    "text",
    [T],
    true,
    "Allows for deleting and archiving threads.",
    "Lets the bot rename, archive, lock and delete threads, and view private threads.",
    {
      abuse:
        "A leaked token can delete threads and read private threads it was never added to.",
    },
  ),
  p(
    "CREATE_PUBLIC_THREADS",
    "Create Public Threads",
    35,
    "low",
    "text",
    [T],
    false,
    "Allows for creating public and announcement threads.",
    "Lets the bot start public threads, for example for support questions or suggestions.",
  ),
  p(
    "CREATE_PRIVATE_THREADS",
    "Create Private Threads",
    36,
    "low",
    "text",
    [T],
    false,
    "Allows for creating private threads.",
    "Lets the bot start invite-only threads. A lightweight alternative to creating ticket channels.",
  ),
  p(
    "USE_EXTERNAL_STICKERS",
    "Use External Stickers",
    37,
    "low",
    "text",
    [T, V, S],
    false,
    "Allows the usage of custom stickers from other servers.",
    "Lets the bot send stickers from other servers.",
  ),
  p(
    "SEND_MESSAGES_IN_THREADS",
    "Send Messages in Threads",
    38,
    "low",
    "text",
    [T],
    false,
    "Allows for sending messages in threads.",
    "Lets the bot post inside threads. Needed separately from Send Messages.",
  ),
  p(
    "USE_EMBEDDED_ACTIVITIES",
    "Use Activities",
    39,
    "low",
    "apps",
    [T, V],
    false,
    "Allows for using Activities.",
    "Lets the bot launch Activities in voice channels.",
  ),
  p(
    "MODERATE_MEMBERS",
    "Timeout Members",
    40,
    "high",
    "membership",
    [],
    false,
    "Allows for timing out users to prevent messaging and speaking.",
    "Lets the bot time out members below its highest role. Timed-out members lose all permissions except View Channels and Read Message History.",
    {
      abuse:
        "A leaked token can time out every member below the bot's role for up to 28 days.",
    },
  ),
  p(
    "VIEW_CREATOR_MONETIZATION_ANALYTICS",
    "View Creator Monetization Analytics",
    41,
    "medium",
    "general",
    [],
    true,
    "Allows for viewing role subscription insights.",
    "Lets the bot read role subscription revenue data. Bots almost never need this.",
    { abuse: "Exposes the server owner's subscription revenue figures." },
  ),
  p(
    "USE_SOUNDBOARD",
    "Use Soundboard",
    42,
    "low",
    "voice",
    [V],
    false,
    "Allows for using soundboard in a voice channel.",
    "Lets the bot play soundboard sounds in voice channels.",
  ),
  p(
    "CREATE_GUILD_EXPRESSIONS",
    "Create Expressions",
    43,
    "low",
    "general",
    [],
    false,
    "Allows for creating emojis, stickers, and soundboard sounds.",
    "Lets the bot upload new emojis, stickers and sounds, and edit or delete only the ones it created.",
  ),
  p(
    "CREATE_EVENTS",
    "Create Events",
    44,
    "low",
    "events",
    [V, S],
    false,
    "Allows for creating scheduled events.",
    "Lets the bot create scheduled events, and edit or delete only the ones it created.",
  ),
  p(
    "USE_EXTERNAL_SOUNDS",
    "Use External Sounds",
    45,
    "low",
    "voice",
    [V],
    false,
    "Allows the usage of custom soundboard sounds from other servers.",
    "Lets the bot play soundboard sounds from other servers.",
  ),
  p(
    "SEND_VOICE_MESSAGES",
    "Send Voice Messages",
    46,
    "low",
    "text",
    [T, V, S],
    false,
    "Allows sending voice messages.",
    "Lets the bot send voice messages.",
  ),
  p(
    "SET_VOICE_CHANNEL_STATUS",
    "Set Voice Channel Status",
    48,
    "low",
    "voice",
    [V],
    false,
    "Allows setting voice channel status.",
    "Lets the bot set the status text shown on a voice channel, such as the currently playing song.",
  ),
  p(
    "SEND_POLLS",
    "Create Polls",
    49,
    "low",
    "text",
    [T, V, S],
    false,
    "Allows sending polls.",
    "Lets the bot send native Discord polls.",
  ),
  p(
    "USE_EXTERNAL_APPS",
    "Use External Apps",
    50,
    "low",
    "apps",
    [T, V, S],
    false,
    "Allows user-installed apps to send public responses.",
    "Controls whether members' user-installed apps can post public responses. Bots do not need it.",
  ),
  p(
    "PIN_MESSAGES",
    "Pin Messages",
    51,
    "low",
    "text",
    [T],
    false,
    "Allows pinning and unpinning messages.",
    "Lets the bot pin and unpin messages. Previously part of Manage Messages, now requestable on its own.",
  ),
  p(
    "BYPASS_SLOWMODE",
    "Bypass Slowmode",
    52,
    "low",
    "text",
    [T, V, S],
    false,
    "Allows bypassing slowmode restrictions.",
    "Lets the bot ignore slowmode. Useful for bots that post logs or responses in rate-limited channels.",
  ),
];

export const CATEGORIES: { id: Category; name: string }[] = [
  { id: "general", name: "General server" },
  { id: "membership", name: "Membership" },
  { id: "text", name: "Text channels" },
  { id: "voice", name: "Voice & stage" },
  { id: "events", name: "Events" },
  { id: "apps", name: "Apps" },
  { id: "advanced", name: "Advanced" },
];

export const RISK_ORDER: Risk[] = ["low", "medium", "high", "critical"];

export const BY_KEY = new Map(PERMISSIONS.map((perm) => [perm.key, perm]));
export const BY_SLUG = new Map(PERMISSIONS.map((perm) => [perm.slug, perm]));

export const ALL_BITS = PERMISSIONS.reduce((acc, perm) => acc | flag(perm), 0n);

export function flag(perm: Permission): bigint {
  return 1n << BigInt(perm.bit);
}

export function encode(keys: Iterable<string>): bigint {
  let value = 0n;
  for (const key of keys) {
    const perm = BY_KEY.get(key);
    if (perm) value |= flag(perm);
  }
  return value;
}

export function decode(value: bigint): {
  permissions: Permission[];
  unknownBits: number[];
} {
  const permissions = PERMISSIONS.filter((perm) => (value & flag(perm)) !== 0n);
  const unknownBits: number[] = [];
  let rest = value & ~ALL_BITS;
  let bit = 0;
  while (rest > 0n) {
    if (rest & 1n) unknownBits.push(bit);
    rest >>= 1n;
    bit++;
  }
  return { permissions, unknownBits };
}

export function hex(value: bigint): string {
  return `0x${value.toString(16).toUpperCase()}`;
}

export function permission(key: string): Permission {
  const perm = BY_KEY.get(key);
  if (!perm) throw new Error(`Unknown permission ${key}`);
  return perm;
}

export interface ParsedInput {
  value: bigint | null;
  clientId: string | null;
  scopes: string[];
  source: "integer" | "url" | "empty";
  error: string | null;
}

const MAX_PERMISSION = (1n << 64n) - 1n;

export function parsePermissionInput(raw: string): ParsedInput {
  const input = raw.trim();
  const base = { value: null, clientId: null, scopes: [] as string[] };
  if (!input) return { ...base, source: "empty", error: null };

  if (/^\d+$/.test(input)) {
    const value = BigInt(input);
    if (value > MAX_PERMISSION)
      return {
        ...base,
        source: "integer",
        error: "That number is larger than any Discord permission value.",
      };
    return { ...base, value, source: "integer", error: null };
  }
  if (/^0x[0-9a-f]+$/i.test(input)) {
    return { ...base, value: BigInt(input), source: "integer", error: null };
  }

  let url: URL;
  try {
    url = new URL(input.includes("://") ? input : `https://${input}`);
  } catch {
    return {
      ...base,
      source: "url",
      error: "Enter a permission number or a bot invite link.",
    };
  }

  const host = url.hostname.replace(/^(www|canary|ptb)\./, "");
  if (
    !["discord.com", "discordapp.com"].includes(host) ||
    !url.pathname.includes("oauth2/authorize")
  ) {
    return {
      ...base,
      source: "url",
      error:
        "That doesn't look like a Discord bot invite link (discord.com/oauth2/authorize).",
    };
  }

  const clientId = url.searchParams.get("client_id");
  const scopes = (url.searchParams.get("scope") ?? "")
    .split(/[\s+]+/)
    .filter(Boolean);
  const perms = url.searchParams.get("permissions");
  if (perms === null) {
    return {
      value: 0n,
      clientId,
      scopes,
      source: "url",
      error: null,
    };
  }
  if (!/^\d+$/.test(perms)) {
    return {
      value: null,
      clientId,
      scopes,
      source: "url",
      error: "The invite link has an invalid permissions value.",
    };
  }
  return { value: BigInt(perms), clientId, scopes, source: "url", error: null };
}

export function buildInviteUrl(opts: {
  clientId: string;
  value: bigint;
  scopes: string[];
}): string {
  const params = new URLSearchParams();
  params.set("client_id", opts.clientId || "YOUR_CLIENT_ID");
  if (opts.scopes.includes("bot"))
    params.set("permissions", opts.value.toString());
  params.set("integration_type", "0");
  params.set("scope", opts.scopes.join(" "));
  return `https://discord.com/oauth2/authorize?${params.toString().replaceAll("%20", "+")}`;
}

export const CLIENT_ID_PATTERN = /^\d{17,20}$/;
