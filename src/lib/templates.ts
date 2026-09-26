import { encode } from "./permissions";

export interface TemplatePermission {
  key: string;
  reason: string;
  optional?: boolean;
}

export interface BotTemplate {
  slug: string;
  name: string;
  summary: string;
  description: string;
  permissions: TemplatePermission[];
  notNeeded: { key: string; reason: string }[];
  tips: string[];
}

export const TEMPLATES: BotTemplate[] = [
  {
    slug: "moderation",
    name: "Moderation bot",
    summary: "Kicks, bans, timeouts and message cleanup.",
    description:
      "The most permission-hungry common bot type, and still nowhere near Administrator. Every action is scoped by role hierarchy, so the bot can only act on members below its own role.",
    permissions: [
      { key: "VIEW_CHANNEL", reason: "See channels to moderate them" },
      { key: "SEND_MESSAGES", reason: "Post warnings and confirmations" },
      { key: "EMBED_LINKS", reason: "Send case and log embeds" },
      {
        key: "READ_MESSAGE_HISTORY",
        reason: "Look back at messages for context and purges",
      },
      {
        key: "MANAGE_MESSAGES",
        reason: "Delete rule-breaking messages and bulk purge",
      },
      { key: "KICK_MEMBERS", reason: "Kick members" },
      { key: "BAN_MEMBERS", reason: "Ban and unban members" },
      { key: "MODERATE_MEMBERS", reason: "Time members out" },
      {
        key: "VIEW_AUDIT_LOG",
        reason: "Attribute actions taken by human moderators",
        optional: true,
      },
    ],
    notNeeded: [
      {
        key: "ADMINISTRATOR",
        reason: "Every moderation action above has its own permission.",
      },
      {
        key: "MANAGE_GUILD",
        reason: "Moderation never changes server settings.",
      },
      {
        key: "MANAGE_ROLES",
        reason: "Timeouts replace the old 'muted role' approach.",
      },
    ],
    tips: [
      "Place the bot's role below your moderator roles so a compromised bot cannot act against staff.",
      "Use timeouts instead of a muted role; it removes the need for Manage Roles entirely.",
    ],
  },
  {
    slug: "music",
    name: "Music bot",
    summary: "Plays audio in voice channels.",
    description:
      "Music bots need voice access and a way to show what is playing. That is all.",
    permissions: [
      { key: "VIEW_CHANNEL", reason: "See voice and text channels" },
      { key: "CONNECT", reason: "Join voice channels" },
      { key: "SPEAK", reason: "Play audio" },
      { key: "SEND_MESSAGES", reason: "Post now-playing messages" },
      { key: "EMBED_LINKS", reason: "Rich now-playing embeds" },
      {
        key: "SET_VOICE_CHANNEL_STATUS",
        reason: "Show the current track on the channel",
        optional: true,
      },
      {
        key: "USE_EXTERNAL_EMOJIS",
        reason: "Branded control buttons",
        optional: true,
      },
    ],
    notNeeded: [
      {
        key: "ADMINISTRATOR",
        reason: "Playing audio needs Connect and Speak, nothing more.",
      },
      {
        key: "MOVE_MEMBERS",
        reason: "Only needed if the bot drags users between channels.",
      },
      { key: "MANAGE_CHANNELS", reason: "The bot joins existing channels." },
    ],
    tips: [
      "Slash command replies do not need Send Messages; only follow-up posts in channels do.",
    ],
  },
  {
    slug: "tickets",
    name: "Ticket bot",
    summary: "Private support channels or threads per request.",
    description:
      "Ticket bots create private spaces for support. Using private threads instead of channels removes the two most dangerous permissions from the list.",
    permissions: [
      {
        key: "VIEW_CHANNEL",
        reason: "See the ticket category and panel channel",
      },
      { key: "SEND_MESSAGES", reason: "Post the ticket panel and responses" },
      { key: "EMBED_LINKS", reason: "Ticket panel embeds" },
      { key: "ATTACH_FILES", reason: "Send transcripts" },
      { key: "READ_MESSAGE_HISTORY", reason: "Build transcripts" },
      { key: "MANAGE_CHANNELS", reason: "Create and delete ticket channels" },
      {
        key: "MANAGE_ROLES",
        reason:
          "Set channel overwrites so only the requester and staff can see a ticket",
      },
      { key: "PIN_MESSAGES", reason: "Pin the ticket summary", optional: true },
    ],
    notNeeded: [
      {
        key: "ADMINISTRATOR",
        reason:
          "Channel creation and overwrites cover everything a ticket needs.",
      },
      { key: "BAN_MEMBERS", reason: "Tickets never remove members." },
      { key: "MANAGE_MESSAGES", reason: "Pinning now has its own permission." },
    ],
    tips: [
      "Consider private threads (Create Private Threads) instead of channels. That drops Manage Channels and Manage Roles entirely.",
    ],
  },
  {
    slug: "welcome",
    name: "Welcome & autorole bot",
    summary: "Greets members and assigns a starter role.",
    description: "A welcome message plus an automatic role on join.",
    permissions: [
      { key: "VIEW_CHANNEL", reason: "See the welcome channel" },
      { key: "SEND_MESSAGES", reason: "Post welcome messages" },
      { key: "EMBED_LINKS", reason: "Welcome embeds" },
      { key: "ATTACH_FILES", reason: "Welcome banner images" },
      { key: "MANAGE_ROLES", reason: "Give new members their starter role" },
    ],
    notNeeded: [
      {
        key: "ADMINISTRATOR",
        reason: "Assigning one role needs Manage Roles only.",
      },
      {
        key: "MANAGE_GUILD",
        reason: "Welcome bots never change server settings.",
      },
      {
        key: "MENTION_EVERYONE",
        reason: "Pinging the new member does not need it.",
      },
    ],
    tips: ["Keep the bot's role directly above the autorole and nothing else."],
  },
  {
    slug: "reaction-roles",
    name: "Reaction & button roles",
    summary: "Members pick their own roles.",
    description:
      "Self-assignable roles from reactions, buttons or select menus.",
    permissions: [
      { key: "VIEW_CHANNEL", reason: "See the role menu channel" },
      { key: "SEND_MESSAGES", reason: "Post role menus" },
      { key: "EMBED_LINKS", reason: "Role menu embeds" },
      {
        key: "ADD_REACTIONS",
        reason: "Seed reactions on reaction-role menus",
        optional: true,
      },
      {
        key: "READ_MESSAGE_HISTORY",
        reason: "React to existing menu messages",
        optional: true,
      },
      { key: "MANAGE_ROLES", reason: "Add and remove the chosen roles" },
    ],
    notNeeded: [
      {
        key: "ADMINISTRATOR",
        reason: "Role assignment needs Manage Roles only.",
      },
      {
        key: "MANAGE_MESSAGES",
        reason: "Button and select menus need no reaction cleanup.",
      },
    ],
    tips: [
      "Buttons and select menus need no Add Reactions or Read Message History.",
    ],
  },
  {
    slug: "leveling",
    name: "Leveling / XP bot",
    summary: "Tracks activity and rewards roles.",
    description: "Counts messages, announces level-ups and gives reward roles.",
    permissions: [
      { key: "VIEW_CHANNEL", reason: "See messages to award XP" },
      { key: "SEND_MESSAGES", reason: "Announce level-ups" },
      { key: "EMBED_LINKS", reason: "Leaderboard embeds" },
      { key: "ATTACH_FILES", reason: "Rank card images" },
      {
        key: "MANAGE_ROLES",
        reason: "Grant level reward roles",
        optional: true,
      },
    ],
    notNeeded: [
      {
        key: "ADMINISTRATOR",
        reason:
          "Counting messages needs View Channels and the Message Content intent at most.",
      },
      {
        key: "READ_MESSAGE_HISTORY",
        reason: "XP counts new messages as they arrive.",
      },
    ],
    tips: [
      "XP tracking only needs the messages gateway intent. Message Content is only needed if you read the text.",
    ],
  },
  {
    slug: "logging",
    name: "Logging bot",
    summary: "Records edits, deletes and member changes.",
    description: "Posts server events to log channels.",
    permissions: [
      { key: "VIEW_CHANNEL", reason: "Observe channels to log them" },
      { key: "SEND_MESSAGES", reason: "Post to log channels" },
      { key: "EMBED_LINKS", reason: "Formatted log entries" },
      {
        key: "ATTACH_FILES",
        reason: "Re-upload deleted attachments",
        optional: true,
      },
      {
        key: "VIEW_AUDIT_LOG",
        reason: "See which moderator performed an action",
      },
      {
        key: "BYPASS_SLOWMODE",
        reason: "Keep posting in rate-limited log channels",
        optional: true,
      },
    ],
    notNeeded: [
      {
        key: "ADMINISTRATOR",
        reason: "Logging is read-only apart from its own log channel.",
      },
      { key: "MANAGE_MESSAGES", reason: "Logging never deletes anything." },
    ],
    tips: [
      "Create the log channel yourself and grant the bot access to it with a channel overwrite.",
    ],
  },
  {
    slug: "verification",
    name: "Verification bot",
    summary: "Gates new members behind a check.",
    description: "Captcha or button verification that grants a verified role.",
    permissions: [
      { key: "VIEW_CHANNEL", reason: "See the verification channel" },
      { key: "SEND_MESSAGES", reason: "Post the verification panel" },
      { key: "EMBED_LINKS", reason: "Panel embeds" },
      { key: "MANAGE_ROLES", reason: "Grant the verified role" },
      {
        key: "KICK_MEMBERS",
        reason: "Remove members who fail verification",
        optional: true,
      },
    ],
    notNeeded: [
      {
        key: "ADMINISTRATOR",
        reason: "Granting one role needs Manage Roles only.",
      },
      {
        key: "MANAGE_CHANNELS",
        reason: "Channel visibility is set once by the server owner.",
      },
    ],
    tips: [
      "Discord's built-in membership screening may remove the need for a bot entirely.",
    ],
  },
  {
    slug: "giveaways",
    name: "Giveaway bot",
    summary: "Hosts giveaways and picks winners.",
    description: "Button or reaction entries with automatic winner selection.",
    permissions: [
      { key: "VIEW_CHANNEL", reason: "See giveaway channels" },
      { key: "SEND_MESSAGES", reason: "Announce giveaways and winners" },
      { key: "EMBED_LINKS", reason: "Giveaway embeds" },
      {
        key: "ADD_REACTIONS",
        reason: "Add the entry reaction",
        optional: true,
      },
      {
        key: "READ_MESSAGE_HISTORY",
        reason: "Read reactions on older giveaways",
        optional: true,
      },
    ],
    notNeeded: [
      {
        key: "ADMINISTRATOR",
        reason: "Posting and editing its own messages needs nothing special.",
      },
      {
        key: "MENTION_EVERYONE",
        reason: "Pinging winners works without it; only @everyone needs it.",
      },
    ],
    tips: ["Use buttons for entries so the bot never needs to read reactions."],
  },
  {
    slug: "utility",
    name: "Utility / slash-command bot",
    summary: "Commands that reply to the user.",
    description:
      "Bots that only answer slash commands can often be invited with zero permissions, because interaction replies do not use channel permissions.",
    permissions: [
      {
        key: "VIEW_CHANNEL",
        reason: "Only if the bot posts outside interaction replies",
        optional: true,
      },
      {
        key: "SEND_MESSAGES",
        reason: "Only if the bot posts outside interaction replies",
        optional: true,
      },
      {
        key: "EMBED_LINKS",
        reason: "Only if the bot posts outside interaction replies",
        optional: true,
      },
    ],
    notNeeded: [
      {
        key: "ADMINISTRATOR",
        reason: "Replies to slash commands need no permissions at all.",
      },
      {
        key: "USE_APPLICATION_COMMANDS",
        reason: "That permission controls members, not your bot.",
      },
    ],
    tips: [
      "Invite with the applications.commands scope only if the app never needs a bot user.",
    ],
  },
];

export const TEMPLATE_BY_SLUG = new Map(TEMPLATES.map((t) => [t.slug, t]));

export function templateValue(
  template: BotTemplate,
  includeOptional = true,
): bigint {
  return encode(
    template.permissions
      .filter((perm) => includeOptional || !perm.optional)
      .map((perm) => perm.key),
  );
}
