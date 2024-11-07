import React, { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import BotSettings from "../../components/Bots Management/BotSettings";
import CreateBot from "../../components/Bots Management/CreateBot";
import { API_URL } from "../../store";
import DeleteBot from "../../components/Bots Management/DeleteBot";
import ViewBot from "../../components/Bots Management/ViewBot";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import { GrView } from "react-icons/gr";
import { IoTrashOutline } from "react-icons/io5";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

const BotsManagement = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const iconClasses = `h-6 w-6`;
  const [botName, setBotName] = useState("");
  const [bots, setBots] = useState([]);
  const [showCreateBot, setShowCreateBot] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [currentBot, setCurrentBot] = useState(null);
  const [showBotSettings, setShowBotSettings] = useState(false);
  const [showViewBot, setShowViewBot] = useState(false);
  const [showDeleteBot, setShowDeleteBot] = useState(false);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bots Management" }));
  }, [dispatch]);

  useEffect(() => {
    if (
      showCreateBot === false &&
      showBotSettings === false &&
      showDeleteBot === false
    ) {
      setLoading(true);
      const fetchAllBots = async () => {
        try {
          const response = await fetch(API_URL + "bot/all-data", {
            method: "GET",
            redirect: "follow",
          });
          const result = await response.json();
          if (response.ok) {
            setBots(result.data);
          }
          setLoading(false);
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };

      fetchAllBots();
    }
  }, [showCreateBot, showBotSettings, showDeleteBot]);

  const handleBotSettinsButton = (bot) => {
    setCurrentBot(bot);
    setShowBotSettings(true);
  };

  const handleDeleteBotButton = (bot) => {
    setCurrentBot(bot);
    setShowDeleteBot(true);
  };

  const handleViewBotButton = (bot) => {
    setCurrentBot(bot);
    setShowViewBot(true);
  };

  return (
    <>
      {loading ? (
        <div className="w-full h-full flex justify-center items-center">
          <span className="loading loading-spinner loading-lg bg-[#5D17EB] dark:bg-white"></span>
        </div>
      ) : (
        <>
          <TitleCard title={"Bots Management"}>
            <button
              className="absolute top-5 right-2.5 text-white bg-[#5D17EB] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-medium text-sm p-2 text-center flex justify-center items-center"
              onClick={() => setShowCreateBot(true)}
            >
            Add New Bot    
                </button>
            {successMessage && (
              <div className="bg-green-100 text-green-800 p-2 rounded mb-4">
                {successMessage}
              </div>
            )}
            <div className="overflow-x-auto ">
              <div className="flex flex-row items-center justify-between ml-0 f text-xl/tight text-dark">
                <span className="text-sm ml-2">
                  Below is a list of all the bots you've created, neatly
                  displayed for easy access and management.
                </span>
              </div>
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-6">
                <thead className="bg-[#5e17eb1c] dark:bg-gray-700 s">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Bot Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Attached Business
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Description
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Created On
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200 dark:divide-gray-700">
                  {bots.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No bots added yet.
                      </td>
                    </tr>
                  ) : (
                    bots.map((bot, index) => (
                      <tr key={index}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                          {bot.botName}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {bot.attachedBusiness}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          {bot.botDescription.length > 25
                            ? `${bot.botDescription.slice(0, 25)}...`
                            : bot.botDescription}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          26 May 2024
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                          <span className="bg-[#5e17eb17] py-1 px-2 rounded-lg">
                            Active
                          </span>
                        </td>

                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                          <button
                            onClick={() => handleBotSettinsButton(bot)}
                            className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                          >
                            <Cog6ToothIcon
                              className={`${iconClasses} inline`}
                            />
                          </button>
                          <button
                            onClick={() => handleViewBotButton(bot)}
                            className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                          >
                            <GrView className={`h-5 w-6 inline`} />
                          </button>
                          <button
                            onClick={() => handleDeleteBotButton(bot)}
                            className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <IoTrashOutline
                              className={`${iconClasses} inline`}
                            />
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </TitleCard>

          {showCreateBot && (
            <CreateBot
              setShowCreateBot={setShowCreateBot}
              bots={bots}
              setBots={setBots}
              setSuccessMessage={setSuccessMessage}
              botName={botName}
              setBotName={setBotName}
            />
          )}
          {showBotSettings && (
            <BotSettings
              currentBot={currentBot}
              setShowBotSettings={setShowBotSettings}
            />
          )}
          {showViewBot && (
            <ViewBot setShowViewBot={setShowViewBot} currentBot={currentBot} />
          )}
          {showDeleteBot && (
            <DeleteBot
              currentBot={currentBot}
              setShowDeleteBot={setShowDeleteBot}
            />
          )}
        </>
      )}
    </>
  );
};

export default BotsManagement;
