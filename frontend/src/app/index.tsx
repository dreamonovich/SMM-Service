import { RouterProvider } from "react-router-dom";
import { router } from "./providers/router";
import './providers/i18n';


export const App = () => {
  return (
    <RouterProvider router={router} />
  )
}