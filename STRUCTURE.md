# 📦 Feature Structure — Klickbee CMS

To keep the codebase clean, scalable, and contributor-friendly, Klickbee CMS uses a **feature-first modular architecture
** inside the `src/feature/` folder.

---

## 🛡️ Folder Convention

Each feature lives in its own folder:

```
src/feature/<feature-name>/
├── stores/store<Feature>[Specification].ts   → Zustand store (state)
├── queries/use<Feature>[Specification].ts     → TanStack queries (data fetching)
├── api/api<Feature>[Specification].ts     → API logic (client-side)
├── components/<Feature>[Specification].tsx       → UI component (optional)
└── index.ts            → Barrel file (optional)
```

[Specification] is optional and can be used to clarify the file's purpose or functionality.

### Example

```
src/feature/user/
├── stores/storeUser.ts
├── queries/useUser.ts
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
