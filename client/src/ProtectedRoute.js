import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

function ProtectedRoute({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const accessToken = Cookies.get("accessToken");
        console.log(accessToken);
        if (accessToken) {
          // Verify access token
          //   await axios.get("http://localhost:500/api/verify-token", {
          //     headers: { Authorization: `Bearer ${accessToken}` },
          //   });
          setIsAuthenticated(true);
        } else {
          // Refresh the access token
          const refreshToken = Cookies.get("refreshToken");
          if (refreshToken) {
            const response = await axios.post(
              "http://localhost:500/api/refresh-token",
              {},
              {
                headers: { Authorization: `Bearer ${refreshToken}` },
              }
            );
            Cookies.set("accessToken", response.data.accessToken);
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        }
      } catch (error) {
        console.log("Authentication check failed:", error);
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
