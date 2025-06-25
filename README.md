<h1 align="center">Klickbee CMS</h1>

<p align="center"><strong>The open-source CMS we always wanted. Monolithic. Visual. Built for speed.</strong></p>

<p align="center">
  <img alt="License" src="https://img.shields.io/badge/license-AGPLv3-green?style=flat-square">
  <img alt="Build" src="https://img.shields.io/badge/build-passing-brightgreen?style=flat-square">
  <img alt="Version" src="https://img.shields.io/badge/version-MVP-blue?style=flat-square">
  <img alt="Made by Stralya" src="https://img.shields.io/badge/made%20by-Stralya-4B5563?style=flat-square">
</p>

---

### 🧠 What is Klickbee CMS?

**Klickbee CMS** is a monolithic, open-source CMS designed to make developers fast and clients autonomous. Built with
Next.js & React, it integrates:

- A page builder interface
- Custom Post Types (CPT)
- Static & dynamic routing
- A clean admin UI
- And a dead-simple deployment model

Built for SaaS, portfolios, and high-perf websites.

---

### 🛋️ Architecture

#### FO (Front)

```
front/
├── static/[slug]
├── content/[cpt-type]/[cpt-slug]
```

#### BO (Admin)

```
/admin/[generated_key]/
├── auth
    ├── login
├── manage/
│   ├── content/[cpt-type]
│   ├── static/[slug]
│   ├── settings
│   └── contact
```

---

### 🚀 MVP Features

| Feature  | Description                                  |
|----------|----------------------------------------------|
| Pages    | Static pages: about, contact, etc.           |
| Content  | CPT system with full CRUD                    |
| Settings | Email, metadata, admin identity setup        |
| Builder  | Visual page builder (Webstudio.io or custom) |
| Sitemap  | Auto-generated sitemap                       |
| Contact  | Message system for contact requests          |
| Multi-BO | Admin UI in FR/EN                            |

---

### 👉 Admin UI Structure

- Contenu
	- CPT (collection + entries)
- Pages (static)
- Contact (requests)
- Réglages (admin setup, mail, i18n)

---

### 🌍 Features Coming Next

- 2D internal linking (smart mesh)
- AI-powered page generation
- Multilang frontend (i18n)
- Google Analytics & Search Console integration
- Broken link management

---

### 🧦 Stack

| Tech          | Description               |
|---------------|---------------------------|
| Next.js       | App Router + API routes   |
| React         | Modern UI interactions    |
| Prisma ORM    | PostgreSQL/SQLite support |
| Zustand       | Admin state management    |
| Tailwind CSS  | Utility styling           |
| shadcn/ui     | Headless UI components    |
| @stralya/auth | Stralya Auth Package      |

---

### 🚀 Getting Started

**Option 1: With npm**

```sh
npm i
npx prisma migrate dev --name init
npx prisma generate
npm run dev
```

**Option 2: With Docker Compose**

```sh
docker compose up -d
```

Then open [localhost:3000](http://localhost:3000), and enjoy!

---

### 🚧 Contributing

Klickbee CMS is built in the open. Feedback, ideas, PRs welcome.

See [`CONTRIBUTING.md`](./CONTRIBUTING.md)

---

## License

This project is licensed under the [GNU Affero General Public License v3.0](./LICENSE).

---

### 🌐 Maintained by [Stralya](https://github.com/stralya-company)

We build tools for digital creators.

- ✉️ contact@stralya.com
- 💬 [Discord](https://discord.gg/AetD8jjs)
- 💬 [Reddit](https://www.reddit.com/r/klickbee_cms/)
- 🌎 [stralya.com](https://stralya.com) *(coming soon)*

---

<p align="center">
  <em>Klickbee CMS. The CMS you'd build if you had time to build one.</em>
</p>
