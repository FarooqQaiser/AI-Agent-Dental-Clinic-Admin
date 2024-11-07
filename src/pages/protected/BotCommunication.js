import React, { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { API_URL } from "../../store";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

const BotCommunication = () => {
  const dispatch = useDispatch();
  const [bots, setBots] = useState([]);
  const [selectedBotId, setSelectedBotId] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [communicationLog, setCommunicationLog] = useState([]); // State for communication log
  const [message, setMessage] = useState(""); // State for current message
  const [botConnected, setBotConnected] = useState(true); // State to check if the bot is connected

  useEffect(() => {
    dispatch(setPageTitle({ title: "Bot Communication" }));
  }, [dispatch]);

  useEffect(() => {
    const fetchAllBots = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_URL}bot/all-data`, {
          method: "GET",
          redirect: "follow",
        });
        const result = await response.json();

        if (response.ok && result) {
          setBots(result.data);
          setSelectedBotId(result.data[0]?._id || "");
          setBotDescription(result.data[0]?.botDescription || "");
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllBots();
  }, []);

  useEffect(() => {
    const selectedBot = bots.find((bot) => bot._id === selectedBotId);
    setBotDescription(selectedBot ? selectedBot.botDescription : "");
  }, [selectedBotId, bots]);

  const handleSendMessage = () => {
    if (message.trim() === "") return;

    const newLogEntry = {
      timestamp: new Date().toLocaleString(),
      message,
      type: "user",
    };

    setCommunicationLog((prevLog) => [...prevLog, newLogEntry]);
    setMessage("");

    setTimeout(() => {
      const botResponse = {
        timestamp: new Date().toLocaleString(),
        message: `${message}`,
        type: "bot",
      };
      setCommunicationLog((prevLog) => [...prevLog, botResponse]);
    }, 1000);
  };

  const handleSendMessageOnEnter = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleClearConversation = () => {
    setCommunicationLog([]); // Clear conversation log
  };

  return (
    <>
      <TitleCard title={"Bot Communication"}>
        <div>
          <div className="">
            <div className="text-sm text-gray-800 dark:text-gray-200">
              Feel free to type your questions or messages in the input field.
              And train the Bot as per your needs; the bot is here to assist
              you.
            </div>

            {loading ? (
              <div className="mt-4 text-gray-500 dark:text-gray-400">
                Loading bots...
              </div>
            ) : (
              <div className="mt-4">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300 block ">
                  Select Bot :
                </label>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  Select a bot you want to test and train here.
                </span>
                <select
                  id="bot-selector"
                  value={selectedBotId}
                  onChange={(e) => setSelectedBotId(e.target.value)}
                  className="mt-2 block w-full lg:w-[50%] p-2 border dark:bg-[#191E24] dark:border-gray-700 border-gray-300 rounded-lg shadow-sm bg-gray-50 text-gray-900 dark:text-gray-200"
                >
                  <option value="" disabled>
                    Please select a bot
                  </option>
                  {bots.map((bot) => (
                    <option key={bot._id} value={bot._id}>
                      {bot.botName}
                    </option>
                  ))}
                </select>
              </div>
            )}
          </div>
          <div className="border-b pb-8">
            <div className="mt-6">
              <label className="text-sm font-medium text-gray-900 dark:text-gray-300 block">
                Prompt:
              </label>
              <span className="text-sm text-gray-700 dark:text-gray-400">
                Here is the prompt of the selected bot; you can edit it as per
                your needs. After changes, make sure to save changes by clicking
                the update button below.
              </span>
              <textarea
                rows="4"
                value={botDescription}
                onChange={(e) => setBotDescription(e.target.value)}
                className="mt-2 block w-full p-2 border border-gray-300 rounded-lg shadow-sm dark:border-gray-700 bg-gray-50 dark:bg-[#191E24] text-gray-900 dark:text-gray-200 focus:ring-cyan-600 focus:border-cyan-600"
                placeholder="Type your message or prompt here..."
              />
            </div>
            <button
              type="submit"
              className="mt-3 text-white bg-[#5D17EB] hover:bg-[#3F00E7] font-medium rounded-lg text-sm px-7 py-2.5 text-center flex justify-center items-center"
            >
              Update Prompt
            </button>
          </div>
          <div className="mt-6">
            <div className="mt-6">
              <div className="mb-3">
                <h3 className="text-xl font-semibold ">
                  Bot Communication Test
                </h3>
                <span className="text-sm ">
                  Here You can test the by bot by creating a conversation with
                  selected Bot
                </span>
              </div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h1 className="text-lg">Conversation</h1>
                  <span className="text-sm">
                    You can vew the converstion with yur bot down here.
                  </span>
                </div>
                <button
                  onClick={handleClearConversation}
                  className="h-10 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  Clear Conversation
                </button>
              </div>
              <div className="mb-6 p-4 bg-[#F2F2F2] dark:bg-[#191E24] rounded-lg h-full overflow-y-auto">
                {communicationLog.length === 0 ? (
                  <p>No messages yet.</p>
                ) : (
                  <ul className="space-y-2">
                    {communicationLog.map((log, index) => (
                      <li
                        key={index}
                        className={`mb-2 ${
                          log.type === "user" ? "text-right" : ""
                        }`}
                      >
                        <p
                          className={`rounded-2xl py-3 px-6 inline-block ${
                            log.type === "user"
                              ? "bg-gray-200 text-gray-700"
                              : "bg-[#351479] text-white"
                          }`}
                        >
                          {log.message}
                        </p>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className="flex items-center space-x-4">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => handleSendMessageOnEnter(e)}
                  placeholder="Type your message..."
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  disabled={!botConnected}
                />
                <button
                  onClick={handleSendMessage}
                  className={`h-10 text-white bg-[#5D17EB] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center ${
                    !botConnected && "cursor-not-allowed"
                  }`}
                  disabled={!botConnected}
                >
                  Send
                </button>
              </div>
            </div>
          </div>
        </div>
      </TitleCard>
      <div className="h-20"></div>
    </>
  );
};

export default BotCommunication;
