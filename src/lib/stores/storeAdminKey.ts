import { create } from "zustand";

type AdminKeyStore = {
	adminKey: string | null;
	// eslint-disable-next-line no-unused-vars
	setAdminKey: (key: string) => void;
	clearAdminKey: () => void;
};

export const useAdminKeyStore = create<AdminKeyStore>((set) => ({
	adminKey: null,
	setAdminKey: (key) => set({ adminKey: key }),
	clearAdminKey: () => set({ adminKey: null }),
}));
