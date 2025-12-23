import { createBrowserRouter } from "react-router";
import App from "./App";
import { lazy } from "react";

// lazy loading
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Admin = lazy(() => import("./pages/Admin/Admin"));

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      { path: "admin", element: <Admin /> },
    ],
  },
]);
