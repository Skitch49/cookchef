import { createBrowserRouter, redirect } from "react-router";
import App from "./App";
import { lazy } from "react";
import { getRecipe } from "./apis";

// lazy loading
const Homepage = lazy(() => import("./pages/Homepage/Homepage"));
const Admin = lazy(() => import("./pages/Admin/Admin"));
const AdminRecipes = lazy(() =>
  import("./pages/Admin/pages/AdminRecipes/AdminRecipes")
);
const AdminUsers = lazy(() =>
  import("./pages/Admin/pages/AdminUsers/AdminUsers")
);
const AdminRecipesList = lazy(() =>
  import(
    "./pages/Admin/pages/AdminRecipes/pages/AdminRecipesList/AdminRecipesList"
  )
);
const AdminRecipesForm = lazy(() =>
  import(
    "./pages/Admin/pages/AdminRecipes/pages/AdminRecipesForm/AdminRecipeForm"
  )
);

export const ROUTER = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Homepage />,
      },
      {
        path: "admin",
        element: <Admin />,
        children: [
          {
            path: "recipes",
            element: <AdminRecipes />,
            children: [
              {
                index: true,
                loader: async () => redirect("list"),
              },
              {
                path: "list",
                element: <AdminRecipesList />,
              },
              { path: "new", element: <AdminRecipesForm /> },
              {
                path: "edit/:recipeId",
                loader: async ({ params: { recipeId } }) => getRecipe(recipeId),
                element: <AdminRecipesForm />,
              },
            ],
          },
          { path: "users", element: <AdminUsers /> },
          {
            index: true,
            loader: async () => redirect("recipes"),
          },
        ],
      },
    ],
  },
]);
