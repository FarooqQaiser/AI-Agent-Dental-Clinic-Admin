import React from "react";

export default function SelectBotSettingsType({ activeTab, setActiveTab }) {
  return (
    <>
      <div className="w-full flex justify-between my-10">
        <div className="w-full flex justify-center">
          <button
            className={`${
              activeTab === "general"
                ? "bg-[#E0E0E0] dark:bg-[#181C22] text-black dark:text-white"
                : "bg-[#5D17EB] hover:bg-[#646EE4] text-white"
            } h-10 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center`}
            onClick={() => setActiveTab("general")}
          >
            General
          </button>
        </div>
        <div className="w-full flex justify-center">
          <button
            className={`${
              activeTab === "behavior"
                ? "bg-[#E0E0E0] dark:bg-[#181C22] text-black dark:text-white"
                : "bg-[#5D17EB] hover:bg-[#646EE4] text-white"
            } h-10 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center`}
            onClick={() => setActiveTab("behavior")}
          >
            Behavior
          </button>
        </div>
        <div className="w-full flex justify-center">
          <button
            className={`${
              activeTab === "integrations"
                ? "bg-[#E0E0E0] dark:bg-[#181C22] text-black dark:text-white"
                : "bg-[#5D17EB] hover:bg-[#646EE4] text-white"
            } h-10 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center`}
            onClick={() => setActiveTab("integrations")}
          >
            Integrations
          </button>
        </div>
      </div>
    </>
  );
}
