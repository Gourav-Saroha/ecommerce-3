import React from "react";

const Form = (props) => {
  return (
    <div className="flex justify-center items-center h-auto ">
      <div className="flex justify-center items-center flex-col w-full lg:w-2/5 text-sm h-auto p-4 mt-[4rem] ">
        {props.children}
      </div>
    </div>
  );
};

export default Form;
