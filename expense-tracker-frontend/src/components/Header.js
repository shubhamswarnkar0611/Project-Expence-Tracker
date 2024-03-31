import React, { useContext, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  usePurchaseMembershipMutation,
  useUpdateOrderMutation,
} from "../services/api";
import { FaUser } from "react-icons/fa";
import { AppContext } from "../context/appContext";
import SideBar from "./SideBar";

const Header = () => {
  const navigate = useNavigate();
  const { user, userToken, setIsOpenSideBar, isOpenSideBar } =
    useContext(AppContext);
  const [member, setMember] = useState(user.isPremium);
  const [purchaseMembership, { isLoading }] = usePurchaseMembershipMutation();
  const [updateOrder] = useUpdateOrderMutation();

  useEffect(() => {
    setMember(user.isPremium);
  }, [setMember, navigate, user]);

  async function handleBuyingMembership(e) {
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
          setMember(true);
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Error during membership purchase:", error);
    }
  }

  return (
    <nav className="sm:px-4 p-4  sm:ml-64 sticky md:relative shadow-md sm:shadow-none   top-0  bg-white md:bg-transparent bg-opacity-90 rounded-ee-full h-20  mb-4 ">
      <div className="  flex justify-between ">
          <div className="flex items-center">
            <button
              data-drawer-target="logo-sidebar"
              data-drawer-toggle="logo-sidebar"
              aria-controls="logo-sidebar"
              type="button"
              className="inline-flex items-center mx-2  ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200   "
              onClick={() => {
                setIsOpenSideBar(!isOpenSideBar);
              }}
            >
              <span className="sr-only">Open sidebar</span>
              <svg
                className="w-6 h-6"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clipRule="evenodd"
                  fillRule="evenodd"
                  d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                ></path>
              </svg>
            </button>
            <p className="text-lg mx-5 font-semibold text-#1E5D69">
              Hey, {user.name}!
            </p>
          </div>
        
        <div className="mx-5 mt-1 flex">
          <Toaster />
          {member ? (
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-full group bg-gradient-to-br from-red-500 to-indigo-400 group-hover:from-indigo-500 group-hover:to-indigo-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
              <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                Pro User
              </span>
            </button>
          ) : (
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
              onClick={handleBuyingMembership}
            >
              <span className="relative px-3 py-2 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                {isLoading ? <p>Loading...</p> : <p>Buy Membership</p>}
              </span>
            </button>
          )}
          <div className="mx-4 hidden md:flex">
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
