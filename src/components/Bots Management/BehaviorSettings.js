import React from "react";

export default function BehaviorSettings({
  botResponseTemplates,
  setBotResponseTemplates,
  botThresholdResponseTime,
  setBotThresholdResponseTime,
  botThresholdConfidenceLevels,
  setBotThresholdConfidenceLevels,
  botTimeOutConfiguration,
  setBotTimeOutConfiguration,
}) {
  return (
    <>
      <div className="flex flex-col gap-5">
        <h1 className="text-xl font-semibold">Behavior Settings</h1>
        <div className="px-5 flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="botResponseTemplates"
              className="text-black dark:text-white text-lg font-semibold"
            >
              Response Templates:
            </label>
            <textarea
              type="text"
              name="botResponseTemplates"
              className="block w-full h-36 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              value={botResponseTemplates}
              onChange={(e) => setBotResponseTemplates(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-black dark:text-white text-lg font-semibold">
              Threshold
            </p>
            <div className="flex flex-col pl-5 gap-2">
              <label
                htmlFor="botResponseTemplates"
                className="text-black dark:text-white font-semibold"
              >
                Response Time:
              </label>
              <input
                type="number"
                value={botThresholdResponseTime}
                className="block self-end text-center w-20 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={(e) => setBotThresholdResponseTime(e.target.value)}
              />
              <input
                type="range"
                name="botThresholdResponseTime"
                value={botThresholdResponseTime}
                onChange={(e) => setBotThresholdResponseTime(e.target.value)}
              />
            </div>
            <div className="flex flex-col pl-5 gap-2">
              <label
                htmlFor="botResponseTemplates"
                className="text-black dark:text-white font-semibold"
              >
                Confidence Levels:
              </label>
              <input
                type="number"
                value={botThresholdConfidenceLevels}
                className="block self-end text-center w-20 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                onChange={(e) =>
                  setBotThresholdConfidenceLevels(e.target.value)
                }
              />
              <input
                type="range"
                name="botThresholdConfidenceLevels"
                value={botThresholdConfidenceLevels}
                onChange={(e) =>
                  setBotThresholdConfidenceLevels(e.target.value)
                }
              />
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="botResponseTemplates"
              className="text-black dark:text-white text-lg font-semibold"
            >
              Timeout Configurations:
            </label>
            <input
              type="number"
              value={botTimeOutConfiguration}
              className="block self-end text-center w-20 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              onChange={(e) => setBotTimeOutConfiguration(e.target.value)}
            />
            <input
              type="range"
              name="botTimeOutConfiguration"
              value={botTimeOutConfiguration}
              onChange={(e) => setBotTimeOutConfiguration(e.target.value)}
            />
          </div>
        </div>
      </div>
    </>
  );
}
