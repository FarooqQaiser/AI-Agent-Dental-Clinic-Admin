import React, { useEffect, useState } from "react";
import { API_URL } from "../../store";

export default function EditBusiness({ setEditBusinessModal, id }) {
  const [loading, setLoading] = useState(false);
  const [updatingData, setUpdatingData] = useState(false);
  const [businessName, setBusinessName] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [businessEINNumber, setBusinessEINNumber] = useState("");

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
        });
        result = await response.json();
        if (response.ok) {
          if (result) {
            setBusinessName(result.data[0].businessName);
            setBusinessDescription(result.data[0].businessDescription);
            setBusinessEINNumber(result.data[0].businessEINNumber);
            setLoading(false);
          }
        }
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchBusiness();
  }, [id]);

  const toggleModal = () => {
    setEditBusinessModal(false);
  };

  const updateBusiness = async () => {
    let result = null;
    setUpdatingData(true);
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
          setEditBusinessModal(false);
          setUpdatingData(false);
        }
      }
    } catch (err) {
      console.error(err);
      setUpdatingData(false);
    }
  };

  return (
    <>
      <div className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden">
        <div className="relative p-4 w-full max-w-md max-h-full bg-[#FFFFFF] dark:bg-[#1D232A] rounded-2xl">
          <button
            type="button"
            className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
          {loading ? (
            <>
              <div className="w-full h-full flex justify-center items-center">
                <span className="loading loading-spinner loading-lg bg-[#5D17EB] dark:bg-white"></span>
              </div>
            </>
          ) : (
            <>
              <h1 className="text-xl font-bold">Edit Business</h1>
              <div className="mt-5 p-5 flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="businessName"
                    className="text-black dark:text-white text-lg font-semibold"
                  >
                    Business Name
                  </label>
                  <input
                    type="text"
                    name="businessName"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                    placeholder="Enter your business name..."
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="businessDescription"
                    className="text-black dark:text-white text-lg font-semibold"
                  >
                    Business Description
                  </label>
                  <textarea
                    name="businessDescription"
                    className="block w-full h-52 rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                    placeholder="Enter your business description..."
                    value={businessDescription}
                    onChange={(e) => setBusinessDescription(e.target.value)}
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="businessEINNumber"
                    className="text-black dark:text-white text-lg font-semibold"
                  >
                    Business EIN Number
                  </label>
                  <input
                    type="text"
                    name="businessEINNumber"
                    className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder:text-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                    required
                    placeholder="Enter your business EIN number..."
                    value={businessEINNumber}
                    onChange={(e) => setBusinessEINNumber(e.target.value)}
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={updateBusiness}
                    className={`h-10 text-white bg-[#4A00FF] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center dark:bg-[#7480FF] dark:hover:bg-[#646EE4] dark:focus:ring-[#5763e8] ${
                      updatingData ? "opacity-30" : ""
                    }`}
                  >
                    {updatingData ? "Submiting..." : "Submit"}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
