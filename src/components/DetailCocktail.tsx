import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface Cocktail {
  idDrink: number;
  strDrink: string;
  strDrinkThumb: string;
  strInstructions: string;
  [key: string]: string | number | null;
}
interface CocktailsData {
  drinks: Cocktail[];
}

export function DetailCocktail() {
  const params = useParams();
  const [cocktailDetails, setCocktailDetails] = useState<CocktailsData>();

  useEffect(() => {
    const getCocktailDetails = async () => {
      const options = {
        method: "GET",
        url: "https://the-cocktail-db.p.rapidapi.com/lookup.php",
        params: { i: params.id },
        headers: {
          "X-RapidAPI-Key":
            "85da6e33b1mshf6c86a03a7356e8p13dd0fjsn8ecf6d039123",
          "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        setCocktailDetails(response.data);
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getCocktailDetails();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      {cocktailDetails && (
        <div>
          <h1 className="text-4xl mb-5">
            {cocktailDetails.drinks[0].strDrink}
          </h1>
          <div className="flex">
            <img
              className="rounded-md mb-5 items-center content-center justify-center"
              src={cocktailDetails.drinks[0].strDrinkThumb}
              alt={cocktailDetails.drinks[0].strDrink}
            />
          </div>
          <h2 className="text-2xl">Instructions:</h2>
          <p>{cocktailDetails.drinks[0].strInstructions}</p>
          <h2 className="text-2xl">Ingredients:</h2>
          <ul>
            {Object.keys(cocktailDetails.drinks[0])
              .filter(
                (key) =>
                  key.startsWith("strIngredient") &&
                  cocktailDetails.drinks[0][key] !== null
              )
              .map((key) => (
                <li key={key}>{cocktailDetails.drinks[0][key]}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
