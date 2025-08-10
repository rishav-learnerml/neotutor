// src/context/AuthContext.tsx
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { API_BASE_URL } from "@/utils/constants";

type User = {
  name: string;
  githubUsername: string;
  email?: string;
};

type AuthContextType = {
  isLoggedIn: boolean;
  user: User | null;
  setIsLoggedIn: (value: boolean) => void;
  logout: () => void;
  fetchUser: () => Promise<void>;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    () => localStorage.getItem("isLoggedIn") === "true" // ✅ load from localStorage
  );
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const fetchUser = useCallback(async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/me`, {
        credentials: "include",
      });
      if (!res.ok) throw new Error("Not authenticated");
      const jsondata: { user: User } = await res.json();

      setUser(jsondata.user);
      setIsLoggedIn(true);

      // ✅ persist to localStorage
      localStorage.setItem("user", JSON.stringify(jsondata.user));
      localStorage.setItem("isLoggedIn", "true");
    } catch {
      setUser(null);
      setIsLoggedIn(false);
      localStorage.removeItem("user");
      localStorage.removeItem("isLoggedIn");
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && !user) {
      fetchUser();
    }
  }, [isLoggedIn, user, fetchUser]);

  const login = (value: boolean) => {
    setIsLoggedIn(value);
    localStorage.setItem("isLoggedIn", String(value));
    if (value) fetchUser();
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("isLoggedIn");
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        setIsLoggedIn: login,
        logout,
        fetchUser,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
