'use client';

import { useState, useMemo, useCallback } from 'react';
import * as Tooltip from '@radix-ui/react-tooltip';
import { DISCORD_PERMISSIONS, ADMIN_PERMISSION_WARNING } from '@/lib/permissions';
import { validatePermissions } from '@/lib/validation';

export function PermissionChecklist() {
  const [selectedPermissions, setSelectedPermissions] = useState<Set<string>>(
    new Set(),
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [botId, setBotId] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedUrl, setCopiedUrl] = useState(false);

  const { hasAdmin } = validatePermissions(Array.from(selectedPermissions));

  const filteredPermissions = useMemo(() => {
    if (!searchQuery) return DISCORD_PERMISSIONS;
    const query = searchQuery.toLowerCase();
    return DISCORD_PERMISSIONS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const togglePermission = useCallback((permissionId: string) => {
    setSelectedPermissions((prev) => {
      const newSelected = new Set(prev);
      if (newSelected.has(permissionId)) {
        newSelected.delete(permissionId);
      } else {
        newSelected.add(permissionId);
      }
      return newSelected;
    });
  }, []);

  const clearAll = useCallback(() => {
    setSelectedPermissions(new Set());
  }, []);

  const permissionValue = useMemo(() => {
    let total = 0n;
    selectedPermissions.forEach((permId) => {
      const perm = DISCORD_PERMISSIONS.find((p) => p.id === permId);
      if (perm) {
        total += BigInt(perm.value);
      }
    });
    return total;
  }, [selectedPermissions]);

  const copyToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const copyUrlToClipboard = useCallback((text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUrl(true);
    const timer = setTimeout(() => setCopiedUrl(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  const displayBotId = useMemo(() => botId.trim() || 'YOUR_BOT_ID', [botId]);
  const isValidBotId = useMemo(() => /^\d{17,19}$/.test(botId.trim()), [botId]);
  const oauthUrl = useMemo(
    () => `https://discord.com/api/oauth2/authorize?client_id=${displayBotId}&scope=bot+applications.commands&permissions=${permissionValue.toString()}`,
    [displayBotId, permissionValue]
  );

  return (
    <section id="checklist" className="relative w-full px-4 py-12 sm:py-24 bg-gray-950">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/4 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-12 px-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-green-400 ring-1 ring-green-500/20 mb-4 sm:mb-6">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
            </svg>
            Permission Calculator
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Build Your<br />
            <span className="gradient-text">Permission Value</span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Select only the permissions your bot needs. The calculator will generate the OAuth2 permission value for your invite URL.
          </p>
        </div>

        {/* Admin Warning */}
        {hasAdmin && (
          <div className="mb-6 sm:mb-8 rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500/20 to-orange-500/20 ring-1 ring-red-500/30 p-4 sm:p-6 pulse-warning">
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-red-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 sm:w-6 sm:h-6 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-semibold text-red-300 mb-2">
                  ⚠️ Administrator Permission Selected!
                </h3>
                <p className="text-red-200/80 text-xs sm:text-sm mb-3">
                  {ADMIN_PERMISSION_WARNING}
                </p>
                <button
                  onClick={() => {
                    const newSelected = new Set(selectedPermissions);
                    newSelected.delete('administrator');
                    setSelectedPermissions(newSelected);
                  }}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg bg-red-500/20 text-red-300 text-xs sm:text-sm font-medium hover:bg-red-500/30 transition-colors ring-1 ring-red-500/30"
                >
                  Remove Administrator
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 sm:gap-8">
          {/* Permission selector */}
          <div className="lg:col-span-2 order-2 lg:order-1">
            {/* Search and controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div className="relative flex-1">
                <svg className="absolute left-3 sm:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search permissions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 sm:pl-12 pr-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-900/50 ring-1 ring-white/10 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 text-sm sm:text-base"
                />
              </div>
              {selectedPermissions.size > 0 && (
                <button
                  onClick={clearAll}
                  className="px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-gray-900/50 ring-1 ring-white/10 text-gray-400 hover:text-white hover:ring-white/20 transition-all text-xs sm:text-sm font-medium"
                >
                  Clear All ({selectedPermissions.size})
                </button>
              )}
            </div>

            {/* Permission grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3 max-h-[400px] sm:max-h-[600px] overflow-y-auto pr-1 sm:pr-2">
              <Tooltip.Provider delayDuration={300}>
                {filteredPermissions.map((permission) => (
                  <Tooltip.Root key={permission.id}>
                    <Tooltip.Trigger asChild>
                      <label
                        className={`group relative flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-lg sm:rounded-xl cursor-pointer transition-all ${
                          selectedPermissions.has(permission.id)
                            ? 'bg-blue-500/20 ring-2 ring-blue-500/50'
                            : 'bg-gray-900/50 ring-1 ring-white/10 hover:ring-white/20'
                        } ${
                          permission.id === 'administrator' && selectedPermissions.has(permission.id)
                            ? 'bg-red-500/20 ring-2 ring-red-500/50'
                            : ''
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedPermissions.has(permission.id)}
                          onChange={() => togglePermission(permission.id)}
                          className="sr-only"
                          aria-label={permission.name}
                        />
                        {/* Checkbox */}
                        <div className={`shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-md sm:rounded-lg flex items-center justify-center transition-all ${
                          selectedPermissions.has(permission.id)
                            ? permission.id === 'administrator'
                              ? 'bg-red-500 text-white'
                              : 'bg-blue-500 text-white'
                            : 'bg-gray-800 ring-1 ring-white/20 group-hover:ring-white/30'
                        }`}>
                          {selectedPermissions.has(permission.id) && (
                            <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        {/* Label */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                            <span className={`text-xs sm:text-sm font-medium ${
                              selectedPermissions.has(permission.id)
                                ? permission.id === 'administrator' ? 'text-red-300' : 'text-white'
                                : 'text-gray-300'
                            }`}>
                              {permission.name}
                            </span>
                            {permission.dangerous && (
                              <span className={`text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 rounded-full font-medium ${
                                permission.id === 'administrator'
                                  ? 'bg-red-500/20 text-red-400'
                                  : 'bg-amber-500/20 text-amber-400'
                              }`}>
                                {permission.id === 'administrator' ? 'Danger' : 'Risky'}
                              </span>
                            )}
                          </div>
                        </div>
                      </label>
                    </Tooltip.Trigger>
                    <Tooltip.Portal>
                      <Tooltip.Content
                        side="top"
                        className="z-50 max-w-xs rounded-xl bg-gray-900 px-4 py-3 text-sm shadow-xl ring-1 ring-white/10"
                        sideOffset={5}
                      >
                        <p className="text-white font-medium mb-1">{permission.name}</p>
                        <p className="text-gray-400 text-xs">{permission.description}</p>
                        <p className="text-gray-500 font-mono text-xs mt-2">Value: {permission.value}</p>
                        <Tooltip.Arrow className="fill-gray-900" />
                      </Tooltip.Content>
                    </Tooltip.Portal>
                  </Tooltip.Root>
                ))}
              </Tooltip.Provider>
            </div>
          </div>

          {/* Results panel */}
          <div className="lg:col-span-1 order-1 lg:order-2">
            <div className="lg:sticky lg:top-24 space-y-4 sm:space-y-6">
              {/* Permission value card */}
              <div className="rounded-xl sm:rounded-2xl bg-gray-900/50 ring-1 ring-white/10 p-4 sm:p-6">
                <h3 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider mb-3 sm:mb-4">
                  Permission Value
                </h3>
                <div className="flex items-center gap-4 mb-3 sm:mb-4">
                  <code className="text-2xl sm:text-4xl font-mono font-bold text-white break-all">
                    {permissionValue.toString()}
                  </code>
                </div>
                <button
                  onClick={() => copyToClipboard(permissionValue.toString())}
                  className={`w-full py-2.5 sm:py-3 rounded-lg sm:rounded-xl font-medium transition-all text-sm sm:text-base ${
                    copied
                      ? 'bg-green-500/20 text-green-400 ring-1 ring-green-500/30'
                      : 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 hover:bg-blue-500/30'
                  }`}
                >
                  {copied ? '✓ Copied!' : 'Copy Value'}
                </button>
              </div>

              {/* Selected permissions */}
              <div className="rounded-xl sm:rounded-2xl bg-gray-900/50 ring-1 ring-white/10 p-4 sm:p-6">
                <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">
                  Selected ({selectedPermissions.size})
                </h3>
                {selectedPermissions.size === 0 ? (
                  <p className="text-gray-500 text-sm">No permissions selected yet</p>
                ) : (
                  <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                    {Array.from(selectedPermissions).map((id) => {
                      const perm = DISCORD_PERMISSIONS.find((p) => p.id === id);
                      return (
                        <button
                          key={id}
                          onClick={() => togglePermission(id)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all hover:opacity-80 ${
                            id === 'administrator'
                              ? 'bg-red-500/20 text-red-400 ring-1 ring-red-500/30'
                              : perm?.dangerous
                                ? 'bg-amber-500/20 text-amber-400 ring-1 ring-amber-500/30'
                                : 'bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30'
                          }`}
                        >
                          {perm?.name || id}
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* OAuth2 URL */}
              {selectedPermissions.size > 0 && (
                <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 ring-1 ring-green-500/20 p-4 sm:p-6">
                  <h3 className="text-xs sm:text-sm font-semibold text-green-400 mb-3 sm:mb-4 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    OAuth2 Invite URL
                  </h3>
                  
                  {/* Bot ID Input */}
                  <div className="mb-3 sm:mb-4">
                    <label className="block text-[10px] sm:text-xs text-gray-400 mb-1.5 sm:mb-2">
                      Bot Client ID
                    </label>
                    <input
                      type="text"
                      placeholder="Enter your bot's client ID"
                      value={botId}
                      onChange={(e) => setBotId(e.target.value.replace(/\D/g, ''))}
                      className={`w-full px-3 py-2 sm:py-2.5 rounded-lg bg-gray-900/70 ring-1 text-white placeholder-gray-500 focus:outline-none focus:ring-2 text-xs sm:text-sm font-mono ${
                        botId && !isValidBotId 
                          ? 'ring-amber-500/50 focus:ring-amber-500/50' 
                          : isValidBotId 
                            ? 'ring-green-500/50 focus:ring-green-500/50' 
                            : 'ring-white/10 focus:ring-green-500/50'
                      }`}
                    />
                    {botId && !isValidBotId && (
                      <p className="text-[10px] sm:text-xs text-amber-400 mt-1">
                        Bot IDs are 17-19 digit numbers
                      </p>
                    )}
                    {isValidBotId && (
                      <p className="text-[10px] sm:text-xs text-green-400 mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                        Valid Bot ID
                      </p>
                    )}
                  </div>

                  <div className="bg-gray-900/50 rounded-lg p-2 sm:p-3 mb-3 sm:mb-4 overflow-x-auto">
                    <code className="text-[10px] sm:text-xs text-green-300 break-all">{oauthUrl}</code>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button
                      onClick={() => copyUrlToClipboard(oauthUrl)}
                      className={`flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl ring-1 font-medium text-xs sm:text-sm transition-all ${
                        copiedUrl
                          ? 'bg-green-500/30 text-green-300 ring-green-500/50'
                          : 'bg-green-500/20 text-green-400 ring-green-500/30 hover:bg-green-500/30'
                      }`}
                    >
                      {copiedUrl ? '✓ Copied!' : 'Copy URL'}
                    </button>
                    {isValidBotId && (
                      <a
                        href={oauthUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 py-2 sm:py-2.5 rounded-lg sm:rounded-xl bg-blue-500/20 text-blue-400 ring-1 ring-blue-500/30 font-medium text-xs sm:text-sm hover:bg-blue-500/30 transition-all text-center flex items-center justify-center gap-1.5"
                      >
                        Open Invite
                        <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </a>
                    )}
                  </div>
                  
                  {!botId && (
                    <p className="text-[10px] sm:text-xs text-gray-500 mt-2 sm:mt-3">
                      Find your Bot ID in the{' '}
                      <a 
                        href="https://discord.com/developers/applications" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-green-400 hover:underline"
                      >
                        Discord Developer Portal
                      </a>
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
