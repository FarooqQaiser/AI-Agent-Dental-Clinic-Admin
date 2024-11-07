import React, { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import { FaRegEyeSlash } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa6";
import { FaInfoCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

const SettingsManagement = () => {
  const dispatch = useDispatch();
  const [showAuthToken, setShowAuthToken] = useState(false);
  const [showAccountSID, setShowAccountSID] = useState(false);
  const [twilioModal, setTwilioModal] = useState(false);
  const [showOpenAIKey, setShowOpenAIKey] = useState(false);
  const [selectedModel, setSelectedModel] = useState("gpt-3.5-turbo");
  const [openAIModal, setOpenAIModal] = useState(false);

  const [accountSID, setAccountSID] = useState("");
  const [authToken, setAuthToken] = useState("");
  const [twilioNumber, setTwilioNumber] = useState("");
  const [openAIKey, setOpenAIKey] = useState("");

  const models = [
    { value: "gpt-3.5-turbo", label: "GPT-3.5 Turbo" },
    { value: "gpt-3.5-turbo-16k", label: "GPT-3.5 Turbo 16k" },
    { value: "gpt-4", label: "GPT-4" },
    { value: "gpt-4-32k", label: "GPT-4 32k" },
    { value: "gpt-4-turbo", label: "GPT-4 Turbo" },
    { value: "gpt-4-turbo-32k", label: "GPT-4 Turbo 32k" },
  ];

  useEffect(() => {
    dispatch(setPageTitle({ title: "Settings" }));
  }, [dispatch]);

  const handleTwilioSubmit = (e) => {
    e.preventDefault();
    console.log("Twilio Settings:", {
      accountSID,
      authToken,
      twilioNumber,
    });
  };

  const handleOpenAISettings = (e) => {
    e.preventDefault();
    console.log("OpenAI Settings:", {
      openAIKey,
      selectedModel,
    });
  };

  return (
    <>
      <TitleCard title={"Twilio Settings"}>
        <div>
          <div className="text-sm text-gray-800 dark:text-gray-200">
            To activate messaging and interacting with others, administrators
            have to integrate Twilio by entering their account credentials. This
            integration allows seamless communication between users.
          </div>
          <form className="form mt-6" onSubmit={handleTwilioSubmit}>
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300 block">
                  Account SID
                </label>
                <div className="flex gap-2 mb-2">
                  <span className="text-sm text-gray-700 dark:text-gray-400">
                    If you don't know how to find that, click on this icon
                  </span>
                  <button type="button" onClick={() => setTwilioModal(true)}>
                    <FaInfoCircle className="text-sm mt-1 text-[#5D17EB] dark:text-[#7A30E3]" />
                  </button>
                </div>
                <div className="relative">
                  <input
                    type={showAccountSID ? "text" : "password"}
                    name="account-sid"
                    id="account-sid"
                    value={accountSID}
                    onChange={(e) => setAccountSID(e.target.value)}
                    className="shadow-sm bg-gray-50 dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
                    placeholder="Account SID"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    onClick={() => setShowAccountSID(!showAccountSID)}
                  >
                    {showAccountSID ? (
                      <FaRegEyeSlash
                        className="h-5 w-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaRegEye
                        className="h-5 w-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300 block ">
                  Auth Token
                </label>
                <span className="text-sm text-gray-700 dark:text-gray-400">
                  You will Get token from where you got Account SID
                </span>
                <div className="relative mt-1">
                  <input
                    type={showAuthToken ? "text" : "password"}
                    name="authToken"
                    id="authToken"
                    value={authToken}
                    onChange={(e) => setAuthToken(e.target.value)}
                    className="shadow-sm bg-gray-50 dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
                    placeholder="Auth Token"
                    required
                  />
                  <div
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                    onClick={() => setShowAuthToken(!showAuthToken)}
                  >
                    {showAuthToken ? (
                      <FaRegEyeSlash
                        className="h-5 w-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                      />
                    ) : (
                      <FaRegEye
                        className="h-5 w-5 text-gray-500 dark:text-gray-400"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label className="text-sm font-medium text-gray-900 dark:text-gray-300 block">
                  Twilio Number
                </label>
                <span className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                  This Twilio number will be used to gather appointments.
                </span>
                <input
                  type="tel"
                  name="twilioNumber"
                  id="twilioNumber"
                  value={twilioNumber}
                  onChange={(e) => setTwilioNumber(e.target.value)}
                  className="shadow-sm bg-gray-50 dark:bg-[#191E24] dark:border-gray-700 border mt-2 border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  placeholder="+123456789"
                  required
                  pattern="\+[0-9]*"
                  onInput={(e) => {
                    if (!e.target.value.startsWith("+")) {
                      e.target.value = "+" + e.target.value;
                    }
                  }}
                />
              </div>
            </div>
            <button
              type="submit"
              className="mt-8 text-white bg-[#5D17EB] hover:bg-[#3F00E7] font-medium rounded-lg text-sm px-7 py-2.5 text-center flex justify-center items-center"
            >
              Save
            </button>
          </form>
        </div>
      </TitleCard>

      <div>
        <TitleCard title={"OpenAI Settings"}>
          <div>
            <div className="text-sm text-gray-800 dark:text-gray-200">
              Integrating OpenAI into your application is essential for creating
              seamless interactions with users, enabling efficient
              communication, and streamlining the process of gathering
              appointments and managing inquiries effectively.
            </div>
            <form className="form mt-6" onSubmit={handleOpenAISettings}>
              <div className="grid grid-cols-6 gap-6">
                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300 block">
                    OpenAI API Key
                  </label>
                  <div className="flex gap-2 mb-2">
                    <span className="text-sm text-gray-700 dark:text-gray-400">
                      If you don't know how to find that, click on this icon
                    </span>
                    <button type="button" onClick={() => setOpenAIModal(true)}>
                      <FaInfoCircle className="text-sm mt-1 text-[#5D17EB] dark:text-[#7A30E3]" />
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showOpenAIKey ? "text" : "password"}
                      name="openai-key"
                      id="openai-key"
                      value={openAIKey}
                      onChange={(e) => setOpenAIKey(e.target.value)}
                      className="shadow-sm bg-gray-50 dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
                      placeholder="OpenAI API Key"
                      required
                    />
                    <div
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                      onClick={() => setShowOpenAIKey(!showOpenAIKey)}
                    >
                      {showOpenAIKey ? (
                        <FaRegEyeSlash
                          className="h-5 w-5 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                        />
                      ) : (
                        <FaRegEye
                          className="h-5 w-5 text-gray-500 dark:text-gray-400"
                          aria-hidden="true"
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="col-span-6 sm:col-span-3">
                  <label className="text-sm font-medium text-gray-900 dark:text-gray-300 block">
                    Select OpenAI Model
                  </label>
                  <span className="text-sm text-gray-700 dark:text-gray-400 mb-2">
                    The selected OpenAI model will be used for message
                    responses.
                  </span>
                  <select
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    className="cursor-pointer mt-1 shadow-sm bg-gray-50 dark:bg-[#191E24] dark:border-gray-700 border border-gray-300 ba text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5"
                  >
                    {models.map((model) => (
                      <option key={model.value} value={model.value}>
                        {model.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                type="submit"
                className="mt-8 text-white bg-[#5D17EB] hover:bg-[#3F00E7] font-medium rounded-lg text-sm px-7 py-2.5 text-center flex justify-center items-center"
              >
                Save
              </button>
            </form>
          </div>
        </TitleCard>
      </div>

      {twilioModal && <TwilioModal closeModal={() => setTwilioModal(false)} />}
      {openAIModal && <OpenAIModal closeModal={() => setOpenAIModal(false)} />}
    </>
  );
};

const OpenAIModal = ({ closeModal }) => {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden">
      {" "}
      {/* fixed inset-0 bg-gray-700 bg-opacity-60 flex items-center justify-center z-50 */}
      <div className="relative p-4 w-full max-w-md max-h-full bg-[#FFFFFF] dark:bg-[#1D232A] rounded-2xl">
        {" "}
        {/* bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg */}
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={closeModal}
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
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          How to Find Your OpenAI API Key
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Follow these steps to easily locate your OpenAI API key:
        </p>
        <ol className="list-none text-sm space-y-4 mb-6">
          <li className="flex items-start">
            <FaCheckCircle className="text-[#5D17EB] dark:text-[#7A30E3] h-5 w-5 mr-2 mt-0.5" />
            <span className="text-gray-800 dark:text-gray-200">
              Log in to your{" "}
              <a
                href="https://platform.openai.com/login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5D17EB] dark:text-white font-medium underline"
              >
                OpenAI account
              </a>
              .
            </span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[#5D17EB] dark:text-[#7A30E3] h-5 w-5 mr-2 mt-0.5" />
            <span className="text-gray-800 dark:text-gray-200">
              Navigate to the <strong>API Keys</strong> section on the
              dashboard.
            </span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[#5D17EB] dark:text-[#7A30E3] h-5 w-5 mr-2 mt-0.5" />
            <span className="text-gray-800 dark:text-gray-200">
              If you don't have an API key yet, click on the{" "}
              <strong>Create API Key</strong> button.
            </span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[#5D17EB] dark:text-[#7A30E3] h-5 w-5 mr-2 mt-0.5" />
            <span className="text-gray-800 dark:text-gray-200">
              Your <strong>API Key</strong> will be displayed. Copy it to your
              clipboard.
            </span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[#5D17EB] dark:text-[#7A30E3] h-5 w-5 mr-2 mt-0.5" />
            <span className="text-gray-800 dark:text-gray-200">
              Paste the copied <strong>API Key</strong> into the required field
              in your settings.
            </span>
          </li>
        </ol>
        {/* <button
          className="w-full bg-[#5D17EB] dark:bg-[#7A30E3] hover:bg-[#4C14C4] dark:hover:bg-[#6D24D1] text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          onClick={closeModal}
        >
          Close
        </button> */}
      </div>
    </div>
  );
};

const TwilioModal = ({ closeModal }) => {
  return (
    <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden">
      {" "}
      {/* fixed inset-0 bg-gray-700 bg-opacity-60 flex items-center justify-center z-50 */}
      <div className="relative p-4 w-full max-w-md max-h-full bg-[#FFFFFF] dark:bg-[#1D232A] rounded-2xl">
        {" "}
        {/* bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg */}
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={closeModal}
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
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
          How to Find Your Twilio Account SID
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
          Follow these steps to easily locate your Twilio Account SID:
        </p>
        <ol className="list-none text-sm space-y-4 mb-6">
          <li className="flex items-start">
            <FaCheckCircle className="text-[#5D17EB] dark:text-[#7A30E3] h-5 w-5 mr-2 mt-0.5" />
            <span className="text-gray-800 dark:text-gray-200">
              Log in to your{" "}
              <a
                href="https://www.twilio.com/console"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#5D17EB] dark:text-white font-medium underline"
              >
                Twilio Console
              </a>
              .
            </span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[#5D17EB] dark:text-[#7A30E3] h-5 w-5 mr-2 mt-0.5" />
            <span className="text-gray-800 dark:text-gray-200">
              Once logged in, you'll be redirected to the{" "}
              <strong>Twilio Dashboard</strong>.
            </span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[#5D17EB] dark:text-[#7A30E3] h-5 w-5 mr-2 mt-0.5" />
            <span className="text-gray-800 dark:text-gray-200">
              In the <strong>Dashboard</strong>, locate the{" "}
              <strong>Project Info</strong> section on the right side.
            </span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[#5D17EB] dark:text-[#7A30E3] h-5 w-5 mr-2 mt-0.5" />
            <span className="text-gray-800 dark:text-gray-200">
              Your <strong>Account SID</strong> will be displayed under this
              section. Copy it.
            </span>
          </li>
          <li className="flex items-start">
            <FaCheckCircle className="text-[#5D17EB] dark:text-[#7A30E3] h-5 w-5 mr-2 mt-0.5" />
            <span className="text-gray-800 dark:text-gray-200">
              Paste the copied <strong>Account SID</strong> into the required
              field in your settings.
            </span>
          </li>
        </ol>
        {/* <button
          className="w-full bg-[#5D17EB] dark:bg-[#7A30E3] hover:bg-[#4C14C4] dark:hover:bg-[#6D24D1] text-white text-sm font-semibold px-4 py-2 rounded-lg transition duration-300 ease-in-out"
          onClick={closeModal}
        >
          Close
        </button> */}
      </div>
    </div>
  );
};
export default SettingsManagement;
