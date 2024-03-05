import React,{useContext} from "react";
import { FaUser } from "react-icons/fa";
import { AppContext } from "../context/appContext";

const Header = () => {
  const { user , setUser } = useContext(AppContext);
  console.log(user.name)
  return (
    <nav className="p-4 sm:ml-64 rounded-ee-full bg-neutral-900  shadow-2xl h-24 hidden md:block ">
      <div className="p-4 rounded-lg flex justify-end ">
        <div>
          <span className="self-center text-xl flex m font-semibold whitespace-nowrap dark:text-white">
            <FaUser className="m-1" />
            <p className="px-3">{user.name}</p>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
