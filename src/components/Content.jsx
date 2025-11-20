import styles from "./Content.module.scss";
import Recipe from "./Recipe";
import { data } from "../data/recipes.js";
import { Fragment, useState } from "react";

function Content() {
  const Recipes = data;
  const [searchBar, setSearchBar] = useState("");

  function handleSearchBar(event) {
    const searchBar = event.target.value;
    setSearchBar(searchBar.trim().toLowerCase());
  }

  return (
    <>
      <div className="flex-fill container">
        <h1 className="my-30">Découvrez nos nouvelles recettes</h1>
        <div className={`card d-flex flex-column p-20 ${styles.contentCard}`}>
          <div
            className={`d-flex flex-row align-item-center my-30 ${styles.searchBar}`}
          >
            <i className="fa-solid fa-magnifying-glass mr-15"></i>
            <input
              onInput={handleSearchBar}
              type="text"
              placeholder="Rechercher"
            />
          </div>

          <div className={styles.grid}>
            {Recipes.filter((recipe) =>
              recipe.title.toLowerCase().startsWith(searchBar)
            ).map((recipe) => (
              <Fragment key={recipe._id}>
                <Recipe title={recipe.title} image={recipe.image}></Recipe>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default Content;
