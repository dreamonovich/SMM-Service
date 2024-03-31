import { CreateWorkflow } from "@/features/workspace/create";
import { API_URL } from "@/shared/lib/constants";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const lastOpenWorkflow = localStorage.getItem('last_open_workflow_id')

    if (lastOpenWorkflow) {
      navigate(`/workflows/${lastOpenWorkflow}`)
    }

    (async () => {
      const res = await fetch(API_URL + '/workspaces')
      const data = await res.json(); 
    })()
  })
  return <div className="w-full h-full flex justify-center pt-4"><CreateWorkflow /></div>;
};
