import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Signup from "../components/Signup";
import Login from "../components/Login";

interface UserPageProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const UserPage: React.FC<UserPageProps> = ({isAuthenticated, setIsAuthenticated}) => {
  const [showSignUp, setShowSignUp] = useState(true);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="flex items-center justify-center">
      {showSignUp ? (
        <Signup setIsAuthenticated={setIsAuthenticated} setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
      ) : (
        <Login setIsAuthenticated={setIsAuthenticated} setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
      )}
    </div>
  );
};

export default UserPage;
