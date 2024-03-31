import React from "react";
import Menu from "./Menu";

const Pagination = ({ nPages, currentPage, setCurrentPage, setPerPage }) => {
  const menuList = [8, 15, 25, 50, 100];
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  console.log(pageNumbers);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    console.log("Pagination", currentPage);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="flex m-4 md:flex-row flex-col items-center ">
        <div className=" flex justify-center md:justify-end mx-4 w-[50vw]">
          <Menu menuList={menuList} title={"Rows per page"} setPerPage={setPerPage} />
        </div>
        <div className=" mx-4 my-6 w-[50vw]">
          <div className="flex justify-center
          md:justify-start">
            <ul className="flex border-#1E5D69 shadow-md shadow-gray-400 rounded-md ">
              <li>
                <button
                  className=" px-4 py-2 hover:shadow-xl hover:bg-white  border-r-2 rounded-md border-gray-200  "
                  onClick={goToPrevPage}
                >
                  Prev
                </button>
              </li>
              {pageNumbers?.map((pgNumber) => (
                <li key={pgNumber}>
                  <button
                    onClick={() => setCurrentPage(pgNumber)}
                    className={` px-4 py-2  hover:opacity-40 w-[3vw] border-r-2  flex justify-center  ${
                      currentPage === pgNumber ? "bg-indigo-500 " : ""
                    } `}
                  >
                    {pgNumber}
                  </button>
                </li>
              ))}
              <li>
                <button
                  className=" px-4 py-2 hover:shadow-xl hover:bg-white rounded-md"
                  onClick={goToNextPage}
                >
                  Next
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
