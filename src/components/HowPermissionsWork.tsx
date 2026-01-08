export function HowPermissionsWork() {
  return (
    <section className="relative w-full px-4 py-12 sm:py-24 bg-gray-900 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-blue-500/10 rounded-full blur-3xl" />
      <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-500/10 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-16 px-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-cyan-400 ring-1 ring-cyan-500/20 mb-4 sm:mb-6">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Technical Deep Dive
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            How Discord Permissions<br />
            <span className="gradient-text">Actually Work</span>
          </h2>
        </div>

        {/* Content cards */}
        <div className="space-y-4 sm:space-y-8">
          {/* Server vs Channel */}
          <div className="rounded-xl sm:rounded-2xl bg-gray-800/50 ring-1 ring-white/10 overflow-hidden">
            <div className="p-4 sm:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-blue-500 to-cyan-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-blue-500/20">
                  1
                </div>
                <h3 className="text-lg sm:text-2xl font-semibold text-white">Server vs. Channel Permissions</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                Discord has a layered permission system. Server level permissions set defaults, but channel specific overrides can grant or deny permissions for specific channels. This allows server owners fine grained control.
              </p>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4">
                <div className="rounded-lg sm:rounded-xl bg-gray-900/50 p-4 sm:p-5 ring-1 ring-white/5">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500" />
                    <span className="text-xs sm:text-sm font-medium text-green-400">Server Level</span>
                  </div>
                  <code className="text-xs sm:text-sm text-gray-300 font-mono">Bot has: Send Messages ✓</code>
                </div>
                <div className="rounded-lg sm:rounded-xl bg-gray-900/50 p-4 sm:p-5 ring-1 ring-white/5">
                  <div className="flex items-center gap-2 mb-2 sm:mb-3">
                    <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-amber-500" />
                    <span className="text-xs sm:text-sm font-medium text-amber-400">Channel Override</span>
                  </div>
                  <code className="text-xs sm:text-sm text-gray-300 font-mono">#admin-chat: Send Messages ✗</code>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-gray-500 mt-3 sm:mt-4">
                → Result: Bot can message everywhere except #admin-chat
              </p>
            </div>
          </div>

          {/* Administrator Bypass */}
          <div className="rounded-xl sm:rounded-2xl bg-linear-to-r from-red-500/10 to-orange-500/10 ring-1 ring-red-500/20 overflow-hidden">
            <div className="p-4 sm:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-red-500 to-orange-500 flex items-center justify-center text-white shadow-lg shadow-red-500/20">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                  </svg>
                </div>
                <h3 className="text-lg sm:text-2xl font-semibold text-white">The Administrator Bypass Problem</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-300 mb-4 sm:mb-6 leading-relaxed">
                <span className="text-red-400 font-semibold">Administrator completely ignores channel overrides.</span> A bot with Administrator can do anything, anywhere, regardless of what restrictions the server owner sets up.
              </p>
              <div className="rounded-lg sm:rounded-xl bg-gray-900/70 p-4 sm:p-5 ring-1 ring-red-500/20">
                <div className="space-y-2 sm:space-y-3 font-mono text-xs sm:text-sm">
                  <div className="text-gray-400">
                    <span className="text-red-400">Bot has:</span> Administrator ✓
                  </div>
                  <div className="text-gray-400">
                    <span className="text-amber-400">Owner sets:</span> #private → Deny all for bot
                  </div>
                  <div className="text-red-400 font-semibold">
                    <span className="text-red-500">Result:</span> Bot ignores restriction, has full access ⚠️
                  </div>
                </div>
              </div>
              <p className="text-red-300 text-xs sm:text-sm mt-3 sm:mt-4 font-medium">
                This is why server owners can't trust bots that request Administrator they can't control them.
              </p>
            </div>
          </div>

          {/* Permission Bitfield */}
          <div className="rounded-xl sm:rounded-2xl bg-gray-800/50 ring-1 ring-white/10 overflow-hidden">
            <div className="p-4 sm:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-linear-to-br from-purple-500 to-violet-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-purple-500/20">
                  2
                </div>
                <h3 className="text-lg sm:text-2xl font-semibold text-white">Permission Bitfield Calculation</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                Discord permissions are stored as a single number (bitfield). Each permission is a power of 2, and the total is all values added together. This is what goes in your OAuth2 invite URL.
              </p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-4 sm:mb-6">
                <div className="rounded-lg sm:rounded-xl bg-gray-900/50 p-2 sm:p-4 ring-1 ring-white/5 text-center">
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">Send Messages</div>
                  <div className="text-lg sm:text-2xl font-mono font-bold text-blue-400">2048</div>
                </div>
                <div className="rounded-lg sm:rounded-xl bg-gray-900/50 p-2 sm:p-4 ring-1 ring-white/5 text-center">
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">Embed Links</div>
                  <div className="text-lg sm:text-2xl font-mono font-bold text-blue-400">16384</div>
                </div>
                <div className="rounded-lg sm:rounded-xl bg-gray-900/50 p-2 sm:p-4 ring-1 ring-white/5 text-center">
                  <div className="text-[10px] sm:text-xs text-gray-500 uppercase tracking-wider mb-1 sm:mb-2">Read History</div>
                  <div className="text-lg sm:text-2xl font-mono font-bold text-blue-400">65536</div>
                </div>
              </div>
              <div className="rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 p-4 sm:p-5 ring-1 ring-blue-500/20">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-sm sm:text-base text-gray-400">Total Permission Value:</span>
                  <span className="text-2xl sm:text-3xl font-mono font-bold text-white">83968</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-500 mt-2">
                  Use this in: <code className="text-blue-400">permissions=83968</code>
                </p>
              </div>
            </div>
          </div>

          {/* Role Hierarchy */}
          <div className="rounded-xl sm:rounded-2xl bg-gray-800/50 ring-1 ring-white/10 overflow-hidden">
            <div className="p-4 sm:p-8">
              <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-yellow-500 flex items-center justify-center text-white font-bold text-lg sm:text-xl shadow-lg shadow-amber-500/20">
                  3
                </div>
                <h3 className="text-lg sm:text-2xl font-semibold text-white">Role Hierarchy Matters</h3>
              </div>
              <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6 leading-relaxed">
                Bots can only manage roles <span className="text-white font-medium">below their highest role</span> in the hierarchy. This is a security feature even with Manage Roles permission, your bot can't grant itself Administrator or affect roles above it.
              </p>
              <div className="space-y-2">
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-900/50 ring-1 ring-amber-500/20">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-amber-500" />
                  <span className="text-sm sm:text-base text-amber-400 font-medium">@Admin</span>
                  <span className="text-gray-600 ml-auto text-xs sm:text-sm">← Bot can't touch</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-900/50 ring-1 ring-blue-500/30">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-blue-500" />
                  <span className="text-sm sm:text-base text-blue-400 font-medium">@YourBot</span>
                  <span className="text-gray-600 ml-auto text-xs sm:text-sm">← Bot's role</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-900/50 ring-1 ring-white/5">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-green-500" />
                  <span className="text-sm sm:text-base text-green-400 font-medium">@Member</span>
                  <span className="text-gray-600 ml-auto text-xs sm:text-sm">← Bot can manage</span>
                </div>
                <div className="flex items-center gap-2 sm:gap-3 p-2 sm:p-3 rounded-lg bg-gray-900/50 ring-1 ring-white/5">
                  <div className="w-3 h-3 sm:w-4 sm:h-4 rounded bg-gray-500" />
                  <span className="text-sm sm:text-base text-gray-400 font-medium">@everyone</span>
                  <span className="text-gray-600 ml-auto text-xs sm:text-sm">← Bot can manage</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
