import { User } from "@/shared/lib/types";
import { create } from "zustand";

export interface IUserStore {
  user: User | null;
  setUser: (user: User) => void;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));
