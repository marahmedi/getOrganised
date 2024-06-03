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
      const res = await fetch("http://localhost:4000/auth/is-verify", {
        method: "POST",
        headers: { token: localStorage.token },
      });

      const parseRes = await res.json();
      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.log('no token in storage')
      console.error(err);
    }
  };

  useEffect(() => {
    checkAuthenticated()
  }, []);

  

  console.log(isAuthenticated)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <HomePage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/user" />}
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
