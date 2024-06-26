import React, { useContext } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useDeleteExpenseMutation } from "../services/api";
import { AppContext } from "../context/appContext";

const ExpenseList = (props) => {
  const [deleteExpense, { isLoading }] = useDeleteExpenseMutation();
  const { userToken } = useContext(AppContext);

  async function handleDelete(e) {
    e.preventDefault();
    
    try {
      const msg = await deleteExpense({
        userToken,
        expenseId: props.expense.id,
      });
      toast.success(msg.data);
      props.onDelete();
    } catch (err) {
      toast.error(err.message);
    }
  }

  return (
    <>
      <div className="bg-#A6C1C7 w-72 h-40 m-2  rounded-xl hover:bg-neutral-800 hover:shadow-lg border-teal-700 border-2 delay-150 ">
        <div className="flex justify-between">
          <Toaster />
          <h1 className="text-gl p-2 px-4 font-semibold text-teal-900 hover:text-cyan-50 ">
           
            {props.expense.category}
          </h1>
          <h1 className="text-sm p-3  text-neutral-600">
          
            {props.expense.createdAt.split("T")[0]}
          </h1>
        </div>
        <div className="flex justify-start">
          <h1 className="text-sm py-2 px-4   text-gray-600">
            Desc-{props.expense.description}
          </h1>
        </div>
        <div className="flex justify-evenly h-16 items-end">
          <h1 className="text-md p-2 font-semibold  text-#1D1927 bg-white rounded-xl">
            ₹{props.expense.spent}
          </h1>
          <button
            className="text-md p-2 font-semibold  bg-#1E5D69 hover:bg-red-400 text-white rounded-xl"
            onClick={handleDelete}
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default ExpenseList;
