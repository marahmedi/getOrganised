import React, { useState } from "react";
import CreateTaskBtn from "./CreateTaskBtn";
import calender from "../images/calender.png";
import Calender from "./Calender";
import CalenderW from "../images/calender-w.png";
import Notes from "./Notes";
import notes from "../images/notes.png"
import notesW from "../images/notes-w.png";

const CreateTask: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [dateTimeView, setShowDateTimeView] = useState(true);

  

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
            <div className=" flex justify-start bg-gray-50 h-[3rem] rounded-l px-4 flex items-center justify-start">
              <div className="w-[1.8rem] h-[1.8rem] rounded-xl border-2 border-gray-300 mr-2"></div>
              <input
                type="text"
                placeholder="Create new task"
                className="bg-gray-50 focus:outline-none w-[9rem]"
              />
            </div>
            <div className="mt-1 flex">
              <select className="w-[22rem] h-[2.5rem] mr-3 border-2 border-gray-200 rounded-xl px-2"></select>
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
          {dateTimeView ? <Calender /> : <Notes />}
          <button className="w-full h-[2.6rem] rounded-xl text-center bg-[#366ED8] text-white">
            Save changes
          </button>
        </div>
      )}
    </div>
  );
};

export default CreateTask;
