import React, { useContext, useEffect, useState } from "react";
import { useShowLeaderboardMutation } from "../../services/api";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { AppContext } from "../../context/appContext";

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
          <div className=" sm:ml-64  h-24 sm:relative">
            <div className="rounded-lg  ">
              <div className=" lg:flex lg:justify-start shadow-lg p-4 rounded-ee-full ">
                <h1 className="font-bold text-xl  h-16 flex lg:w-1/2 justify-start   items-center rounded-3xl  ">
                  LeaderBoard
                </h1>
              </div>
              <div className=" mt-8 ">
                <div class=" flex justify-center overflow-x-auto ">
                  <table class="w-2/3 text-sm text-left rtl:text-right text-white  ">
                    <thead class="text-xs bg-orange-400 text-gray-900">
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
                        leaderboard.data.map((user,index) => {
                          return (
                            <tr class="bg-white border-b dark:bg-neutral-900 dark:border-gray-700">
                              <td class="px-4 py-4">{index+1}</td>
                              <th
                                scope="row"
                                class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                              >
                                {user.name}
                              </th>
                              <td class="px-4 py-4">{user.spent}</td>
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

export default Leaderboard;
