import { Outlet } from "react-router";
import AdminRecipesNav from "./components/AdminRecipesNav/AdminRecipesNav";
import { Suspense } from "react";
import Loading from "../../../../components/Loading/Loading";

function AdminRecipes() {
  return (
    <div className="d-flex flex-column flex-fill">
      <h4 className="mb-20">Gestion des recettes</h4>
      <div className="d-flex flex-fill flex-column">
        <AdminRecipesNav></AdminRecipesNav>
        <div className="d-flex flex-fill flex-column">
          <Suspense>
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
export default AdminRecipes;
