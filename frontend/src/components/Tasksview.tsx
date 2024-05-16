import React from "react";
import clock from "../clock.png";

interface TasksviewProps {
  name: string;
  status: boolean;
  group: string;
  time: string;
}

const Tasksview: React.FC<TasksviewProps> = ({ name, status, group, time }) => {
  return (
    <div className="mt-8 px-2 py-3">
      <div className="bg-white px-4 py-3 w-100 rounded-l flex justify-between items-center mb-2">
        <div className="flex justify-between w-[10rem] items-center">
          <button className="rounded-xl w-[1.8rem] h-[1.8rem] border-2 border-gray-300" />
          {name}
          <span>{group}</span>
        </div>
        <div className="bg-gray-100 px-2 py-1 rounded-l text-sm text-gray-500 flex items-center justify-between">
          <img className="w-[1rem] h-[1rem] mr-1" src={clock} alt="clock" />
          {time}
        </div>
      </div>
    </div>
  );
};

export default Tasksview;
