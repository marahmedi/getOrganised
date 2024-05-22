import React, { useState } from "react";
import Signup from "../components/Signup";
import Login from "../components/Login";

const UserPage: React.FC = () => {
  const [showSignUp, setShowSignUp] = useState(true);

  return (
    <div className="flex items-center justify-center">
      {showSignUp ? (
        <Signup setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
      ) : (
        <Login setShowSignUp={setShowSignUp} showSignUp={showSignUp} />
      )}
    </div>
  );
};

export default UserPage;
