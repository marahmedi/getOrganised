import React, { useState } from "react";

interface TimesProps {
  setStartTime: (value: number | null) => void;
  setEndTime: (value: number | null) => void;
  startTime: number | null;
  endTime: number | null;

}

const timesArray: number[] = [];

for (let i = 1; i < 25; i++) {
  timesArray.push(i);
}

const Times: React.FC<TimesProps> = ({ setStartTime , startTime, endTime, setEndTime}) => {
  
  const [customStartTime, setCustomStartTime] = useState<string>("");
  const [customEndTime, setCustomEndTime] = useState<string>("");
  const [clickCount, setClickCount] = useState(0);

  const handleTime = (time: number) => {
    if (clickCount === 0) {
      setStartTime(time);
      setClickCount(1);
    } else if (clickCount === 1) {
      if (startTime !== null) {
        if (time < startTime) {
          setEndTime(startTime);
          setStartTime(time);
        } else {
          setEndTime(time);
        }
        setClickCount(2);
      }
    } else {
      setStartTime(time);
      setEndTime(null);
      setClickCount(1);
    }
  };

  const handleCustomTime = () => {
    const start = parseInt(customStartTime, 10);
    const end = parseInt(customEndTime, 10);

    if (!isNaN(start) && !isNaN(end) && start < end) {
      setStartTime(start);
      setEndTime(end);
    } else {
      alert(
        "Please enter valid custom times. Start time should be less than end time."
      );
    }
  };

  return (
    <div>
      <div className="w-[28rem] border-2 border-gray-100 rounded-2xl h-[2.6rem] mt-2 mb-4 flex justify-between items-center">
        <div className="w-[13rem] h-[2rem] bg-[#EEF7FF] text-center py-1 rounded-2xl ml-1 text-[#366ED8]">
          {startTime !== null
            ? `${startTime < 10 ? "0" : ""}${startTime}.00`
            : ""}
        </div>
        <span>-</span>
        <div className="w-[13rem] h-[2rem] bg-[#EEF7FF] py-1 text-center rounded-2xl mr-1 text-[#366ED8]">
          {endTime !== null ? `${endTime < 10 ? "0" : ""}${endTime}.00` : ""}
        </div>
      </div>
      <div className="w-[30rem] grid grid-cols-4 gap-1 mt-1 pr-5">
        {timesArray.map((time) => (
          <div
            onClick={() => handleTime(time)}
            className="w-[6.5rem] h-[2.3rem] cursor-pointer  bg-gray-100 pt-2 text-gray-500 text-sm text-center rounded-3xl"
            key={time}
          >{`${time < 10 ? "0" : ""}${time}.00`}</div>
        ))}
      </div>
      <div className="mt-2 flex justify-center gap-1 w-[28.2rem]">
        <input
          value={customStartTime}
          onChange={(e) => setCustomStartTime(e.target.value)}
          placeholder="Custom hours (from)"
          type="text"
          className="w-[14rem] h-[3rem]  bg-gray-100 rounded-xl cursor-pointer pl-2"
        />
        <input
          value={customEndTime}
          onChange={(e) => setCustomEndTime(e.target.value)}
          placeholder="Custom hours (to)"
          type="text"
          className="w-[14rem] h-[3rem] bg-gray-100 rounded-xl text-center cursor-pointer pl-2"
        />
        <button
          onClick={handleCustomTime}
          className="w-[14rem] h-[3rem] bg-blue-500 text-white text-m rounded-xl cursor-pointer pl-2"
        >
          Set time
        </button>
      </div>
    </div>
  );
};

export default Times;
