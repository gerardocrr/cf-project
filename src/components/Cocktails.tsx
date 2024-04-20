import { useEffect, useState } from "react";
import { CardCocktail } from "./CardCocktail";
import axios from "axios";

interface Cocktail {
  idDrink: number;
  strDrink: string;
  strDrinkThumb: string;
}
interface CocktailsData {
  drinks: Cocktail[];
}

export function Cocktails() {
  const [query, setQuery] = useState("");
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((e.target.name = e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://the-cocktail-db.p.rapidapi.com/search.php",
      params: { s: query },
      headers: {
        "X-RapidAPI-Key": "85da6e33b1mshf6c86a03a7356e8p13dd0fjsn8ecf6d039123",
        "X-RapidAPI-Host": "the-cocktail-db.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      setCocktailsData(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log(cocktailsData);
  };

  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-4xl mb-10 px-2">Cocktails</h1>
      <form className="flex" onSubmit={handleSubmit}>
        <div className="mb-5 px-2 w-10/12">
          <input
            className="shadow w-full border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
            name="query"
            type="text"
            placeholder="Nombre"
            onChange={handleChange}
          />
        </div>
        <div className="w-1/6">
          <button
            type="submit"
            className="w-full py-2 bg-blue-400 rounded hover:bg-blue-500"
          >
            Search
          </button>
        </div>
      </form>
      <div className="grid md:grid-cols-4 sm:grid-cols-3">
        {cocktailsData &&
          cocktailsData.drinks.map((cocktail) => (
            <CardCocktail
              key={cocktail.idDrink}
              title={cocktail.strDrink}
              urlImage={cocktail.strDrinkThumb}
              id={cocktail.idDrink}
            />
          ))}
      </div>
    </div>
  );
}
