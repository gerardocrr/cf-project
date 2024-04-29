import { Navigate } from "react-router-dom";
import { CardCocktail } from "./CardCocktail";
import { useLoginStore } from "../store/loginStore";
import { useFavoritesCocktails } from "../hooks/useFavoritesCocktails";

export function FavoritesCocktails() {
  const { cocktailsData } = useFavoritesCocktails();
  const isAuthorized = useLoginStore.getState().isAuthorized;

  if (!isAuthorized) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-4xl">Favorites cocktails</h1>
      <div className="grid md:grid-cols-4 sm:grid-cols-3">
        {cocktailsData.map((cocktailsDataItem) =>
          cocktailsDataItem.drinks.map((cocktail) => (
            <CardCocktail
              key={cocktail.idDrink}
              title={cocktail.strDrink}
              urlImage={cocktail.strDrinkThumb}
              id={cocktail.idDrink}
            />
          ))
        )}
      </div>
    </div>
  );
}
