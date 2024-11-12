import React, { useState } from "react";
import "./CreateBusiness.css";
import { API_URL } from "../../store";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function CreateBusiness({ setOpenCreateBusinessForm }) {
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessEINNumber, setBusinessEINNumber] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const createBusiness = async () => {
    if (
      businessName &&
      businessDescription &&
      businessDescription &&
      businessEmail &&
      businessPassword
    ) {
      setLoading(true);
      const business = JSON.stringify({
        businessName: businessName,
        businessDescription: businessDescription,
        businessEINNumber: businessEINNumber,
        businessEmail: businessEmail,
        businessPassword: businessPassword,
      });
      let result = null;

      try {
        const response = await fetch(API_URL + "data/business", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: business,
        });
        result = await response.json();
        if (response.ok) {
          if (result) {
            setLoading(false);
            setOpenCreateBusinessForm(false);
          }
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-70 z-50">
      <div className="w-full max-w-[890px] bg-white px-8 pb-5 pt-10 dark:bg-[#1D232A] rounded-md">
        <div className="mb-4">
          <div className="text-2xl font-bold border-b dark:border-none">
            Add New Business
          </div>
          <span className="text-sm  text-gray-700 dark:text-gray-400">
            Enter the business credentials to create a business account. You can
            update business credentials later. Note that this email and password
            will be used for login purpose.
          </span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="">
            <label
              htmlFor="businessName"
              className="text-md font-medium text-gray-900 dark:text-gray-300 block "
            >
              Business Name
            </label>
            <span className="text-[12px] text-gray-700 dark:text-gray-400">
              Add name of business down here
            </span>
            <input
              type="text"
              name="businessName"
              id="businessName"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
              placeholder="Enter your business name..."
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="businessEINNumber"
              className="text-md font-medium text-gray-900 dark:text-gray-300 block "
            >
              EIN Number
            </label>
            <span className="text-[12px] text-gray-700 dark:text-gray-400">
              Add EIN Number down here
            </span>
            <input
              type="text"
              name="businessEINNumber"
              id="businessEINNumber"
              value={businessEINNumber}
              onChange={(e) => setBusinessEINNumber(e.target.value)}
              className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
              placeholder="Enter your business EIN number..."
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="businessEmail"
              className="text-md font-medium text-gray-900 dark:text-gray-300 block "
            >
              Business Email
            </label>
            <span className="text-[12px] text-gray-700 dark:text-gray-400">
              Add Business email address down here
            </span>
            <input
              type="email"
              name="email"
              id="email"
              value={businessEmail}
              onChange={(e) => setBusinessEmail(e.target.value)}
              className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
              placeholder="Enter Email Address Here..."
              required
            />
          </div>
          <div className="">
            <label
              htmlFor="businessPassword"
              className="text-md font-medium text-gray-900 dark:text-gray-300 block "
            >
              Business Password
            </label>
            <span className="text-[12px] text-gray-700 dark:text-gray-400">
              Business Account password will be used for login purpose
            </span>
            <div className="relative mt-1">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                value={businessPassword}
                onChange={(e) => setBusinessPassword(e.target.value)}
                className="shadow-sm bg-gray-50 dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
                placeholder="Enter Business Account Password Here..."
                required
              />
              <div
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
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
          <div className="col-span-2  mb-5">
            <label
              htmlFor="businessDescription"
              className="text-md font-medium text-gray-900 dark:text-gray-300 block "
            >
              Business Description
            </label>
            <span className="text-[12px] text-gray-700 dark:text-gray-400">
              Add Business Description down here
            </span>
            <textarea
              name="businessDescription"
              value={businessDescription}
              onChange={(e) => setBusinessDescription(e.target.value)}
              className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
              placeholder="Enter your business description..."
              required
            />
          </div>

          <div className="w-full flex gap-2 justify-end items-center col-span-2 text-right">
            <button
              type="button"
              className="btn"
              onClick={() => setOpenCreateBusinessForm(false)}
            >
              Close
            </button>
            <button
              onClick={createBusiness}
              disabled={loading}
              className={`h-12 text-white bg-[#737FFF] hover:bg-[#646EE4] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center ${
                loading ? "opacity-30" : ""
              }`}
            >
              {loading ? "Adding Business..." : "Add Business"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
