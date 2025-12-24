import { NavLink } from "react-router";
import { deleteRecipe as deleteR } from "../../../../../../apis";
import Loading from "../../../../../../components/Loading/Loading";
import useFetchRecipes from "../../../../../../hooks/useFetchRecipes";
import styles from "./AdminRecipesList.module.scss";
function AdminRecipesList() {
  const [[recipes, setRecipes], isLoading] = useFetchRecipes();

  async function deleteRecipe(_id) {
    await deleteR(_id);
    setRecipes(recipes.filter((r) => r._id !== _id));
  }

  if (isLoading) {
    return (
      <div
        className={`${styles.list} d-flex align-items-center justify-content-center`}
      >
        <Loading />
      </div>
    );
  }
  return (
    <ul className={styles.list}>
      {recipes.length ? (
        recipes.map((recipe) => (
          <li key={recipe._id} className="d-flex align-items-center">
            <span className="d-flex flex-fill">{recipe.title}</span>
            <NavLink to={`../edit/${recipe._id}`}>
              <button className="btn btn-primary mr-15">Editer</button>
            </NavLink>
            <button
              onClick={() => deleteRecipe(recipe._id)}
              className="btn btn-danger"
            >
              Supprimer
            </button>
          </li>
        ))
      ) : (
        <p>Aucune recette trouvé !</p>
      )}
    </ul>
  );
}
export default AdminRecipesList;
