import styles from "./Recipe.module.scss";

function Recipe({ updatedRecipe, recipe, deleteRecipe }) {
  async function handleClickLike() {
    updatedRecipe({ ...recipe, liked: !recipe.liked });
  }

  async function handleClickDelete() {
    deleteRecipe(recipe._id);
  }

  return (
    <div className={styles.recipe}>
      <i className="fa-solid fa-xmark" onClick={handleClickDelete}></i>
      <div className={styles.imageContainer}>
        <img src={recipe.image} alt="recipe" />
      </div>
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${styles.recipeTitle}`}
      >
        <h3 className="mb-10">{recipe.title}</h3>
        <i
          onClick={() => handleClickLike(recipe._id)}
          className={`fa-solid fa-heart ${recipe.liked ? "text-primary" : ""}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
