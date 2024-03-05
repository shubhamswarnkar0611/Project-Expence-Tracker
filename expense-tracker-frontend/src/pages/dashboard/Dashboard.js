import React, { useEffect, useContext, useState } from "react";
import "./Dashboard.css";
import { AppContext } from "../../context/appContext";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import ExpenseList from "../../components/ExpenseList";
import { useGetExpenseMutation } from "../../services/api";
import toast, { Toaster } from "react-hot-toast";

const Dashboard = () => {
  const [showExpenses, setShowExpense] = useState([]);
  const [getExpense] = useGetExpenseMutation();
  const { user, setUser, userToken } = useContext(AppContext);

  async function handleGetExpense() {
    try {
      const expenseDetails = await getExpense({ userToken });
      setShowExpense(expenseDetails.data);
    } catch (err) {
      toast.error(err.message);
    }
  }

  useEffect(() => {
    if (user) {
      handleGetExpense();
    }
  }, [user]);

  return (
    <>
      <div className="dashboard">
        <Toaster />
        <SideBar />
        <Header />
        <div className=" sm:ml-64  h-24 sm:relative">
          <div className="rounded-lg  ">
            <div className=" lg:flex lg:justify-start shadow-lg p-4 rounded-ee-full ">
              <h1 className="font-bold text-xl  h-16 flex lg:w-1/2 justify-start   items-center rounded-3xl  ">
                Expense
              </h1>
            </div>
            <div className="w-full h-full flex justify-center md:justify-start p-8  flex-wrap">
              {showExpenses &&
                 showExpenses.map((expense) => {
                return <ExpenseList expense={expense} key={expense.id} onDelete={ handleGetExpense} />;
              })
           }  
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
