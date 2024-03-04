import React from "react";
import "./Dashboard.css";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import ExpenseList from "../../components/ExpenseList";

const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
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
              <ExpenseList/>
              <ExpenseList/>
              <ExpenseList/>
              
              
              
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
