import React from "react";
import { getInitals } from "../utilis/helper";
const ProfileInfo = ({ onlogOut }) => {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 flex items-center justify-center rounded-full text-slate-950 font-medium bg-slate-100">
        {getInitals("John Doe")}
      </div>

      <div>
        <p className="text-sm font-medium">John Doe</p>
        <buttton
          className="text-sm font-medium cursor-pointer text-primary "
          onClick={onlogOut}
        >
          LogOut
        </buttton>
      </div>
    </div>
  );
};

export default ProfileInfo;
