import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.scss";
import { ApiContext } from "./context/ApiContext.jsx";
import { ROUTER } from "./routeur.jsx";
import { RouterProvider } from "react-router";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiContext value="https://restapi.fr/api/recipes">
      <RouterProvider router={ROUTER}>
        <App />
      </RouterProvider>
    </ApiContext>
  </StrictMode>
);
