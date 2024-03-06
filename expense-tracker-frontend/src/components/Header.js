import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { usePurchaseMembershipMutation,useUpdateOrderMutation } from "../services/api";
import { FaUser } from "react-icons/fa";
import { AppContext } from "../context/appContext";


const Header = () => {
  const { user,userToken } = useContext(AppContext);
  const [purchaseMembership, { isLoading }] = usePurchaseMembershipMutation();
  const [updateOrder] = useUpdateOrderMutation();

  async function hadleBuyingMembship(e) {
    e.preventDefault();
    try {
      const Response = await purchaseMembership({ userToken });
      console.log(Response);
  
      const options = {
        key: Response.data.keyId,
        orderId: Response.data.orderDetails.id,
        handler: async function (response) {
          console.log(response.razorpay_payment_id);
          const result = await updateOrder({
            userToken,
            orderId: options.orderId,
            paymentId: response.razorpay_payment_id,
          });
          console.log(result);
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
      <div className="p-4 rounded-lg flex justify-around ">
        <div>
          <Toaster/>
          <button className="text-md p-2 font-bold  bg-orange-400 hover:bg-orange-300 text-black rounded-xl" onClick={hadleBuyingMembship}>Buy Membership</button>
        </div>
        <div className="flex ">
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
