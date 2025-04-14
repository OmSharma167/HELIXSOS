
import React, { useState, useEffect, createContext, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({ user: null, token: "" });

  useEffect(() => {
    try {
      const data = localStorage.getItem("auth");
      if (data) {
        const parsedData = JSON.parse(data);
        setAuth({ user: parsedData.user, token: parsedData.token });
      }
    } catch (error) {
      console.error("Error loading auth data:", error);
    }
  }, []);

  useEffect(() => {
    if (auth.token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${auth.token}`;
    } else {
      delete axios.defaults.headers.common["Authorization"];
    }
  }, [auth.token]);

  const login = (userData) => {
    try {
      const { user, token } = userData;
      setAuth({ user, token });
      localStorage.setItem("auth", JSON.stringify(userData));
    } catch (error) {
      console.error("Error saving auth data:", error);
    }
  };

  const logout = () => {
    setAuth({ user: null, token: "" });
    localStorage.removeItem("auth");
    delete axios.defaults.headers.common["Authorization"];
  };

  const isAdmin = () => {
    return auth.user && auth.user.role === 1;
  };

  const isAuthenticated = () => {
    return !!auth.token;
  };

  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.warn("Unauthorized, logging out...");
          logout();
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
