import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { create } from "zustand";
export type Workspace = {
  name: string;
  id: string;
  members: any[],
};

export interface IWorkspaceStore {
  workspaces: Workspace[];
  setWorkspaces: (workspaces: Workspace[]) => void;
  fetchWorkspaces: () => void;
  selectedWorkspace: Workspace | null;
  setSelectedWorkspace: (workspace: Workspace) => void;
  fetchWorkspaceById: (id: string) => Promise<void>;
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
}));
