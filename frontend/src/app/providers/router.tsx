import { Dashboard } from "@/pages/dashboard";
import { AuthenticationPage } from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth";
import { generateLayout } from "@/widgets/layout";
import { ComponentType } from "react";
import { CreateWorkflowPage } from "@/pages/workspace/create";

export const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/workspaces/create",
        Component: generateLayout(true) as unknown as ComponentType,
        children: [
          {
            path: "",
            element: <CreateWorkflowPage/>
          }
        ]
      },
      {
        path: "/workspaces/:id",
        Component: generateLayout(true) as unknown as ComponentType,
        children: [
          {
            path: "",
            element: <div></div>
          }
        ]
      },
    ],
  },
  {
    path: "/login",
    element: <AuthenticationPage />,
  },
]);
