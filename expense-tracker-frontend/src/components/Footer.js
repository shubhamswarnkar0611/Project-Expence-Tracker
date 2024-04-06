import React from "react";
import { AiOutlineLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="h-[32vh]" >
      <div className=" lg:flex-col lg:justify-start shadow-lg p-8 bg-#6952F1 mt-10 rounded-xl lg:ml-8 mx-3 ml-6 2xl:ml-6 2xl:mr-8 h-[30vh] text-white mb-2 ">
        <div className="flex justify-start items-start pb-10 ">
          <div>
            <h1 className="font-bold text-xl py-2">Spent Wise</h1>
            <p className="text-gray-300 text-sm ">
              Designed By Shubham Swarnkar
            </p>
          </div>
          <div></div>
        </div>
        <div className="flex text-sm text-gray-300 hover:text-white ">
          <AiOutlineLinkedin className="size-5 " />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/shubham-swarnkar-webdev/"
          >
            -Shubham Swarnkar
          </a>
        </div>
        <div className="mt-4 text-gray-300 ">
          <p>&copy; {new Date().getFullYear()} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
