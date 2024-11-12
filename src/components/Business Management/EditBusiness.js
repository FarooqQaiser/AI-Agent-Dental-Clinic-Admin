import React, { useEffect, useState } from "react";
import { API_URL } from "../../store";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

export default function EditBusiness({ setEditBusinessModal, id }) {
  const [pageLoading, setPageLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessEINNumber, setBusinessEINNumber] = useState("");
  const [businessPassword, setBusinessPassword] = useState("");
  const [businessEmail, setBusinessEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchBusiness = async () => {
      setPageLoading(true);
      let result = null;

      try {
        const response = await fetch(API_URL + "data/business/" + id, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        result = await response.json();
        if (response.ok) {
          if (result) {
            setBusinessName(result.data[0].businessName);
            setBusinessDescription(result.data[0].businessDescription);
            setBusinessEINNumber(result.data[0].businessEINNumber);
            setBusinessPassword(result.data[0].businessPassword);
            setBusinessEmail(result.data[0].businessEmail);
            setPageLoading(false);
          }
        }
      } catch (err) {
        console.log(err);
        setPageLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  const toggleModal = () => {
    setEditBusinessModal(false);
  };

  const updateBusiness = async () => {
    setLoading(true);
    let result = null;
    const updatedBusiness = JSON.stringify({
      businessName: businessName,
      businessDescription: businessDescription,
      businessEINNumber: businessEINNumber,
    });
    try {
      const response = await fetch(API_URL + "data/update-data/" + id, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: updatedBusiness,
      });
      result = await response.json();
      if (response.ok) {
        if (result) {
          setLoading(false);
          setEditBusinessModal(false);
        }
      }
    } catch (err) {
      setLoading(false);
      console.error(err);
    }
  };

  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center  bg-black bg-opacity-70 z-50">
        <div className="w-full max-w-[890px] bg-white px-8 pb-5 pt-10 dark:bg-[#1D232A] rounded-md">
          <div className="mb-4">
            <div className="text-2xl font-bold border-b dark:border-none">
              Update New Business
            </div>
            <span className="text-sm  text-gray-700 dark:text-gray-400">
              Edit the business credentials to update the existing business
              account. You can modify business credentials as needed. Note that
              the updated email and password will continue to be used for login
              purposes.
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {pageLoading ? (
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
                    Edit name of business down here
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
                    Edit EIN Number down here
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
                    Edit Business email address down here
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
                    Edit business account password down here.
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
                    Edit Business Description down here
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
              </>
            )}

            <div className="w-full flex gap-2 justify-end items-center col-span-2 text-right">
              <button type="button" className="btn" onClick={toggleModal}>
                Close
              </button>
              <button
                onClick={updateBusiness}
                disabled={loading}
                className={`h-12 text-white bg-[#737FFF] hover:bg-[#646EE4] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center ${
                  loading ? "opacity-30" : ""
                }`}
              >
                {loading ? "Editing Business..." : "Edit Business"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
