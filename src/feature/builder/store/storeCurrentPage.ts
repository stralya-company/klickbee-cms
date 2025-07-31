import { create } from "zustand";

type CurrentPageStore = {
	currentPage: string;
	setCurrentPage: (page: string) => void;
	clearCurrentPage: () => void;
};

export const useCurrentPageStore = create<CurrentPageStore>((set) => ({
	clearCurrentPage: () => set({ currentPage: "" }),
	currentPage: "",
	setCurrentPage: (page) => set({ currentPage: page }),
}));
