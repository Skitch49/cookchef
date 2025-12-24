import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.scss";
import { ROUTER } from "./router.jsx";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={ROUTER}>
      <App />
    </RouterProvider>
  </StrictMode>
);
