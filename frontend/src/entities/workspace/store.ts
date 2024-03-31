import { API_URL } from "@/shared/lib/constants";
import { create } from "zustand";
type Workspace = {
    label: string;
    id: string;
  };
export interface IWorkspaceStore {
  workspaces: Workspace[];
  setWorkspaces: (workspaces: Workspace[]) => void;
  fetchWorkspaces: () => void;
}

export const useWorkspaceStore = create<IWorkspaceStore>((set) => ({
  workspaces: [],
  setWorkspaces: (workspaces) => set({ workspaces }),
  fetchWorkspaces: async () => {
    const res  = await fetch(API_URL)
    set({ workspaces: await res.json() })
  }
}));
