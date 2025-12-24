import { NavLink } from "react-router";
import styles from "./AdminNav.module.scss";
function AdminNav() {
  return (
    <nav className={`${styles.list} d-flex flex-column`}>
      <NavLink
        className={({ isActive }) => (isActive ? styles.listLinkActive : "")}
        to="recipes"
      >
        Recipes
      </NavLink>
      <NavLink
        className={({ isActive }) => (isActive ? styles.listLinkActive : "")}
        to="users"
      >
        Users
      </NavLink>
    </nav>
  );
}

export default AdminNav;
