import styles from "./headerMenu.module.scss";

function HeaderMenu({ setPage }) {
  return (
    <ul className={` ${styles.menuContainer} card p-20`}>
      <li onClick={() => setPage("homepage")}>Wishlist</li>
      <li>Connexion</li>
      <li onClick={() => setPage("admin")}>Ajouter une recette</li>
    </ul>
  );
}

export default HeaderMenu;
