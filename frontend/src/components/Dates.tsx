import React from "react";
import dayjs from "dayjs";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthsOfYear = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

const Dates: React.FC = () => {
  const startOfMonth = dayjs().startOf("month");
  console.log(startOfMonth)
  const endOfMonth = dayjs().endOf("month");
  console.log(endOfMonth)
  const startDay = startOfMonth.day();
  console.log(startDay)
  const daysInMonth = endOfMonth.date();
  console.log(daysInMonth)

  const datesArray = [];
  for (let i = 1; i <= daysInMonth; i++) {
    datesArray.push(i);
  }
  console.log(datesArray)

  return (
    <div className="w-[28rem] mt-3 px-8 mb-2">
      {/* Header Row */}
      <div className="grid grid-cols-7 gap-4 text-sm text-center mb-4">
        {daysOfWeek.map((day) => (
          <div key={day}>{day}</div>
        ))}
      </div>

      {/* Dates Grid */}
      <div className="grid grid-cols-7 gap-4">
        {/* Empty cells for the start of the month */}
        {Array(startDay)
          .fill(null)
          .map((_, index) => (
            <div key={`empty-${index}`}></div>
          ))}

        {/* Dates */}
        {datesArray.map((date) => (
          <div
            key={date}
            className="flex items-center justify-center w-[2.4rem] h-[2.4rem] rounded-full bg-blue-200"
          >
            {date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dates;
