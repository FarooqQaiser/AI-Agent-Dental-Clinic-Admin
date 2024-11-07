import React, { useEffect, useState } from "react";
// import TitleCard from "../Cards/TitleCard";
import SelectBotSettingsType from "./SelectBotSettingsType";
import GeneralSettings from "./GeneralSettings";
// import BehaviorSettings from "./BehaviorSettings";
// import IntegrationsSettings from "./IntegrationsSettings";
// import "./BotSettings.css";
import { API_URL } from "../../store";

export default function BotSettings({ currentBot, setShowBotSettings }) {
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("general");
  const [botId, setBotId] = useState("");
  const [botName, setBotName] = useState("");
  const [botDescription, setBotDescription] = useState("");
  const [attachedBusiness, setAttachedBusiness] = useState("");
  // const [botType, setBotType] = useState("");
  // const [botIsActive, setBotIsActive] = useState(false);
  // const [botResponseTemplates, setBotResponseTemplates] = useState("");
  // const [botThresholdResponseTime, setBotThresholdResponseTime] = useState(0);
  // const [botThresholdConfidenceLevels, setBotThresholdConfidenceLevels] =
  //   useState(0);
  // const [botTimeOutConfiguration, setBotTimeOutConfiguration] = useState(0);
  // const [apiKeys, setApiKeys] = useState("");
  // const [platformIntegration, setPlatformIntegration] = useState("");
  // const [
  //   webhookConfigurationNotifications,
  //   setWebhookConfigurationNotifications,
  // ] = useState(false);
  // const [webhookConfigurationEvents, setWebhookConfigurationEvents] =
  //   useState(false);
  // const [errorResponses, setErrorResponses] = useState("");
  // const [isLoggingEnabled, setIsLoggingEnabled] = useState(false);
  // const [logging, setLogging] = useState("");

  // const botTypes = ["Customer Support", "Sales"];

  // const platforms = ["Slack", "WhatApp"];

  // const loggingOptions = [
  //   "Logging option 1",
  //   "Logging option 2",
  //   "Logging option 3",
  // ];

  useEffect(() => {
    setBotId(currentBot._id);
    setBotName(currentBot.botName);
    setBotDescription(currentBot.botDescription);
    setAttachedBusiness(currentBot.attachedBusiness);
    // setBotIsActive(currentBot.isActive);
  }, [currentBot]);

  const toggleModal = () => {
    setShowBotSettings(false);
  };

  const handleUpdateBot = async () => {
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
          // console.log("Updated bot: ", result);
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
      <div className="botSettings fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
        <div className="my-10 relative p-4 py-6 mx-2 w-full max-w-md h-[550px] bg-[#FFFFFF] dark:bg-[#1D232A] rounded-2xl">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-w-full flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            onClick={toggleModal}
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
          <h1 className="text-xl font-bold">"{botName}" Settings</h1>
          <SelectBotSettingsType
            activeTab={activeTab}
            setActiveTab={setActiveTab}
          />
          <div className="max-h-[370px] overflow-y-auto">
            {activeTab === "general" && (
              <>
                <GeneralSettings
                  botName={botName}
                  setBotName={setBotName}
                  botDescription={botDescription}
                  setBotDescription={setBotDescription}
                  attachedBusiness={attachedBusiness}
                  setAttachedBusiness={setAttachedBusiness}
                  // botTypes={botTypes}
                  // botType={botType}
                  // setBotType={setBotType}
                  // botIsActive={botIsActive}
                  // setBotIsActive={setBotIsActive}
                />
              </>
            )}
            {/* {activeTab === "behavior" && (
            <>
              <BehaviorSettings
                botResponseTemplates={botResponseTemplates}
                setBotResponseTemplates={setBotResponseTemplates}
                botThresholdResponseTime={botThresholdResponseTime}
                setBotThresholdResponseTime={setBotThresholdResponseTime}
                botThresholdConfidenceLevels={botThresholdConfidenceLevels}
                setBotThresholdConfidenceLevels={
                  setBotThresholdConfidenceLevels
                }
                botTimeOutConfiguration={botTimeOutConfiguration}
                setBotTimeOutConfiguration={setBotTimeOutConfiguration}
              />
            </>
          )}
          {activeTab === "integrations" && (
            <>
              <IntegrationsSettings
                apiKeys={apiKeys}
                setApiKeys={setApiKeys}
                setPlatformIntegration={setPlatformIntegration}
                platforms={platforms}
                platformIntegration={platformIntegration}
                webhookConfigurationNotifications={
                  webhookConfigurationNotifications
                }
                setWebhookConfigurationNotifications={
                  setWebhookConfigurationNotifications
                }
                webhookConfigurationEvents={webhookConfigurationEvents}
                setWebhookConfigurationEvents={setWebhookConfigurationEvents}
                errorResponses={errorResponses}
                setErrorResponses={setErrorResponses}
                isLoggingEnabled={isLoggingEnabled}
                setIsLoggingEnabled={setIsLoggingEnabled}
                setLogging={setLogging}
                loggingOptions={loggingOptions}
                logging={logging}
              />
            </>
          )} */}
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleUpdateBot}
                className={`h-10 text-white bg-[#5D17EB] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center ${
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
