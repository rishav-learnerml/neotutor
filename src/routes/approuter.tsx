import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../pages/ErrorPage";
import Shimmer from "../utils/Shimmer";
import Layout from "../Layout/Layout";

const Home = lazy(() => import("../pages/Home"));
const Tutor = lazy(() => import("../pages/Tutor"));
const Contact = lazy(() => import("../pages/Contact"));

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Shimmer />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "tutor",
        errorElement: <ErrorPage />,
        element: (
          <Suspense fallback={<Shimmer />}>
            <Tutor />
          </Suspense>
        ),
      },
      {
        path: "contact",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Contact />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
