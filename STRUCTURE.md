# 📦 Feature Structure — Klickbee CMS

To keep the codebase clean, scalable, and contributor-friendly, Klickbee CMS uses a **feature-first modular architecture** inside the `src/feature/` folder.

---

## 🛡️ Folder Convention

Each feature lives in its own folder:

```
src/feature/<feature-name>/
├── store<Feature>.ts   → Zustand store (state)
├── use<Feature>.ts     → TanStack queries (data fetching)
├── api<Feature>.ts     → API logic (client-side)
├── <Feature>.tsx       → UI component (optional)
└── index.ts            → Barrel file (optional)
```

### Example

```
src/feature/user/
├── storeUser.ts
├── useUser.ts
├── apiUser.ts
└── UserForm.tsx
```

---

## 💡 Why This Pattern?

* 🔍 **Clarity**: Everything related to one feature is in the same folder
* 👥 **Ownership**: Easier for contributors to take ownership
* 🧠 **Scalability**: Easily split logic as features grow
* 📦 **Reusability**: Encourages modular thinking

---

## ✅ Guidelines for New Features

1. Create a folder in `src/feature/<your-feature>`
2. Add only what's needed:

	* Zustand store if state is required
	* `use*.ts` for queries or mutations (with TanStack Query)
	* `api*.ts` for any API logic (fetch, post, etc.)
3. Keep UI components inside the feature folder if they’re not reused globally.

---

## 🧬 Shared Logic

* Shared utilities, types, or constants go in `src/lib/`
* Global components in `src/components/`

---

Let’s keep it clean. Let’s scale it right. 🚀
