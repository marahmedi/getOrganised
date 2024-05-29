import React, { useState } from "react";
import dayjs from "dayjs";
import calenderBlue from "../images/calender-b.png";
import arrowRight from "../images/arrow-right.png";
import arrowLeft from "../images/arrow-left.png";

interface DatesProps {
  setDay: (value: string) => void;
}

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsOfYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const numOfCircles: number[] = [];

for (let i = 0; i < 42; i++) {
  numOfCircles.push(i); //
}

const Dates: React.FC<DatesProps> = ({ setDay }) => {
  const today = dayjs();
  const [currentMonth, setCurrentMonth] = useState(today.month());
  const [currentYear, setCurrentYear] = useState(today.year());

  const startOfMonth = dayjs(new Date(currentYear, currentMonth, 1)).startOf(
    "week"
  ); // Start from the first day of the week
  const endOfMonth = dayjs(new Date(currentYear, currentMonth + 1, 0));
  const daysInMonth = endOfMonth.date();

  const datesArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    datesArray.push(i);
  }

  const handleDate = (day: number) => {
    // Use number for day parameter
    setDay(`${day} ${monthsOfYear[currentMonth]} ${currentYear}`); // Format the date string correctly
  };

  const changeMonth = (where: string) => {
    if (where === "next") {
      if (currentMonth === 11) {
        setCurrentMonth(0);
        setCurrentYear(currentYear + 1);
      } else {
        setCurrentMonth(currentMonth + 1);
      }
    } else if (where === "back") {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  return (
    <div className="w-[28rem] mb-4">
      <div className="bg-[#EEF7FF]  h-[2.9rem] w-[28.6rem] rounded-3xl flex items-center justify-between px-2">
        <button
          className="bg-white h-[2rem] w-[2rem] rounded-2xl"
          onClick={() => changeMonth("back")}
        >
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
          <span className="text-[#366ED8]">{`${monthsOfYear[currentMonth]}, ${currentYear}`}</span>
        </div>
        <button
          className="bg-white h-[2rem] w-[2rem] rounded-2xl"
          onClick={() => changeMonth("next")}
        >
          <img
            src={arrowRight}
            alt="arrow-right"
            className="w-[1rem] h-[1rem] ml-2 cursor-pointer"
          />
        </button>
      </div>
      <div className="grid grid-cols-7 text-sm text-center mt-6 mb-4">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="pl-4 grid grid-cols-7 gap-2 justify-center">
        {datesArray.map((date) => (
          <div
            key={date}
            className=" cursor-pointer w-[2.4rem] h-[2.4rem] rounded-full bg-gray-100 text-gray-700 text-sm flex items-center justify-center cursor-pointer mb-1"
            onClick={() => handleDate(date)}
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dates;
