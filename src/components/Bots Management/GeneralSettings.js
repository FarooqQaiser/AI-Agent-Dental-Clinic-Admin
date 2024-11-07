import React, { useEffect, useState } from "react";
import { API_URL } from "../../store";

export default function GeneralSettings({
  botId,
  botName,
  setBotName,
  botDescription,
  setBotDescription,
  attachedBusiness,
  setAttachedBusiness,
  // totalBusinesses,
  // botType,
  // setBotType,
  // botIsActive,
  // setBotIsActive,
}) {
  const [totalBusinesses, setTotalBusinesses] = useState("");

  useEffect(() => {
    let result = null;

    const fetchBusinesses = async () => {
      try {
        const response = await fetch(API_URL + "data/all-data", {
          method: "GET",
        });
        result = await response.json();
        if (response.ok) {
          if (result) {
            // console.log(result);
            setTotalBusinesses(result.data);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBusinesses();
  }, []);

  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold">General Settings</h1>
        <div className="px-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="botName"
              className="text-black dark:text-white text-lg font-semibold"
            >
              Name:
            </label>
            <input
              type="text"
              name="botName"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={botName}
              onChange={(e) => setBotName(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="botDescription"
              className="text-black dark:text-white text-lg font-semibold"
            >
              Description:
            </label>
            <textarea
              type="text"
              name="botDescription"
              className="block w-full h-36 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={botDescription}
              onChange={(e) => setBotDescription(e.target.value)}
            />
          </div>
          {/* <div className="flex flex-col gap-2">
            <label
              htmlFor="botDescription"
              className="text-black dark:text-white text-lg font-semibold"
            >
              Bot Type:
            </label>
            <select
              className="block cursor-pointer w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setBotType(e.target.value)}
            >
              <option
                value={"none"}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                Select type from below
              </option>
              {botTypes.map((type, index) => {
                if (botType === type) {
                  return (
                    <>
                      <option
                        key={index}
                        value={type}
                        selected
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      >
                        {type}
                      </option>
                    </>
                  );
                }
                return (
                  <>
                    <option
                      key={index}
                      value={type}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      {type}
                    </option>
                  </>
                );
              })}
            </select>
          </div> */}
          <div className="flex flex-col gap-3">
            <label className="dark:text-white text-black text-lg font-semibold">
              Attach Business
            </label>
            <select
              className="cursor-pointer block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setAttachedBusiness(e.target.value)}
            >
              <option value={""} className="">
                none
              </option>
              {totalBusinesses.length > 0 && (
                <>
                  {totalBusinesses.map((business, index) => {
                    if (attachedBusiness === business.businessName) {
                      return (
                        <>
                          <option
                            value={business.businessName}
                            key={index}
                            selected
                          >
                            {business.businessName}
                          </option>
                        </>
                      );
                    }
                    return (
                      <>
                        <option value={business.businessName} key={index}>
                          {business.businessName}
                        </option>
                      </>
                    );
                  })}
                </>
              )}
            </select>
          </div>
          {/* <div className="flex items-center justify-between">
            <span className="text-black dark:text-white text-lg font-semibold">
              Activation Status
            </span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={botIsActive}
                onChange={() => setBotIsActive(!botIsActive)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div> */}
        </div>
      </div>
    </>
  );
}
