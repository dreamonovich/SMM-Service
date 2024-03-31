import { CreateWorkspace } from "@/features/workspace/create";
import { API_URL } from "@/shared/lib/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const lastOpenWorkspace = localStorage.getItem("last_open_workspace_id");

    if (lastOpenWorkspace) {
      navigate(`/workspaces/${lastOpenWorkspace}`);
    }

    (async () => {
      const res = await fetch(API_URL + "/workspace");
      await res.json();
    })();
  });
  return (
    <div className="w-full h-full flex justify-center pt-4">
      <CreateWorkspace />
    </div>
  );
};
