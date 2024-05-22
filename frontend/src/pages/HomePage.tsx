import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Tasksview from "../components/Tasksview";
import CreateTask from "../components/CreateTask";

interface HomepageProps {
  title: string;
}

const HomePage: React.FC<HomepageProps> = ({ title }) => {
  const task = {
    name: "clean up",
    time: "6.00 - 7.30",
    status: false,
    group: "normal",
  };
  return (
    <div className="flex h-screen">
      <Sidebar title="All lists" />
      <div className="flex flex-col w-full px-12 py-8 w-[65rem]">
        <Header title="Good Morning, Marah" />
        <div className="flex-1 overflow-y-auto">
          <Tasksview
            name={task.name}
            time={task.time}
            status={task.status}
            group={task.group}
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
