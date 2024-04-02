import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { create } from "zustand";
import { Channel } from "../channels/ui/channels-list";
export type Workspace = {
  name: string;
  id: string;
  members: any[];
};

export interface IWorkspaceStore {
  workspaces: Workspace[];
  setWorkspaces: (workspaces: Workspace[]) => void;
  fetchWorkspaces: () => Promise<void>;
  selectedWorkspace: Workspace | null;
  setSelectedWorkspace: (workspace: Workspace) => void;
  fetchWorkspaceById: (id: string) => Promise<void>;

  channels: Channel[];
  setChannels: (channels: Channel[]) => void;
  fetchChannels: (workspaceId: number) => Promise<void>;
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
    set({ workspaces: await res.json() });
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

    set({ selectedWorkspace: data });
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
}));
