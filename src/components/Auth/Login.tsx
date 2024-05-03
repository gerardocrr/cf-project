import { useForm } from "react-hook-form";
import { Navigate, useNavigate } from "react-router-dom";
import { useLoginStore } from "../../store/loginStore";

export function Login() {
  const setUser = useLoginStore((state) => state.setUser);
  const navigate = useNavigate();
  const isAuthorized = useLoginStore.getState().isAuthorized;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSumit = (data: any) => {
    setUser(data.user, true);
    navigate("/");
  };

  if (isAuthorized) {
    return <Navigate to="/" />;
  }
  return (
    <section className="p-4 sm:ml-64 bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign in
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSumit)}
            >
              <div>
                <label
                  htmlFor="user"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="user"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Jhon Doe"
                  {...register("user", { required: true, minLength: 4 })}
                />
                {errors.user && (
                  <p className="mt-2 text-red-600">This field is required</p>
                )}
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  placeholder="*******"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("password", { required: true, minLength: 4 })}
                />
                {errors.password && (
                  <p className="mt-2 text-red-600">This field is required</p>
                )}
              </div>
              <button
                type="submit"
                className="w-full text-white bg-teal-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign in
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
