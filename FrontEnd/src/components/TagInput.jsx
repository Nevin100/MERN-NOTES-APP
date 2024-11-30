import React from "react";
import { MdAdd, MdDelete } from "react-icons/md";

const TagInput = ({ tags, setTags }) => {
  return (
    <div>
      <div className="flex items-center gap-4 mt-3">
        <input
          type="text"
          className="text-sm bg-transparent border px-3 py-2 rounded outline-none"
          placeholder="Add tags"
        />

        <button className="">
          <MdAdd className="text-2xl text-blue-700 hover:text-neutral-400" />
        </button>
      </div>
    </div>
  );
};

export default TagInput;
