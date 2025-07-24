import { create } from "zustand";
import { persist } from "zustand/middleware";

type AdminKeyStore = {
	adminKey: string | null;
	// eslint-disable-next-line no-unused-vars
	setAdminKey: (key: string) => void;
	clearAdminKey: () => void;
};

export const useAdminKeyStore = create<AdminKeyStore>()(
	persist(
		(set) => ({
			adminKey: null,
			clearAdminKey: () => set({ adminKey: null }),
			setAdminKey: (key) => set({ adminKey: key }),
		}),
		{
			name: "admin-key-storage", // clé dans localStorage
		},
	),
);
