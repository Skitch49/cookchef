import { NavLink } from "react-router";
import styles from "./HeaderMenu.module.scss";

function HeaderMenu() {
  return (
    <ul className={` ${styles.menuContainer} card p-20`}>
      <li>
        <NavLink to="admin">Wishlist</NavLink>
      </li>
      <li>Connexion</li>
      <li>
        <NavLink to="admin">Ajouter une recette</NavLink>
      </li>
    </ul>
  );
}

export default HeaderMenu;
