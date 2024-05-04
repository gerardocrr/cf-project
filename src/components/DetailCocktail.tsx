import { useParams } from "react-router-dom";
import { useFavoritesStore } from "../store/favoritesCocktailsStore";
import { useLoginStore } from "../store/loginStore";
import { useDetailsCocktails } from "../hooks/useDetailsCocktails";

export function DetailCocktail() {
  const params = useParams();
  const { cocktailDetails } = useDetailsCocktails(params.id || "");
  const favorites = useFavoritesStore((state) => state.ids);
  const setFavorite = useFavoritesStore((state) => state.handleId);
  const isAuthorized = useLoginStore.getState().isAuthorized;

  return (
    <section className="p-4 sm:ml-64 bg-white md:py-16 antialiased">
      <div className="max-w-screen-xl px-4 mx-auto 2xl:px-0">
        <div className="lg:grid lg:grid-cols-2 lg:gap-8 xl:gap-16">
          <div className="shrink-0 max-w-md lg:max-w-lg mx-auto">
            <img
              className="w-full rounded-lg"
              src={cocktailDetails?.drinks[0].strDrinkThumb}
              alt={cocktailDetails?.drinks[0].strDrink}
            />
          </div>

          <div className="mt-6 sm:mt-8 lg:mt-0">
            <h1 className="text-xl font-semibold text-gray-900 sm:text-2xl">
              {cocktailDetails?.drinks[0].strDrink}
            </h1>
            {isAuthorized && (
              <div className="mt-6 sm:gap-4 sm:items-center sm:flex sm:mt-8">
                {cocktailDetails && (
                  <button
                    className="flex items-center justify-center py-2.5 px-5 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:ring-4 focus:ring-gray-100"
                    onClick={() =>
                      setFavorite(cocktailDetails.drinks[0].idDrink)
                    }
                  >
                    {favorites.includes(cocktailDetails.drinks[0].idDrink) ? (
                      <p key={cocktailDetails.drinks[0].idDrink}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="black"
                          className="icon icon-tabler icons-tabler-filled icon-tabler-heart"
                        >
                          <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                          <path d="M6.979 3.074a6 6 0 0 1 4.988 1.425l.037 .033l.034 -.03a6 6 0 0 1 4.733 -1.44l.246 .036a6 6 0 0 1 3.364 10.008l-.18 .185l-.048 .041l-7.45 7.379a1 1 0 0 1 -1.313 .082l-.094 -.082l-7.493 -7.422a6 6 0 0 1 3.176 -10.215z" />
                        </svg>
                      </p>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="black"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="icon icon-tabler icons-tabler-outline icon-tabler-heart"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M19.5 12.572l-7.5 7.428l-7.5 -7.428a5 5 0 1 1 7.5 -6.566a5 5 0 1 1 7.5 6.572" />
                      </svg>
                    )}
                  </button>
                )}
              </div>
            )}

            <hr className="my-6 md:my-8 border-gray-200" />

            <div className="mb-6 text-gray-500">
              <p className="mb-2">Instructions:</p>
              <p>{cocktailDetails?.drinks[0].strInstructions}</p>
            </div>

            <div className="mb-6 text-gray-500">
              <p className="mb-2">Glass:</p>
              <p>{cocktailDetails?.drinks[0].strGlass}</p>
            </div>

            <div className="mb-6 text-gray-500">
              <p className="mb-2">Ingredients:</p>
              {cocktailDetails && (
                <ul>
                  {Object.keys(cocktailDetails.drinks[0])
                    .filter(
                      (key) =>
                        key.startsWith("strIngredient") &&
                        cocktailDetails.drinks[0][key] !== null
                    )
                    .map((key) => (
                      <li key={key}>- {cocktailDetails.drinks[0][key]}</li>
                    ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
