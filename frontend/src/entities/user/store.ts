import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { User } from "@/shared/lib/types";
import { create } from "zustand";

export interface IUserStore {
  user: User | null;
  setUser: (user: User) => void;
  fetchUser: () => Promise<User>;
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  fetchUser: async () => {
    const res = await fetch(API_URL + "/me", {
      headers: {
        Authorization: TOKEN_HEADER,
      },
    });
    const data = await res.json();

    set({ user: data });
    return data;
  },
}));
