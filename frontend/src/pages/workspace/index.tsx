import { API_URL } from "@/shared/lib/constants";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const WorkspacePage = () => {
  const [loading, setLoading] = useState(true);
  const [workspace, setWorkspace] = useState(null);

  const { id } = useParams();
  const getData = async () => {
    const response = await fetch(API_URL + "/workspaces/" + id);
    const data = await response.json();
    setWorkspace(data);
    setLoading(false);
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
// добавить красивый лоадер
  return (
    <>
      {loading ? (
        <div>loading</div>
      ) : (
        <div>
          Workspace {id} {JSON.stringify(workspace)}
        </div>
      )}
    </>
  );
};
