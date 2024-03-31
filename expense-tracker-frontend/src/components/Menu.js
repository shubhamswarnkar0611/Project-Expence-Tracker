import React, { useState } from "react";

const Menu = ({ menuList, title, setPerPage }) => {
  
  return (
    <>
      <div className="flex items-center">
        <p className="mx-5">{title}:</p>
        <select
          className={` bg-white px-3 py-2 shadow-md hover:bg-gray-50 shadow-gray-400 rounded-md`}
          onChange={(e) => setPerPage(e.target.value)}
        >
         {menuList.map((menu) => (
              <option className="p-2" value={menu}>{menu}</option>
            ))}
          
        </select>
      </div>
    </>
  );
};

export default Menu;
