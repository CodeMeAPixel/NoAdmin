# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.2.0] - 2026-09-26

### Changed

- Redesigned the site to match Omniplex and its status page: black and zinc
  palette, a sticky header, risk-coloured status indicators instead of
  decorative gradients, and a proper multi-page structure instead of one long
  scrolling page.
- The permission catalog is now a single source (`src/lib/permissions.ts`)
  that every page and tool reads from. Values are computed with `BigInt` from
  each permission's bit, so hardcoded totals can no longer drift (the old
  Ticket Bot example showed 268559888 when its listed permissions add up to
  268561488).
- The home page now leads with a "check a bot's invite" box and links to each
  tool.
- The bot examples now use Pin Messages where they previously asked for
  Manage Messages only to pin, and each example separates required from
  optional permissions.

### Added

- The 11 permissions that were missing (bits 41 to 52, including Pin Messages,
  Bypass Slowmode, Send Polls and Use External Apps), for all 52. Verified
  against Discord's documentation on 2026-09-26, with risk level, 2FA
  requirement, channel types and a "what if the token leaks" note on each.
- `/calculator`: category grouping, risk filter, search, starting presets from
  the bot examples, import from a number or invite link, a live verdict,
  shareable URL state, an invite builder with scope toggles, and code snippets
  for discord.js, discord.py, Serenity, JDA, DiscordGo and
  `default_member_permissions`.
- `/analyze`: paste an invite link or permission number to get a verdict,
  findings (redundant permissions next to Administrator, Manage Messages vs
  Pin Messages, webhooks plus @everyone, unknown bits, missing bot scope, 2FA
  impact), the closest bot example, and a per-permission breakdown. It runs
  entirely in the browser.
- `/permissions` and `/permissions/[slug]`: a reference page for every
  permission.
- `/examples/[slug]`: a page per bot type, including what it does not need
  and why.
- `/guides`: eight short guides (why not Administrator, bitfields, channel
  overwrites, role hierarchy, intents vs permissions, slash command
  permissions, handling missing permissions, and checking a bot before adding
  it).
- `/badge` and `/api/badge`: an SVG README badge generated from a bot's real
  invite permissions.
- Per-page Open Graph images for permissions, examples and guides, plus
  `sitemap.xml` and `robots.txt`.
- A new logo: a white shield containing a crossed-out "A", with the red slash
  cut cleanly out of the letter. It is defined once in `src/lib/brand.ts`, and
  `bun run brand` regenerates `public/logo.svg`, `public/logo-solid.svg`,
  `public/favicon.svg`, `src/app/icon.svg` and a 16/32/48px
  `src/app/favicon.ico` from it.
- File-based icons and manifest following the Next.js metadata conventions:
  `icon.svg`, PNG icons at 32/192/512px (`icon1.tsx` with
  `generateImageMetadata`), a full-bleed 180px `apple-icon.tsx`, and
  `manifest.ts` with shortcuts to the calculator, analyzer and reference.
- Open Graph images now use the real logo and bundled Geist fonts
  (`assets/fonts`, OFL), show the page URL, and carry data chips such as a
  permission's risk, 2FA requirement and value. Every section page has one,
  and all of them are generated at build time.
- JSON-LD (`WebSite` and `WebApplication`) on the home page.
- Per-page metadata: every page sets its own title, description, canonical
  URL, Open Graph and Twitter metadata through `pageMetadata()` in
  `src/lib/metadata.ts`, so shared links preview the page itself rather than
  the home page.

### Removed

- `public/manifest.json`, replaced by `src/app/manifest.ts`.
- The root `twitter-image`. With multiple pages it would override each page's
  own image, so X now uses each page's Open Graph image instead.
- `tailwind.config.ts`, which Tailwind v4 was ignoring. That is why the
  accordion animations defined in it never ran. Theme values now live in
  `globals.css`.
- The unused `validation.ts` helper and the old single-page section
  components.

## [0.1.0] - 2026-01-07

### Added

#### 🎨 Core Site
- Initial site launch at [noadmin.info](https://noadmin.info)
- Dark theme design matching Discord's aesthetic
- Fully responsive layout for mobile, tablet, and desktop
- Custom SVG logo with shield + prohibition symbol design
- Favicon and PWA manifest support

#### 📚 Educational Content
- **Hero Section** — Eye-catching introduction explaining the "No Admin" philosophy
- **Why Permissions Matter** — Four key reasons to avoid Administrator permission:
  - Security Risk awareness
  - User Trust building
  - Bot List Approval requirements (top.gg, discord.bots.gg)
  - Damage Limitation principles
- **How Permissions Work** — Technical explanation of Discord's permission system:
  - Bitfield calculation breakdown
  - Permission integer examples
  - Visual permission hierarchy

#### 🤖 Bot Examples
- Interactive accordion with real-world bot type examples:
  - Moderation Bot (Ban, Kick, Timeout, Manage Messages)
  - Music Bot (Connect, Speak, Voice Activity)
  - Leveling Bot (Send Messages, Manage Roles, Read History)
  - Utility Bot (Embed Links, Attach Files, Add Reactions)
- Each example shows required permissions vs Administrator comparison

#### 🔢 Permission Calculator
- Interactive checklist with 30+ Discord permissions
- Organized by category:
  - General Permissions
  - Membership Permissions
  - Text Channel Permissions
  - Voice Channel Permissions
  - Stage Channel Permissions
  - Events Permissions
  - Advanced Permissions
- Real-time permission integer calculation
- Copy-to-clipboard functionality
- **Bot ID Input** — Enter your bot's application ID for instant OAuth2 URL generation
- Snowflake validation (17-19 digit Discord IDs)
- Direct "Open Invite" button when Bot ID is provided

#### 🔗 OAuth2 Integration
- Dynamic OAuth2 authorization URL generation
- Pre-filled with `bot` and `applications.commands` scopes
- Calculated permissions automatically included

#### 📱 Responsive Design
- Mobile-first approach with Tailwind CSS breakpoints
- Collapsible navigation on mobile
- Touch-friendly interactive elements
- Optimized typography scaling

#### 🖼️ Social & SEO
- Open Graph image generation (`opengraph-image.tsx`)
- Twitter card image generation (`twitter-image.tsx`)
- API endpoint for custom OG images (`/api/og`)
- Comprehensive metadata with keywords
- Canonical URLs and robots configuration

#### 📄 Documentation
- Comprehensive README with setup instructions
- Contributing guide (CONTRIBUTING.md)
- Security policy (SECURITY.md)
- GitHub issue templates (bug report, feature request)
- Pull request template

### Technical Stack

- **Framework**: Next.js 16.1.1 with App Router
- **UI Library**: React 19.2.3
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 4
- **Components**: Radix UI (Accordion, Tooltip, Dialog)
- **Linting**: Biome 2.2.0
- **Package Manager**: Bun

---

[Unreleased]: https://github.com/CodeMeAPixel/NoAdmin/compare/v0.2.0...HEAD
[0.2.0]: https://github.com/CodeMeAPixel/NoAdmin/compare/v0.1.0...v0.2.0
[0.1.0]: https://github.com/CodeMeAPixel/NoAdmin/releases/tag/v0.1.0
