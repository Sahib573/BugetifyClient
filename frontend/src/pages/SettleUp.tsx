import React from "react";

const SettleUpSection: React.FC = () => {
  return (
    <div className="p-6 rounded-lg shadow-md bg-[#5B39CF] drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
      <h2 className="text-2xl font-semibold mb-4 border-b text-white drop-shadow-1 dark:bg-boxdark dark:drop-shadow-none">
        Let's balance the Expenses
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-7">
        <div className="bg-white p-4 rounded-lg hover:scale-105 transition duration-200 ease-in-out drop-shadow-1 dark:bg-[#394452] dark:drop-shadow-none">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
            You Owe
          </h3>
          <ul>
            {/* Sample list of amounts you owe */}
            <li className="flex justify-between items-center mb-2 dark:text-white text-black ">
              <span>Kush</span>
              <span className="text-red-500 font-semibold dark:text-white">
                -Rs50.00
              </span>
            </li>
            <li className="flex justify-between items-center mb-2 text-black dark:text-white">
              <span>Parul</span>
              <span className="text-red-500 font-semibold dark:text-white">
                -Rs30.00
              </span>
            </li>
            {/* Add more list items as needed */}
          </ul>
        </div>

        <div className="bg-white p-4 rounded-lg hover:scale-105 transition duration-200 ease-in-out dark:text-white drop-shadow-1 dark:bg-[#394452] dark:drop-shadow-none">
          <h3 className="text-lg font-semibold mb-2 text-black dark:text-white">
            You Are Owed
          </h3>
          <ul>
            {/* Sample list of amounts you are owed */}
            <li className="flex justify-between items-center mb-2 text-black dark:text-white">
              <span>Somesh</span>
              <span className="text-green-500 font-semibold dark:text-white">
                Rs20.00
              </span>
            </li>
            <li className="flex justify-between items-center mb-2 text-black dark:text-white">
              <span>Deepak Kumar</span>
              <span className="text-green-500 font-semibold dark:text-white">
                Rs40.00
              </span>
            </li>
            {/* Add more list items as needed */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SettleUpSection;
