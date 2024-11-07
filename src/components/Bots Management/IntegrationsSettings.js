import React from "react";

export default function IntegrationsSettings({
  apiKeys,
  setApiKeys,
  setPlatformIntegration,
  platforms,
  platformIntegration,
  webhookConfigurationNotifications,
  setWebhookConfigurationNotifications,
  webhookConfigurationEvents,
  setWebhookConfigurationEvents,
  errorResponses,
  setErrorResponses,
  isLoggingEnabled,
  setIsLoggingEnabled,
  setLogging,
  loggingOptions,
  logging,
}) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold">Integration Settings</h1>
        <div className="px-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="apiKeys"
              className="text-black dark:text-white text-lg font-semibold"
            >
              API Keys:
            </label>
            <input
              type="text"
              name="apiKeys"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={apiKeys}
              onChange={(e) => setApiKeys(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black dark:text-white text-lg font-semibold">
              Platform Integrations:
            </p>
            <select
              className="block cursor-pointer w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setPlatformIntegration(e.target.value)}
            >
              <option
                value={""}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                none
              </option>
              {platforms.map((platform, index) => {
                if (platformIntegration === platform) {
                  return (
                    <>
                      <option
                        key={index}
                        value={platform}
                        selected
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      >
                        {platform}
                      </option>
                    </>
                  );
                }
                return (
                  <>
                    <option
                      key={index}
                      value={platform}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      {platform}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black dark:text-white text-lg font-semibold">
              Webhook Configuration:
            </p>
            <div className="flex justify-between pl-5">
              <label
                htmlFor="webhookConfigurationNotifications"
                className="text-black dark:text-white font-semibold"
              >
                Notifications
              </label>
              <input
                type="checkbox"
                name="webhookConfigurationNotifications"
                className="block w-5 cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                checked={webhookConfigurationNotifications}
                onChange={(e) =>
                  setWebhookConfigurationNotifications(e.target.checked)
                }
              />
            </div>
            <div className="flex justify-between pl-5">
              <label
                htmlFor="webhookConfigurationEvents"
                className="text-black dark:text-white font-semibold"
              >
                Events
              </label>
              <input
                type="checkbox"
                name="webhookConfigurationEvents"
                className="block w-5 cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                checked={webhookConfigurationEvents}
                onChange={(e) =>
                  setWebhookConfigurationEvents(e.target.checked)
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="errorResponses"
              className="text-black dark:text-white text-lg font-semibold"
            >
              Error Responses:
            </label>
            <input
              type="text"
              name="errorResponses"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={errorResponses}
              onChange={(e) => setErrorResponses(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-black dark:text-white text-lg font-semibold">
              Enabling/Disabling Logging
            </span>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={isLoggingEnabled}
                onChange={() => setIsLoggingEnabled(!isLoggingEnabled)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black dark:text-white text-lg font-semibold">
              Logging Options:
            </p>
            <select
              disabled={!isLoggingEnabled}
              className="block cursor-pointer w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setLogging(e.target.value)}
            >
              <option
                value={""}
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              >
                none
              </option>
              {loggingOptions.map((loggingOption, index) => {
                if (logging === loggingOption) {
                  return (
                    <>
                      <option
                        key={index}
                        value={loggingOption}
                        selected
                        className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                      >
                        {loggingOption}
                      </option>
                    </>
                  );
                }
                return (
                  <>
                    <option
                      key={index}
                      value={loggingOption}
                      className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    >
                      {loggingOption}
                    </option>
                  </>
                );
              })}
            </select>
          </div>
        </div>
      </div>
    </>
  );
}
