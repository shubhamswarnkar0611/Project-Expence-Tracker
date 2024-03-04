import React from "react";
import "./Dashboard.css";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import AddExpense from "../../components/AddExpense";

const Dashboard = () => {
  return (
    <>
      <div>
        <div className="dashboard">
          <SideBar />
          <Header />
          <div className="p-4 sm:ml-64  h-24 sm:relative">
            <div className="p-4 rounded-lg  ">
              <div>
                <AddExpense/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
