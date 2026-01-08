# Contributing to NoAdmin

First off, thank you for considering contributing to **noadmin.info**! 🎉

This project aims to educate Discord bot developers about security best practices, and every contribution helps make the Discord ecosystem more secure.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)
- [Commit Messages](#commit-messages)

## 📜 Code of Conduct

This project and everyone participating in it is governed by our commitment to maintaining a welcoming, inclusive environment. By participating, you agree to:

- Be respectful and inclusive in your language and actions
- Accept constructive criticism gracefully
- Focus on what's best for the community
- Show empathy towards other community members

## 🤔 How Can I Contribute?

### 🐛 Reporting Bugs

If you find a bug, please [open an issue](https://github.com/CodeMeAPixel/NoAdmin/issues/new) with:

- A clear, descriptive title
- Steps to reproduce the issue
- Expected vs actual behavior
- Screenshots (if applicable)
- Your browser/device information

### 💡 Suggesting Features

Have an idea to improve the site? We'd love to hear it! Please [open an issue](https://github.com/CodeMeAPixel/NoAdmin/issues/new) with:

- A clear description of the feature
- Why this feature would be useful
- Any examples or mockups (if applicable)

### 📝 Improving Documentation

Documentation improvements are always welcome! This includes:

- Fixing typos or unclear language
- Adding examples or explanations
- Translating content

### 🔧 Code Contributions

Ready to write some code? Here are some areas where help is appreciated:

- **New Bot Examples** — Add permission breakdowns for more bot types
- **Permission Data** — Keep the permission list up-to-date with Discord's API
- **Accessibility** — Improve screen reader support and keyboard navigation
- **Performance** — Optimize loading times and bundle size
- **Testing** — Add unit or integration tests
- **Mobile UX** — Improve the mobile experience

## 🛠️ Development Setup

### Prerequisites

- [Node.js](https://nodejs.org/) 18+ or [Bun](https://bun.sh/) (recommended)
- [Git](https://git-scm.com/)

### Setup Steps

1. **Fork the repository** on GitHub

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/NoAdmin.git
   cd NoAdmin
   ```

3. **Add upstream remote**
   ```bash
   git remote add upstream https://github.com/CodeMeAPixel/NoAdmin.git
   ```

4. **Install dependencies**
   ```bash
   bun install
   ```

5. **Start the development server**
   ```bash
   bun dev
   ```

6. **Open [http://localhost:3000](http://localhost:3000)**

### Keeping Your Fork Updated

```bash
git fetch upstream
git checkout main
git merge upstream/main
```

## 🔀 Pull Request Process

1. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make your changes**
   - Write clean, readable code
   - Follow the [style guide](#style-guide)
   - Test your changes thoroughly

3. **Run linting and formatting**
   ```bash
   bun lint
   bun format
   ```

4. **Commit your changes**
   ```bash
   git commit -m "feat: add amazing new feature"
   ```

5. **Push to your fork**
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request**
   - Use a clear, descriptive title
   - Reference any related issues
   - Describe what changes you made and why
   - Include screenshots for UI changes

### PR Review Process

- A maintainer will review your PR
- You may be asked to make changes — this is normal!
- Once approved, your PR will be merged
- Celebrate! 🎉

## 🎨 Style Guide

### TypeScript

- Use TypeScript for all new files
- Prefer `interface` over `type` for object shapes
- Use explicit return types for functions
- Avoid `any` — use `unknown` if needed

### React

- Use functional components with hooks
- Keep components focused and single-purpose
- Extract reusable logic into custom hooks
- Use semantic HTML elements

### Tailwind CSS

- Follow mobile-first responsive design (`sm:`, `md:`, `lg:`)
- Use the existing color palette (gray-950, red-500, orange-600, etc.)
- Prefer utility classes over custom CSS
- Group related classes logically

### File Naming

- Components: `PascalCase.tsx` (e.g., `HeroSection.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatPermission.ts`)
- Constants: `SCREAMING_SNAKE_CASE`

## 💬 Commit Messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

| Type | Description |
|------|-------------|
| `feat` | New feature |
| `fix` | Bug fix |
| `docs` | Documentation only |
| `style` | Formatting, no code change |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `perf` | Performance improvement |
| `test` | Adding or updating tests |
| `chore` | Maintenance tasks |

### Examples

```bash
feat(calculator): add copy button for OAuth2 URL
fix(header): resolve mobile menu overflow issue
docs(readme): add contributing section
style(components): format with biome
refactor(permissions): extract permission constants
```

## ❓ Questions?

If you have questions, feel free to:

- [Open an issue](https://github.com/CodeMeAPixel/NoAdmin/issues/new) with the `question` label
- Check existing issues for similar questions

---

Thank you for contributing to making Discord bots more secure! 🛡️
