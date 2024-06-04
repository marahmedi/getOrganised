import React, { useEffect, useState } from "react";
import { List, Task } from "../interfaces";
import NewList from "./NewList";
import AddIcon from "../images/plus.png";

interface SideBarProps {
  selectedList: string | null;
  setSelectedList: (value: string | null) => void;
  tasks: Task[];
}

interface tasksForList {
  list_name: string;
  task_count: number;
}

const Sidebar: React.FC<SideBarProps> = ({
  selectedList,
  setSelectedList,
  tasks,
}) => {
  const [showNewList, setShowNewList] = useState<boolean>(false);
  const [lists, setLists] = useState<List[]>([]);
  const [totalTasks, setTotalTasks] = useState<number>(0);
  const [tasksForList, setTasksForList] = useState<tasksForList[]>([]);

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
  }, [tasks]);

  useEffect(() => {
    setTotalTasks(tasks.length);
    updateTaskCounts();
  }, [lists, tasks]);

  const updateTaskCounts = () => {
    const taskCounts = lists.map((list) => {
      const taskCount = tasks.filter(
        (task) => task.list_id === list.list_id
      ).length;
      return { list_name: list.list_name, task_count: taskCount };
    });
    setTasksForList(taskCounts);
  };

  const getClassName = (listName: string) => {
    return selectedList === listName ||
      (listName === "All" && selectedList === null)
      ? "bg-gray-50"
      : "";
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
      {!showNewList ? (
        <button onClick={()=> setShowNewList(!showNewList)} className="flex items-center gap-4 justify-start p-3 px-5 text-sm w-full h-[3rem] bg-gray-50 rounded-xl ">
          <img className="w-[1rem] h-[1rem]" src={AddIcon} alt="plus icon" />{" "}
          <p>Create New List</p>
        </button>
      ) : (
        <NewList setLists={setLists} setShowNewList={setShowNewList} />
      )}
    </aside>
  );
};

export default Sidebar;
