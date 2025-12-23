import Loading from "../../components/Loading/Loading.jsx";
import styles from "./Homepage.module.scss";
import Recipe from "./components/Recipe/Recipe.jsx";
import { Fragment, useState } from "react";
import Search from "./components/Search/Search.jsx";
import useFetchRecipes from "../../hooks/useFetchRecipes.jsx";
import { updateRecipe, deleteRecipe as deleteR } from "../../apis/recipe.js";

function Homepage() {
  const [searchBar, setSearchBar] = useState("");
  const [page, setPage] = useState(1);

  const [[recipes, setRecipes], isLoading, hasMore] = useFetchRecipes(page);

  async function deleteRecipe(_id) {
    await deleteR(_id);
    setRecipes(recipes.filter((r) => r._id !== _id));
  }

  async function updatedRecipe(updatedRecipe) {
    const savedRecipe = await updateRecipe(updatedRecipe);
    setRecipes(
      recipes.map((r) => (r._id === savedRecipe._id ? savedRecipe : r))
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
                      updatedRecipe={updatedRecipe}
                      deleteRecipe={deleteRecipe}
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
