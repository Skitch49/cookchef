import { useContext } from "react";
import styles from "./Recipe.module.scss";
import { ApiContext } from "../../../../context/ApiContext";

function Recipe({ toggleLikedRecipe, recipe: { _id, liked, title, image } }) {
  const BASE_URL_API = useContext(ApiContext);
  async function handleClick(_id) {
    try {
      const response = await fetch(`${BASE_URL_API}/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ liked: !liked }),
      });

      if (response.ok) {
        const updatedRecipe = await response.json();
        toggleLikedRecipe(updatedRecipe);
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.recipe}>
      <div className={styles.imageContainer}>
        <img src={image} alt="recipe" />
      </div>
      <div
        className={`d-flex flex-column justify-content-center align-items-center ${styles.recipeTitle}`}
      >
        <h3 className="mb-10">{title}</h3>
        <i
          onClick={() => handleClick(_id)}
          className={`fa-solid fa-heart ${liked ? "text-primary" : ""}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
