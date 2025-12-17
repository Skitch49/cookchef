import styles from "./headerMenu.module.scss";

function HeaderMenu() {
  return (
    <ul className={` ${styles.menuContainer} card p-20`}>
      <li>Wishlist</li>
      <li>Connexion</li>
    </ul>
  );
}

export default HeaderMenu;
