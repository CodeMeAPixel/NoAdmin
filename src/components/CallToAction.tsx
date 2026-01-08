export function CallToAction() {
  return (
    <section className="relative w-full px-4 py-12 sm:py-24 bg-gray-950 overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 grid-pattern opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] sm:w-[800px] h-[400px] sm:h-[800px] bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 rounded-full blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl text-center px-2">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 px-3 sm:px-4 py-1.5 sm:py-2 text-xs sm:text-sm font-medium text-blue-400 ring-1 ring-blue-500/20 mb-6 sm:mb-8">
          <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          Best Practice
        </div>

        {/* Headline */}
        <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
          Make Security<br />
          <span className="gradient-text">Your Default</span>
        </h2>

        <p className="text-sm sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto leading-relaxed">
          The principle of least privilege isn't just a security standard it's the foundation of trustworthy bot development. Start today.
        </p>

        {/* Checklist */}
        <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-w-2xl mx-auto mb-8 sm:mb-12 text-left">
          {[
            'Request only permissions your bot actually uses',
            'Never use Administrator "just in case"',
            'Let server owners control your bot with overrides',
            'Review and minimize permissions as features change',
            'Document why each permission is needed',
            'Handle permission errors gracefully in code',
          ].map((item, idx) => (
            <div
              key={idx}
              className="flex items-center gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-white/5 ring-1 ring-white/10"
            >
              <div className="shrink-0 w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-green-500/20 flex items-center justify-center">
                <svg className="w-3 h-3 sm:w-4 sm:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="text-gray-300 text-xs sm:text-sm">{item}</span>
            </div>
          ))}
        </div>

        {/* CTA buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12">
          <a
            href="#checklist"
            className="group inline-flex items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white shadow-lg shadow-blue-500/25 hover:shadow-purple-500/25 hover:from-blue-500 hover:to-purple-500 transition-all duration-300 text-sm sm:text-base"
          >
            Use the Permission Calculator
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
          <a
            href="https://discord.com/developers/docs/topics/permissions"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-lg sm:rounded-xl bg-white/5 px-6 sm:px-8 py-3 sm:py-4 font-semibold text-white ring-1 ring-white/10 hover:bg-white/10 hover:ring-white/20 transition-all duration-300 text-sm sm:text-base"
          >
            Discord Docs
            <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* Footer note */}
        <p className="text-xs sm:text-sm text-gray-500">
          Built for the Discord bot developer community. Share this resource to help others build more secure bots.
        </p>
      </div>
    </section>
  );
}
