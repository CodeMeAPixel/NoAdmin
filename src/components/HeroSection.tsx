export function HeroSection() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-gray-950 px-4 pb-16 sm:py-20">
      {/* Simplified background - removed expensive blur-3xl */}
      <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(circle at 25% 25%, #3b82f6 0%, transparent 50%)' }} />
      <div className="absolute inset-0 opacity-10" style={{ background: 'radial-gradient(circle at 75% 75%, #ec4899 0%, transparent 50%)' }} />

      <div className="relative z-10 mx-auto max-w-5xl text-center px-2">
        {/* Badge */}
        <div className="mb-6 sm:mb-8 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-red-400 ring-1 ring-red-500/20">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" style={{ animation: 'none' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500" />
          </span>
          Security Alert
        </div>

        {/* Main headline */}
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl mb-6 sm:mb-8 text-white">
          Stop Using
          <span className="block mt-1 sm:mt-2 gradient-text">Administrator</span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-400 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed px-2">
          Your Discord bot doesn't need god mode permissions.{' '}
          <span className="text-white font-medium">Administrator bypasses every security control</span>{' '}
          and puts servers at risk. Learn the right way.
        </p>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-12 sm:mb-16 px-4 sm:px-0">
          <a
            href="#bot-examples"
            className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 hover:from-blue-500 hover:to-blue-400 transition-all duration-300 text-sm sm:text-base"
          >
            See Bot Examples
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="#checklist"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-white/5 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-all duration-300 backdrop-blur-sm text-sm sm:text-base"
          >
            Permission Calculator
          </a>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-2 sm:gap-6 max-w-2xl mx-auto px-2">
          <div className="rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-3 sm:p-6">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5 sm:mb-1">8</div>
            <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 leading-tight">Admin = All Perms</div>
          </div>
          <div className="rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-3 sm:p-6">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-0.5 sm:mb-1">0</div>
            <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 leading-tight">Bots Need It</div>
          </div>
          <div className="rounded-xl sm:rounded-2xl bg-white/5 backdrop-blur-sm ring-1 ring-white/10 p-3 sm:p-6">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-red-400 mb-0.5 sm:mb-1">∞</div>
            <div className="text-[10px] sm:text-xs md:text-sm text-gray-400 leading-tight">Potential Damage</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator - hidden on very small screens */}
      <div className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 text-gray-500 hidden sm:flex">
        <span className="text-xs uppercase tracking-widest">Scroll</span>
        <svg className="w-5 h-5 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
