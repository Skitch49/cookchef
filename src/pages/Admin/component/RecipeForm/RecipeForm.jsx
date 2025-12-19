import styles from "./RecipeForm.module.scss";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useContext } from "react";
import { ApiContext } from "../../../../context/ApiContext";

function RecipeForm() {
  const BASE_URL_API = useContext(ApiContext);

  const defaultValues = {
    title: "",
    image: "",
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
      const response = await fetch(BASE_URL_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (response.ok) {
        reset(defaultValues), clearErrors;
      } else {
        setError("generic", {
          type: "generic",
          message: `Erreur lors de la sauvegarde de données ${response}`,
        });
      }
      console.log(values);
    } catch (e) {
      throw new Error(setError(e));
    }
  }

  return (
    <form
      onSubmit={handleSubmit(submit)}
      className={`d-flex flex-column card p-20 ${styles.recipeForm}`}
    >
      <h2 className="mb-20">Ajouter une recette</h2>
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
    </form>
  );
}
export default RecipeForm;
