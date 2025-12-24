import styles from "./AdminRecipeForm.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createRecipe, updateRecipe } from "../../../../../../apis";
import { useLoaderData, useNavigate } from "react-router";
import { useEffect, useState } from "react";

function AdminRecipeForm() {
  // récup la recette depuis le loader de la route
  const recipe = useLoaderData();
  const navigate = useNavigate();

  const [success, setSuccess] = useState(false);
  const [savedTitle, setsavedTitle] = useState("");
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    if (!success) return;

    setCountdown(5);

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const timeout = setTimeout(() => {
      navigate("/admin/recipes/list");
    }, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [success, navigate]);

  const defaultValues = {
    title: recipe ? recipe.title : "",
    image: recipe ? recipe.image : "",
  };

  const recipeSchema = yup.object({
    title: yup
      .string()
      .required("Le titre de la recette est obligatoire")
      .min(6, "Le titre doit avoir 6 caractères minimum")
      .max(35, "Le titre doit avoir 35 caractère maximum"),
    image: yup
      .string()
      .required("L'image est obligatoire")
      .url("L'image doit être un lien valide"),
  });

  const {
    formState: { errors, isSubmutting },
    register,
    handleSubmit,
    reset,
    clearErrors,
    setError,
  } = useForm({
    defaultValues,
    resolver: yupResolver(recipeSchema),
  });

  async function submit(values) {
    try {
      clearErrors();
      if (recipe) {
        const updatedRecipe = await updateRecipe({
          ...values,
          _id: recipe._id,
        });
        reset({
          title: updatedRecipe.title,
          image: updatedRecipe.image,
        });
        setSuccess(true);
        setsavedTitle(updatedRecipe.title);
      } else {
        await createRecipe(values);
        reset(defaultValues);
      }
    } catch (e) {
      setSuccess(false);
      throw new Error(
        setError("generic", {
          type: "generic",
          message: `Erreur lors de la sauvegarde de données ${e}`,
        })
      );
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
    >
      <h2 className="mb-20">{recipe ? "Modifier" : "Ajouter"} une recette</h2>
      <div className="d-flex flex-column mb-20">
        <label htmlFor="">Titre de la recette</label>
        <input type="text" {...register("title")} />
        {errors.title && <p className="form-error">{errors.title.message}</p>}
      </div>
      <div className="d-flex flex-column mb-20">
        <label htmlFor="">Image pour la recette</label>
        <input type="text" {...register("image")} />
        {errors.image && <p className="form-error">{errors.image.message}</p>}
      </div>
      {errors.generic && <p className="form-error">{errors.generic.message}</p>}
      <div className="">
        <button disabled={isSubmutting} className="btn btn-primary">
          Sauvegarder
        </button>
      </div>
      {success && (
        <div className={`${styles.infoSuccess}`}>
          <p>
            Votre recette <b>{savedTitle}</b> à bien été enregistré !
          </p>
          <br />
          <p>
            Vous serez redirigé dans {countdown} seconde
            {countdown > 1 ? "s" : ""}
          </p>
        </div>
      )}
    </form>
  );
}
export default AdminRecipeForm;
