import { useUserStore } from "@/entities/user";
import { API_URL } from "@/shared/lib/constants";
import { User } from "@/shared/lib/types";
import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const AuthProvider: FC = () => {
  const navigate = useNavigate();
  const user = useUserStore();
  useEffect(() => {
    (async () => {
      const res = await fetch(API_URL + "/user/info");
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
