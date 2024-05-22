import React from "react";
import "./App.css";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import { BrowserRouter as Router, Route, Routes  } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <HomePage title={''} />
    </div>
  );
}

export default App;
