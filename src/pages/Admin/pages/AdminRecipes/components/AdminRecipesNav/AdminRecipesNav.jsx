import { NavLink } from "react-router";
import styles from "./AdminRecipesNav.module.scss";

function AdminRecipesNav() {
  return (
    <div className="d-flex">
      <ul className={`${styles.list}`}>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="list"
        >
          Liste des recettes
        </NavLink>
        <NavLink
          className={({ isActive }) => (isActive ? styles.active : "")}
          to="new"
        >
          Ajouter une recettes
        </NavLink>
      </ul>
    </div>
  );
}
export default AdminRecipesNav;
