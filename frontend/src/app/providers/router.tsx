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
import { Profile } from "@/pages/profile";
import { Archive } from "@/pages/archive";
import { LoginPage } from "@/pages/login/login";
import { Settings } from "@/pages/settings";
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
        path: "/profile",
        element: <Profile />,
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
              { path: "", element: <WorkspacePage /> },
              { path: "calendar", element: <Calendar /> },
              {
                path: "channels",
                element: <Channels />,
              },
              {
                path: "stats",
                element: <Stats />,
              },
              {
                path: "archive",
                element: <Archive />,
              },
              {
                path: "settings",
                element: <Settings />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "/register",
    element: <AuthenticationPage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);
