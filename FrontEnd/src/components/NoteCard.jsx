import React from "react";
import { MdOutlinePushPin } from "react-icons/md";
import { MdCreate, MdDelete } from "react-icons/md";

const NoteCard = ({
  title,
  date,
  content,
  tag,
  isPlnned,
  onEdit,
  onDelete,
  onPinNote,
}) => {
  return (
    <div className="border rounded p-4 bg-white hover:shadow-xl transition-all ease-in-out">
      <div className="flex items-center justify-between">
        <div>
          <h6 className="text-sm font-medium ">{title}</h6>
          <span className="text-xs text-slate-600">{date}</span>
        </div>
        <MdOutlinePushPin
          className={`icon-btn ${isPlnned ? "text-primary" : "text-slate-900"}`}
          onClick={onPinNote}
        />
      </div>
      <p className="text-xs text-slate-600 mt-2">{content?.slice(0, 60)}</p>
      <div className="flex justify-between items-center">
        <div className="text-xs text-slate-500 mt-2 ">
          {tag.map((item) => ` #${item} `)}
        </div>
        <div className="flex gap-2 items-center ">
          <MdCreate
            className="icon-btn hover:text-green-600"
            onClick={onEdit}
          />
          <MdDelete
            className="icon-btn hover:text-red-600"
            onClick={onDelete}
          />
        </div>
      </div>
    </div>
  );
};

export default NoteCard;
