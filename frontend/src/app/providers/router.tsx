import { Dashboard } from "@/pages/dashboard";
import { AuthenticationPage } from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth";
import { Workspace } from "@/pages/workspace";

export const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/workspaces/:id",
        element: <Workspace />
      },
    ],
  },
  {
    path: "/login",
    element: <AuthenticationPage />,
  },
]);
