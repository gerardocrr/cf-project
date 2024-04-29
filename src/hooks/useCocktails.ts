import axios from "axios";
import { useEffect, useState } from "react";

interface Cocktail {
  idDrink: number;
  strDrink: string;
  strDrinkThumb: string;
}
interface CocktailsData {
  drinks: Cocktail[];
}

export function useCocktails() {
  const [cocktailsData, setCocktailsData] = useState<CocktailsData>();

  useEffect(() => {
    const getRandomCocktails = async () => {
      const options = {
        method: "GET",
        url: "https://the-cocktail-db.p.rapidapi.com/randomselection.php",
        headers: {
          "X-RapidAPI-Key":
            "85da6e33b1mshf6c86a03a7356e8p13dd0fjsn8ecf6d039123",
          "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setCocktailsData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getRandomCocktails();
  }, []);

  const onSubmit = async (data: any) => {
    const options = {
      method: "GET",
      url: "https://the-cocktail-db.p.rapidapi.com/search.php",
      params: { s: data.query },
      headers: {
        "X-RapidAPI-Key": "85da6e33b1mshf6c86a03a7356e8p13dd0fjsn8ecf6d039123",
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setCocktailsData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return { cocktailsData, onSubmit };
}
