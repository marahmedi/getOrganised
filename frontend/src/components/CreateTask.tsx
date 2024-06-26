import React, { useState, useRef, useEffect } from "react";
import CreateTaskBtn from "./CreateTaskBtn";
import calender from "../images/calender.png";
import Calender from "./Calender";
import CalenderW from "../images/calender-w.png";
import Notes from "./Notes";
import notes from "../images/notes.png";
import notesW from "../images/notes-w.png";
import { List, Task } from "../interfaces";
import {
  formatNumberToTime,
  formatTimeRangeAmPm,
  formatDay,
  fetchTasks,
} from "../utils";

interface CreateTaskProps {
  selectedList: string | null;
  selectedDate: string | null;
  setTasks: (value: Task[]) => void;
}

const CreateTask: React.FC<CreateTaskProps> = ({
  selectedDate,
  selectedList,
  setTasks,
}) => {
  const [open, setOpen] = useState(false);
  const [dateTimeView, setShowDateTimeView] = useState(true);
  const [lists, setLists] = useState<List[]>([]);
  const [note, setNote] = useState<string>("No notes for this task");
  const [taskName, setTaskName] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [day, setDay] = useState<string>("");
  const [currentList, setCurrentList] = useState<number | string>("");

  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: { target: any }) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const fetchLists = async () => {
    try {
      const res = await fetch("http://localhost:4000/lists/all", {
        method: "GET",
        headers: {
          token: localStorage.token,
        },
      });
      // Check if the response was successful
      if (!res.ok) {
        throw new Error("Failed to fetch lists");
      }
      // Parse the response body as JSON
      const parseData = await res.json();

      // Update state with the fetched lists
      setLists(parseData.lists);
    } catch (err) {
      console.error("Error fetching lists:", err);
    }
  };

  useEffect(() => {
    fetchLists();
  }, [lists]);

  const addTask = async () => {
    const url = "http://localhost:4000/tasks/";
    let data;

    const findListName = (list: List) => {
      if(list.list_id === currentList) {
        return list.list_name;
      } else {
        return 'should be list name'
      }
    };
    

    if (currentList) {
      data = {
        task_name: taskName,
        start_time: formatNumberToTime(startTime),
        end_time: formatNumberToTime(endTime),
        list_id: currentList,
        list_name: lists.forEach(findListName),
        task_date: day,
        notes: note,
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      fetchTasks(selectedList, selectedDate, setTasks);
      console.log("Success:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const handleClick = () => {
    addTask();
    setOpen(!open);
  };

  return (
    <div ref={modalRef}>
      {!open ? (
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
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                type="text"
                placeholder="Create new task"
                className="bg-gray-100 ml-2 focus:outline-none w-[15rem]"
              />
              {day !== "" ? (
                <div className="h-[1.7rem] mr-3 text-center w-[6rem] text-sm p-1 text-gray-400 bg-white rounded-xl">
                  {formatDay(day)}
                </div>
              ) : null}
              {startTime && endTime !== null ? (
                <div className="h-[1.7rem]  text-center w-[8rem] text-sm p-1 text-gray-400 bg-white rounded-xl">
                  {formatTimeRangeAmPm(startTime, endTime)}
                </div>
              ) : null}
            </div>
            <div className="mt-1 flex">
              <select
                onChange={(e) => setCurrentList(e.target.value)}
                value={currentList}
                className="w-[22rem] h-[2.5rem] mr-3 border-2 border-gray-200 rounded-xl px-2"
              >
                <option value="" disabled>
                  Select a list
                </option>
                {lists.map((list) => (
                  <option key={list.list_id} value={list.list_id}>
                    {list.list_name}
                  </option>
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
                  src={dateTimeView ? notes : notesW}
                  alt="calender-icon"
                  className="w-[1.2rem] h-[1.3rem]"
                />
              </button>
            </div>
          </div>
          {dateTimeView ? (
            <Calender
              setDay={setDay}
              setStartTime={setStartTime}
              setEndTime={setEndTime}
              startTime={startTime}
              endTime={endTime}
            />
          ) : (
            <Notes setNote={setNote} />
          )}
          <button
            onClick={handleClick}
            className="w-full h-[2.6rem] rounded-xl text-center bg-[#366ED8] text-white"
          >
            Save changes
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
