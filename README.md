<div align="center">
  <img src="public/logo.svg" alt="NoAdmin Logo" width="120" height="120" />
  
  # noadmin.info
  
  **Stop requesting Administrator permission. Build secure Discord bots.**

  [![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
  [![Next.js](https://img.shields.io/badge/Next.js-16.1.1-black)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8)](https://tailwindcss.com/)

  [Live Site](https://noadmin.info) • [Contributing](CONTRIBUTING.md) • [Report Bug](https://github.com/CodeMeAPixel/NoAdmin/issues)
</div>

---

## 🛡️ About

**noadmin.info** is an educational resource for Discord bot developers, promoting the principle of least privilege. The site teaches developers why requesting Administrator permission is harmful and provides tools to calculate the exact permissions their bots need.

### Why This Exists

Too many Discord bots request Administrator permission "for convenience" when they only need a handful of specific permissions. This practice:

- 🔓 Creates unnecessary security risks
- 😰 Erodes user trust
- ❌ Gets bots rejected from bot lists like [top.gg](https://top.gg) and [discord.bots.gg](https://discord.bots.gg)
- 💥 Can lead to catastrophic damage if the bot is compromised

## ✨ Features

- **📚 Educational Content** — Learn why least privilege matters for Discord bots
- **🔢 Permission Calculator** — Interactive tool to calculate exact permission integers
- **🤖 Bot Examples** — Real-world examples showing what permissions different bot types need
- **🔗 OAuth2 URL Generator** — Generate invite links with your Bot ID and calculated permissions
- **📱 Mobile Responsive** — Fully responsive design that works on all devices
- **🌙 Dark Theme** — Easy on the eyes, matching Discord's aesthetic

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/) (recommended)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/CodeMeAPixel/NoAdmin.git
   cd NoAdmin
   ```

2. **Install dependencies**
   ```bash
   bun install
   # or
   npm install
   ```

3. **Start the development server**
   ```bash
   bun dev
   # or
   npm run dev
   ```

4. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| [Next.js 16](https://nextjs.org/) | React framework with App Router |
| [React 19](https://react.dev/) | UI library |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Tailwind CSS 4](https://tailwindcss.com/) | Styling |
| [Radix UI](https://www.radix-ui.com/) | Accessible components |
| [Biome](https://biomejs.dev/) | Linting & formatting |

## 📁 Project Structure

```
noadmin/
├── public/
│   ├── logo.svg            # Transparent logo
│   ├── logo-solid.svg      # Logo with background
│   ├── favicon.svg         # Browser favicon
│   └── manifest.json       # PWA manifest
├── src/
│   ├── app/
│   │   ├── api/og/         # OG image API endpoint
│   │   ├── layout.tsx      # Root layout with metadata
│   │   ├── page.tsx        # Home page
│   │   ├── opengraph-image.tsx
│   │   └── twitter-image.tsx
│   └── components/
│       ├── Header.tsx
│       ├── HeroSection.tsx
│       ├── WhyPermissionsMatter.tsx
│       ├── HowPermissionsWork.tsx
│       ├── BotExamples.tsx
│       ├── PermissionChecklist.tsx
│       ├── CallToAction.tsx
│       └── Footer.tsx
├── biome.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `bun dev` | Start development server |
| `bun build` | Build for production |
| `bun start` | Start production server |
| `bun lint` | Run Biome linter |
| `bun format` | Format code with Biome |

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

### Quick Start for Contributors

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 🔗 Related Resources

- [Discord Developer Documentation](https://discord.com/developers/docs)
- [Discord Permissions Calculator](https://discordapi.com/permissions.html)
- [Discord Permissions Reference](https://discord.com/developers/docs/topics/permissions)
- [OAuth2 Authorization URL Generator](https://discord.com/developers/docs/topics/oauth2)

## 📄 License

This project is licensed under the AGPL 3.0 License see the [LICENSE](LICENSE) file for details.

## 💜 Acknowledgments

- The Discord developer community
- Everyone advocating for better bot security practices
- [top.gg](https://top.gg) and [discord.bots.gg](https://discord.bots.gg) for promoting permission best practices

---

<div align="center">
  <strong>Built with ❤️ for the Discord developer community</strong>
  <br />
  <sub>Not affiliated with Discord Inc.</sub>
</div>
