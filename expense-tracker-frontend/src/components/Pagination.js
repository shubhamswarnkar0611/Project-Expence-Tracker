import React from "react";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };
  return (
    <div className="flex justify-center m-3 ">
      <ul className="flex border-#1E5D69 shadow-md shadow-gray-400 bg-neutral-100 rounded-md ">
        <li>
          <button
            className=" p-4 hover:shadow-xl hover:bg-white  border-r-2 rounded-md border-gray-200  "
            onClick={goToPrevPage}
          >
            Prev
          </button>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber}>
            <button
              onClick={() => setCurrentPage(pgNumber)}
              className={` p-4 hover:shadow-xl hover:bg-white w-[3vw] border-r-2 border-gray-200 flex justify-center  ${
                currentPage === pgNumber ? "bg-indigo-500" : ""
              } `}
            >
              {pgNumber}
            </button>
          </li>
        ))}
        <li >
          <button className=" p-4 hover:shadow-xl hover:bg-white rounded-md  " onClick={goToNextPage}>
            Next
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
