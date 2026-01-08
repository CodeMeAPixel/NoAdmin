/**
 * Discord bot permissions and features mapping
 * Accurate as of 2024 Discord API
 */

export interface Permission {
  id: string;
  name: string;
  description: string;
  value: number;
  dangerous?: boolean;
}

export interface BotFeature {
  title: string;
  description: string;
  requiredPermissions: string[];
  riskLevel: 'safe' | 'moderate' | 'risky';
}

export const DISCORD_PERMISSIONS: Permission[] = [
  {
    id: 'create_instant_invite',
    name: 'Create Invite',
    description: 'Create instant invites to channels',
    value: 0x00000001,
  },
  {
    id: 'kick_members',
    name: 'Kick Members',
    description: 'Remove members from the server',
    value: 0x00000002,
    dangerous: true,
  },
  {
    id: 'ban_members',
    name: 'Ban Members',
    description: 'Permanently remove members from the server',
    value: 0x00000004,
    dangerous: true,
  },
  {
    id: 'administrator',
    name: 'Administrator',
    description:
      'Grants all permissions and bypasses all channel-specific permissions. Extremely dangerous.',
    value: 0x00000008,
    dangerous: true,
  },
  {
    id: 'manage_channels',
    name: 'Manage Channels',
    description: 'Create, delete, or edit channels',
    value: 0x00000010,
    dangerous: true,
  },
  {
    id: 'manage_guild',
    name: 'Manage Server',
    description: 'Edit server settings, name, icon, etc.',
    value: 0x00000020,
    dangerous: true,
  },
  {
    id: 'add_reactions',
    name: 'Add Reactions',
    description: 'React to messages with emojis',
    value: 0x00000040,
  },
  {
    id: 'view_audit_log',
    name: 'View Audit Log',
    description: 'View the server audit log',
    value: 0x00000080,
    dangerous: true,
  },
  {
    id: 'priority_speaker',
    name: 'Priority Speaker',
    description: 'Be prioritized in voice channels',
    value: 0x00000100,
  },
  {
    id: 'stream',
    name: 'Stream',
    description: 'Share video/screen in voice channels',
    value: 0x00000200,
  },
  {
    id: 'view_channel',
    name: 'View Channels',
    description: 'View channels',
    value: 0x00000400,
  },
  {
    id: 'send_messages',
    name: 'Send Messages',
    description: 'Send messages in text channels',
    value: 0x00000800,
  },
  {
    id: 'send_tts_messages',
    name: 'Send TTS Messages',
    description: 'Send text-to-speech messages',
    value: 0x00001000,
  },
  {
    id: 'manage_messages',
    name: 'Manage Messages',
    description: 'Delete or edit other users\' messages',
    value: 0x00002000,
    dangerous: true,
  },
  {
    id: 'embed_links',
    name: 'Embed Links',
    description: 'Send embedded content',
    value: 0x00004000,
  },
  {
    id: 'attach_files',
    name: 'Attach Files',
    description: 'Upload files and media',
    value: 0x00008000,
  },
  {
    id: 'read_message_history',
    name: 'Read Message History',
    description: 'Read past messages in channels',
    value: 0x00010000,
  },
  {
    id: 'mention_everyone',
    name: 'Mention Everyone',
    description: 'Use @everyone and @here',
    value: 0x00020000,
    dangerous: true,
  },
  {
    id: 'use_external_emojis',
    name: 'Use External Emojis',
    description: 'Use custom emojis from other servers',
    value: 0x00040000,
  },
  {
    id: 'view_guild_insights',
    name: 'View Server Analytics',
    description: 'View server insights and analytics',
    value: 0x00080000,
    dangerous: true,
  },
  {
    id: 'connect',
    name: 'Connect to Voice',
    description: 'Connect to voice channels',
    value: 0x00100000,
  },
  {
    id: 'speak',
    name: 'Speak in Voice',
    description: 'Speak in voice channels',
    value: 0x00200000,
  },
  {
    id: 'mute_members',
    name: 'Mute Members',
    description: 'Mute members in voice channels',
    value: 0x00400000,
    dangerous: true,
  },
  {
    id: 'deafen_members',
    name: 'Deafen Members',
    description: 'Deafen members in voice channels',
    value: 0x00800000,
    dangerous: true,
  },
  {
    id: 'move_members',
    name: 'Move Members',
    description: 'Move members between voice channels',
    value: 0x01000000,
  },
  {
    id: 'use_voice_activation',
    name: 'Use Voice Activity',
    description: 'Use voice activity detection',
    value: 0x02000000,
  },
  {
    id: 'change_nickname',
    name: 'Change Nickname',
    description: 'Change own nickname',
    value: 0x04000000,
  },
  {
    id: 'manage_nicknames',
    name: 'Manage Nicknames',
    description: 'Change other users\' nicknames',
    value: 0x08000000,
    dangerous: true,
  },
  {
    id: 'manage_roles',
    name: 'Manage Roles',
    description: 'Create and modify roles',
    value: 0x10000000,
    dangerous: true,
  },
  {
    id: 'manage_webhooks',
    name: 'Manage Webhooks',
    description: 'Create and modify webhooks',
    value: 0x20000000,
    dangerous: true,
  },
  {
    id: 'manage_guild_expressions',
    name: 'Manage Emojis & Stickers',
    description: 'Create and modify custom emojis and stickers',
    value: 0x40000000,
  },
  {
    id: 'use_application_commands',
    name: 'Use Commands',
    description: 'Use slash commands',
    value: 0x80000000,
  },
  {
    id: 'request_to_speak',
    name: 'Request to Speak',
    description: 'Request to speak in stage channels',
    value: 0x100000000,
  },
  {
    id: 'manage_events',
    name: 'Manage Events',
    description: 'Create and edit server events',
    value: 0x200000000,
  },
  {
    id: 'manage_threads',
    name: 'Manage Threads',
    description: 'Create and manage threads',
    value: 0x400000000,
  },
  {
    id: 'create_public_threads',
    name: 'Create Public Threads',
    description: 'Create public threads',
    value: 0x800000000,
  },
  {
    id: 'create_private_threads',
    name: 'Create Private Threads',
    description: 'Create private threads',
    value: 0x1000000000,
  },
  {
    id: 'use_external_stickers',
    name: 'Use External Stickers',
    description: 'Use stickers from other servers',
    value: 0x2000000000,
  },
  {
    id: 'send_messages_in_threads',
    name: 'Send Messages in Threads',
    description: 'Send messages in threads',
    value: 0x4000000000,
  },
  {
    id: 'use_embedded_activities',
    name: 'Use Activities',
    description: 'Use embedded activities',
    value: 0x8000000000,
  },
  {
    id: 'moderate_members',
    name: 'Timeout Members',
    description: 'Timeout members (Discord\'s moderation system)',
    value: 0x10000000000,
    dangerous: true,
  },
];

export const BOT_FEATURES: BotFeature[] = [
  {
    title: 'Moderation (Ban/Kick)',
    description:
      'Remove problematic members from the server. Use specific permissions rather than Administrator.',
    requiredPermissions: ['ban_members', 'kick_members'],
    riskLevel: 'risky',
  },
  {
    title: 'Moderation (Timeout)',
    description:
      'Temporarily restrict members without removing them. A targeted alternative to blanket permissions.',
    requiredPermissions: ['moderate_members'],
    riskLevel: 'moderate',
  },
  {
    title: 'Auto-Moderation (Delete Messages)',
    description:
      'Filter spam, profanity, or rule violations by deleting messages. Only request what you need.',
    requiredPermissions: ['manage_messages', 'view_channel', 'send_messages'],
    riskLevel: 'moderate',
  },
  {
    title: 'Auto-Moderation (Mute in Voice)',
    description:
      'Prevent users from speaking in voice channels. More targeted than full message deletion.',
    requiredPermissions: ['mute_members', 'connect', 'speak'],
    riskLevel: 'moderate',
  },
  {
    title: 'Logging & Audit Tracking',
    description:
      'Record user actions for moderation purposes. Respects Discord\'s audit log system.',
    requiredPermissions: ['view_audit_log', 'view_channel'],
    riskLevel: 'risky',
  },
  {
    title: 'Role Management',
    description:
      'Assign roles to members based on reactions, applications, or conditions. Requires careful role hierarchy setup.',
    requiredPermissions: ['manage_roles'],
    riskLevel: 'risky',
  },
  {
    title: 'Welcome Messages & Channel Setup',
    description:
      'Send greetings and create channels. Low-privilege operations that improve UX.',
    requiredPermissions: ['send_messages', 'manage_channels'],
    riskLevel: 'moderate',
  },
  {
    title: 'Music Playback',
    description:
      'Play audio in voice channels. Requires voice permissions but NOT Administrator.',
    requiredPermissions: ['connect', 'speak'],
    riskLevel: 'safe',
  },
  {
    title: 'Custom Commands & Responses',
    description:
      'Respond to messages and commands. Minimal permissions needed for basic functionality.',
    requiredPermissions: ['send_messages', 'view_channel', 'use_application_commands'],
    riskLevel: 'safe',
  },
  {
    title: 'Emoji & Reaction Management',
    description:
      'Manage custom emojis and server expressions. Does NOT need full Administrator access.',
    requiredPermissions: ['manage_guild_expressions', 'add_reactions'],
    riskLevel: 'safe',
  },
];

/**
 * Scopes needed for OAuth2 invite links
 * Use "bot" scope + only the permissions your bot actually needs
 */
export const RECOMMENDED_SCOPES = [
  {
    scope: 'bot',
    description: 'Allows the bot to be added to servers as a bot user',
  },
  {
    scope: 'applications.commands',
    description: 'Register slash commands (if using Interaction Handler)',
  },
];

/**
 * Anti-pattern to avoid
 */
export const ADMIN_PERMISSION_WARNING =
  'Administrator permission bypasses ALL channel-specific permissions and role hierarchy. This creates enormous security risks if your bot is compromised. Always request only the specific permissions your bot needs.';
