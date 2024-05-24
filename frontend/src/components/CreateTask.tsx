import React, { useState, useEffect } from "react";
import CreateTaskBtn from "./CreateTaskBtn";
import calender from "../images/calender.png";
import Calender from "./Calender";
import CalenderW from "../images/calender-w.png";
import Notes from "./Notes";
import notes from "../images/notes.png"
import notesW from "../images/notes-w.png";
import {formatNumberToTime, formatTimeRangeAmPm} from "../utils"


interface List {
    list_id: number;
    list_name: string;
    user_id: number;
    task_count: number;
  }

const CreateTask: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dateTimeView, setShowDateTimeView] = useState(true);
  const [lists, setLists] = useState<List[]>([])
  const [taskName, setTaskName] = useState<string>('')
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [day, setDay] = useState<string>('')
  const [storedTime, setStoredTime] = useState<string>('')
  const [currentList, setCurrentList] = useState<string>('')


  useEffect(() => {
    fetch('http://localhost:4000/lists/')
    .then(response => response.json())
    .then((data: List[]) => setLists(data))
  }, [] )

  const addTask = async () => {
    const url = 'http://localhost:4000/tasks/';
    const data = {
      task_name: taskName,
      start_time: formatNumberToTime(startTime),
      end_time: formatNumberToTime(endTime),
      status: false,
      list_name: currentList,
      list_id: 1,
      user_id: 1
    };

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Success:', result);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  const handleClick = () => {
    addTask();
    setOpen(!open);
  };

  const handleSetTaskName = () => {

  }

  return (
    <div>
      {open === false ? (
        <CreateTaskBtn setOpen={setOpen} />
      ) : (
        <div
          className="calender-box bg-white w-[30rem] h-[36rem] p-3 rounded-2xl"
          style={{
            position: "absolute",
            top: "13rem",
            left: "20rem",
            zIndex: 999,
          }}
        >
          <div className="calender-header h-[6rem]">
            <div className=" flex justify-start bg-gray-100 h-[3rem] rounded-l px-4 flex items-center justify-start">
              <div className="w-[1.8rem] h-[1.5rem] rounded-xl border-2 border-gray-300 mr-2"></div>
              <input

                type="text"
                placeholder="Create new task"
                className="bg-gray-100 ml-2 focus:outline-none w-[15rem]"
              />
              <div className="h-[1.7rem] mr-3 text-center w-[6rem] text-sm p-1 text-gray-400 bg-white rounded-xl">date</div>
              { startTime && endTime !== null ? <div className="h-[1.7rem]  text-center w-[8rem] text-sm p-1 text-gray-400 bg-white rounded-xl">{formatTimeRangeAmPm(startTime, endTime)}</div>: null}
            </div>
            <div className="mt-1 flex">
              <select className="w-[22rem] h-[2.5rem] mr-3 border-2 border-gray-200 rounded-xl px-2">
                {lists.map((list, index)=> (
                    <option onChange={() => setCurrentList(list.list_name)} key={index}>{list.list_name}</option>
                ))}
              </select>
              <button
                className="h-[2.5rem] w-[2.6rem] border-[0.07rem] border-gray-200 pl-[0.65rem] mr-2 rounded-xl"
                onClick={() => setShowDateTimeView(!dateTimeView)}
                style={{ backgroundColor: dateTimeView ? "black" : "initial" }}
              >
                <img
                  src={dateTimeView ? CalenderW : calender}
                  alt="calender-icon"
                  className="w-[1.2rem] h-[1.3rem]"
                />
              </button>
              <button
                className="h-[2.5rem] w-[2.6rem] border-[0.07rem] border-gray-200 pl-[0.65rem] rounded-xl"
                onClick={() => setShowDateTimeView(!dateTimeView)}
                style={{ backgroundColor: dateTimeView ? "initial" : "black" }}
              >
                <img
                  src={dateTimeView ? notes: notesW}
                  alt="calender-icon"
                  className="w-[1.2rem] h-[1.3rem]"
                />
              </button>
            </div>
          </div>
          {dateTimeView ? <Calender setStartTime={setStartTime} setEndTime={setEndTime} startTime={startTime} endTime={endTime} /> : <Notes />}
          <button onClick={handleClick} className="w-full h-[2.6rem] rounded-xl text-center bg-[#366ED8] text-white">
            Save changes
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
