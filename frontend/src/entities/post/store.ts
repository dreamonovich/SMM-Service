import { create } from "zustand";

interface Photo {
  url: string;
}

interface File {
  url: string;
}

export interface Post {
  id: number;
  creator: number;
  workspace: number;
  modified_at: string;
  created_at: string;
  photos: Photo[];
  files: File[];
  name: string;
  text: string;
  send_planned_at: string;
  number_of_confirmations: number;

  // 
  create: boolean
}

export interface IPostStore {
  posts: Post[];
  setPosts: (posts: Post[]) => void;
  selectedPost: Partial<Post> | null;
  setSelectedPost: (post: Partial<Post> | null) => void;
  updateSelected: (post: Partial<Post>) => void;
}

export const usePostStore = create<IPostStore>((set, get) => ({
  posts: [],
  setPosts: (posts) => set({ posts }),
  selectedPost: null,
  setSelectedPost: (post) => set({ selectedPost: post }),
  updateSelected: (post) =>
    set({ selectedPost: { ...get().selectedPost, ...post } }),
}));
