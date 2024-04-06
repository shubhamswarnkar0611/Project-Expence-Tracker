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
import Footer from "../../components/Footer";

const Dashboard = () => {
  const [showExpenses, setShowExpense] = useState([]);
  const [nPages, setnPages] = useState();
  const [getExpense] = useGetExpenseMutation();
  const { user, userToken } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [perPage, setPerPage] = useState(8);

  console.log(showExpenses);

  async function handleGetExpense() {
    try {
      console.log(perPage, "Dash");

      const response = await getExpense({ userToken, currentPage, perPage });
      setShowExpense(response.data.expenseDetails);
      setnPages(response.data.nPages);
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    if (user) {
      handleGetExpense();
    }
  }, []);

  useEffect(() => {
    if (user) {
      handleGetExpense();
    }
  }, [currentPage, perPage]);

  return (
    <>
      <div className="dashboard  ">
        <Toaster />
        <SideBar />
        <Header />
        <div className=" sm:ml-64   ">
          <div className=" lg:flex lg:justify-start shadow-lg p-4 bg-white my-2 rounded-xl lg:ml-8 mx-3 ml-6 2xl:ml-6 2xl:mr-8 ">
            <h1 className="font-bold text-xl    h-10 flex lg:w-1/2 justify-start text-#6952F1 px-1 items-center rounded-3xl ">
              Expense
            </h1>
            <p className="mx-3 text-sm text-gray-400   ">Details Below</p>
          </div>

          <div className="  flex items-center sm:ml-6 sm:mr-3 flex-row md:flex-row  sm:flex-col sm:justify-center lg:ml-2 ">
            <div className="  w-[53vw] mt-3  2xl:h-[15vh] h-[22vh] py-4  bg-white rounded-xl 2xl:ml-5  shadow-lg pb-8 mx-2 ml-6">
              <div className="flex  items-start justify-center flex-col h-full">
                <p className="ml-4 my-3   text-md  text-#1E5D69 font-semibold">
                  Your Expense
                </p>
                <p className="ml-4  text-#A6C1C7  text-sm ">
                  "Control your expenses better than you control your income.
                  Then you will always have money." - Bo Sanchez
                </p>
              </div>
            </div>

            <div className="w-[33vw] mt-3  2xl:h-[15vh] h-[22vh]   bg-#6952F1 rounded-xl  shadow-md pb-7 mx-5 hover:shadow-indigo-500 hover:bg-indigo-500 ">
              <Link
                to="/add-expense"
                className="flex  items-center justify-center  flex-col h-full "
              >
                <p className="mx-10 my-3  text-4xl text-#FCF7FF font-semibold">
                  +
                </p>
                <p className="  text-#FCF7FF font-semibold ">
                  Add Expense
                </p>
              </Link>
            </div>
          </div>

          <div className="flex justify-center mb-6 mt-4  ">
            <div className="w-[90vw] sm:w-[50vw] md:w-[61vw] lg:w-[70vw] xl:w-[76vw] 2xl:w-[81vw] mt  min-h-[58vh] bg-white rounded-xl  shadow-lg 2xl:ml-2  ">
              <div className="flex justify-center  min-h-[40vh] xl:justify-start px-4  pt-4 flex-wrap ">
                {showExpenses.length != 0 ? (
                  showExpenses.map((expense) => {
                    return (
                      <ExpenseList
                        expense={expense}
                        key={expense.id}
                        onDelete={handleGetExpense}
                      />
                    );
                  })
                ) : (
                  <p className="text-gray-400 lg:ml-[25vw] ">
                    No Expenses Yet! Please add an expense above.
                  </p>
                )}
              </div>
              <div className="  ">
                {nPages ? (
                  <Pagination
                    nPages={nPages}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    setPerPage={setPerPage}
                  />
                ) : null}
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
