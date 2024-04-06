import React, { useState } from "react";

const PaginationMenu = ({ menuList, title, setPerPage }) => {
  
  return (
    <>
      <div className="flex items-center">
        <p className="mx-5 text-gray-400">{title}:</p>
        <select
          className={` bg-neutral-100 px-3 py-2  hover:bg-white hover:shadow-md shadow-gray-400 rounded-md`}
          onChange={(e) => setPerPage(e.target.value)}
        >
         { menuList.map((menu) => (
              <option className="p-2" key={menu} value={menu}>{menu}</option>
            ))}
          
        </select>
      </div>
    </>
  );
};

export default PaginationMenu;
