import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  usePurchaseMembershipMutation,
  useUpdateOrderMutation,
} from "../services/api";
import { FaUser } from "react-icons/fa";
import { AppContext } from "../context/appContext";

const Header = () => {
  const navigate = useNavigate()
  const { user, userToken } = useContext(AppContext);
  const [member, setMember]= useState(user.isPremium);
  const [purchaseMembership, { isLoading }] = usePurchaseMembershipMutation();
  const [updateOrder] = useUpdateOrderMutation();

  useEffect(()=>{
   setMember(user.isPremium)
  },[setMember,navigate,user])

  async function hadleBuyingMembship(e) {
    e.preventDefault();
    try {
      const Response = await purchaseMembership({ userToken });

      const options = {
        key: Response.data.keyId,
        orderId: Response.data.orderDetails.id,
        amount: Response.data.amount,
        handler: async function (response) {
          const result = await updateOrder({
            userToken,
            orderId: options.orderId,
            paymentId: response.razorpay_payment_id,
          });
          toast.success("Payment Successful!");
          setMember(true)
          
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
      
    } catch (error) {
      toast.error("Error during membership purchase:", error);
    }
  }

  return (
    <nav className="p-4 sm:ml-64 rounded-ee-full  h-20 ml-10 hidden md:block mb-4 mt-3 ">
      <div className="p-4 rounded-lg flex  justify-between ">
        <div className="">
          <p className="text-lg font-semibold  text-#1E5D69">Hey, {user.name} !</p>
        </div>
        <div className=" mx-1 flex  ">
          <Toaster />
          {member  ? (
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-indigo-400 group-hover:from-indigo-500 group-hover:to-indigo-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span class="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Premium User
              </span>
            </button>
          ) : (
            <button
              class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={hadleBuyingMembship}
            >
              <span class="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
               {isLoading?<p>Loading...</p>:<p>Buy Membership</p>} 
              </span>
            </button>
          )}
          <div className="flex mx-4 ">
            <span className="self-center pb-2 text-xl flex m font-semibold whitespace-nowrap dark:text-white hover:text-orange-400">
              <FaUser className="m-1 text-#6952F1" />
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
