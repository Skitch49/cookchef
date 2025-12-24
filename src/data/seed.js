import { data } from "./recipes.js";

export async function seedRecipes() {
  const response = await fetch("https://restapi.fr/api/recipes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  return response.json();
}
