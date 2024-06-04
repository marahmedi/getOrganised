import React, { useState, useEffect } from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const checkAuthenticated = async () => {
    try {
      if (!localStorage.token) {
        setIsAuthenticated(false);
        return;
      }

      const res = await fetch("http://localhost:4000/auth/is-verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();
      if (parseRes.success) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("token"); // Clear invalid token from localStorage
      }
    } catch (err) {
      console.error(err);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    // Initial authentication check
    checkAuthenticated();

    // Check authentication status periodically (e.g., every 10 minutes)
    const interval = setInterval(checkAuthenticated, 10 * 60 * 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  console.log(isAuthenticated);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <HomePage setIsAuthenticated={setIsAuthenticated} />
              ) : (
                <Navigate to="/user" />
              )
            }
          />
          <Route
            path="/user"
            element={
              <UserPage
                setIsAuthenticated={setIsAuthenticated}
                isAuthenticated={isAuthenticated}
              />
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
