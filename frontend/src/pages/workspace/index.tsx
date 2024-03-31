import { API_URL } from "@/shared/lib/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const WorkspacePage = () => {
  const [workspace, setWorkspace] = useState(null)
  const { id } = useParams();
  const getData = async () => {
    const response = await fetch(API_URL + "/workflows/" + id)
    const data = await response.json()
    setWorkspace(data);
    console.log(data)
  };
  useEffect(() => {
    getData();
  }, []);

  return <div>Workspace {id} {JSON.stringify(workspace)}</div>;
};
