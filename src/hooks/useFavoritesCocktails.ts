import axios from "axios";
import { useEffect, useState } from "react";
import { useFavoritesStore } from "../store/favoritesCocktailsStore";

interface Cocktail {
  idDrink: number;
  strDrink: string;
  strDrinkThumb: string;
}
interface CocktailsData {
  drinks: Cocktail[];
}

export function useFavoritesCocktails() {
  const [cocktailsData, setCocktailsData] = useState<CocktailsData[]>([]);
  const ids = useFavoritesStore.getState().ids;
  useEffect(() => {
    const getFavoritesCocktails = async () => {
      const promises = ids.map(async (id) => {
        const options = {
          method: "GET",
          url: "https://the-cocktail-db.p.rapidapi.com/lookup.php",
          params: { i: id },
          headers: {
            "X-RapidAPI-Key":
              "85da6e33b1mshf6c86a03a7356e8p13dd0fjsn8ecf6d039123",
            "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
          },
        };

        try {
          const response = await axios.request(options);
          return response.data;
        } catch (error) {
          console.error(error);
          return null;
        }
      });
      const cocktailsResponse = await Promise.all(promises);
      setCocktailsData(cocktailsResponse.filter(Boolean));
    };

    getFavoritesCocktails();
  }, []);
  return { cocktailsData };
}
