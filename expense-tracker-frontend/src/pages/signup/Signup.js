import React, { useContext } from "react";
import "./Signup.css";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { AppContext } from "../../context/appContext";
import { Link, useNavigate } from "react-router-dom";
import { useSignupUserMutation } from "../../services/api";

const Signup = () => {
  const [signupUser, { isLoading }] = useSignupUserMutation();
  const navigate = useNavigate();
  const {  setUserToken } = useContext(AppContext);

  const handleSignUp = async (e) => {
    e.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let confpassword = document.getElementById("confpassword").value;

    if (confpassword !== password) {
      return alert("Passwords do not match.");
    }

    try {
      const userDetails = await signupUser({ name, email, password });
      console.log(userDetails.data);
      console.log(userDetails.error);
      if (userDetails.error) return toast.error(userDetails.error.data);
      const authToken = userDetails.data;
      localStorage.setItem("userToken", authToken);
      setUserToken(authToken);
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="signup">
      <Toaster />
      <div className="text-white  border-2 border-gray-300 rounded-xl backdrop-saturate-150 backdrop-blur-lg bg-white/10  w-1/3 relative px-8 py-10 m-4 shadow-2xl shadow-slate-800  ">
        <form onSubmit={handleSignUp}>
          <h1 className="text-4xl text-center font-semibold">Sign Up</h1>
          <div className="relative size-full  my-8">
            <input
              className="size-full bg-transparent border-2  border-gray-300  rounded-3xl  placeholder:text-white py-2 pr-11 pl-5"
              type="text"
              placeholder="Full Name"
              id="name"
              required
            />
            <FaUser className="absolute right-5 bottom-1/4" />
          </div>
          <div className="relative size-full  my-8">
            <input
              className="size-full bg-transparent border-2  border-gray-300  rounded-3xl  placeholder:text-white py-2 pr-11 pl-5"
              type="email"
              id="email"
              placeholder="Enter Email"
              required
            />
            <MdEmail className="absolute right-5 bottom-1/4" />
          </div>

          <div className="relative size-full my-8">
            <input
              className="size-full bg-transparent border-2 border-gray-300  rounded-3xl  placeholder:text-white py-2 pr-11 pl-5 "
              type="password"
              id="password"
              placeholder="Password"
              required
            />
            <FaLock className="absolute right-5 bottom-1/4" />
          </div>
          <div className="relative size-full my-8">
            <input
              className="size-full bg-transparent border-2 border-gray-300  rounded-3xl  placeholder:text-white py-2 pr-11 pl-5 "
              type="password"
              id="confpassword"
              placeholder="Confirm Password"
              required
            />
            <FaLock className="absolute right-5 bottom-1/4" />
          </div>
          <div className="flex justify-between">
            <label className=" text-sm hover:underline">
              <input className="m-4" type="checkbox" />I agree with the Terms
              And Condition
            </label>
          </div>
          <button
            className="py-2 px-5 bg-white text-black font-semibold rounded-full shadow-md hover:bg-orange-400 focus:outline-none focus:ring focus:ring-violet-200 focus:ring-opacity-75 w-full my-8"
            type="submit"
          >
           {isLoading ? <p>Please wait...</p> : <p>Sign Up</p>}
          </button>
          <div className="text-center text-sm ">
            <p>
              Already have an account?{" "}
              <Link className="hover:underline" to="/login">
                Login
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
