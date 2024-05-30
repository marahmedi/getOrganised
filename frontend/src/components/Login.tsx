import React from "react";

interface LoginProps {
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  showSignUp: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setShowSignUp, showSignUp, setIsAuthenticated }) => {

  const handleLogin = () => {
    // perform login logic
    // on successful login:
    setIsAuthenticated(true);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="w-[35rem] h-[40rem] bg-white rounded-xl mt-20 p-10 flex flex-col">
        <h2 className="text-3xl mt-5">Log in to your account</h2>
        <input
          type="text"
          placeholder="Email..."
          className="border-gray-100 mt-16 text-gray-700 bg-[#EEF7FF] border-2 p-2 h-[3rem] w-[25rem] rounded-xl"
        />
        <input
          type="text"
          placeholder="Password"
          className="border-gray-100 mt-3 text-gray-700 bg-[#EEF7FF] border-2 p-2 h-[3rem] w-[25rem] rounded-xl"
        />
        <div className="flex justify-center">
          <button onClick={handleLogin} className="bg-[#366ED8] mt-10 text-gray-100 rounded-xl w-[15rem] h-[2.6rem]">
            Log In
          </button>
        </div>
        <p
          className="text-[#366ED8] mt-5 text-center underline cursor-pointer"
          onClick={() => setShowSignUp(!showSignUp)}
        >
          I don't have an account
        </p>
      </div>
    </div>
  );
};

export default Login;
