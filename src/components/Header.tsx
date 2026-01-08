import Link from 'next/link';
import Image from 'next/image';
import { memo } from 'react';

function HeaderComponent() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-4 py-4 sm:py-4 bg-gray-950/80">
      <nav className="mx-auto max-w-6xl flex items-center justify-between rounded-xl sm:rounded-2xl bg-gray-900/80 ring-1 ring-white/10 px-3 sm:px-6 py-2.5 sm:py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 sm:gap-3">
          <Image
            src="/logo.svg"
            alt="NoAdmin Logo"
            width={40}
            height={40}
            className="w-8 h-8 sm:w-10 sm:h-10"
          />
          <div>
            <div className="text-white font-semibold text-sm sm:text-base">noadmin</div>
            <div className="text-[10px] sm:text-xs text-gray-400 hidden xs:block">.info</div>
          </div>
        </Link>

        {/* Navigation links - hidden on mobile */}
        <div className="hidden lg:flex items-center gap-1">
          <a
            href="#bot-examples"
            className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Bot Examples
          </a>
          <a
            href="#checklist"
            className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
          >
            Calculator
          </a>
          <a
            href="https://discord.com/developers/docs/topics/permissions"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 text-sm text-gray-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors flex items-center gap-1"
          >
            Docs
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </a>
        </div>

        {/* CTA button */}
        <a
          href="#checklist"
          className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg sm:rounded-xl bg-blue-500/20 text-blue-400 text-xs sm:text-sm font-medium ring-1 ring-blue-500/30 hover:bg-blue-500/30 transition-colors"
        >
          Get Started
        </a>
      </nav>
    </header>
  );
}

export const Header = memo(HeaderComponent);