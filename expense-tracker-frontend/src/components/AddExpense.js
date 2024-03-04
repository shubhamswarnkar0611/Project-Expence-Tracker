import React from "react";
const AddExpense = () => {

  function handleAddExpense(e){
    e.preventDefault();
    const spent = document.getElementById("spent").value;
    const description = document.getElementById("description").value;
    const category = document.getElementById("category").value;

    console.log(spent,description,category);
  }

  return (
    <>
      <div className=" lg:flex lg:justify-center ">
        <h1 className="font-bold text-xl p-4 h-24 flex lg:w-1/2 justify-center bg-neutral-900 text-orange-100 items-center rounded-3xl shadow-lg shadow-orange-300  ">
          AddExpense
        </h1>
      </div>
      <div className=" my-10">
        <div className="font-bold text-xl p-4 flex justify-center items-center   ">
          <form onSubmit={handleAddExpense} className="bg-neutral-900 p-10 rounded-2xl ">
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
                <option  value="" disabled >
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
              <p>Add Expense</p>
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddExpense;
