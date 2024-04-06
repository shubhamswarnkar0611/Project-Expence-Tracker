import React, { useContext, useState } from "react";
import { useAddExpenseMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { AppContext } from "../../context/appContext";
import Footer from "../../components/Footer";

const AddExpense = () => {
  const [addExpense, { isLoading }] = useAddExpenseMutation();
  const { userToken } = useContext(AppContext);
  const [expenseDetailsForm, setExpenseDetailsForm] = useState({
    spent: "",
    description: "",
    category: "",
    userToken: userToken,
  });
  const navigate = useNavigate();

  async function handleAddExpense(e) {
    e.preventDefault();

    try {
      expenseDetailsForm.userToken = userToken;
      console.log(expenseDetailsForm);
      const expenseDetails = await addExpense(expenseDetailsForm);
      if (expenseDetails.error) toast.error("Opps Something Went Worng");
      else toast.success("Expense Added Successfully");
      navigate("/");

      console.log(expenseDetailsForm);
    } catch (e) {
      toast.error(e.message);
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setExpenseDetailsForm({ ...expenseDetailsForm, [name]: value });
  }

  return (
    <>
      <div>
        <div className="dashboard">
          <SideBar />
          <Header />
          <div className=" sm:ml-64  h-24 ">
            <div className="rounded-lg  ">
              <div className=" lg:flex lg:justify-start flex-col shadow-lg p-4 bg-white my-1 rounded-xl mx-4">
                <h1 className="font-bold text-xl flex lg:w-1/2 justify-start text-#6952F1 px-1 items-center rounded-3xl ">
                  Add Expense
                </h1>
                <p className="mx-3 text-sm text-gray-400   ">Details Below</p>
              </div>
              <div className="flex justify-between">
                <div className="w-[90vw] mt-2  2xl:h-[10vh] h-[100%] mb-1   bg-white rounded-2xl shadow-md mx-4">
                  <div className="flex  items-start justify-center flex-col h-full">
                    <p className="mx-10 text-md text-#1E5D69 py-4  ">
                      Enter the amount spent, provide a description of your
                      expense, select a category, and then confirm the spent
                      amount for your expense
                    </p>
                  </div>
                </div>
              </div>

              <div className=" my-2  mx-4 bg-white shadow-lg rounded-lg p-2">
                <div className="font-bold text-xl p-4 flex justify-center lg:justify-evenly items-center    ">
                  <form
                    onSubmit={!isLoading ? handleAddExpense : null}
                    className=" border-2 border-#1D1927 p-5   bg-stone-50   rounded-lg shadow-lg "
                  >
                    <p className="flex justify-center text-#1D1927 text-2xl font-sans">
                      Add your Expense
                    </p>
                    <div className="relative size-full  my-8  ">
                      <input
                        className="size-full bg-transparent border-2  border-#1D1927  rounded-3xl  placeholder:text-gray-500 py-2 pr-11 pl-5 text-#1D1927  placeholder:text-sm"
                        type="number"
                        onChange={handleChange}
                        placeholder="₹ Spent"
                        required
                        name="spent"
                      />
                    </div>
                    <div className="relative size-full my-6">
                      <input
                        className="size-full bg-transparent border-2 border-#1D1927   rounded-3xl  placeholder:text-gray-500  placeholder:text-sm py-2 pr-11 pl-5  text-#1D1927"
                        type="text"
                        onChange={handleChange}
                        placeholder="Description"
                        required
                        name="description"
                      />
                    </div>
                    <div className="relative size-full my-8">
                      <select
                        className="size-full bg-transparent border-2 border-#1D1927  rounded-3xl  placeholder:text-white py-2 pr-10 pl-5  text-#1D1927 "
                        type="text"
                        onChange={handleChange}
                        required
                        name="category"
                      >
                        <option value="" disabled selected>
                          Select Category
                        </option>
                        <option value="fuel">Fuel</option>
                        <option value="food">Food</option>
                        <option value="movie">Movie</option>
                        <option value="shopping">Shopping</option>
                      </select>
                    </div>
                    <button
                      className="py-2 px-5 hover:shadow-#6952F1 text-#6952F1 font-semibold rounded-full shadow-md bg-#1D1927  focus:outline-none focus:ring focus:ring-violet-200 focus:ring-opacity-75 w-full my-8"
                      type="submit"
                    >
                      {isLoading ? <p>Adding....</p> : <p>Add Expense</p>}
                    </button>
                  </form>
                  <div className="bg-stone-50 hidden border-2 border-#1D1927  hover:shadow-indigo-500 shadow-lg w-1/3 h-[57vh] rounded-s-full lg:flex items-center ">
                    <h1 className=" text-indigo-400 p-4 text-base ">
                      Keep a track of your expenses by adding and categorizing
                      each expense as it occurs.
                    </h1>
                  </div>
                </div>
              </div>
              <div className="mb-4">
              <Footer />
            </div>
            </div>
           
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default AddExpense;
