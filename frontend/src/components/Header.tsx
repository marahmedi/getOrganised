import React from "react";
import wavingHandImage from "../images/waving-hand.png";
import arrow from "../images/arrow-down.png";
import { formattedDate } from '../utils';

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <div className="flex justify-between items-center mt-8" >
      <div className="intro">
        <div className="flex w-[25rem] items-center ">
          <h1 className="text-black-500 text-2xl font-bold">{title}</h1>
          <img
            className="w-[3.2rem] h-[4rem]"
            src={wavingHandImage}
            alt="waving hand"
          />
        </div>
        <p className="m-t[0.5rem] font-medium mb-3 text-xl text-gray-400">
          Today, {formattedDate}
        </p>
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
