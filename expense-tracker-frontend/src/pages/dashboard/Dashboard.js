import React, { useEffect, useContext, useState } from "react";
import "./Dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import ExpenseList from "../../components/ExpenseList";
import { useGetExpenseMutation } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import Pagination from "../../components/Pagination";

const Dashboard = () => {
  const [showExpenses, setShowExpense] = useState([]);
  const [getExpense] = useGetExpenseMutation();
  const { user, setUser, userToken } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(8);

  async function handleGetExpense() {
    try {
      const expenseDetails = await getExpense({ userToken });
      setShowExpense(expenseDetails.data);
    } catch (err) {
      toast.error(err.message);
    }
  }

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = showExpenses.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const nPages = Math.ceil(showExpenses.length / recordsPerPage);

  useEffect(() => {
    if (user) {
      handleGetExpense();
    }
  }, [setUser]);

  return (
    <>
      <div className="dashboard  ">
        <Toaster />
        <SideBar />
        <Header />
        <div className=" sm:ml-64 sm:relative   ">
          <div className=" lg:flex lg:justify-start shadow-lg p-4 bg-white my-2 rounded-xl mx-4">
            <h1 className="font-bold text-xl  h-10 flex lg:w-1/2 justify-start text-#6952F1 px-1 items-center rounded-3xl ">
              Expense
            </h1>
          </div>

          <div className="flex items-center flex-row md:flex-row  sm:flex-col sm:justify-center ">
            <div className="w-[53vw] mt-3  2xl:h-[15vh] h-[100%]   bg-white rounded-xl  shadow-lg pb-7 mx-5">
              <div className="flex  items-start justify-center flex-col h-full">
                <p className="mx-10 my-3  text-md  text-#1E5D69 font-semibold">
                  Your Expense
                </p>
                <p className="mx-10  text-#A6C1C7  text-sm ">
                  "Control your expenses better than you control your income.
                  Then you will always have money." - Bo Sanchez
                </p>
              </div>
            </div>

            <div className="w-[33vw] mt-3  2xl:h-[15vh] h-[100%]   bg-#6952F1 rounded-xl  shadow-md pb-7 mx-5 hover:shadow-indigo-500 hover:bg-indigo-500 ">
              <Link
                to="/add-expense"
                className="flex  items-center justify-center flex-col h-full "
              >
                <p className="mx-10 my-3  text-4xl text-#FCF7FF font-semibold">
                  +
                </p>
                <p className="mx-10  text-#FCF7FF font-semibold ">
                  Add Expense
                </p>
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="w-[82vw] mt-3  2xl:min-h-[55vh] h-[100%]   bg-white rounded-xl  shadow-lg ">
              <div className="flex justify-center items-center xl:justify-start px-4 min-h-[46vh]  flex-wrap ">
                {currentRecords &&
                  currentRecords.map((expense) => {
                    return (
                      <ExpenseList
                        expense={expense}
                        key={expense.id}
                        onDelete={handleGetExpense}
                      />
                    );
                  })}
              </div>
              <div className="my-2" >
                <Pagination
                  nPages={nPages}
                  currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
