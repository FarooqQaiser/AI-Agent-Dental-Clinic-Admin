import React from "react";

export default function ViewBot({ setShowViewBot, currentBot }) {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-70 z-50">
        <div className="w-full max-w-[890px] bg-white px-8 pb-5 pt-10 dark:bg-[#1D232A] rounded-md">
          <div className="mb-4">
            <div className="text-2xl font-bold border-b dark:border-none">
              Bot Details
            </div>
            <span className="text-sm  text-gray-700 dark:text-gray-400">
              Below is the information to the of the selected bot.
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
            <div className="">
              <label
                htmlFor="botName"
                className="text-md font-medium text-gray-900 dark:text-gray-300 block "
              >
                Bot Name
              </label>
              <span className="text-[12px] text-gray-700 dark:text-gray-400">
                Below is the bot name.
              </span>
              <input
                readOnly
                type="text"
                name="botName"
                id="botName"
                value={currentBot.botName}
                className="shadow-sm bg-gray-50 cursor-not-allowed dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
              />
            </div>
            <div className="col-span-2  mb-5">
              <label
                htmlFor="botDescription"
                className="text-md font-medium text-gray-900 dark:text-gray-300 block "
              >
                Bot Description
              </label>
              <span className="text-[12px] text-gray-700 dark:text-gray-400">
                Below is the bot description.
              </span>
              <textarea
                readOnly
                type="text"
                name="botDescription"
                id="botDescription"
                value={currentBot.botDescription}
                className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
              />
            </div>
            <div className="">
              <label
                htmlFor="botAttachedBusiness"
                className="text-md font-medium text-gray-900 dark:text-gray-300 block "
              >
                Attached Business
              </label>
              <span className="text-[12px] text-gray-700 dark:text-gray-400">
                Below is the attached business of the selected bot.
              </span>
              <input
                readOnly
                type="text"
                name="botAttachedBusiness"
                id="botAttachedBusiness"
                value={currentBot.attachedBusiness}
                className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
              />
            </div>

            <div className="w-full flex gap-2 justify-end items-center col-span-2 text-right">
              <button
                type="button"
                className="btn"
                onClick={() => setShowViewBot(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
