import React, { useEffect, useState } from "react";
import { API_URL } from "../../store";

export default function ViewBusiness({ setViewBusinessModal, id }) {
  const [loading, setLoading] = useState(false);
  const [business, setBusiness] = useState([]);

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
      <div className="bg-black bg-opacity-50 overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full md:inset-0 h-modal md:h-full">
        <div className="relative p-4 w-full max-w-xl h-full md:h-auto">
          <div className="align-middle relative p-4 bg-[#FFFFFF] rounded-lg shadow dark:bg-[#1D232A] sm:p-5">
            <button
              type="button"
              className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => setViewBusinessModal(false)}
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
                <div className="flex justify-between mb-4 rounded-t sm:mb-5">
                  <div className="text-lg text-gray-900 md:text-xl dark:text-white">
                    <h3 className="font-semibold capitalize">
                      {business.businessName}
                    </h3>
                    <p className="font-bold">{business.businessEINNumber}</p>
                  </div>
                </div>
                <div>
                  <h2 className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Description
                  </h2>
                  <p className="mb-4 font-light">
                    {business.businessDescription}
                  </p>
                  <h2 className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Created on
                  </h2>
                  <p className="mb-4 font-light">26 May 2024</p>
                  <h2 className="mb-2 font-semibold leading-none text-gray-900 dark:text-white">
                    Status
                  </h2>
                  <span className="bg-[#5e17eb17] py-1 px-2 rounded-lg">
                    Active
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
