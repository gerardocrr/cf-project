import { useNavigate } from "react-router-dom";

interface RecipeProps {
  title: string;
  urlImage: string;
  id: number;
}

export function CardCocktail({ title, urlImage, id }: RecipeProps) {
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
        <button
          onClick={() => handleDetails()}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Details
        </button>
      </div>
    </div>
  );
}
