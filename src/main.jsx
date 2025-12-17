import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./assets/styles/index.scss";
import { ApiContext } from "./context/ApiContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ApiContext value="https://restapi.fr/api/recipes">
      <App />
    </ApiContext>
  </StrictMode>
);
