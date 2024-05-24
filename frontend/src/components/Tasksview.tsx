import React, {useEffect, useState} from "react";
import clock from "../images/clock.png";
import dots from "../images/dots.png";
import {formatTimeRange} from "../utils"
import {Task} from "../interfaces"


interface TaskViewProps {
  tasks: Task[]
}

const Tasksview: React.FC<TaskViewProps> = ({tasks}) => {


  return (
    <div className="mt-8 px-2 py-3">
      {tasks.map((task: Task, index: number)=> (
      <div key={index} className="bg-white py-2 px-4 w-100 rounded-xl flex justify-between items-center mb-2">
        <div className="flex justify-start gap-6 w-[40rem] items-center">
          <button className="rounded-xl w-[1.8rem] h-[1.8rem] border-2 border-gray-300 cursor-pointer" />
          <p className="w-[13rem]">{task.task_name}</p>
          <p className="w-[6rem] text-[#366ED8] text-sm">{task.list_name}</p>
        </div>
        <div className="flex justify-between w-[10rem] items-center">
          <div className="bg-gray-100 px-2 py-1 rounded-xl text-sm text-gray-500 flex items-center justify-between">
            <img className="w-[1rem] h-[1rem] mr-1" src={clock} alt="clock" />
            {formatTimeRange(task.start_time, task.end_time)}
          </div>
          <img
            className="w-[1.5rem] h-[1.5rem] mr-1 cursor-pointer"
            src={dots}
            alt="vertical dots"
          />
        </div>
      </div>
      ))}
    </div>
  );
};

export default Tasksview;
