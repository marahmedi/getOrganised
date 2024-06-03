import React, { useState, useEffect } from "react";
import CreateTaskBtn from "./CreateTaskBtn";
import calender from "../images/calender.png";
import Calender from "./Calender";
import CalenderW from "../images/calender-w.png";
import Notes from "./Notes";
import notes from "../images/notes.png";
import notesW from "../images/notes-w.png";
import { List } from "../interfaces";
import { formatNumberToTime, formatTimeRangeAmPm, formatDay } from "../utils";

const CreateTask: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dateTimeView, setShowDateTimeView] = useState(true);
  const [lists, setLists] = useState<List[]>([]);
  const [note, setNote] = useState<string>("No notes for this task");
  const [taskName, setTaskName] = useState<string>("");
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [day, setDay] = useState<string>("");
  const [currentList, setCurrentList] = useState<number | null>(null);

  const fetchLists = async () => {
    try {
      const res = await fetch("http://localhost:4000/lists/all", {
        method: "GET",
        headers: { token: localStorage.token },
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
  }, []);

  useEffect(() => {
    if (lists && lists.length > 0) {
      setCurrentList(lists[0].list_id);
    }
  }, [lists]);

  const addTask = async () => {
    const url = "http://localhost:4000/tasks/";

    let data;

    if (currentList) {
      data = {
        task_name: taskName,
        start_time: formatNumberToTime(startTime),
        end_time: formatNumberToTime(endTime),
        list_name: lists.find((list) => list.list_id === currentList)
          ?.list_name,
        task_date: day,
        notes: note,
      };
    }

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { token: localStorage.token },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
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
                onChange={(e) => setCurrentList(parseInt(e.target.value))}
                value={currentList || ""}
                className="w-[22rem] h-[2.5rem] mr-3 border-2 border-gray-200 rounded-xl px-2"
              >
                {lists.map((list, index) => (
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
