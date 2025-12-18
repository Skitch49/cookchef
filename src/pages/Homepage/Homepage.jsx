import Loading from "../../components/Loading/Loading.jsx";
import { seedRecipes } from "../../data/seed.js";
import { ApiContext } from "../../context/ApiContext.jsx";
import styles from "./Homepage.module.scss";
import Recipe from "./components/Recipe/Recipe.jsx";
import { Fragment, useContext, useEffect, useState } from "react";
import Search from "./components/Search/Search.jsx";

function Homepage() {
  const [searchBar, setSearchBar] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const BASE_URL_API = useContext(ApiContext);

  useEffect(() => {
    let cancel = false;
    document.title = "CookChef - Accueil";
    async function getRecipes() {
      try {
        setIsLoading(true);
        const response = await fetch(
          `${BASE_URL_API}?skip=${(page - 1) * 18}&limit=${page * 18}`
        );
        if (response.ok && !cancel) {
          const newRecipes = await response.json();
          if (newRecipes.length < 18) {
            setHasMore(false);
            if (newRecipes.length === 0 && page === 1) {
              seedRecipes();
            }
          }
          setRecipes((x) => [...x, ...newRecipes]);
        }
      } catch (error) {
        console.error(
          "Erreur réseau lors de la récupération des recettes",
          error.message
        );
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    getRecipes();
    return () => {
      cancel = true;
    };
  }, [BASE_URL_API, page]);

  function updatedRecipe(updatedRecipe) {
    setRecipes(
      recipes.map((r) => (r._id === updatedRecipe._id ? updatedRecipe : r))
    );
  }

  return (
    <>
      <div className="flex-fill container d-flex flex-column p-20">
        <h1 className="my-30">
          Découvrez nos nouvelles recettes{" "}
          <small className={styles.small}>{recipes.length}</small>
        </h1>
        <div
          className={`card flex-fill d-flex flex-column p-20 mb-20 ${styles.contentCard}`}
        >
          <Search setSearchBar={setSearchBar} />
          {isLoading && !recipes.length ? (
            <Loading />
          ) : (
            <div className={styles.grid}>
              {recipes
                .filter((recipe) =>
                  recipe.title.toLowerCase().startsWith(searchBar)
                )
                .map((recipe) => (
                  <Fragment key={recipe._id}>
                    <Recipe
                      recipe={recipe}
                      toggleLikedRecipe={updatedRecipe}
                    ></Recipe>
                  </Fragment>
                ))}
            </div>
          )}
          <div className="d-flex flex-row justify-content-center align-items-center p-20">
            {hasMore && !isLoading && (
              <button
                className="btn btn-primary"
                onClick={() => setPage(page + 1)}
              >
                Voir plus de recettes
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
