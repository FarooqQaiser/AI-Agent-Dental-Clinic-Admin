import React, { useEffect, useState } from "react";
import { API_URL } from "../../store";
import ErrorText from "../Typography/ErrorText";

export default function BotSettings({ currentBot, setShowBotSettings }) {
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [botId, setBotId] = useState("");
  const [botName, setBotName] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [attachedBusiness, setAttachedBusiness] = useState("");
  const [totalBusinesses, setTotalBusinesses] = useState([]);

  useEffect(() => {
    setBotId(currentBot._id);
    setBotName(currentBot.botName);
    setBotDescription(currentBot.botDescription);
    setAttachedBusiness(currentBot.attachedBusiness);
  }, [currentBot]);

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
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchBusinesses();
  }, []);

  const toggleModal = () => {
    setShowBotSettings(false);
  };

  const handleUpdateBot = async () => {
    if (botName.trim() === "") {
      return setErrorMessage("Bot Name is required!");
    }
    if (botDescription.trim() === "") {
      return setErrorMessage("Bot Description is resuired!");
    }
    if (attachedBusiness.trim() === "") {
      return setErrorMessage("Attach Business is resuired!");
    }

    let result = null;
    setLoading(true);

    try {
      const response = await fetch(API_URL + "bot/update-data/" + botId, {
        method: "PUT",
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
          console.log("Updated bot: ", result);
          setLoading(false);
          setShowBotSettings(false);
        }
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-70 z-50">
        <div className="w-full max-w-[890px] bg-white px-8 pb-5 pt-10 dark:bg-[#1D232A] rounded-md">
          <div className="mb-4">
            <div className="text-2xl font-bold border-b dark:border-none">
              Update "{botName}" bot.
            </div>
            <span className="text-sm  text-gray-700 dark:text-gray-400">
              Edit the bot credentials to update the existing bot settings. You
              can modify bot credentials as needed.
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="">
              <label
                htmlFor="botName"
                className="text-md font-medium text-gray-900 dark:text-gray-300 block"
              >
                Bot Name
              </label>
              <span className="text-[12px] text-gray-700 dark:text-gray-400">
                Add name of bot down here.
              </span>
              <input
                type="text"
                name="botName"
                id="botName"
                value={botName}
                onChange={(e) => setBotName(e.target.value)}
                className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
                placeholder="Enter your bot name..."
                required
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="botDescription"
                className="text-md font-medium text-gray-900 dark:text-gray-300 block "
              >
                Bot Description
              </label>
              <span className="text-[12px] text-gray-700 dark:text-gray-400">
                Add bot Description down here
              </span>
              <textarea
                name="botDescription"
                value={botDescription}
                onChange={(e) => setBotDescription(e.target.value)}
                className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
                placeholder="Enter your bot description..."
                required
              />
            </div>
            <div className="">
              <label
                htmlFor="attachedBusiness"
                className="text-md font-medium text-gray-900 dark:text-gray-300 block "
              >
                Attached Business
              </label>
              <span className="text-[12px] text-gray-700 dark:text-gray-400">
                Attach business to your bot down here.
              </span>
              <select
                className="cursor-pointer shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
                onClick={(e) => setAttachedBusiness(e.target.value)}
              >
                <option value={""}>none</option>
                {totalBusinesses.map((business, index) => {
                  if (attachedBusiness === business.businessName) {
                    return (
                      <>
                        <option
                          key={index}
                          value={business.businessName}
                          selected
                        >
                          {business.businessName}
                        </option>
                      </>
                    );
                  }
                  return (
                    <>
                      <option key={index} value={business.businessName}>
                        {business.businessName}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="w-full flex gap-2 justify-end items-center col-span-2 text-right">
              <ErrorText styleClass="mt-8">{errorMessage}</ErrorText>
              <button type="button" className="btn" onClick={toggleModal}>
                Close
              </button>
              <button
                onClick={handleUpdateBot}
                disabled={loading}
                className={`h-12 text-white bg-[#737FFF] hover:bg-[#646EE4] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center ${
                  loading ? "opacity-30" : ""
                }`}
              >
                {loading ? "Updating Bot..." : "Update Bot"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
