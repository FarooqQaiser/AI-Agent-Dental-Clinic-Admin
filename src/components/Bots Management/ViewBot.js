import React from "react";

export default function ViewBot({ setShowViewBot, currentBot }) {
  return (
    <>
      <div className="bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 h-modal md:h-full">
        <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
          <div className="align-middle relative p-4 bg-[#FFFFFF] rounded-lg shadow dark:bg-[#1D232A] sm:p-5">
            <div className="flex justify-between mb-4 rounded-t sm:mb-5">
              <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                <h3 className="font-semibold capitalize">
                  {currentBot.botName}
                </h3>
                <p className="font-bold">{currentBot.attachedBusiness}</p>
              </div>
              <div>
                <button
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 inline-flex dark:hover:bg-gray-600 dark:hover:text-white"
                  onClick={() => setShowViewBot(false)}
                >
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
            </div>
            <div>
              <h2 className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Description
              </h2>
              <p className="mb-4 font-light">{currentBot.botDescription}</p>
              <h2 className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Created on
              </h2>
              <p className="mb-4 font-light">26 May 2024</p>
              <h2 className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                Status
              </h2>
              <span className="bg-[#5e17eb17] py-1 px-2 rounded-lg">
                Active
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
