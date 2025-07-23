import { create } from 'zustand'

type LangState = {
	lang: string | null
	// eslint-disable-next-line no-unused-vars
	setLang: (lang: string) => void
}

export const useLangStore = create<LangState>((set) => ({
	lang: null,
	setLang: (lang) => set({ lang }),
}))
