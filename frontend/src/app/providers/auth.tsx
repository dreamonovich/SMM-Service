import { useUserStore } from "@/entities/user";
import { API_URL, TOKEN_HEADER } from "@/shared/lib/constants";
import { User } from "@/shared/lib/types";
import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthProvider: FC = () => {
  const user = useUserStore();
  const navigate = useNavigate();
  useEffect(() => {
    (async () => {
      const res = await fetch(API_URL + "/me", {
        headers: {
          Authorization: TOKEN_HEADER
        }
      });
      if (!res.ok) {
        navigate("/login");
      } else {
        user.setUser((await res.json()) as User);
      }
    })();
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};
