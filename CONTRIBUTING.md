# Contributing to Klickbee CMS

We welcome contributions of all kinds — bug fixes, features, improvements, ideas, or even typo corrections.

## 🚀 Getting Started

Join us on Discord for real-time discussions: [Join Klickbee Discord](https://discord.gg/keZVW6fE)

1. **Fork** this repository
2. **Clone** your fork locally: `git clone https://github.com/your-username/klickbee-cms`
3. Create a new branch: `git checkout -b feature/your-feature`
4. Install dependencies: `npm install`
5. Start the dev server: `npm run dev`
6. Make your changes
7. Commit using [Conventional Commits](https://www.conventionalcommits.org/)
8. Push and open a **Pull Request**

---

## 📁 Project Structure

```
klickbee-cms/
├─ app/               # Next.js App Router
├─ lib/               # Helpers & server utils
├─ components/        # Reusable UI blocks
├─ prisma/            # Prisma schema + migrations
├─ public/            # Static assets
├─ styles/            # Tailwind config and globals
```

Admin and frontend are unified — monolith style — and separated logically under routes.

---

## 🧪 Running Locally

- **Install deps**: `npm install`
- **Start dev**: `npm run dev`
- Or use Docker: `docker compose up`

---

## ✏️ Code Style

- Use `eslint` via `npm run lint`
- Use Tailwind utility classes
- Use [shadcn/ui](https://ui.shadcn.dev/) components
- Prefer Zustand for global state

No `pnpm` for now. Stick to `npm` unless updated.

---

## ✅ Pull Request Checklist

- [ ] Your branch is up to date with `main`
- [ ] Code runs locally without errors
- [ ] Code is linted (`npm run lint`)
- [ ] One feature or fix per PR
- [ ] PR includes clear title and description

---

## 🤝 Code of Conduct

We follow a [Code of Conduct](./CODE_OF_CONDUCT.md) that ensures respectful and inclusive collaboration.

---

## 📬 Need help or have ideas?

Open an issue, start a GitHub discussion, or email us at `contact@stralya.com`

Thanks for helping us make Klickbee CMS better 💜
