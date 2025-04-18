import React, { useState, useContext, createContext, useEffect } from "react";

const AUTH_STORAGE_KEY = "movieAppAuth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Initialize from localStorage if available
    const savedAuth = localStorage.getItem(AUTH_STORAGE_KEY);
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      if (user) {
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
      } else {
        localStorage.removeItem(AUTH_STORAGE_KEY);
      }
    }
  }, [user, isInitialized]);

  const signin = async (email, callback) => {
    try {
      // Validate email
      if (!email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
        throw new Error("Invalid email address");
      }

      // In a real app, you would make an API call here
      // For demo, we'll just simulate a successful login
      const userData = {
        email,
        name: email.split("@")[0],
        loginTime: new Date().toISOString(),
      };

      setUser(userData);
      callback();
    } catch (error) {
      throw new Error(error.message || "Login failed");
    }
  };

  const signout = async (callback) => {
    try {
      setUser(null);
      callback();
    } catch (error) {
      throw new Error("Logout failed");
    }
  };

  const value = {
    user,
    signin,
    signout,
    isAuthenticated: !!user,
  };

  if (!isInitialized) {
    return null; // or a loading spinner
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
