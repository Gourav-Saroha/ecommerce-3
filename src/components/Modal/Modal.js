import React from "react";
import ReactDOM from "react-dom";
const Modal = (props) => {
  return ReactDOM.createPortal(
    <div className="fixed h-screen w-full bg-black bg-opacity-60 z-20">
      {props.children}
    </div>,
    document.getElementById("modal")
  );
};
export default Modal;
