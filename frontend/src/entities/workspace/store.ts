import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { create } from "zustand";
import { Channel } from "../channels/ui/channels-list";
import { Post } from "../post";
export type Workspace = {
  name: string;
  id: string;
  members: any[];
  creator_user: any;
};

export interface IWorkspaceStore {
  workspaces: Workspace[];
  setWorkspaces: (workspaces: Workspace[]) => void;
  fetchWorkspaces: () => Promise<Workspace[]>;
  selectedWorkspace: Workspace | null;
  setSelectedWorkspace: (workspace: Workspace) => void;
  fetchWorkspaceById: (id: string) => Promise<Workspace | null>;

  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
  fetchChannels: (workspaceId: number) => Promise<void>;

  posts: Post[];
  setPosts: (posts: Post[]) => void;
  fetchPosts: (workspaceId: number) => Promise<void>;

  stats: Stat[];
  setStats: (posts: Stat[]) => void;
  fetchStats: (workspaceId: number) => Promise<void>;
}

export const useWorkspaceStore = create<IWorkspaceStore>((set) => ({
  workspaces: [],
  setWorkspaces: (workspaces) => set({ workspaces }),
  fetchWorkspaces: async () => {
    const res = await fetch(API_URL + "/workspace", {
      headers: {
        Authorization: TOKEN_HEADER,
      },
    });
    const data = await res.json();
    set({ workspaces: data });
    return data;
  },
  selectedWorkspace: null,
  setSelectedWorkspace: (work) => set({ selectedWorkspace: work }),
  fetchWorkspaceById: async (id: string) => {
    const res = await fetch(API_URL + `/workspace/${id}`, {
      headers: {
        Authorization: TOKEN_HEADER,
      },
    });
    const data = await res.json();
    if (!res.ok){
      return null
    }
    set({ selectedWorkspace: data });
    return data
  },

  channels: [],
  setChannels: (channels) => set({ channels }),
  fetchChannels: async (id) => {
    const response = await fetch(API_URL + "/workspace/" + id + "/channels", {
      method: "GET",
      headers: {
        Authorization: TOKEN_HEADER,
      },
    });
    const data = await response.json();
    set({ channels: data });
  },

  posts: [],
  setPosts: (posts) => set({ posts }),
  fetchPosts: async (id: number) => {
    const response = await fetch(API_URL + "/workspace/" + id + "/posts", {
      method: "GET",
      headers: {
        Authorization: TOKEN_HEADER,
      },
    });
    const data = await response.json();
    set({ posts: data });
    
  },
  stats: [],
  setStats: (stats) => set({ stats }),
  fetchStats: async (id: number) => {
    const response = await fetch(API_URL + "/workspace/" + id + "/analytics", {
      method: "GET",
      headers: {
        Authorization: TOKEN_HEADER,
      },
    });
    const data = await response.json();
    set({ stats: data });
    
  }
}));
