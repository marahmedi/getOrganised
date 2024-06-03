import React, {useState} from "react";

interface SignupProps {
  setShowSignUp: React.Dispatch<React.SetStateAction<boolean>>;
  showSignUp: boolean;
  setIsAuthenticated: (auth: boolean) => void;
}
const Signup: React.FC<SignupProps> = ({ setShowSignUp, showSignUp, setIsAuthenticated }) => {

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    user_name: ""
  })

  const {email, password, user_name} = inputs;

  const onChange = (e: { target: { name: string; value: string; }; }) => {
    setInputs({...inputs, [e.target.name] : e.target.value})
  }  

  const onSubmitForm = async(e: { preventDefault: () => void; }) => {
    e.preventDefault()

    try {

      const body = { email, password, user_name}

      const response = await fetch("http://localhost:4000/auth/signup", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(body)
      })

      const parseRes = await response.json()

      if(parseRes){
        localStorage.setItem("token", parseRes.token)
        setIsAuthenticated(true)
      } else {
        setIsAuthenticated(false);
      }

    } catch (err) {
      console.error(err)
    }
  }


  return (
    <div className="flex items-center justify-center">
      <div className="w-[35rem] h-[40rem] bg-white rounded-xl mt-20 p-10 flex flex-col">
        <h2 className="text-3xl mt-5 mb-10">Create your account</h2>
        <form onSubmit={onSubmitForm}>
        <input
          type="text"
          onChange={e  => onChange(e)}
          value={user_name}
          name="user_name"
          placeholder="Username..."
          className="border-gray-100 text-gray-700 bg-[#EEF7FF] border-2 p-2 h-[3rem] w-[14.5rem] rounded-xl"
        />
        <input
          type="email"
          name="email"
          onChange={e  => onChange(e)}
          value={email}
          placeholder="Email.."
          className="border-gray-100 mt-3 text-gray-700 bg-[#EEF7FF] border-2 p-2 h-[3rem] w-[25rem] rounded-xl"
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={e  => onChange(e)}
          value={password}
          className="border-gray-100 mt-3 text-gray-700 bg-[#EEF7FF] border-2 p-2 h-[3rem] w-[25rem] rounded-xl"
        />
        <div className="flex justify-center">
          <button value="submit" className="bg-[#366ED8] mt-10 text-gray-100 rounded-xl w-[15rem] h-[2.6rem]">
            Get started
          </button>
        </div>
        <p
          onClick={() => setShowSignUp(!showSignUp)}
          className="text-[#366ED8] mt-5 text-center underline cursor-pointer"
        >
          I already have an account
        </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
