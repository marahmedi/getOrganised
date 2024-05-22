import React from "react";

const timesArray: number[] = []

for( let i =1; i < 25; i++){
    timesArray.push(i)
}

const Times: React.FC = () => {
  return (
    <div>
      <div className="w-[28.8rem] border-2 border-gray-100 rounded-2xl h-[2.6rem] mt-2 flex justify-between items-center">
        <div className="w-[13rem] h-[2rem] bg-[#EEF7FF] text-center py-1 rounded-2xl ml-1 text-[#366ED8]">
          9:00
        </div>
        <span>-</span>
        <div className="w-[13rem] h-[2rem] bg-[#EEF7FF] py-1 text-center rounded-2xl mr-1 text-[#366ED8]">
          14:00
        </div>
      </div>
      <div className="w-[30rem] grid grid-cols-4 gap-1 mt-1 pr-5">
        {timesArray.map((time)=>(
            <div className="w-[6.8rem] h-[2.3rem] cursor-pointer  bg-gray-100 pt-2 text-gray-500 text-sm text-center rounded-3xl" key = {time}>{`${time < 10 ? '0': ''}${time}.00`}</div>
        ))}
      </div>
      <div className="mt-2 flex justify-between w-[28.8rem]">
        <input placeholder="Custom hours (from)" type="text" className="w-[14.2rem] h-[3rem] bg-gray-100 rounded-xl cursor-pointer pl-2"/>
        <input placeholder="Custom hours (to)" type="text" className="w-[14.2rem] h-[3rem] bg-gray-100 rounded-xl cursor-pointer pl-2"/>
      </div>
    </div>
  );
};

export default Times;
