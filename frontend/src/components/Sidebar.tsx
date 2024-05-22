import React,{useEffect, useState} from "react";

interface List {
  list_id: number;
  list_name: string;
  user_id: number;
  task_count: number;
}

const Sidebar: React.FC = () => {

  const [lists, setLists] = useState<List[]>([])
  const [totalTasks, setTotalTasks]= useState<number>(0)

  useEffect(() => {
    fetch('http://localhost:4000/lists/')
    .then(response => response.json())
    .then((data: List[]) => setLists(data))
  }, [])

  useEffect(() => {
    let total = 0;
    lists.forEach(list => {
      total += list.task_count;
    });
    setTotalTasks(total);
  }, [lists]);

  console.log(totalTasks)

  return (
    <aside className="w-[22.5rem] h-[calc(100vh-2rem)] mt-[1rem] mb-[1rem] ml-[0.7rem] rounded-2xl bg-white py-12 px-5">
      <h1 className="text-2xl text-center font-bold mb-10">All lists</h1>
      <ul className="mt-[1rem] overflow-y-auto">
        <li className="rounded-xl flex justify-between items-center w-full hover:bg-gray-50 px-3 py-2 cursor-pointer mb-3">
          <p className="w-[5rem]">All</p>
          <div className="p-1 rounded-xl w-[1.8rem] text-sm h-[1.8rem] text-gray-400 bg-gray-50 text-center">{totalTasks}</div>
        </li>
        {lists.map((list, index) =>(
          <li key={index} className="rounded-xl flex justify-between items-center w-full hover:bg-gray-50 px-3 py-2 cursor-pointer mb-3">
          <p className="w-[5rem]">{list.list_name}</p>
          <div className="p-1 rounded-xl w-[1.8rem] text-sm h-[1.8rem] text-gray-400 bg-gray-50 text-center">{list.task_count}</div>
      </li>
        ))}

      </ul>
    </aside>
  );
};

export default Sidebar;
