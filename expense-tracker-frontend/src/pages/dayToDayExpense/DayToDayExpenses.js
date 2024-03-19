import React, { useContext, useEffect, useState } from "react";
import { useDownloadExpensesMutation, useShowLeaderboardMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { AppContext } from "../../context/appContext";
import { saveAs } from 'file-saver';

const DayToDayExpenses = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, { isLoading: leaderboardLoading }] = useShowLeaderboardMutation();
  const [downloadExpenses,{ isLoading: downloadLoading }] = useDownloadExpensesMutation();
  const { setUser, user,userToken } = useContext(AppContext);

  useEffect(() => {
    if (user) {
      handleShowLeaderboard();
    }
  }, [setUser]);

  const handleShowLeaderboard = async () => {
    try {
      console.log("get get get datda");
      setLeaderboard(await showLeaderboard({}));
      if (leaderboard.error) return alert(leaderboard.error);
      console.log(leaderboard);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDownload = async () => {
    try{
    const S3response= await downloadExpenses({userToken})
    console.log(S3response.data.Location)
    saveAs(S3response.data.Location,"Expenses.txt")
    }catch (err) {
      toast.error('Error downloading file');
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
              <div className=" lg:flex lg:justify-between shadow-lg p-4 rounded-ee-full ">
                <h1 className="font-bold text-xl  h-16 flex lg:w-1/2 justify-start   items-center rounded-3xl  ">
                  Day to Day Expenses
                </h1>
                <div className="mx-6 mt-3">
                  <button class="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-red-500 to-orange-400 group-hover:from-red-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800" onClick={handleDownload}>
                    <span class="relative px-3 py-2 transition-all ease-in duration-75 bg-white text-black rounded-md group-hover:bg-opacity-0">
                    {downloadLoading ? <p>Please wait...</p> : <p>Download</p>}
                    </span>
                  </button>
                </div>
              </div>
              <div className=" mt-8 ">
                <div class=" flex justify-center overflow-x-auto ">
                  <table class="w-2/3 text-sm text-left rtl:text-right text-white  ">
                    <thead class="text-xs bg-orange-400 text-gray-900">
                      <tr>
                        <th scope="col" class="px-4 py-3">
                          Date
                        </th>
                        <th scope="col" class="px-6 py-3">
                          Discription
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Category
                        </th>
                        <th scope="col" class="px-4 py-3">
                          Expense
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.data ? (
                        leaderboard.data.map((user, index) => {
                          return (
                            <tr class="bg-white border-b dark:bg-neutral-900 dark:border-gray-700">
                              <td class="px-4 py-4">{index + 1}</td>
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {user.name}
                              </th>
                              <td class="px-4 py-4">₹ {user.totalSpent}</td>
                              <td class="px-4 py-4">₹ {user.totalSpent}</td>
                            </tr>
                          );
                        })
                      ) : (
                        <p className="bg-red-600 ">No-data</p>
                      )}
                    </tbody>
                  </table>
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

export default DayToDayExpenses;
