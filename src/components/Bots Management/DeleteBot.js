import React from "react";
import { API_URL } from "../../store";

export default function DeleteBot({ currentBot, setShowDeleteBot }) {
  const handleDeleteButton = async () => {
    let result = null;

    try {
      const response = await fetch(
        API_URL + "bot/delete-data/" + currentBot._id,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      result = await response.json();
      if (response.ok) {
        if (result) {
          console.log("Deleted bot: ", result);
          setShowDeleteBot(false);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden">
        <div className="relative p-4 w-full max-w-md max-h-full bg-[#FFFFFF] dark:bg-[#1D232A] rounded-2xl">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setShowDeleteBot(false)}
          >
            <svg
              className="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1l6 6m0 0l6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
          <h1 className="text-xl font-bold">Delete Business</h1>
          <div className="w-full flex flex-col gap-5">
            <svg
              className="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <div className="text-center">
              <h1 className="text-lg font-semibold">
                Are you sure you want to delete information of "
                {currentBot.botName}" bot?
              </h1>
            </div>
            <div className="flex w-full justify-center items-center gap-20">
              <button
                className="h-10 text-white bg-[#4A00FF] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-[#7480FF] dark:hover:bg-[#646EE4] dark:focus:ring-[#5763e8]"
                onClick={() => setShowDeleteBot(false)}
              >
                Cancel
              </button>
              <button
                className="h-10 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-red-500 dark:hover:bg-red-600"
                onClick={handleDeleteButton}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
