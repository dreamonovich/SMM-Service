import { useUserStore } from "@/entities/user";
import { API_URL } from "@/shared/lib/constants";
import { User } from "@/shared/lib/types";
import { FC, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
//WARNING!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! UNCOMMENT REGISTRATION CHECK
export const AuthProvider: FC = () => {
  const navigate = useNavigate();
  const user = useUserStore();
  const options = {
    method: 'GET',
    headers: {
      token: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzEyMzUwMzg4LCJpYXQiOjE3MTE5MTgzODgsImp0aSI6IjI1YzFjYmQ4YjQzMDQwYjk4YmUxZWJlZDczYjEzOWY0IiwidXNlcl9pZCI6MX0.Dzin-obC7zu0GFTZoyXb1R-l6aPBz43Rb7YchCBwA78"
    },
  };
  useEffect(() => {
    (async () => {
      const res = await fetch(API_URL + "/me", {
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem('token')
        }
      });
      if (!res.ok) {
        console.log("not registered")
        //navigate("/login");
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
