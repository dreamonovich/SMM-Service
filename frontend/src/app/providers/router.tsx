import { Dashboard } from "@/pages/dashboard";
import { AuthenticationPage } from "@/pages/login";
import { createBrowserRouter } from "react-router-dom";
import { AuthProvider } from "./auth";
import { generateLayout } from "@/widgets/layout";
import { WorkspacePage } from "@/pages/workspace";
import { CreateWorkspacePage } from "@/pages/workspace/create";
import { CalendarPage } from "@/pages/calendar";
import { Channels } from "@/pages/channels";
import { Profile } from "@/pages/profile";
import { Archive } from "@/pages/archive";
import { LoginPage } from "@/pages/login/login";
import { Settings } from "@/pages/settings";
import { Invite } from "@/pages/invite";
import { Analytics } from "@/pages/analytics";
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
          {
            path: "/profile",
            element: <Profile />,
          },
        ],
      },
      {
        path: "/invite/:invitelink",

        element: <Invite />,
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
              { path: "calendar", element: <CalendarPage /> },
              {
                path: "channels",
                element: <Channels />,
              },
              {
                path: "stats",
                element: <Analytics />,
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
