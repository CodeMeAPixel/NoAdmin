"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { GitHubIcon, Icon } from "@/components/ui/Icon";
import { GITHUB_URL, NAV } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname) setOpen(false);
  }, [pathname]);

  const active = (href: string) =>
    pathname === href || pathname?.startsWith(`${href}/`);

  return (
    <header
      className={`sticky top-0 z-50 border-b transition-colors duration-200 ${
        scrolled || open
          ? "border-white/[0.08] bg-black/80 backdrop-blur-md"
          : "border-transparent bg-black/0"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2.5">
          <Image src="/logo.svg" alt="" width={26} height={26} priority />
          <span className="text-sm font-semibold tracking-tight text-white">
            noadmin
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active(item.href) ? "page" : undefined}
              className={`rounded-md px-3 py-1.5 text-sm transition-colors ${
                active(item.href)
                  ? "bg-white/[0.08] text-white"
                  : "text-zinc-400 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-zinc-500 transition-colors hover:text-white"
          >
            <GitHubIcon />
          </a>
          <Link
            href="/analyze"
            className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-black transition-colors hover:bg-zinc-200"
          >
            Check a bot
          </Link>
        </div>

        <button
          type="button"
          className="-mr-1.5 rounded-md p-1.5 text-zinc-300 transition-colors hover:text-white md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          <Icon name={open ? "x" : "menu"} className="h-5 w-5" />
        </button>
      </div>

      {open && (
        <div className="border-t border-white/[0.08] px-4 pb-4 pt-2 md:hidden">
          <nav className="flex flex-col gap-0.5" aria-label="Main">
            {[{ name: "Home", href: "/" }, ...NAV].map((item) => {
              const isActive =
                item.href === "/" ? pathname === "/" : active(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={`rounded-md px-3 py-2.5 text-[15px] transition-colors ${
                    isActive
                      ? "bg-white/[0.08] text-white"
                      : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </nav>
          <div className="mt-3 grid grid-cols-2 gap-2 border-t border-white/[0.06] pt-3">
            <Link
              href="/analyze"
              className="rounded-md bg-white px-4 py-2.5 text-center text-sm font-medium text-black"
            >
              Check a bot
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-md border border-white/[0.1] px-4 py-2.5 text-sm text-zinc-200"
            >
              <GitHubIcon /> GitHub
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
