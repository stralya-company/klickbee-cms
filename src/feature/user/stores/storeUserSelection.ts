import { create } from "zustand";

interface UserSelectionStore {
	clearSelection: (() => void) | null;
	setClearSelection: (fn: () => void) => void;
}

export const useUserSelectionStore = create<UserSelectionStore>((set) => ({
	clearSelection: null,
	setClearSelection: (fn) => set({ clearSelection: fn }),
}));
