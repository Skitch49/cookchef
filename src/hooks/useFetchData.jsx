import { useEffect, useState } from "react";
import { seedRecipes } from "../data/seed";

function useFetchData(url, page) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  useEffect(() => {
    let cancel = false;
    document.title = "CookChef - Accueil";
    async function fetchData() {
      try {
        setIsLoading(true);
        let queries = "";
        if (page) {
          queries += `?skip=${(page - 1) * 18}&limit=${page * 18}`;
        }

        const response = await fetch(`${url + queries}`);
        if (response.ok && !cancel) {
          const newData = await response.json();
          if (newData.length < 18) {
            setHasMore(false);
            if (newData.length === 0 && page === 1) {
              await seedRecipes();
              const seededResponse = await fetch(`${url + queries}`);
              if (!seededResponse.ok) {
                throw new Error("Erreur serveur après seed");
              }
              const seededData = await seededResponse.json();
              if (seededData.length > 18) {
                setHasMore(true);
              }
              setData(seededData);
              return;
            }
          }
          setData((x) => [...x, ...newData]);
        } else {
          throw new Error("Erreur serveur");
        }
      } catch (error) {
        console.error(
          "Erreur réseau lors de la récupération des recettes",
          error.message
        );
        setError(error.message);
      } finally {
        if (!cancel) {
          setIsLoading(false);
        }
      }
    }
    fetchData();
    return () => {
      cancel = true;
    };
  }, [url, page]);
  return [[data, setData], isLoading, hasMore, error];
}
export default useFetchData;
