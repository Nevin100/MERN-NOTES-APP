import React from "react";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import { IoMdAdd } from "react-icons/io";
import AddEditNotes from "./AddEditNotes.jsx";
const Home = () => {
  return (
    <div>
      <Navbar />
      <div className="container mx-auto">
        <div className="grid grid-cols-3 gap-4 mt-8 rounded-md">
          <NoteCard
            title="Meeting on 7th December"
            date="28th Nov 2024"
            content="Important Meeting!"
            tag="#Meeting"
            isPlnned={true}
            onEdit={() => {}}
            onDelete={() => {}}
            onPinNote={() => {}}
          />
        </div>
      </div>
      <button className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-900 absolute right-10 bottom-10 transition easy-in-out delay-50">
        <IoMdAdd className="text-[32px] text-white" />
      </button>

      <AddEditNotes />
    </div>
  );
};

export default Home;
