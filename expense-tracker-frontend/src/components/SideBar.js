import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate, NavLink, useLocation } from "react-router-dom";

import { AppContext } from "../context/appContext";

const SideBar = () => {
  const { user, setUser, setUserToken, isOpenSideBar, setIsOpenSideBar } =
    useContext(AppContext);
  const navigate = useNavigate();

  // useEffect(()=>{
  //   toggleSideBar();
  // },[isOpenSideBar,toggleSideBar])
  const toggleSideBar = () => {
    setIsOpenSideBar(!isOpenSideBar);
  };

  useEffect(() => {
    if (user) {
      setUser(user);
    }
  }, [setUser]);

  const handleLogOUt = (e) => {
    e.preventDefault();
    setUserToken(localStorage.removeItem("userToken"));
    navigate("/login");
  };

  return (
    <>
      <aside
        id="logo-sidebar"
        className={`fixed md: top-0 left-0 z-40 w-62 h-screen transition-transform ${
          !isOpenSideBar ? "-translate-x-full" : ""
        } sm:translate-x-0 p-3 w-full sm:w-64  bg-opacity-65  md:bg-transparent bg-white   `}
        aria-label="Sidebar"
        onClick={toggleSideBar}
      >
        <div className="h-full px-3 py-4 w-[250px] overflow-y-auto bg-white rounded-3xl shadow-lg shadow-gray-400 ">
          <a href="#" className="flex  items-center mt-4 mb-9 ">
            <span className="self-center text-3xl font-semibold whitespace-nowrap dark:text-#6952F1">
              SpentWise
            </span>
          </a>
          <ul className="space-y-2 font-medium">
            <li>
              <NavLink
                to="/"
                className={({ isActive}) =>
                   isActive
                    ? "flex items-center p-2  text-#1D1927 rounded-lg  bg-#A6C1C7"
                    : "flex items-center p-2  text-#1D1927 rounded-lg  hover:bg-#A6C1C7"
                }
              >
                <svg
                  className="w-5 h-5 text-gray-900 transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 22 21"
                >
                  <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                  <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
                </svg>
                <span className="ms-3">Dashboard</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/add-expense"
                className={({ isActive}) =>
                   isActive
                    ? "flex items-center p-2  text-#1D1927 rounded-lg  bg-#A6C1C7"
                    : "flex items-center p-2  text-#1D1927 rounded-lg  hover:bg-#A6C1C7"
                }
              >
                <svg
                  className="w-5 h-5 text-gray-900 transition duration-75 dark:text-black group-hover:text-white  dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                  <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z" />
                  <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Add Expense
                </span>
              </NavLink>
            </li>
            {user.isPremium && (
              <li>
                <NavLink
                  to="/leaderboard"
                  className={({ isActive}) =>
                   isActive
                    ? "flex items-center p-2  text-#1D1927 rounded-lg  bg-#A6C1C7"
                    : "flex items-center p-2  text-#1D1927 rounded-lg  hover:bg-#A6C1C7"
                }
                >
                  <svg
                    className="w-5 h-5 text-slate-900 transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 18"
                  >
                    <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                  </svg>
                  <span className="flex-1 ms-3 whitespace-nowrap">
                    LeaderBoard
                  </span>
                  <span className="inline-flex items-center justify-center px-2 ms-3 text-sm font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-gray-700  dark:text-white group-hover:text-white ">
                    Pro
                  </span>
                </NavLink>
              </li>
            )}

            <li>
              <NavLink
                to="/day-to-day-expenses"
                className={({ isActive}) =>
                   isActive
                    ? "flex items-center p-2  text-#1D1927 rounded-lg  bg-#A6C1C7"
                    : "flex items-center p-2  text-#1D1927 rounded-lg  hover:bg-#A6C1C7"
                }
              >
                <svg
                  className="w-5 h-5 text-slate-900 transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 18 18"
                >
                  <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z" />
                </svg>
                <span className="flex-1 ms-3 whitespace-nowrap">
                  Expense Sheet
                </span>
              </NavLink>
            </li>

            <li>
              <button onClick={handleLogOUt} className="w-full">
                <div className="flex items-center p-2  text-#1D1927 rounded-lg  hover:bg-#A6C1C7  ">
                  <svg
                    className="w-5 h-5 text-gray-900 transition duration-75 dark:text-black group-hover:text-white dark:group-hover:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 18 16"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"
                    />
                  </svg>
                  <p className="flex ms-3 whitespace-nowrap ">LogOut</p>
                </div>
              </button>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
