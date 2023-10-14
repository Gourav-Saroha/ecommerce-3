import React, { useContext } from "react";
import AuthContext from "../Context/auth-context";

const Setting = () => {
  const authCtx = useContext(AuthContext);
  return (
    <div className="text-left m-6 ">
      <h3 className="font-semibold my-2">SETTINGS</h3>
      <button
        className="text-sm text-white my-2 p-[4px] px-4 border-[0.5px] border-[#0E3EDA] rounded-lg bg-[#0E3EDA] hover:bg-[#3053c8]"
        onClick={() => {
          authCtx.logout();
        }}
      >
        Logout
      </button>
    </div>
  );
};

export default Setting;
