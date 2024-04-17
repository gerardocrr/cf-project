import axios from "axios";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

interface RecipeDetails {
  title: string;
  summary: string;
}

export function DetailRecipe() {
  const params = useParams();
  const [recipeDetails, setRecipeDetails] = useState<RecipeDetails>();

  useEffect(() => {
    const getDataRecipe = async () => {
      const options = {
        method: "GET",
        url: `https://spoonacular-recipe-food-nutrition-v1.p.rapidapi.com/recipes/${params.id}/information`,
        headers: {
          "X-RapidAPI-Key":
            "85da6e33b1mshf6c86a03a7356e8p13dd0fjsn8ecf6d039123",
          "X-RapidAPI-Host":
            "spoonacular-recipe-food-nutrition-v1.p.rapidapi.com",
        },
      };

      try {
        const response = await axios.request(options);
        console.log(response.data);
        setRecipeDetails(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getDataRecipe();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      {recipeDetails && (
        <div>
          <h1>{recipeDetails.title}</h1>
          <div dangerouslySetInnerHTML={{ __html: recipeDetails.summary }} />
        </div>
      )}
    </div>
  );
}
