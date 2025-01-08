import React, { useState } from "react";
import TagInput from "../components/TagInput.jsx";
import { MdOutlineClose } from "react-icons/md";
import axiosInstance from "../utilis/AxiosInstance.js";

const AddEditNotes = ({ noteData, getAllNotes, type, onClose }) => {
  const [title, setTitle] = useState("");
  const [content, setcontent] = useState("");
  const [tags, setTags] = useState([]);

  const [error, seterror] = useState(null);

  const addNewNote = async () => {
    try {
      const response = await axiosInstance.post("/add-note", {
        title,
        content,
        tags,
      });

      if (response.data && response.data.note) {
        getAllNotes();
        onClose();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        seterror(error.response.data.message);
      }
    }
  };

  const editNote = async () => {};

  const handleAddNote = () => {
    if (!title || !content || !tags.length) {
      seterror("Input Field can't be left empty!!");
      return;
    }
    seterror("");

    if (type === "edit") {
      editNote();
    } else {
      addNewNote();
    }
  };
  return (
    <div className="relative">
      <button
        className="w-10 h-10 rounded-lg flex item-center justify-center absolute -top-3 -right-3 "
        onClick={onClose}
      >
        <MdOutlineClose className="text-xl text-slate-900" />
      </button>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input
          type="text"
          className="text-2xl text-slate-950 outline-none"
          placeholder="Go To Meeting"
          value={title}
          onChange={() => setTitle(event.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">CONTENT</label>
        <textarea
          type="text"
          className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
          placeholder="Content"
          rows={10}
          value={content}
          onChange={() => setcontent(event.target.value)}
        />
      </div>
      <div className="mt-3">
        <label className="input-label">TAGS</label>
        <TagInput tags={tags} setTags={setTags} />

        {error && <p className="text-red-500 text-xs py-4">{error}</p>}
      </div>
      <button
        className="btn-primary font-medium mt-5 p-3"
        onClick={handleAddNote}
      >
        ADD
      </button>
    </div>
  );
};

export default AddEditNotes;
