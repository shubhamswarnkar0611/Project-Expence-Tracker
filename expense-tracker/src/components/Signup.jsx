import React from "react";
import axios from 'axios';
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

const Signup = () => {


 let signupDetails;

  const signupUser=()=>{
    let name=document.getElementById("name").value;
    let email=document.getElementById("email").value;
    let password=document.getElementById("password").value;
    signupDetails={name, email, password};

    axios.post("http://localhost:4000/signup", signupDetails)
    .then((response)=>{
        alert(response.data);
    })
    .catch((error)=>{
      alert('SignUp Failure');
    });

  }
  
  



  return (
    <>
      <div className="text-white  border-2 border-gray-300 rounded-xl backdrop-saturate-150 backdrop-blur-lg bg-white/10  w-full relative px-8 py-10 m-4 shadow-2xl shadow-slate-800  ">
        <form >
          <h1 className="text-4xl text-center font-semibold">Signup</h1>
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
          <div className="flex justify-between">
           <lable className=" text-sm hover:underline"> <input className="m-4" type="checkbox"/>I agree with the Terms And Condition </lable>

          </div>
          <button
            className="py-2 px-5 bg-white text-black font-semibold rounded-full shadow-md hover:bg-violet-400 focus:outline-none focus:ring focus:ring-violet-200 focus:ring-opacity-75 w-full my-8"
            type="button" onClick={signupUser}
          >
            Singup
          </button>
          <div className="text-center text-sm ">
            <p>
              Already have an account? <a className="hover:underline" href="#">Login</a>
            </p>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;


