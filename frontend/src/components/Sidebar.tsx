import React from "react";

interface SidebarProps {
  title: string;
}

const Sidebar: React.FC<SidebarProps> = ({ title }) => {
  return (
    <aside className="w-[22.5rem] h-[calc(100vh-2rem)] mt-[1rem] mb-[1rem] ml-[0.7rem] rounded-2xl bg-white py-12 px-5">
      <h1 className="text-2xl font-bold">{title}</h1>
      <ul className="mt-[1rem]">
        <li className="rounded-xl hover:bg-gray-50 px-2 py-2 cursor-pointer">
            <img/>
            <span>name</span>
            <span>4</span>
        </li>
        
      </ul>
    </aside>
  );
};

export default Sidebar;
