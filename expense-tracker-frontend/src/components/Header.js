import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import {
  usePurchaseMembershipMutation,
  useUpdateOrderMutation,
} from "../services/api";
import { FaUser } from "react-icons/fa";
import { AppContext } from "../context/appContext";

const Header = () => {
  const { user, userToken } = useContext(AppContext);
  const [purchaseMembership, { isLoading }] = usePurchaseMembershipMutation();
  const [updateOrder] = useUpdateOrderMutation();



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
        },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      toast.error("Error during membership purchase:", error);
    }
  }

  return (
    <nav className="p-4 sm:ml-64 rounded-ee-full bg-neutral-900  shadow-2xl h-24 hidden md:block ">
      <div className="p-4 rounded-lg flex justify-end ">
        <div className=" mx-1 ">
          <Toaster />
          {user.isPremium ? (
            <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-orange-400 group-hover:from-red-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800">
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
                Buy Membership
              </span>
            </button>
          )}
        </div>
        <div className="flex mx-4 ">
          <span className="self-center pb-2 text-xl flex m font-semibold whitespace-nowrap dark:text-white hover:text-orange-400">
            <FaUser className="m-1" />
            {/* <p className="px-1">{user.name}</p> */}
          </span>
        </div>
      </div>
    </nav>
  );
};

export default Header;
