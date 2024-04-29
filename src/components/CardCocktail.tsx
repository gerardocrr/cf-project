import { useNavigate } from "react-router-dom";
import { useFavoritesStore } from "../store/favoritesCocktailsStore";
import { useLoginStore } from "../store/loginStore";

interface RecipeProps {
  title: string;
  urlImage: string;
  id: number;
}

export function CardCocktail({ title, urlImage, id }: RecipeProps) {
  const setFavorite = useFavoritesStore((state) => state.handleId);
  const favorites = useFavoritesStore((state) => state.ids);
  const isAuthorized = useLoginStore.getState().isAuthorized;
  const navigate = useNavigate();
  const handleDetails = () => {
    navigate(`/details/${id}`);
  };
  return (
    <div className="mb-5 m-5 max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img className="rounded-t-lg" src={urlImage} alt={title} />
      </a>
      <div className="p-5">
        <a href="">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {title}
          </h5>
        </a>
        <div className="flex place-content-between">
          <button
            onClick={() => handleDetails()}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Details
          </button>
          {isAuthorized && (
            <button className="text-end" onClick={() => setFavorite(id)}>
              {favorites.includes(id) ? (
                <p key={id}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="white"
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
                  stroke="white"
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
      </div>
    </div>
  );
}
