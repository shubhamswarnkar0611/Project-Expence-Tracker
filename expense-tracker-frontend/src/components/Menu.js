import React from "react";

const Menu = (props) => {
  const { setIsOpenMenu, userDetails } = props;

  console.log(userDetails);
  function handleMenu() {
    setIsOpenMenu(false);
  }
  return (
    <div onClick={handleMenu} className={`w-[100vw] h-[100vh] fixed`}>
      <div className="bg-gray-100 min-w-[20vw] shadow-lg shadow-gray-400 rounded-lg min-h-[18vh] fixed right-12 top-20 transition ">
        <ul className="text-sm">
          <li className="px-4 pt-3 pb-2 text-lg font-semibold text-#6952F1 hover:bg-gray-200 flex">
            <p>{userDetails.name} 🤩</p>
            {userDetails.isPremium ? (
              <span className="inline-flex items-center justify-center px-2 ms-3 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-#A6C1C7 dark:text-white group-hover:text-white ">
                Pro Member
              </span>
            ) : (
              <span className="inline-flex items-center justify-center px-2 ms-3 text-xs font-medium text-gray-800 bg-gray-100 rounded-full dark:bg-#1E5D69  dark:text-white group-hover:text-white ">
                Not Pro
              </span>
            )}
          </li>
          <li className="px-4 py-1 hover:bg-gray-200 text-gray-500">Email- {userDetails.email} </li>
          
          <li className="px-4 py-1  hover:bg-gray-200 text-gray-500">Total Spent- ₹{userDetails.totalSpent} </li>
          
        </ul>

        <p className="flex justify-center py-3 text-xs  hover:bg-gray-200 text-gray-500">@Spent-wise </p>

      </div>
    </div>
  );
};

export default Menu;
