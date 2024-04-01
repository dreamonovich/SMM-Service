import { useWorkspaceStore } from "@/entities/workspace";
import { CreateWorkspace } from "@/features/workspace/create";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();

  const { workspaces } = useWorkspaceStore();

  useEffect(() => {
    const lastOpenWorkspace = localStorage.getItem("last_open_workspace_id");

    if (lastOpenWorkspace) {
      navigate(`/workspaces/${lastOpenWorkspace}`);
    } else {
      if (!workspaces) return;
      const id = workspaces[0].id
      navigate(`/workspaces/${id}`)
    }
  }, [workspaces]);
  return (
    <div className="w-full h-full flex justify-center pt-4">
      <CreateWorkspace />
    </div>
  );
};
