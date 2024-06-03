import React, { useState } from "react";

interface LoginProps {
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  showSignUp: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}

const Login: React.FC<LoginProps> = ({
  setShowSignUp,
  showSignUp,
  setIsAuthenticated,
}) => {

  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e: { target: { name: string; value: string } }) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitForm = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const body = { email, password };

      const response = await fetch("http://localhost:4000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        setIsAuthenticated(true)
      
      } else {
        setErrorMessage(parseRes.err)
        setIsAuthenticated(false);
      }
    } catch (err) {
      console.error("you cant enter because", err);
      setIsAuthenticated(false);
    }

    
  };

  return (
    <form onSubmit={onSubmitForm}>
      <div className="flex items-center justify-center">
        <div className="w-[35rem] h-[40rem] bg-white rounded-xl mt-20 p-10 flex flex-col">
          <h2 className="text-3xl mt-5 mb-12">Log in to your account</h2>
          <p className="pt-5 pb-2 pl-2 text-[#AE431E]">{errorMessage}</p>
          <input
            type="text"
            name="email"
            onChange={(e) => onChange(e)}
            value={email}
            placeholder="Email..."
            className="border-gray-100 text-gray-700 bg-[#EEF7FF] border-2 p-2 h-[3rem] w-[25rem] rounded-xl"
          />
          <input
            type="password"
            name="password"
            onChange={(e) => onChange(e)}
            value={password}
            placeholder="Password"
            className="border-gray-100 mt-3 text-gray-700 bg-[#EEF7FF] border-2 p-2 h-[3rem] w-[25rem] rounded-xl"
          />
          <div className="flex justify-center">
            <button
              value="submit"
              className="bg-[#366ED8] mt-10 text-gray-100 rounded-xl w-[15rem] h-[2.6rem]"
            >
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
    </form>
  );
};

export default Login;
