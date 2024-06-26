import axios from "axios";
import { useEffect, useState } from "react";

interface Cocktail {
  idDrink: number;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  strGlass: string;
  [key: string]: string | number | null;
}
interface CocktailsData {
  drinks: Cocktail[];
}

export function useDetailsCocktails(id: string) {
  const [cocktailDetails, setCocktailDetails] = useState<CocktailsData>();

  useEffect(() => {
    const getCocktailDetails = async () => {
      const options = {
        method: "GET",
        url: "https://the-cocktail-db.p.rapidapi.com/lookup.php",
        params: { i: id },
        headers: {
          "X-RapidAPI-Key": import.meta.env.VITE_APIKEY,
          "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setCocktailDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCocktailDetails();
  }, []);

  return { cocktailDetails };
}
