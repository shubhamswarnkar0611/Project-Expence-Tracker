import React, { useContext } from "react";
import "../login/Login.css";
import { useForgotPasswordMutation } from "../../services/api";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import { FaUser, FaLock } from "react-icons/fa";
import { AppContext } from "../../context/appContext";

const ForgotPassword = () => {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const { setUserToken } = useContext(AppContext);
  const navigate = useNavigate();

  async function handleForgotPassword(e) {
    e.preventDefault();
    const email = document.getElementById("email").value;

    try {
     const mail = await forgotPassword({email});
     console.log(mail.error);
     if (mail.error) return toast.error(mail?.error?.data);
     toast.success(`A password reset link has been sent ${email}.`);
     console.log(mail.data);
    } catch (err) {
        console.log(err);
      toast.error(err);
    }
  }

  return (
    <div className="login">
      <Toaster />
      <div className="text-white  border-2 border-gray-300 rounded-xl backdrop-saturate-150 backdrop-blur-md bg-white/10  w-96 relative px-8 py-10 m-4">
        <form onSubmit={handleForgotPassword}>
          <h1 className="text-2xl text-center  font-semibold">
            Forgot Password
          </h1>
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
          <div className="flex justify-center">
            <button
              className="py-2 px-5 bg-blue-600 text-white font-semibold rounded-full shadow-md hover:bg-blue-500 focus:outline-none focus:ring focus:ring-violet-200 focus:ring-opacity-75 w-2/3 mb-3 hover:shadow-lg hover:shadow-blue-600"
              type="submit"
            >
              {isLoading ? <p>Please wait...</p> : <p>Reset Password</p>}
            </button>
          </div>
          <div className="text-center text-sm ">
            <p>
              Don't have an account?
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

export default ForgotPassword;
