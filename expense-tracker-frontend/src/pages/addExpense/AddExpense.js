import React,{useContext} from "react";
import { useAddExpenseMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { AppContext } from "../../context/appContext";

const AddExpense = () => {
  const [addExpense, { isLoading }] = useAddExpenseMutation();
  const navigate = useNavigate();
  const {userToken}=useContext(AppContext);

  async function handleAddExpense(e) {
    e.preventDefault();
    const spent = document.getElementById("spent").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;
    try {
      const expenseDetails = await addExpense({ spent, description, category ,userToken });
      if (expenseDetails.error) toast.error("Opps Something Went Worng");
      toast.success("Expense Added Successfully");
      navigate("/")
      
    } catch (e) {
      toast.error(e.message);
    }
  }

  return (
    <>
      <div>
        <div className="dashboard">
          <SideBar />
          <Header />
          <div className=" sm:ml-64  h-24 sm:relative">
            <div className="rounded-lg  ">
               <div className=" lg:flex lg:justify-start shadow-lg p-4 rounded-ee-full ">
                  <h1 className="font-bold text-xl  h-16 flex lg:w-1/2 justify-start   items-center rounded-3xl  ">
                    AddExpense
                  </h1>
                </div>
                
                <div className=" my-10">
                  <div className="font-bold text-xl p-4 flex justify-center lg:justify-evenly items-center   ">
                    <form
                      onSubmit={!isLoading ? handleAddExpense : null }
                      className="bg-neutral-900 p-10 rounded-2xl "
                    >
                      <div className="relative size-full  my-8 ">
                        <input
                          className="size-full bg-transparent border-2  border-gray-300  rounded-3xl  placeholder:text-gray-500 py-2 pr-11 pl-5 text-white hover:"
                          type="number"
                          placeholder="₹ Spent"
                          required
                          id="spent"
                        />
                      </div>
                      <div className="relative size-full my-8">
                        <input
                          className="size-full bg-transparent border-2 border-gray-300  rounded-3xl  placeholder:text-gray-500 py-2 pr-11 pl-5 text-white"
                          type="text"
                          placeholder="Description"
                          required
                          id="description"
                        />
                      </div>
                      <div className="relative size-full my-8">
                        <select
                          className="size-full bg-transparent border-2 border-gray-300  rounded-3xl  placeholder:text-white py-2 pr-10 pl-5 text-gray-500 "
                          type="text"
                          required
                          id="category"
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
                        className="py-2 px-5 hover:bg-orange-100 text-black font-semibold rounded-full shadow-md bg-orange-400 focus:outline-none focus:ring focus:ring-violet-200 focus:ring-opacity-75 w-full my-8"
                        type="submit"
                      >
                       {isLoading?<p>Adding....</p>:<p>Add Expense</p>}
                      </button>
                    </form>
                    <div className="bg-neutral-900 hidden   w-1/3 h-[57vh] rounded-s-full lg:flex items-center ">
                    <h1 className=" text-orange-400 p-4">
                    Keep a track of your expenses by adding and categorizing each expense as it occurs.
                    </h1>

                    </div>
                  </div>
                  
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
