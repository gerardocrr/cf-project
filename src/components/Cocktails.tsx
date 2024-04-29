import { useEffect, useState } from "react";
import { CardCocktail } from "./CardCocktail";
import { useForm } from "react-hook-form";
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
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
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
    console.log(cocktailsData);
  };

  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-4xl mb-10 px-2">Cocktails</h1>
      <form className="flex" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-5 px-2 w-10/12">
          <input
            className="shadow w-full border rounded py-2 px-3 focus:outline-none focus:shadow-outline"
            type="text"
            placeholder="Nombre"
            {...register("query", { required: true, minLength: 5 })}
          />
          {errors.query && (
            <p className="text-red-600">This field is required</p>
          )}
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
