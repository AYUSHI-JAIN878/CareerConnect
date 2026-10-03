import React from "react";
import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem("placement_token");
    setUser(null);
  };

  useEffect(() => {
    const token = localStorage.getItem("placement_token");

    if (!token) {
      setLoading(false);
      return;
    }

    api
      .get("/auth/me")
      .then((response) => {
        setUser(response.data.user);
      })
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  // LOGIN
  const login = async (credentials) => {
    const { data } = await api.post("/auth/login", credentials);

    localStorage.setItem("placement_token", data.token);
    setUser(data.user);

    return data.user;
  };

  // REGISTER
  // Registration does NOT automatically log the user in.
  const register = async (payload) => {
    const { data } = await api.post("/auth/register", payload);

    return data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);