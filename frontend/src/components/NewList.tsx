import React, { useState, useRef, useEffect } from "react";
import {List} from '../interfaces'
import {fetchLists} from '../utils'

interface NewListProps {
  setShowNewList: React.Dispatch<React.SetStateAction<boolean>>;
  setLists: (value: List[]) => void;

}

const NewList: React.FC<NewListProps> = ({ setLists, setShowNewList }) => {
  const [listName, setListName] = useState<string | null>(null);
  const modalRef = useRef<HTMLDivElement | null>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      setShowNewList(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCreateList = async () => {
    if (!listName) {
      console.log("please specify a list name");
      return;
    }

    const url = "http://localhost:4000/lists/";
    const data = { list_name: listName };
  
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.token,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setShowNewList(false)
      const result = await response.json();
      fetchLists(setLists)
      console.log("Success:", result);
    } catch (err) {
      console.error("Error:", err);
    }
  };
  return (
    <div
      className="w-full h-[10rem] items-start flex text-gray-400 gap-2 flex-col bg-gray-50 p-5 rounded-xl"
      ref={modalRef}
    >
      <div className="modal-content">
        <input
          value={listName ? listName : ""}
          onChange={(e) => setListName(e.target.value)}
          type="text"
          placeholder="List name.."
          className="p-3 mb-2 text-black rounded-xl border-[0.07rem] border-gray-200"
        />
      </div>
      <button className="text-[#366ED8]" onClick={handleCreateList}>
        Create
      </button>
      <button className="text-[#366ED8]" onClick={() => setShowNewList(false)}>
        Cancel
      </button>
    </div>
  );
};

export default NewList;
