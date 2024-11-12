import React, { useEffect, useState } from "react";
import { API_URL } from "../../store";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function ViewBusiness({ setViewBusinessModal, id }) {
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      setLoading(true);
      let result = null;

      try {
        const response = await fetch(API_URL + "data/business/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
          redirect: "follow",
        });
        result = await response.json();
        if (response.ok) {
          if (result) {
            // console.log("Business: ", result);
            setBusiness(result.data[0]);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-70 z-50">
        <div className="w-full max-w-[890px] bg-white px-8 pb-5 pt-10 dark:bg-[#1D232A] rounded-md">
          <div className="mb-4">
            <div className="text-2xl font-bold border-b dark:border-none">
              Business Details
            </div>
            <span className="text-sm  text-gray-700 dark:text-gray-400">
              Below is the existing business credentials.
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {loading ? (
              <>
                <div className="w-full h-full flex justify-center items-center">
                  <span className="loading loading-spinner loading-lg bg-[#5D17EB] dark:bg-white"></span>
                </div>
              </>
            ) : (
              <>
                <div className="">
                  <label
                    htmlFor="businessName"
                    className="text-md font-medium text-gray-900 dark:text-gray-300 block "
                  >
                    Business Name
                  </label>
                  <span className="text-[12px] text-gray-700 dark:text-gray-400">
                    Below is the business name.
                  </span>
                  <input
                    readOnly
                    type="text"
                    name="businessName"
                    id="businessName"
                    value={business.businessName}
                    className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
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
                    Below is the business EIN Number.
                  </span>
                  <input
                    readOnly
                    type="text"
                    name="businessEINNumber"
                    id="businessEINNumber"
                    value={business.businessEINNumber}
                    className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
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
                    Below is the Business email address.
                  </span>
                  <input
                    readOnly
                    type="email"
                    name="email"
                    id="email"
                    value={business.businessEmail}
                    className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
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
                    Below is the business account password.
                  </span>
                  <div className="relative mt-1">
                    <input
                      readOnly
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      value={business.businessPassword}
                      className="shadow-sm bg-gray-50 dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
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
                    Below is the business description.
                  </span>
                  <textarea
                    readOnly
                    name="businessDescription"
                    value={business.businessDescription}
                    className="shadow-sm bg-gray-50  dark:bg-[#191E24] dark:border-gray-700 border border-gray-300  text-gray-900 dark:text-gray-200 sm:text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 pr-10"
                  />
                </div>
              </>
            )}

            <div className="w-full flex gap-2 justify-end items-center col-span-2 text-right">
              <button
                type="button"
                className="btn"
                onClick={() => setViewBusinessModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
