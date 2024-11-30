import React, { useState } from "react";
import Navbar from "../components/Navbar.jsx";
import NoteCard from "../components/NoteCard.jsx";
import { IoMdAdd } from "react-icons/io";
import AddEditNotes from "./AddEditNotes.jsx";
import Modal from "react-modal";

const Home = () => {
  const [openAddEditModal, setOpenAddEditModal] = useState({
    isShown: false,
    type: "add",
    data: null,
  });
  return (
    <>
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
      <button
        className="w-16 h-16 flex items-center justify-center rounded-full bg-primary hover:bg-blue-900 absolute right-10 bottom-10 transition easy-in-out delay-50"
        onClick={() => {
          setOpenAddEditModal({
            isShown: true,
            type: "add",
            data: null,
          });
        }}
      >
        <IoMdAdd className="text-[32px] text-white" />
      </button>

      <Modal
        isOpen={openAddEditModal.isShown}
        onRequestClose={() => {}}
        style={{
          overlay: {
            backgroundColor: "rgba(0,0,0,0.2)",
          },
        }}
        contentLabel=""
        className="w-[40%] max-h-3/4 bg-white rounded-md mx-auto mt-14 p-5 overflow-scroll"
      >
        <AddEditNotes />
      </Modal>
    </>
  );
};

export default Home;
