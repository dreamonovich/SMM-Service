import { useUserStore } from "@/entities/user";
import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { User } from "@/shared/lib/types";
import { FC, useEffect } from "react";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { useWorkspaceStore } from "@/entities/workspace";

export const AuthProvider: FC = () => {
  const { fetchWorkspaceById, workspaces, setSelectedWorkspace } =
    useWorkspaceStore();
  const { id } = useParams();
  const user = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await fetch(API_URL + "/me", {
        headers: {
          Authorization: TOKEN_HEADER,
        },
      });
      if (!res.ok) {
        navigate("/login");
      } else {
        user.setUser((await res.json()) as User);
      }
    })();
  }, []);
  useEffect(() => {
    (async () => {
      if (id) {
        const res = await fetchWorkspaceById(id);
        if (!res) {
          if (workspaces.length) {
            setSelectedWorkspace(workspaces[0]);
            navigate("/")
          } else {
            navigate("/workspaces/create");
          }
        }
      }
    })();
  }, [window.location]);
  return (
    <>
      <Outlet />
    </>
  );
};
