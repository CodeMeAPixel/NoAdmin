export function WhyPermissionsMatter() {
  return (
    <section className="relative w-full px-4 py-12 sm:py-24 bg-gray-950 overflow-hidden">
      {/* Simplified background */}
      
      <div className="relative z-10 mx-auto max-w-6xl">
        {/* Section header */}
        <div className="text-center mb-8 sm:mb-16 px-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-purple-400 ring-1 ring-purple-500/20 mb-4 sm:mb-6">
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Understanding the Stakes
          </div>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6">
            Why Permissions<br />
            <span className="gradient-text">Actually Matter</span>
          </h2>
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto">
            Discord permissions aren't just checkboxes. They're the difference between a secure server and a potential disaster.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12">
          {/* Trust card */}
          <div className="group relative rounded-xl sm:rounded-2xl bg-gray-900/50 p-5 sm:p-8 ring-1 ring-white/10 hover:ring-green-500/30 transition-all duration-300">
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-green-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-green-500/20">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Trust & Reputation</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Server owners check what permissions a bot requests before adding it. Requesting only what you need signals professionalism and builds trust in your bot.
              </p>
            </div>
          </div>

          {/* Security card */}
          <div className="group relative rounded-xl sm:rounded-2xl bg-gray-900/50 p-5 sm:p-8 ring-1 ring-white/10 hover:ring-blue-500/30 transition-all duration-300">
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-blue-500/20">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Damage Limitation</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                If your bot token is compromised, attackers can only do what your bot is authorized to do. Limited permissions = limited damage potential.
              </p>
            </div>
          </div>

          {/* Control card */}
          <div className="group relative rounded-xl sm:rounded-2xl bg-gray-900/50 p-5 sm:p-8 ring-1 ring-white/10 hover:ring-purple-500/30 transition-all duration-300">
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-purple-500/20">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Server Owner Control</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Without Administrator, server owners can use channel overrides to restrict your bot. They maintain control of their server's security.
              </p>
            </div>
          </div>

          {/* Compliance card */}
          <div className="group relative rounded-xl sm:rounded-2xl bg-gray-900/50 p-5 sm:p-8 ring-1 ring-white/10 hover:ring-amber-500/30 transition-all duration-300">
            <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-amber-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative">
              <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center mb-4 sm:mb-6 shadow-lg shadow-amber-500/20">
                <svg className="w-5 h-5 sm:w-7 sm:h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2 sm:mb-3">Bot List Approval</h3>
              <p className="text-sm sm:text-base text-gray-400 leading-relaxed">
                Popular bot lists like top.gg and discord.bots.gg review permission requests. Bots requesting Administrator are often denied listing or flagged for manual review.
              </p>
            </div>
          </div>
        </div>

        {/* Warning callout */}
        <div className="relative rounded-xl sm:rounded-2xl bg-gradient-to-r from-red-500/10 via-red-500/5 to-orange-500/10 p-4 sm:p-8 ring-1 ring-red-500/20 overflow-hidden">
          <div className="absolute top-0 right-0 w-32 sm:w-64 h-32 sm:h-64 bg-red-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
            <div className="shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-red-500/20 flex items-center justify-center">
              <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-semibold text-white mb-2">The Administrator Trap</h3>
              <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                Many developers request Administrator "just to be safe" or "to avoid permission errors." This is a{' '}
                <span className="text-red-400 font-semibold">dangerous anti pattern</span>. It's like giving a house key to every delivery driver because one might need access someday. Figure out what you actually need, and request only that.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
