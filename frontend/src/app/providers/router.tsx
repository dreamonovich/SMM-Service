import { Dashboard } from "@/pages/dashboard";
import { AuthenticationPage } from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth";
import { generateLayout } from "@/widgets/layout";
import { WorkspacePage } from "@/pages/workspace";
import { CreateWorkspacePage } from "@/pages/workspace/create";
import { Calendar } from "@/pages/calendar";

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
        Component: generateLayout(false),
        children: [
          {
            path: "",
            element: <CreateWorkspacePage />,
          },
        ],
      },
      {
        path: "/workspaces/:id",
        Component: generateLayout(true),
        children: [
          {
            path: "",
            element: <WorkspacePage />,
          },
        ],
      },
      {
        path: "/workspaces/:id/calendar",
        Component: generateLayout(true),
        children: [
          {
            path: "",
            element: <Calendar />,
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
