import { useState } from "react";
import { CardRecipe } from "./CardRecipe";
import axios from "axios";

interface Recipe {
  id: number;
  title: string;
  image: string;
  // Otros campos necesarios
}
interface RecipeData {
  results: Recipe[];
}

export function Search() {
  const [query, setQuery] = useState("");
  // const [formData, setFormData] = useState<FormData>({
  //   query: "",
  // });
  const [recipeData, setRecipeData] = useState<RecipeData | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery((e.target.name = e.target.value));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const options = {
      method: "GET",
      url: "https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/complexSearch",
      params: {
        query: query,
        titleMatch: query,
        instructionsRequired: "true",
        fillIngredients: "false",
        addRecipeInformation: "false",
        maxReadyTime: "20",
        ignorePantry: "true",
        sort: "calories",
        sortDirection: "asc",
        number: "50",
        limitLicense: "false",
        ranking: "2",
      },
      headers: {
        "X-RapidAPI-Key": "85da6e33b1mshf6c86a03a7356e8p13dd0fjsn8ecf6d039123",
        "X-RapidAPI-Host":
          "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
      },
    };
    const response = await axios.request(options);
    setRecipeData(response.data);
    console.log(recipeData);
  };

  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-4xl mb-10 px-2">Buscador de recetas</h1>
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
        {recipeData &&
          recipeData.results.map((recipe) => (
            <CardRecipe
              key={recipe.id}
              title={recipe.title}
              urlImage={recipe.image}
            />
          ))}
      </div>
    </div>
  );
}
