import React from "react";
import "./Dashboard.css";
import SideBar from "../../components/SideBar";

const Dashboard = () => {
  return (
    <>
      <div className="bg-neutral-200">
        <div className="dashboard">
        
          <SideBar />
        
          <div class="p-4 sm:ml-64">
            <div class="p-4 border-2 border-gray-200 border-dashed rounded-lg ">
              <h1>hello World</h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
