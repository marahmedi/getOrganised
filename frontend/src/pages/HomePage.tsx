import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Tasksview from "../components/Tasksview";

interface HomepageProps {
  title: string;
}

const HomePage: React.FC<HomepageProps> = ({ title }) => {
  const task = {
    name: 'clean up',
    time: '6.00 - 7.30',
    status: false,
    group: 'normal'
  }
  return (
    <div className="flex ">
      <Sidebar title="All lists" />
        <div className="w-50 my-20 ml-20"> 
          <Header title="Good Morning, Marah" />
          <Tasksview name={task.name} time={task.time} status={task.status} group={task.group} />
        </div>
    </div>
  );
};

export default HomePage;
