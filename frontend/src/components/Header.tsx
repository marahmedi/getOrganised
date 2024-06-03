import React, {useState, useEffect} from "react";
import wavingHandImage from "../images/waving-hand.png";
import arrow from "../images/arrow-down.png";
import { formattedDate } from '../utils';

interface HeaderProps {
  setIsAuthenticated: (auth: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsAuthenticated }) => {

  const [userName, setUserName] = useState<string>('')

  const getUser = async() => {
    try {
      const res = await fetch("http://localhost:4000/auth/user-info", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseData = await res.json();
      setUserName(parseData.username)
      
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getUser();
  }, []);


  const logout = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    
    try{

      localStorage.removeItem("token");
      setIsAuthenticated(false);

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <div className="flex justify-between items-center mt-8" >
      <div className="intro">
        <div className="flex w-[25rem] items-center ">
          <h1 className="text-black-500 text-2xl font-bold">{`Hello, ${userName}`}</h1>
          <img
            className="w-[3.2rem] h-[4rem]"
            src={wavingHandImage}
            alt="waving hand"
          />
        </div>
        <p className="m-t[0.5rem] font-medium mb-3 text-xl text-gray-400">
          Today, {formattedDate}
        </p>
        <button onClick={e => logout(e)} className="text-[#366ED8] underline">Logout</button>
      </div>
      <div>
        <div className="drop-down bg-white px-5 py-3 rounded-xl flex justify-start items-center">
          <button className="bg-gray-100 w-[2rem] h-[1.5rem] mr-3 rounded-l flex justify-center items-center cursor-pointer">
            <img
              className="w-[1rem] h-[0.9rem]"
              src={arrow}
              alt="arrow down"
            />
          </button>
          <span>Today</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
