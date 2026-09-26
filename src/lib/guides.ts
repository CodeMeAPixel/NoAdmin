export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "code"; language: string; code: string }
  | {
      type: "callout";
      tone: "info" | "warn" | "danger" | "ok";
      title: string;
      text: string;
    }
  | {
      type: "hierarchy";
      rows: { name: string; note: string; tone: "top" | "bot" | "below" }[];
    };

export interface Guide {
  slug: string;
  title: string;
  summary: string;
  audience: "developers" | "server owners" | "everyone";
  minutes: number;
  body: Block[];
}

export const GUIDES: Guide[] = [
  {
    slug: "why-not-administrator",
    title: "Why your bot should not request Administrator",
    summary:
      "What Administrator actually grants, why it is dangerous, and what to do instead.",
    audience: "everyone",
    minutes: 4,
    body: [
      {
        type: "p",
        text: "Administrator is not just 'all the permissions'. It is a switch that turns every permission check off, including the channel-level restrictions server owners rely on to keep private channels private.",
      },
      { type: "h2", text: "What Administrator really grants" },
      {
        type: "list",
        items: [
          "Every current permission, including Manage Server, Manage Roles, Ban Members and Manage Webhooks.",
          "Every permission Discord adds in the future, automatically.",
          "Immunity from channel permission overwrites. A deny on #staff-only does nothing.",
        ],
      },
      {
        type: "callout",
        tone: "danger",
        title: "The real risk is your token",
        text: "Bot tokens leak through public repos, compromised hosting and malicious dependencies. With Administrator, a leaked token can wipe every server the bot is in. With scoped permissions, the damage stops at what those permissions allow.",
      },
      { type: "h2", text: "Why developers request it anyway" },
      {
        type: "list",
        items: [
          "To avoid 'Missing Permissions' errors while building. Handle those errors instead (see the guide on missing permissions).",
          "Because a template or tutorial did. Many copy-pasted invite links use permissions=8.",
          "To future-proof. New features should come with an explicit, visible permission request.",
        ],
      },
      { type: "h2", text: "What to do instead" },
      {
        type: "list",
        ordered: true,
        items: [
          "List the features your bot has and what each one does in the server.",
          "Map each feature to the specific permission it needs using the calculator or the bot examples.",
          "Invite with exactly that value and handle missing permissions gracefully in code.",
          "Document why each permission is needed so server owners can trust you.",
        ],
      },
      {
        type: "callout",
        tone: "ok",
        title: "It is good for growth, too",
        text: "Server owners increasingly check invite permissions before adding a bot, and bot lists review them. A small permission set is a trust signal.",
      },
    ],
  },
  {
    slug: "permission-bitfields",
    title: "How permission values work",
    summary:
      "Why permissions is a single number, how it is built, and why you must use 64-bit integers.",
    audience: "developers",
    minutes: 4,
    body: [
      {
        type: "p",
        text: "Discord represents a set of permissions as one integer. Each permission is a single bit, so its value is a power of two, and a set of permissions is those bits combined with bitwise OR.",
      },
      {
        type: "code",
        language: "text",
        code: "VIEW_CHANNEL   = 1 << 10 =  1024\nSEND_MESSAGES  = 1 << 11 =  2048\nEMBED_LINKS    = 1 << 14 = 16384\n\n1024 | 2048 | 16384 = 19456   → permissions=19456",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Use BigInt or 64-bit integers",
        text: "Permissions go past bit 31 (Timeout Members is bit 40, Pin Messages is bit 51). JavaScript's | and & operators truncate numbers to 32 bits, so they silently drop these. Use BigInt, or your library's permission class.",
      },
      {
        type: "code",
        language: "js",
        code: "// Wrong: truncates to 32 bits\n(1 << 40) | 1024 // → 1280\n\n// Right\n(1n << 40n) | 1024n // → 1099511628800n",
      },
      { type: "h2", text: "Checking a permission" },
      {
        type: "code",
        language: "js",
        code: "const has = (value, bit) => (BigInt(value) & (1n << BigInt(bit))) !== 0n;",
      },
      {
        type: "p",
        text: "The API returns permission values as strings for the same reason: they can exceed the safe integer range of some languages. Keep them as strings or BigInts end to end.",
      },
    ],
  },
  {
    slug: "channel-overwrites",
    title: "Channel overwrites and why Administrator ignores them",
    summary: "How Discord resolves a bot's effective permissions in a channel.",
    audience: "everyone",
    minutes: 3,
    body: [
      {
        type: "p",
        text: "A bot's effective permissions in a channel are calculated in layers. Server owners use the later layers to keep bots out of places they should not be.",
      },
      {
        type: "list",
        ordered: true,
        items: [
          "Start with the permissions of @everyone plus every role the bot has.",
          "If the result includes Administrator, stop: the bot has everything, everywhere.",
          "Apply the channel's @everyone overwrite (deny, then allow).",
          "Apply role overwrites for the bot's roles (all denies, then all allows).",
          "Apply a member overwrite for the bot itself, if any.",
        ],
      },
      {
        type: "callout",
        tone: "danger",
        title: "Step 2 is the problem",
        text: "Because Administrator is checked before overwrites, a server owner cannot hide #staff-chat or #tickets from a bot that has it.",
      },
      { type: "h2", text: "For server owners" },
      {
        type: "p",
        text: "If you must add a bot that asks for Administrator, uncheck it on the invite screen and grant the permissions it actually uses instead. If the bot breaks, ask the developer which permission is missing.",
      },
    ],
  },
  {
    slug: "role-hierarchy",
    title: "Role hierarchy for bots",
    summary:
      "Where to place your bot's role and why it matters as much as the permissions.",
    audience: "server owners",
    minutes: 3,
    body: [
      {
        type: "p",
        text: "Kick, Ban, Timeout, Manage Nicknames and Manage Roles only work on members and roles below the bot's highest role. The role position is a second safety limit on top of the permissions.",
      },
      {
        type: "hierarchy",
        rows: [
          { name: "@Admin", note: "Bot cannot affect", tone: "top" },
          { name: "@Moderator", note: "Bot cannot affect", tone: "top" },
          { name: "@YourBot", note: "Bot's highest role", tone: "bot" },
          { name: "@Level 10", note: "Bot can assign", tone: "below" },
          { name: "@Member", note: "Bot can manage", tone: "below" },
        ],
      },
      {
        type: "list",
        items: [
          "Place bots directly above the roles they manage and below every staff role.",
          "A bot can never grant a role above its own, or a permission it does not have.",
          "When you move a bot's role, move it only as high as its job requires.",
        ],
      },
    ],
  },
  {
    slug: "intents-vs-permissions",
    title: "Gateway intents are not permissions",
    summary: "Two separate systems that are often confused.",
    audience: "developers",
    minutes: 3,
    body: [
      {
        type: "p",
        text: "Intents decide which events Discord sends to your bot over the gateway. Permissions decide what your bot is allowed to do in a server. Neither one grants the other.",
      },
      {
        type: "list",
        items: [
          "Not receiving messages? That is usually the Message Content or Guild Messages intent, not a permission.",
          "Getting 'Missing Access' or 'Missing Permissions' (50001 / 50013)? That is a permission or overwrite.",
          "Privileged intents (Presence, Server Members, Message Content) are enabled in the Developer Portal, and need approval once a bot is in 100+ servers.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Administrator does not fix intents",
        text: "A common mistake is adding Administrator to 'fix' a bot that is not receiving events. It changes nothing about the events you receive.",
      },
    ],
  },
  {
    slug: "slash-command-permissions",
    title: "Slash commands and default_member_permissions",
    summary:
      "Control who can use a command without giving your bot anything extra.",
    audience: "developers",
    minutes: 3,
    body: [
      {
        type: "p",
        text: "Replying to a slash command does not need any channel permission. That means many utility bots can be invited with permissions=0 and still work.",
      },
      {
        type: "p",
        text: "To restrict who can use a command, set default_member_permissions when you register it. Only members with those permissions see the command by default, and server admins can adjust it under Integrations.",
      },
      {
        type: "code",
        language: "json",
        code: '{\n  "name": "ban",\n  "description": "Ban a member",\n  "default_member_permissions": "4"\n}',
      },
      {
        type: "callout",
        tone: "warn",
        title: "Still check permissions in your handler",
        text: "default_member_permissions is a default that admins can override. For destructive commands, also check the invoking member's permissions in code.",
      },
    ],
  },
  {
    slug: "missing-permissions",
    title: "Handling missing permissions gracefully",
    summary: "The code-side half of least privilege.",
    audience: "developers",
    minutes: 3,
    body: [
      {
        type: "p",
        text: "The main reason developers reach for Administrator is to avoid errors. The better fix is to check first and tell the user what is missing.",
      },
      {
        type: "code",
        language: "js",
        code: 'const me = interaction.guild.members.me;\nconst perms = interaction.channel.permissionsFor(me);\n\nif (!perms.has(PermissionFlagsBits.ManageMessages)) {\n  return interaction.reply({\n    content: "I need **Manage Messages** in this channel to do that.",\n    flags: MessageFlags.Ephemeral,\n  });\n}',
      },
      {
        type: "list",
        items: [
          "Check effective permissions for the specific channel, not just server-wide roles.",
          "Name the missing permission in the error so server owners can fix it themselves.",
          "Catch error codes 50001 (Missing Access) and 50013 (Missing Permissions) as a fallback.",
        ],
      },
    ],
  },
  {
    slug: "reviewing-a-bot",
    title: "Checking a bot before you add it",
    summary: "A five-minute review for server owners.",
    audience: "server owners",
    minutes: 3,
    body: [
      {
        type: "list",
        ordered: true,
        items: [
          "Paste the invite link into the NoAdmin analyzer and read the verdict.",
          "If it requests Administrator, uncheck it on Discord's invite screen. The bot will be invited without it.",
          "Compare the permissions with what the bot claims to do. A music bot has no reason to Ban Members.",
          "After inviting, move the bot's role below your staff roles.",
          "Deny the bot access to private channels with overwrites. This only works without Administrator.",
        ],
      },
      {
        type: "callout",
        tone: "info",
        title: "Unchecking permissions is safe",
        text: "Discord lets you remove any permission on the invite screen. A well-built bot will tell you if a feature needs something it does not have.",
      },
    ],
  },
];

export const GUIDE_BY_SLUG = new Map(GUIDES.map((g) => [g.slug, g]));
