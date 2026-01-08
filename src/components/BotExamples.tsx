'use client';

import { memo } from 'react';
import * as Accordion from '@radix-ui/react-accordion';
import * as Tooltip from '@radix-ui/react-tooltip';

/**
 * Comprehensive bot type examples with exact permission requirements
 * Each example shows what permissions are needed and WHY
 */
const BOT_EXAMPLES = [
  {
    id: 'ticket-bot',
    name: 'Ticket Bot',
    icon: '🎫',
    description: 'Create and manage support tickets with private channels for user inquiries.',
    color: 'from-emerald-500 to-teal-600',
    shadowColor: 'shadow-emerald-500/20',
    permissions: [
      { name: 'View Channels', value: 1024, reason: 'See ticket channels and categories' },
      { name: 'Manage Channels', value: 16, reason: 'Create/delete ticket channels', risky: true },
      { name: 'Send Messages', value: 2048, reason: 'Send ticket responses and instructions' },
      { name: 'Embed Links', value: 16384, reason: 'Send rich embeds for ticket panels' },
      { name: 'Attach Files', value: 32768, reason: 'Allow file attachments in tickets' },
      { name: 'Read Message History', value: 65536, reason: 'View previous messages in tickets' },
      { name: 'Add Reactions', value: 64, reason: 'React to messages for ticket controls' },
      { name: 'Manage Messages', value: 8192, reason: 'Pin messages, delete spam in tickets', risky: true },
      { name: 'Manage Roles', value: 268435456, reason: 'Assign ticket-specific roles for access', risky: true },
    ],
    totalValue: 268559888,
    notNeeded: ['Administrator', 'Ban Members', 'Kick Members', 'Manage Server'],
  },
  {
    id: 'moderation-bot',
    name: 'Moderation Bot',
    icon: '🛡️',
    description: 'Enforce server rules with kicks, bans, timeouts, and message management.',
    color: 'from-red-500 to-rose-600',
    shadowColor: 'shadow-red-500/20',
    permissions: [
      { name: 'View Channels', value: 1024, reason: 'Monitor all channels for rule violations' },
      { name: 'Send Messages', value: 2048, reason: 'Send warnings and mod actions' },
      { name: 'Embed Links', value: 16384, reason: 'Post mod logs and warning embeds' },
      { name: 'Manage Messages', value: 8192, reason: 'Delete rule-breaking messages', risky: true },
      { name: 'Kick Members', value: 2, reason: 'Remove users who break rules', risky: true },
      { name: 'Ban Members', value: 4, reason: 'Permanently remove serious offenders', risky: true },
      { name: 'Moderate Members', value: 1099511627776, reason: 'Timeout users temporarily', risky: true },
      { name: 'View Audit Log', value: 128, reason: 'Track mod actions and changes', risky: true },
      { name: 'Read Message History', value: 65536, reason: 'Review messages for context' },
    ],
    totalValue: 1099511721110,
    notNeeded: ['Administrator', 'Manage Server', 'Manage Channels', 'Manage Roles'],
  },
  {
    id: 'music-bot',
    name: 'Music Bot',
    icon: '🎵',
    description: 'Play music in voice channels with queue management and controls.',
    color: 'from-violet-500 to-purple-600',
    shadowColor: 'shadow-violet-500/20',
    permissions: [
      { name: 'View Channels', value: 1024, reason: 'See voice and text channels' },
      { name: 'Connect', value: 1048576, reason: 'Join voice channels to play music' },
      { name: 'Speak', value: 2097152, reason: 'Transmit audio in voice channels' },
      { name: 'Send Messages', value: 2048, reason: 'Show now playing, queue info' },
      { name: 'Embed Links', value: 16384, reason: 'Display rich music embeds' },
      { name: 'Add Reactions', value: 64, reason: 'Add reaction controls to messages' },
      { name: 'Use External Emojis', value: 262144, reason: 'Use custom emojis for controls' },
    ],
    totalValue: 3427392,
    notNeeded: ['Administrator', 'Manage Channels', 'Kick Members', 'Ban Members', 'Manage Roles'],
  },
  {
    id: 'welcome-bot',
    name: 'Welcome Bot',
    icon: '👋',
    description: 'Greet new members, assign auto-roles, and manage member onboarding.',
    color: 'from-amber-500 to-orange-600',
    shadowColor: 'shadow-amber-500/20',
    permissions: [
      { name: 'View Channels', value: 1024, reason: 'See the welcome channel' },
      { name: 'Send Messages', value: 2048, reason: 'Send welcome messages' },
      { name: 'Embed Links', value: 16384, reason: 'Send rich welcome embeds with images' },
      { name: 'Attach Files', value: 32768, reason: 'Send welcome images/banners' },
      { name: 'Manage Roles', value: 268435456, reason: 'Assign auto roles to new members', risky: true },
      { name: 'Use External Emojis', value: 262144, reason: 'Use custom emojis in welcomes' },
    ],
    totalValue: 268749824,
    notNeeded: ['Administrator', 'Manage Server', 'Kick Members', 'Ban Members', 'Manage Channels'],
  },
  {
    id: 'leveling-bot',
    name: 'Leveling/XP Bot',
    icon: '📊',
    description: 'Track user activity, award XP, and manage level-based role rewards.',
    color: 'from-cyan-500 to-blue-600',
    shadowColor: 'shadow-cyan-500/20',
    permissions: [
      { name: 'View Channels', value: 1024, reason: 'Monitor messages for XP tracking' },
      { name: 'Send Messages', value: 2048, reason: 'Announce level ups and show stats' },
      { name: 'Embed Links', value: 16384, reason: 'Display leaderboards and rank cards' },
      { name: 'Attach Files', value: 32768, reason: 'Send generated rank card images' },
      { name: 'Manage Roles', value: 268435456, reason: 'Assign level based reward roles', risky: true },
      { name: 'Read Message History', value: 65536, reason: 'Count messages for XP calculation' },
      { name: 'Add Reactions', value: 64, reason: 'React to level up messages' },
    ],
    totalValue: 268552704,
    notNeeded: ['Administrator', 'Manage Server', 'Kick Members', 'Ban Members', 'Manage Channels'],
  },
  {
    id: 'logging-bot',
    name: 'Logging Bot',
    icon: '📝',
    description: 'Track server events, message edits/deletes, and member changes.',
    color: 'from-slate-500 to-gray-600',
    shadowColor: 'shadow-slate-500/20',
    permissions: [
      { name: 'View Channels', value: 1024, reason: 'See all channels to log events' },
      { name: 'Send Messages', value: 2048, reason: 'Post logs to log channels' },
      { name: 'Embed Links', value: 16384, reason: 'Format logs as rich embeds' },
      { name: 'Read Message History', value: 65536, reason: 'Cache messages for edit/delete logs' },
      { name: 'View Audit Log', value: 128, reason: 'See who performed actions', risky: true },
      { name: 'Attach Files', value: 32768, reason: 'Attach deleted images to logs' },
    ],
    totalValue: 117888,
    notNeeded: ['Administrator', 'Manage Server', 'Manage Messages', 'Kick Members', 'Ban Members'],
  },
  {
    id: 'reaction-roles-bot',
    name: 'Reaction Roles Bot',
    icon: '🏷️',
    description: 'Let users self-assign roles by clicking reactions on messages.',
    color: 'from-pink-500 to-rose-600',
    shadowColor: 'shadow-pink-500/20',
    permissions: [
      { name: 'View Channels', value: 1024, reason: 'See the role selection channels' },
      { name: 'Send Messages', value: 2048, reason: 'Create role selection messages' },
      { name: 'Embed Links', value: 16384, reason: 'Send attractive role menus' },
      { name: 'Add Reactions', value: 64, reason: 'Add initial reactions to messages' },
      { name: 'Manage Messages', value: 8192, reason: 'Remove user reactions after role grant', risky: true },
      { name: 'Manage Roles', value: 268435456, reason: 'Assign/remove roles from users', risky: true },
      { name: 'Use External Emojis', value: 262144, reason: 'Use custom emojis as reactions' },
    ],
    totalValue: 268724944,
    notNeeded: ['Administrator', 'Manage Server', 'Manage Channels', 'Kick Members', 'Ban Members'],
  },
  {
    id: 'giveaway-bot',
    name: 'Giveaway Bot',
    icon: '🎉',
    description: 'Host giveaways with reaction entries and automatic winner selection.',
    color: 'from-yellow-500 to-amber-600',
    shadowColor: 'shadow-yellow-500/20',
    permissions: [
      { name: 'View Channels', value: 1024, reason: 'See giveaway channels' },
      { name: 'Send Messages', value: 2048, reason: 'Post giveaway announcements' },
      { name: 'Embed Links', value: 16384, reason: 'Create attractive giveaway embeds' },
      { name: 'Add Reactions', value: 64, reason: 'Add the entry reaction' },
      { name: 'Read Message History', value: 65536, reason: 'Find giveaway messages to edit' },
      { name: 'Mention Everyone', value: 131072, reason: 'Ping winners (optional)', risky: true },
      { name: 'Use External Emojis', value: 262144, reason: 'Use custom giveaway emojis' },
    ],
    totalValue: 477904,
    notNeeded: ['Administrator', 'Manage Server', 'Manage Roles', 'Kick Members', 'Ban Members'],
  },
  {
    id: 'verification-bot',
    name: 'Verification Bot',
    icon: '✅',
    description: 'Verify new members through CAPTCHA, reaction, or button-based systems.',
    color: 'from-green-500 to-emerald-600',
    shadowColor: 'shadow-green-500/20',
    permissions: [
      { name: 'View Channels', value: 1024, reason: 'See verification channel' },
      { name: 'Send Messages', value: 2048, reason: 'Send verification instructions' },
      { name: 'Embed Links', value: 16384, reason: 'Post verification panels' },
      { name: 'Manage Roles', value: 268435456, reason: 'Grant verified role to users', risky: true },
      { name: 'Kick Members', value: 2, reason: 'Remove users who fail verification', risky: true },
      { name: 'Manage Messages', value: 8192, reason: 'Clean up verification attempts', risky: true },
    ],
    totalValue: 268462738,
    notNeeded: ['Administrator', 'Manage Server', 'Ban Members', 'Manage Channels'],
  },
  {
    id: 'economy-bot',
    name: 'Economy Bot',
    icon: '💰',
    description: 'Virtual currency system with shops, trading, and mini-games.',
    color: 'from-lime-500 to-green-600',
    shadowColor: 'shadow-lime-500/20',
    permissions: [
      { name: 'View Channels', value: 1024, reason: 'See economy command channels' },
      { name: 'Send Messages', value: 2048, reason: 'Display balances, shop, transactions' },
      { name: 'Embed Links', value: 16384, reason: 'Rich embeds for shop and inventory' },
      { name: 'Attach Files', value: 32768, reason: 'Send currency images' },
      { name: 'Add Reactions', value: 64, reason: 'Reaction-based confirmations' },
      { name: 'Use External Emojis', value: 262144, reason: 'Custom currency emojis' },
      { name: 'Read Message History', value: 65536, reason: 'Track message-based rewards' },
    ],
    totalValue: 379598,
    notNeeded: ['Administrator', 'Manage Server', 'Manage Roles', 'Kick Members', 'Ban Members'],
  },
];

function PermissionBadgeComponent({ name, value, reason, risky }: { name: string; value: number; reason: string; risky?: boolean }) {
  return (
    <Tooltip.Root>
      <Tooltip.Trigger asChild>
        <div className={`flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg cursor-help transition-all hover:scale-105 ${
          risky 
            ? 'bg-amber-500/10 text-amber-300 ring-1 ring-amber-500/20' 
            : 'bg-white/5 text-gray-300 ring-1 ring-white/10'
        }`}>
          <span className="text-xs sm:text-sm font-medium">{name}</span>
          {risky && (
            <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          )}
        </div>
      </Tooltip.Trigger>
      <Tooltip.Portal>
        <Tooltip.Content
          side="top"
          className="z-50 max-w-xs rounded-xl bg-gray-900 px-4 py-3 text-sm shadow-xl ring-1 ring-white/10"
          sideOffset={5}
        >
          <p className="text-white font-medium mb-1">{name}</p>
          <p className="text-gray-400 text-xs mb-2">{reason}</p>
          <p className="text-gray-500 font-mono text-xs">Value: {value}</p>
          <Tooltip.Arrow className="fill-gray-900" />
        </Tooltip.Content>
      </Tooltip.Portal>
    </Tooltip.Root>
  );
}

const PermissionBadge = memo(PermissionBadgeComponent);

function BotExamplesComponent() {
  return (
    <section id="bot-examples" className="relative w-full px-4 py-12 sm:py-24 bg-gray-950">
      {/* Simplified background - removed blur effects */}
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 25% 0%, #3b82f6 0%, transparent 50%)' }} />
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 75% 100%, #ec4899 0%, transparent 50%)' }} />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-16 px-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-blue-400 ring-1 ring-blue-500/20 mb-4 sm:mb-6">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Real World Examples
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Popular Bot Types &<br />
            <span className="gradient-text">Their Actual Permissions</span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Every bot type has specific permission needs. Here's exactly what each bot type requires and proof that{' '}
            <span className="text-red-400 font-semibold">none of them need Administrator</span>.
          </p>
        </div>

        {/* Bot examples grid */}
        <Tooltip.Provider delayDuration={200}>
          <Accordion.Root type="single" collapsible className="space-y-3 sm:space-y-4">
            {BOT_EXAMPLES.map((bot) => (
              <Accordion.Item
                key={bot.id}
                value={bot.id}
                className="group rounded-xl sm:rounded-2xl bg-gray-900/50 ring-1 ring-white/10 overflow-hidden backdrop-blur-sm hover:ring-white/20 transition-all"
              >
                <Accordion.Trigger className="w-full px-4 sm:px-6 py-4 sm:py-5 flex items-center gap-3 sm:gap-4 text-left">
                  {/* Bot icon */}
                  <div className={`shrink-0 w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${bot.color} flex items-center justify-center text-lg sm:text-2xl shadow-lg ${bot.shadowColor}`}>
                    {bot.icon}
                  </div>

                  {/* Bot info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-blue-400 transition-colors">
                      {bot.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 truncate">{bot.description}</p>
                  </div>

                  {/* Permission count and chevron */}
                  <div className="flex items-center gap-2 sm:gap-4">
                    <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 ring-1 ring-white/10">
                      <span className="text-sm font-medium text-white">{bot.permissions.length}</span>
                      <span className="text-xs text-gray-500">perms</span>
                    </div>
                    <svg 
                      className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500 group-data-[state=open]:rotate-180 transition-transform duration-200" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </Accordion.Trigger>

                <Accordion.Content className="overflow-hidden data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp">
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-2 border-t border-white/5">
                    {/* Required permissions */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Required Permissions
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {bot.permissions.map((perm) => (
                          <PermissionBadge 
                            key={perm.name} 
                            name={perm.name} 
                            value={perm.value}
                            reason={perm.reason}
                            risky={perm.risky}
                          />
                        ))}
                      </div>
                    </div>

                    {/* NOT needed */}
                    <div className="mb-4 sm:mb-6">
                      <h4 className="text-xs sm:text-sm font-semibold text-white mb-2 sm:mb-3 flex items-center gap-2">
                        <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        NOT Needed
                      </h4>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {bot.notNeeded.map((perm) => (
                          <span 
                            key={perm}
                            className={`px-2 sm:px-3 py-1 sm:py-1.5 rounded-lg text-xs sm:text-sm font-medium ${
                              perm === 'Administrator'
                                ? 'bg-red-500/20 text-red-300 ring-1 ring-red-500/30'
                                : 'bg-gray-800 text-gray-500 ring-1 ring-gray-700'
                            }`}
                          >
                            {perm}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Permission value */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 ring-1 ring-white/10">
                      <div>
                        <p className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1">OAuth2 Permission Value</p>
                        <code className="text-lg sm:text-xl font-mono font-bold text-blue-400">{bot.totalValue}</code>
                      </div>
                      <button
                        onClick={() => navigator.clipboard.writeText(bot.totalValue.toString())}
                        className="w-full sm:w-auto px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 text-xs sm:text-sm font-medium hover:bg-blue-500/20 transition-colors ring-1 ring-blue-500/20"
                      >
                        Copy Value
                      </button>
                    </div>
                  </div>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Tooltip.Provider>

        {/* Bottom note */}
        <div className="mt-8 sm:mt-12 p-4 sm:p-6 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500/10 to-orange-500/10 ring-1 ring-red-500/20">
          <div className="flex items-start gap-3 sm:gap-4">
            <div className="shrink-0 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm sm:text-base text-white font-semibold mb-1">Notice something?</h4>
              <p className="text-xs sm:text-sm text-gray-400">
                <span className="text-red-400 font-semibold">Not a single bot type requires Administrator.</span> Every feature Discord bots need can be achieved with specific, targeted permissions. The yellow highlighted permissions are "risky" and should be granted carefully, but they're still infinitely safer than Administrator.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export const BotExamples = memo(BotExamplesComponent);