import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useDownloadExpensesMutation,
  useGetExpenseMutation,
} from "../../services/api";
import toast, { Toaster } from "react-hot-toast";
import SideBar from "../../components/SideBar";
import Header from "../../components/Header";
import { AppContext } from "../../context/appContext";
import { saveAs } from "file-saver";
import Pagination from "../../components/Pagination";
import Footer from "../../components/Footer";

const DayToDayExpenses = () => {
  const navigate = useNavigate();
  const [expenses, setExpenses] = useState([]);
  const [getExpense, { isLoading: expenseLoading }] = useGetExpenseMutation();

  const [downloadExpenses, { isLoading: downloadLoading }] =
    useDownloadExpensesMutation();
  const { setUser, user, userToken } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(1);
  const [nPages, setnPages] = useState();
  const [perPage, setPerPage] = useState(8);


  useEffect(() => {
    if (user) {
      handleShowExpenses();
    }
  }, [currentPage,perPage]);

  const handleShowExpenses = async () => {
    try {
      const response = await getExpense({ userToken, currentPage, perPage });
      setExpenses(response.data.expenseDetails);
      setnPages(response.data.nPages);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleDownload = async () => {
    try {
      const S3response = await downloadExpenses({ userToken });
      console.log(S3response.data.Location);
      saveAs(S3response.data.Location, "Expenses.txt");
    } catch (err) {
      toast.error("Error downloading file");
    }
  };

  return (
    <>
      <div>
        <div className="dashboard">
          <SideBar />
          <Header />
          <div className=" sm:ml-64  h-26 sm:relative">
            <div className="rounded-lg  ">
              <div className=" flex justify-between shadow-lg p-4 bg-white my-2 rounded-xl mr-3 mx-4">
                <h1 className="font-bold text-xl  h-10 flex lg:w-1/2 justify-start  text-#6952F1 items-center rounded-3xl  ">
                  Day to Day Expense
                </h1>
                <div className="mx-6 mt-3">
                  <button
                    class="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-indigo-300 to-orange-400 group-hover:from-red-500 group-hover:to-orange-400 hover:text-white dark:text-white focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800"
                    onClick={handleDownload}
                  >
                    <span class="relative px-3 py-2 transition-all ease-in duration-75 bg-white text-black rounded-md group-hover:bg-opacity-0">
                      {downloadLoading ? (
                        <p>Please wait...</p>
                      ) : (
                        <p>Download txt file</p>
                      )}
                    </span>
                  </button>
                </div>
              </div>
              <div className="lg:flex ">
                <div className=" my-4 bg-white min-h-[73vh]  shadow-lg mx-4 rounded-xl py-5  lg:w-[50vw] ">
                  <p className=" text-xl  flex justify-center pb-3 text-#1E5D69 font-semibold">
                    Your Total Expense
                  </p>
                  <div class="  flex justify-center items-center flex-col overflow-x-auto ">
                    <table class="   w-[20vw] sm:w-[40vw] md:w-[40vw] lg:w-[40vw] text-sm text-left rtl:text-right text-white border-2 border-#1E5D69 m-4  ">
                      <thead class="text-xs bg-#A6C1C7 text-gray-900">
                        <tr>
                          <th scope="col" class="px-4 py-3">
                            S.No
                          </th>
                          <th scope="col" class="px-2 py-3">
                            Date
                          </th>

                          <th scope="col" class="px-2 py-3">
                            category
                          </th>
                          <th scope="col" class="px-2 py-3">
                            Description
                          </th>

                          <th scope="col" class="px-2 py-3">
                            Spent
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenses ? (
                          expenses.map((expense, index) => {
                            return (
                              <tr class="bg-white border-b dark:bg-white dark:border-gray-700">
                                <td class="pl-4 py-3 text-gray-900">
                                  {index + 1}
                                </td>
                                <td
                                  scope="row"
                                  class=" pr-3 py-3 font-medium text-gray-900 whitespace-nowrap "
                                >
                                  {Date(expense.createdAt)
                                    .split(" ")
                                    .slice(1, 4)
                                    .join("-")}
                                </td>

                                <td class="px-2 py-3  text-gray-900">
                                  {" "}
                                  {expense.category}
                                </td>
                                <td class="px-2 py-3 text-gray-900">
                                  {" "}
                                  {expense.description}
                                </td>
                                <td
                                  scope="row"
                                  class="pr-6 py-3 font-medium text-gray-900 whitespace-nowrap "
                                >
                                  ₹{expense.spent}
                                </td>
                              </tr>
                            );
                          })
                        ) : (
                          <p className="bg-red-600 p-4 ">Add data</p>
                        )}
                      </tbody>
                    </table>
                    {nPages ? (
                      <div className="mb-2 w-full">
                        <Pagination
                          nPages={nPages}
                          currentPage={currentPage}
                          setCurrentPage={setCurrentPage}
                          setPerPage={setPerPage}
                        />
                      </div>
                    ): null}
                  </div>
                </div>
                <div className=" mt-4 bg-white h-[73vh] shadow-lg mx-4 rounded-xl py-10 lg:w-[30vw] ">
                  <h1 className=" text-xs mx-10  flex px-2  justify-start text-gray-400   items-center rounded-xl ">
                    Something new is happening here! Stay tuned for updates and
                    special offers from our team.
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

export default DayToDayExpenses;
