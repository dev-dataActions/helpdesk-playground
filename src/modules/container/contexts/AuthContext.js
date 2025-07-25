import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on app load
    const token = localStorage.getItem("authToken");
    if (token) {
      // Basic token validation - check if it exists and is not expired
      try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        const currentTime = Date.now() / 1000;

        if (payload.exp && payload.exp > currentTime) {
          setIsAuthenticated(true);
        } else {
          // Token expired, remove it
          localStorage.removeItem("authToken");
        }
      } catch (error) {
        // Invalid token, remove it
        localStorage.removeItem("authToken");
      }
    }
    setIsLoading(false);
  }, []);

  const login = (username, password) => {
    // Hard-coded credentials check
    if (username === "piatrika" && password === "piatrika") {
      // Create a simple JWT token (expires in 24 hours)
      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(
        JSON.stringify({
          username: "piatrika",
          exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60, // 24 hours
          iat: Math.floor(Date.now() / 1000),
        })
      );
      const signature = btoa("hardcoded-signature-for-simplicity");

      const token = `${header}.${payload}.${signature}`;
      localStorage.setItem("authToken", token);
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  const value = {
    isAuthenticated,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
