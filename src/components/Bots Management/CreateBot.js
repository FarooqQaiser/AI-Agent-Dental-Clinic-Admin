import React, { useEffect, useState } from "react";
import { API_URL } from "../../store";
import ErrorText from "../Typography/ErrorText";

export default function CreateBot({
  setShowCreateBot,
  bots,
  setBots,
  setSuccessMessage,
  botName,
  setBotName,
}) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [totalBusinesses, setTotalBusinesses] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [attachedBusiness, setAttachedBusiness] = useState("");

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
            console.log(result);
            setTotalBusinesses(result.data);
            // setLoading(false);
          }
          //   else {
          //     setLoading(false);
          //   }
        }
      } catch (err) {
        console.error(err);
        // setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleAddBot = async () => {
    if (botName.trim() === "") {
      return setErrorMessage("Bot Name is required!");
    }
    if (botDescription.trim() === "") {
      return setErrorMessage("Bot Description is resuired!");
    }
    if (attachedBusiness.trim() === "") {
      return setErrorMessage("Attach Business is resuired!");
    }
    // if (botName) {
    //   const newBot = { name: botName, isActive: false };
    //   setBots([...bots, newBot]);
    //   setBotName("");
    //   setSuccessMessage("Bot added successfully!");
    //   setTimeout(() => setSuccessMessage(""), 3000);
    // }
    let result = null;
    setLoading(true);

    try {
      const response = await fetch(API_URL + "bot/createbot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          botName: botName,
          botDescription: botDescription,
          attachedBusiness: attachedBusiness,
        }),
      });
      result = await response.json();
      if (response.ok) {
        if (result) {
          console.log(result);
          setErrorMessage("");
          setLoading(false);
          setShowCreateBot(false);
          setSuccessMessage("Bot added successfully!");
          setTimeout(() => setSuccessMessage(""), 3000);
        }
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      setErrorMessage(result.message);
    }
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
        <div className="my-10 relative p-4 py-6 mx-2 w-full max-w-md bg-[#FFFFFF] dark:bg-[#1D232A] rounded-2xl overflow-y-auto">
          {" "}
          {/* h-[550px] */}
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-w-full flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={() => setShowCreateBot(false)}
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
          <h1 className="text-2xl font-semibold">Create Bot</h1>
          <div className="mt-10 flex flex-col gap-4 mb-6">
            <div>
              <label
                htmlFor="botName"
                className="dark:text-white text-black text-lg font-semibold"
              >
                Bot Name
              </label>
              <input
                name="botName"
                type="text"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter Bot Name"
              />
            </div>
            <div>
              <label
                htmlFor="botDescription"
                className="dark:text-white text-black text-lg font-semibold"
              >
                Bot Description
              </label>
              <input
                name="botDescription"
                type="text"
                value={botDescription}
                onChange={(e) => setBotDescription(e.target.value)}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Enter Bot Description"
              />
            </div>
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
                      return (
                        <>
                          <option
                            className=""
                            value={business.businessName}
                            key={index}
                          >
                            {business.businessName}
                          </option>
                        </>
                      );
                    })}
                  </>
                )}
              </select>
            </div>
            <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
            <div className="flex justify-center">
              <button
                onClick={() => {
                  handleAddBot();
                }}
                className={`h-10 text-white bg-[#5D17EB] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center ${
                  loading ? "opacity-30" : ""
                }`}
              >
                {loading ? "Adding Bot..." : "Add Bot"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
