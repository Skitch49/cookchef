import { useState } from "react";
import styles from "./Recipe.module.scss";

function Recipe({ title, image }) {
  function handleClick() {
    setLiked(!liked);
  }

  const [liked, setLiked] = useState(false);
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
          onClick={handleClick}
          className={`fa-solid fa-heart ${liked ? "text-primary" : ""}`}
        ></i>
      </div>
    </div>
  );
}

export default Recipe;
