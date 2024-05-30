import React, {useState} from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)

  return (
    <Router>
    <div className="App">
      <Routes>
        <Route path="/" element={isAuthenticated ? <HomePage /> : <Navigate to="/user" />} />
        <Route path="/user" element={<UserPage setIsAuthenticated={setIsAuthenticated} isAuthenticated={isAuthenticated} />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;
