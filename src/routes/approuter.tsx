import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../pages/ErrorPage";
import Shimmer from "../utils/Shimmer";
import Layout from "../Layout/Layout";
import ProtectedRoute from "./ProtectedRoutes";

const Home = lazy(() => import("../pages/Home"));
const Tutor = lazy(() => import("../pages/Tutor"));
const Tutors = lazy(() => import("../pages/Tutors"));
const Contact = lazy(() => import("../pages/Contact"));
const Auth = lazy(() => import("../pages/Auth")); // new auth page

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
        path: "tutors",
        element: (
          <Suspense fallback={<Shimmer />}>
            <ProtectedRoute>
              <Tutors />
            </ProtectedRoute>
          </Suspense>
        ),
      },
      {
        path: "tutor/:id",
        element: (
          <Suspense fallback={<Shimmer />}>
            <ProtectedRoute>
              <Tutor />
            </ProtectedRoute>
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
      {
        path: "auth",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Auth />
          </Suspense>
        ),
      },
    ],
  },
]);

export default router;
