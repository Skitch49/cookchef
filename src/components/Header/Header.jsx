import styles from "./Header.module.scss";
import cookchef from "../../assets/images/cookchef.png";
import { useState } from "react";
import HeaderMenu from "./components/HeaderMenu/headerMenu";

function Header({ setPage }) {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <>
      <header className={`${styles.header} d-flex flex-row align-items-center`}>
        <div className="flex-fill ">
          <img
            onClick={() => setPage("homepage")}
            src={cookchef}
            alt="logo cookchef"
          />
        </div>
        <ul className={styles.headerList}>
          <button
            className=" btn btn-primary mr-15"
            onClick={() => setPage("admin")}
          >
            <i className="mr-5 fa-solid fa-plus"></i>
            <span>Ajouter une recette</span>
          </button>
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
            <HeaderMenu setPage={setPage} />
          </>
        )}
      </header>
    </>
  );
}
export default Header;
