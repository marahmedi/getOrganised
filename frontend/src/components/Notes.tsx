import React from "react";

const Notes: React.FC = () => {
  return (
    <textarea
      placeholder="Add notes"
      className="my-7 mx-2 bg-gray-100 p-3 rounded-xl w-[27rem] h-[20rem]"
    />
  );
};

export default Notes;
