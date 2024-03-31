import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Dashboard = () => {
  const navigate = useNavigate()
  useEffect(() => {
    const lastOpenWorkflow = localStorage.getItem('last_open_workflow_id')

    if (lastOpenWorkflow) {
      navigate(`/workflows/${lastOpenWorkflow}`)
    }
  })
  return <></>;
};
