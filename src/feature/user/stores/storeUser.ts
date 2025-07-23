import { create } from "zustand";

type User = { id: string; email: string } | null;

interface UserStore {
	user: User;
	// eslint-disable-next-line no-unused-vars
	setUser: (user: User) => void;
	logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
	logout: () => set({ user: null }),
	setUser: (user) => set({ user: user }),
	user: null,
}));
