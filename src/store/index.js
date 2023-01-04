import create from "zustand";
export const useAppStore = create((set) => ({
	isThrow: false,
	Throw: () => set((state) => ({ isThrow: true })),
	isFreeze: false,
	Freeze: () => set((state) => ({ isFreeze: true })),
	reset: () => set((state) => ({ isThrow: false, isFreeze: false })),
}));

//Action Creator
