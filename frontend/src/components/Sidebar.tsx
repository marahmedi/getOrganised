import React, { useEffect, useState } from "react";
import { List, Task } from "../interfaces";

interface SideBarProps {
  selectedList: string | null;
  setSelectedList: (value: string | null) => void;
  tasks: Task[]
}

interface tasksForList {
  list_name: string;
  task_count: number;
}

const Sidebar: React.FC<SideBarProps> = ({ selectedList, setSelectedList, tasks }) => {
  

  const [lists, setLists] = useState<List[]>([]);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [tasksForList, setTasksForList] = useState<tasksForList[]>([]);

  const fetchLists = () => {
    fetch("http://localhost:4000/lists/")
      .then((response) => response.json())
      .then((data: List[]) => setLists(data));
  };

  console.log(lists)

  useEffect(() => {
    fetchLists();
  }, [tasks]);

  useEffect(() => {
    setTotalTasks(tasks.length);
    updateTaskCounts();
  }, [lists, tasks]);

  const updateTaskCounts = () => {
    const taskCounts = lists.map((list) => {
      const taskCount = tasks.filter(task => task.list_id === list.list_id).length;
      return { list_name: list.list_name, task_count: taskCount };
    });
    setTasksForList(taskCounts);
  };

  const getClassName = (listName: string) => {
    return selectedList === listName || (listName === "All" && selectedList === null) ? "bg-gray-50" : "";
  };

  return (
    <aside className="w-[22.5rem] h-[calc(100vh-2rem)] mt-[1rem] mb-[1rem] ml-[0.7rem] rounded-2xl bg-white py-12 px-5">
      <h1 className="text-2xl text-center font-bold mb-10">All lists</h1>
      <ul className="mt-[1rem] overflow-y-auto">
        <li
          className={`rounded-xl flex justify-between items-center w-full px-3 py-2 cursor-pointer mb-3 ${getClassName(
            "All"
          )}`}
          onClick={() => setSelectedList(null)}
        >
          <p className="w-[5rem] ">All</p>
          <div className="p-1 rounded-xl w-[1.8rem] text-sm h-[1.8rem] text-gray-400 bg-gray-50 text-center">
            {totalTasks}
          </div>
        </li>
        {tasksForList.map((taskForList, index) => (
          <li
            key={index}
            className={`rounded-xl flex justify-between items-center w-full px-3 py-2 cursor-pointer mb-3 ${getClassName(
              taskForList.list_name
            )}`}
            onClick={() => setSelectedList(taskForList.list_name)}
          >
            <p className="w-[5rem]">{taskForList.list_name}</p>
            <div className="p-1 rounded-xl w-[1.8rem] text-sm h-[1.8rem] text-gray-400 bg-gray-50 text-center">
              {taskForList.task_count}
            </div>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
