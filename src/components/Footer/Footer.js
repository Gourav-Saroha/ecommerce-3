import React from "react";
import {
  AiFillGithub,
  AiFillTwitterCircle,
  AiFillLinkedin,
} from "react-icons/ai";

const Footer = () => {
  return (
    <div className="font-Sans relative">
      <div className="py-4">
        <div className="w-full border-t border-gray-400"></div>
      </div>
      <div className="flex justify-center items-center flex-row my-6">
        <div className="text-neutral-500 hover:text-cyan-500 text-3xl mx-4 transition-all ease-in-out delay-150">
          <a
            href="https://github.com/Gourav-Saroha"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillGithub />
          </a>
        </div>
        <div className="text-neutral-500 hover:text-cyan-500 text-3xl mx-4 transition-all ease-in-out delay-150">
          <a
            href="https://twitter.com/GouravSaro44112"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillTwitterCircle />
          </a>
        </div>
        <div className="text-neutral-500 hover:text-cyan-500 text-3xl mx-4 transition-all ease-in-out delay-150">
          <a
            href="https://www.linkedin.com/in/gourav-saroha-6963b8187/"
            target="_blank"
            rel="noreferrer"
          >
            <AiFillLinkedin />
          </a>
        </div>
      </div>
      <div className="font-medium text-center mb-2">
        <p>
          <span>©2022</span>, Built with
          <span className="text-cyan-500">&nbsp; React Js</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
