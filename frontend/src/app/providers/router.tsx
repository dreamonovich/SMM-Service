import { Dashboard } from "@/pages/dashboard";
import { AuthenticationPage } from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth";
import { generateLayout } from "@/widgets/layout";
import { Workspace } from "@/pages/workspace";
import { CreateWorkflowPage } from "@/pages/workspace/create";

export const router = createBrowserRouter([
  {
    Component: AuthProvider,
    children: [
      {
        path: "/",
        Component: generateLayout(false),
        children: [
          {
            path: "/",
            element: <Dashboard />,
          },
        ],
      },
      {
        path: "/workspaces/create",
        Component: generateLayout(true),
        children: [
          {
            path: "",
            element: <CreateWorkflowPage/>
          }
        ]
      },
      {
        path: "/workspaces/create",
        Component: generateLayout(true),
        children: [
          {
            path: "",
            element: <CreateWorkflowPage/>
          }
        ]
      },
      {
        path: "/workspaces/:id",
        Component: generateLayout(true),
        children: [
          {
            path: "",
            element: <Workspace />,
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    element: <AuthenticationPage />,
  },
]);
