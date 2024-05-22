import React, { useState } from "react";
import calenderBlue from "../calender-b.png";
import arrowRight from "../arrow-right.png";
import arrowLeft from "../arrow-left.png";
import Dates from "./Dates";
import Times from "./Times";

const Calender: React.FC = () => {
  const [showDates, setShowDates] = useState(true);
  return (
    <div className="calender-box bg-white w-[25rem] h-[23rem] mt-1 mb-11">
      <div className="bg-[#EEF7FF] h-[2.9rem] w-[28.6rem] rounded-3xl flex items-center justify-between px-2">
        <button className="bg-white h-[2rem] w-[2rem] rounded-2xl">
          <img
            src={arrowLeft}
            alt="arrow-left"
            className="w-[1rem] h-[1rem] ml-2 cursor-pointer"
          />
        </button>
        <div className="flex w-[6rem] justify-between items-center">
          <img
            src={calenderBlue}
            alt="calender-icon"
            className="w-[1rem] h-[1rem]"
          />
          <span className="text-[#366ED8]">July, 2023</span>
        </div>
        <button className="bg-white h-[2rem] w-[2rem] rounded-2xl">
          <img
            src={arrowRight}
            alt="arrow-right"
            className="w-[1rem] h-[1rem] ml-2 cursor-pointer"
          />
        </button>
      </div>
      {showDates ? <Dates /> : <Times />}
      {showDates && <button onClick={()=> setShowDates(!showDates)} className="w-[28rem] h-[2.6rem] rounded-xl text-[#366ED8] text-center bg-[#EEF7FF] mt-2">
        Add times
      </button>}
    </div>
  );
};

export default Calender;
