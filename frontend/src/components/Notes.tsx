import React from "react";

interface NotesProps {
  setNote:(value: string) => void;
}

const Notes: React.FC<NotesProps> = ({setNote}) => {
  return (
    <textarea
      placeholder="Add notes"
      className="my-7 mx-2 bg-gray-100 p-3 rounded-xl w-[27rem] h-[20rem]"
      onChange={(e) => setNote(e.target.value)}
    />
  );
};

export default Notes;
