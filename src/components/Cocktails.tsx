import { CardCocktail } from "./CardCocktail";
import { useForm } from "react-hook-form";
import { useLoginStore } from "../store/loginStore";
import { useCocktails } from "../hooks/useCocktails";

export function Cocktails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const isAuthorized = useLoginStore.getState().isAuthorized;
  const { cocktailsData, onSubmit } = useCocktails();

  return (
    <div className="p-4 sm:ml-64">
      <h1 className="text-4xl mb-10 px-2">Cocktails</h1>

      {isAuthorized ? (
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
      ) : (
        <h2 className="text-xl">
          Login to be able to search and add to favorites
        </h2>
      )}

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
