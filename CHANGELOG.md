# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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

[Unreleased]: https://github.com/CodeMeAPixel/NoAdmin/compare/v0.1.0...HEAD
[0.1.0]: https://github.com/CodeMeAPixel/NoAdmin/releases/tag/v0.1.0
