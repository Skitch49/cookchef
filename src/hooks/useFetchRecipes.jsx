import { useEffect, useState } from "react";
import { getRecipes } from "../apis";
import { seedRecipes } from "../data/seed";

export function useFetchRecipes(page) {
  const [recipes, setRecipes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState([]);
  const [hasMore, setHasMore] = useState(true);

  const LIMIT = 18;

  useEffect(() => {
    let cancel = false;
    async function fetchRecipes() {
      try {
        setIsLoading(true);
        const queryParam = new URLSearchParams();
        if (page) {
          queryParam.append("limit", 18);
          queryParam.append("skip", (page - 1) * 18);
          queryParam.append("sort", "createdAt:-1");
        } else {
          queryParam.append("sort", "createdAt:-1");
        }

        const fetchedRecipes = await getRecipes(queryParam);
        console.log(fetchedRecipes.length);

        if (!cancel) {
          setHasMore(fetchedRecipes.length === LIMIT);

          if (fetchedRecipes.length == 0 && page == 1) {
            console.log("fetchedRecipes.length == 0");
            const newFetchedRecipes = await seedRecipes();
            setHasMore(newFetchedRecipes.length === LIMIT);

            setRecipes((x) => [...x, ...newFetchedRecipes]);
          } else {
            setRecipes((x) => [...x, ...fetchedRecipes]);
          }
        }
      } catch (e) {
        setError("Erreur: " + e);
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchRecipes();
    return () => (cancel = true);
  }, [page]);
  return [[recipes, setRecipes], isLoading, hasMore, error];
}
export default useFetchRecipes;
