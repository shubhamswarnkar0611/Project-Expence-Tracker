import React,{useContext} from "react";
import "./Login.css";
import { useLoginUserMutation } from "../../services/api";
import {Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import { AppContext } from "../../context/appContext";

const Login = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const {setUserToken}=useContext(AppContext);
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const userDetails = await loginUser({ email, password });
      if (userDetails.error) return toast.error(userDetails.error.data);
      const authToken = userDetails.data;
      localStorage.setItem("userToken", authToken);
      setUserToken(authToken);
      navigate("/");
    } catch (err) {
      toast.error(err);
    }
  }

  return (
    <div className="login">
      <Toaster />
      <div className="text-white  border-2 border-gray-300 rounded-xl backdrop-saturate-150 backdrop-blur-md bg-white/10  w-96 relative px-8 py-10 m-4">
        <form onSubmit={handleLogin}>
          <h1 className="text-4xl text-center font-semibold">Login</h1>
          <div className="relative size-full  my-8">
            <input
              className="size-full bg-transparent border-2  border-gray-300  rounded-3xl  placeholder:text-white py-2 pr-11 pl-5"
              type="text"
              placeholder="Email"
              required
              id="email"
            />
            <FaUser className="absolute right-5 bottom-1/4" />
          </div>
          <div className="relative size-full my-8">
            <input
              className="size-full bg-transparent border-2 border-gray-300  rounded-3xl  placeholder:text-white py-2 pr-11 pl-5 "
              type="password"
              placeholder="Password"
              required
              id="password"
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
            className="py-2 px-5 bg-white text-black font-semibold rounded-full shadow-md hover:bg-orange-400 focus:outline-none focus:ring focus:ring-violet-200 focus:ring-opacity-75 w-full my-8"
            type="submit"
          >
            {isLoading ? <p>Please wait...</p> : <p>Log In</p>}
          </button>
          <div className="text-center text-sm ">
            <p>
              Don't have an account?{" "}
              <Link className="hover:underline" to="/signup">
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
