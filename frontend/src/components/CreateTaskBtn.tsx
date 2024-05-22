import React from 'react'
import plus from "../plus.png";

interface CreateTaskBtnProps {
    setOpen: (value: boolean) => void;
  }

const CreateTaskBtn: React.FC<CreateTaskBtnProps> = ({setOpen}) => {
  return (
    <div className="bg-black w-[32rem] h-[3.75rem] rounded-3xl px-4 py-2 flex items-center cursor-pointer" onClick={()=> {setOpen(true)}}>
      <img
        className="w-[1rem] h-[1rem] mr-4 cursor-pointer"
        src={plus}
        alt="add icon"
      />
      <span className="text-gray-100">Create new task</span>
    </div>
  )
}

export default CreateTaskBtn