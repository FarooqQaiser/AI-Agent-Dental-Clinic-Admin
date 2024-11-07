import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import React from "react";
import { IoTrashOutline } from "react-icons/io5";

export default function Business({
  iconClasses,
  business,
  setEditBusinessModal,
  setViewBusinessModal,
  setShowDeleteBusinessModal,
  setId,
}) {
  const handleEditButton = (id) => {
    setEditBusinessModal(true);
    setId(id);
  };

  const handleViewButton = (id) => {
    setId(id);
    setViewBusinessModal(true);
  };

  const handleDeleteButton = (id) => {
    setShowDeleteBusinessModal(true);
    setId(id);
  };

  return (
    <>
      <div className="p-6 bg-[#FFFFFF] border border-gray-200 rounded-lg shadow-lg dark:bg-[#1D232A] dark:border-gray-700 hover:bg-[#E8E9EB] dark:hover:bg-[#2B3039]">
        <h5
          className="cursor-pointer mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          onClick={() => handleViewButton(business._id)}
        >
          {business.businessName}
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {business.businessDescription.length > 25
            ? `${business.businessDescription.slice(0, 25)}...`
            : business.businessDescription}
        </p>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
          {business.businessEINNumber}
        </p>
        <div className="flex w-full space-x-2 justify-end">
          <button
            onClick={() => handleEditButton(business._id)}
            className="text-white bg-[#5D17EB] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center flex justify-center items-center"
          >
            <Cog6ToothIcon className={`${iconClasses} inline`} />
          </button>
          <button
            onClick={() => handleDeleteButton(business._id)}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center flex justify-center items-center"
          >
            <IoTrashOutline className={`${iconClasses} inline`} />
          </button>
        </div>
      </div>
    </>
  );
}
