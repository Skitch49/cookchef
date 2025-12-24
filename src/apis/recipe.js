const RECIPE_API = "https://restapi.fr/api/recipes";

export async function getRecipes(queryParam) {
  const response = await fetch(
    `${RECIPE_API}${queryParam ? `?${queryParam}` : ""}`
  );
  if (response.ok) {
    const body = await response.json();

    return Array.isArray(body) ? body : [body];
  } else {
    throw new Error("Erreur dans la récupération des recettes !");
  }
}

export async function getRecipe(_id) {
  const response = await fetch(`${RECIPE_API}/${_id}`);
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("Erreur dans la récupération de la recette: " + _id);
  }
}

export async function deleteRecipe(_id) {
  const response = await fetch(`${RECIPE_API}/${_id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    return _id;
  } else {
    throw new Error("Erreur dans la suppression de la recette: " + _id);
  }
}
export async function updateRecipe(updatedRecipe) {
  const { _id, ...restRecipe } = updatedRecipe;
  const response = await fetch(`${RECIPE_API}/${updatedRecipe._id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(restRecipe),
  });
  if (response.ok) {
    return response.json();
  }
  throw new Error(
    "erreur dans la modification de la recette: " + updatedRecipe
  );
}
export async function createRecipe(newRecipe) {
  const response = await fetch(`${RECIPE_API}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newRecipe),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error("erreur dans la création de la recette: " + newRecipe);
  }
}
