import { useRouteError, isRouteErrorResponse } from "react-router-dom";
import Logo from "../assets/404notfound.png"; // Adjust the path as necessary

export default function ErrorPage() {
  const error = useRouteError();

  const errorMessage = isRouteErrorResponse(error)
    ? `${error.status} ${error.statusText}`
    : "Something went wrong!";

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-stone-300 to-gray-100 text-center px-4">
      <img src={Logo} className="w-42 h-32 mb-4 animate-bounce" />
      <h1 className="text-4xl font-bold text-gray-800 mb-2">Oops!</h1>
      <p className="text-lg text-gray-600 mb-6">{errorMessage}</p>
      <a
        href="/"
        className="px-6 py-2 bg-black text-white rounded-full hover:opacity-80 transition"
      >
        Back to Home
      </a>
    </div>
  );
}
