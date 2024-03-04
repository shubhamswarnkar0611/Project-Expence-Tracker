import React from "react";
import { FaUser } from "react-icons/fa";

const Header = () => {
  return (
    <nav className="p-4 sm:ml-64 bg-neutral-900 rounded-ee-full bg-transparent shadow-2xl h-24 hidden md:block">
      <div className="p-4 rounded-lg flex justify-end ">
        <div>
          <span className="self-center text-xl flex m font-semibold whitespace-nowrap dark:text-white">
            <FaUser className="m-1" />
            <p className="px-3">Shubham</p>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
