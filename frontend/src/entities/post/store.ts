import { create } from "zustand";

export interface IPostStore {
  posts: any[];
  setPosts: (posts: any[]) => void;
  selectedPost: any | null;
  setSelectedPost: (post: any) => void;
}

export const usePostStore = create<IPostStore>((set) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
}));
