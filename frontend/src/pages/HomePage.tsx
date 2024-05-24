import React, {useEffect, useState} from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Tasksview from "../components/Tasksview";
import CreateTask from "../components/CreateTask";
import {Task} from "../interfaces"
import {fetchTasks} from "../utils"

interface HomepageProps {
  title: string;
}

const HomePage: React.FC<HomepageProps> = ({ title }) => {

  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedList, setSelectedList] = useState<string | null>(null); // null means 'all lists'
  const [selectedDate, setSelectedDate] = useState<string | null>(null); // null means 'all dates'

  useEffect(() => {
    fetchTasks(selectedList, selectedDate, setTasks);
  }, [selectedList, selectedDate]);

  useEffect(() => {

  }, [])
  
  return (
    <div className="flex h-screen">
      <Sidebar selectedList={selectedList} setSelectedList={setSelectedList}/>
      <div className="flex flex-col w-full px-12 py-8 w-[65rem]">
        <Header title="Good Morning, Marah" />
        <div className="flex-1 overflow-y-auto">
          <Tasksview
          tasks={tasks}
          />
        </div>
        <div className="flex-none">
          <CreateTask />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
