import React from "react";
// import "./Authentication"
import { FaUser, FaLock } from "react-icons/fa";

const Login = () => {
  return (
    <>
      <div className="text-white  border-2 border-gray-300 rounded-xl backdrop-blur-md bg-white/10  w-96 relative px-8 py-10 m-4">
        <form>
          <h1 className="text-4xl text-center font-semibold">Login</h1>
          <div className="relative size-full  my-8">
            <input
              className="size-full bg-transparent border-2  border-gray-300  rounded-3xl  placeholder:text-white py-2 pr-11 pl-5"
              type="text"
              placeholder="Username/Email"
              required
            />
            <FaUser className="absolute right-5 bottom-1/4" />
          </div>
          <div className="relative size-full my-8">
            <input
              className="size-full bg-transparent border-2 border-gray-300  rounded-3xl  placeholder:text-white py-2 pr-11 pl-5 "
              type="password"
              placeholder="Password"
              required
            />
            <FaLock className="absolute right-5 bottom-1/4" />
          </div>
          <div className="flex justify-between">
            <div></div>
            <a className="-my-4 text-sm hover:underline" href="#">
              Forgot password
            </a>
          </div>
          <button
            className="py-2 px-5 bg-white text-black font-semibold rounded-full shadow-md hover:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-200 focus:ring-opacity-75 w-full my-8"
            type="submit"
          >
            Login
          </button>
          <div className="text-center text-sm ">
            <p>
              Don't have an account? <a className="hover:underline" href="#">Register</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Login;
