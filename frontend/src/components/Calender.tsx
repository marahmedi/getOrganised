import React, { useState } from "react";
import calenderBlue from "../images/calender-b.png";
import arrowRight from "../images/arrow-right.png";
import arrowLeft from "../images/arrow-left.png";
import Dates from "./Dates";
import Times from "./Times";

interface CalenderProps{
  setStartTime: (value: number | null) => void;
  setEndTime: (value: number | null) => void;
  startTime: number | null;
  endTime: number | null;
}

const Calender: React.FC<CalenderProps> = ({ setStartTime , startTime, endTime, setEndTime}) => {
  const [showDates, setShowDates] = useState(true);
  return (
    <div className="calender-box bg-white w-[25rem] h-[23rem] mt-1 mb-11">
      {showDates ? <Dates /> : <Times setStartTime={setStartTime} setEndTime={setEndTime} startTime={startTime} endTime={endTime} />}
      {showDates ? <button onClick={()=> setShowDates(!showDates)} className="w-[28.2rem] h-[2.6rem] rounded-xl text-[#366ED8] text-center bg-[#EEF7FF]">
        Add times
      </button> : <button onClick={()=> setShowDates(!showDates)} className="w-[28.2rem] h-[2.6rem] rounded-xl text-[#366ED8] text-center bg-[#EEF7FF] mt-2">
        Change dates
      </button>}
    </div>
  );
};

export default Calender;
