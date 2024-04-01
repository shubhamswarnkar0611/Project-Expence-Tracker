import React, { useContext, useEffect, useState } from "react";
import { useShowLeaderboardMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { AppContext } from "../../context/appContext";
import Footer from "../../components/Footer";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [showLeaderboard, { isLoading }] = useShowLeaderboardMutation();
  let leaderboardData;
  const navigate = useNavigate();
  const { setUser, user } = useContext(AppContext);

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

  return (
    <>
      <div>
        <div className="dashboard">
          <SideBar />
          <Header />
          <div className=" sm:ml-64  h-24 ">
            <div className="rounded-lg  ">
              <div className=" lg:flex lg:justify-start flex-col shadow-lg p-4 bg-white my-1 rounded-xl mx-4">
                <h1 className="font-bold text-xl   flex  justify-start text-#6952F1 px-1 items-center rounded-3xl ">
                  LeaderBoard 
                </h1>
                <h1 className=" text-xs mx-2  flex px-2  justify-start text-gray-400   items-center rounded-xl ">
                  Only For Premium User
                </h1>
              </div>
              <div className="lg:flex ">
                <div className=" mt-4 bg-white min-h-[75vh] shadow-lg mx-4 rounded-xl py-10 lg:w-[50vw] ">
                  <p className=" text-xl  flex justify-center pb-7 text-#1E5D69 font-semibold">All users with their total expenses</p>
                  <div class=" flex justify-center overflow-x-auto ">
                    <table class="w-[80vw] sm:w-[40vw] md:w-[50vw] lg:w-[40vw] text-sm text-left rtl:text-right text-white border-2 border-#1E5D69  ">
                      <thead class="text-xs bg-#A6C1C7 text-gray-900">
                        <tr>
                          <th scope="col" class="px-4 py-3">
                            S.No
                          </th>
                          <th scope="col" class="px-6 py-3">
                            Name
                          </th>
                          <th scope="col" class="px-4 py-3">
                            Total Spent
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {leaderboard.data ? (
                          leaderboard.data.map((users, index) => {
                            return (
                              <tr class={` border-b dark:border-gray-700 ${users.name===user.name && "bg-indigo-100" } `}>
                                <td class="px-4 py-4 text-gray-900">
                                  {index + 1}
                                </td>
                                <td
                                  scope="row"
                                  class={`px-6 py-4 font-medium text-gray-900 whitespace-nowrap`}
                                >
                                  {users.name}
                                  {users.name===user.name && <span>  (you)</span>} 
                                </td>
                                <td class="px-4 py-4 text-gray-900">
                                  ₹ {users.totalSpent}
                                </td>
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
                <div className=" mt-4 bg-white h-[75vh] shadow-lg mx-4 rounded-xl py-10 lg:w-[30vw] ">
                <h1 className=" text-xs mx-10  flex px-2  justify-start text-gray-400   items-center rounded-xl ">
                  Something new is happening here! Stay tuned for updates and special offers from our team.
                </h1>
                </div>
              </div>
            </div>
            <Footer/>
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Leaderboard;
