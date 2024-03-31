import { Dashboard } from "@/pages/dashboard";
import { AuthenticationPage } from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth";
import { generateLayout } from "@/widgets/layout";
import { WorkspacePage } from "@/pages/workspace";
import { CreateWorkspacePage } from "@/pages/workspace/create";
import { Calendar } from "@/pages/calendar";
import { Channels } from "@/pages/channels";
import { Stats } from "@/pages/stats";
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
            children: [
              { path: "/workspaces/:id/", element: <WorkspacePage /> },
              { path: "/workspaces/:id/calendar", element: <Calendar /> },
              {
                path: "/workspaces/:id/channels",
                element: <Channels />,
              },
              {
                path: "/workspaces/:id/stats",
                element: <Stats />,
              },
            ],
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
