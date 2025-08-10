// src/utils/ProtectedRoute.tsx
import type React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isLoggedIn, user } = useAuth();

  // If not logged in, redirect
  if (!isLoggedIn || !user) {
    return <Navigate to="/auth" replace />;
  }

  // Otherwise, render the protected content
  return <>{children}</>;
}
