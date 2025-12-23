import styles from "./Header.module.scss";
import cookchef from "../../assets/images/cookchef.png";
import { useState } from "react";
import HeaderMenu from "./components/HeaderMenu/headerMenu";
import { NavLink } from "react-router";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className={`${styles.header} d-flex flex-row align-items-center`}>
        <div className="flex-fill ">
          <NavLink to="/">
            <img src={cookchef} alt="logo cookchef" />
          </NavLink>
        </div>
        <ul className={styles.headerList}>
          <NavLink to="/admin">
            <button className=" btn btn-primary mr-15">
              <i className="mr-5 fa-solid fa-plus"></i>
              <span>Ajouter une recette</span>
            </button>
          </NavLink>
          <button className="mr-15 btn btn-reverse-primary">
            <i className="fa-solid fa-heart mr-5"></i>
            <span>Wishlist</span>
          </button>
          <button className="btn btn-primary">
            <i className="fa-solid fa-user mr-5"></i>
            <span>Connexion</span>
          </button>
        </ul>
        <i
          onClick={() => setShowMenu(!showMenu)}
          className={`fa-solid fa-bars mr-5 ${styles.headerXs}`}
        ></i>
        {showMenu && (
          <>
            <div onClick={() => setShowMenu(false)} className="calc"></div>
            <HeaderMenu />
          </>
        )}
      </header>
    </>
  );
}
export default Header;
