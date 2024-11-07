import React, { useEffect, useState } from "react";
import CreateBusiness from "../../components/Business Management/CreateBusiness";
import TitleCard from "../../components/Cards/TitleCard";
import DeleteBusiness from "../../components/Business Management/DeleteBusiness";
import EditBusiness from "../../components/Business Management/EditBusiness";
import { API_URL } from "../../store";
import ViewBusiness from "../../components/Business Management/ViewBusiness";
import { IoIosAddCircleOutline } from "react-icons/io";
import Cog6ToothIcon from "@heroicons/react/24/outline/Cog6ToothIcon";
import { GrView } from "react-icons/gr";
import { IoTrashOutline } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

export default function BusinessManagement() {
  const dispatch = useDispatch();
  const iconClasses = `h-6 w-6`;
  const [loading, setLoading] = useState(false);
  const [openCreateBusinessForm, setOpenCreateBusinessForm] = useState(false);
  const [totalBusinesses, setTotalBusinesses] = useState([]);
  const [editBusinessModal, setEditBusinessModal] = useState(false);
  const [viewBusinessModal, setViewBusinessModal] = useState(false);
  const [showDeleteBusinessModal, setShowDeleteBusinessModal] = useState(false);
  const [id, setId] = useState("");

  useEffect(() => {
    dispatch(setPageTitle({ title: "Business Management" }));
  }, [dispatch]);

  useEffect(() => {
    if (
      openCreateBusinessForm === false &&
      showDeleteBusinessModal === false &&
      editBusinessModal === false
    ) {
      setLoading(true);
      let result = null;

      const fetchBusinesses = async () => {
        try {
          const response = await fetch(API_URL + "data/all-data", {
            method: "GET",
          });
          result = await response.json();
          if (response.ok) {
            if (result) {
              setTotalBusinesses(result.data);
              setLoading(false);
            } else {
              setLoading(false);
            }
          }
        } catch (err) {
          console.error(err);
          setLoading(false);
        }
      };

      fetchBusinesses();
    }
  }, [openCreateBusinessForm, showDeleteBusinessModal, editBusinessModal]);

  const handleCreateBusiness = () => {
    setOpenCreateBusinessForm(true);
  };

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
      {loading ? (
        <>
          <div className="w-full h-full flex justify-center items-center">
            <span className="loading loading-spinner loading-lg bg-[#5D17EB] dark:bg-white"></span>
          </div>
        </>
      ) : (
        <>
          <TitleCard title={"Total Businesses"}>
            <button
              className="absolute top-5 right-2.5 text-white bg-[#5D17EB] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-medium text-sm p-2 text-center flex justify-center items-center"
              onClick={handleCreateBusiness}
            >
              Add New Business
            </button>
            <div className="mt-4">
              {totalBusinesses.length === 0 && (
                <li className="text-gray-500">No Businesses added yet.</li>
              )}
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 mt-6">
                <thead className="bg-[#5e17eb1c] dark:bg-gray-700 s">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Bot Name
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Attached Business
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Description
                    </th>

                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Created On
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider"
                    >
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className=" divide-y divide-gray-200 dark:divide-gray-700">
                  {totalBusinesses.length === 0 ? (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
                      >
                        No totalBusinesses added yet.
                      </td>
                    </tr>
                  ) : (
                    <>
                      {totalBusinesses.map((business, index) => (
                        <tr key={index}>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                            {business.businessName}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {business.businessEINNumber}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            {business.businessDescription.length > 25
                              ? `${business.businessDescription.slice(
                                  0,
                                  25
                                )}...`
                              : business.businessDescription}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            26 May 2024
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                            <span className="bg-[#5e17eb17] py-1 px-2 rounded-lg">
                              Active
                            </span>
                          </td>

                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button
                              onClick={() => handleEditButton(business._id)}
                              className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                            >
                              <Cog6ToothIcon
                                className={`${iconClasses} inline`}
                              />
                            </button>
                            <button
                              onClick={() => handleViewButton(business._id)}
                              className="text-green-600 hover:text-green-900 dark:text-green-400 dark:hover:text-green-300"
                            >
                              <GrView className={`h-5 w-6 inline`} />
                            </button>
                            <button
                              onClick={() => handleDeleteButton(business._id)}
                              className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300"
                            >
                              <IoTrashOutline
                                className={`${iconClasses} inline`}
                              />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </>
                  )}
                </tbody>
              </table>
            </div>
            {/* <ul className="mt-4 space-y-4">
              {totalBusinesses.map((business, index) => (
                <>
                  <li
                    key={index}
                    // className="bg-[#F2F2F2] dark:bg-[#191E24] flex flex-col gap-5 p-4 rounded-lg shadow-sm transition"
                  >
                    <Business
                      iconClasses={iconClasses}
                      business={business}
                      setEditBusinessModal={setEditBusinessModal}
                      setViewBusinessModal={setViewBusinessModal}
                      setShowDeleteBusinessModal={setShowDeleteBusinessModal}
                      setId={setId}
                    />
                  </li>
                </>
              ))}
            </ul> */}
          </TitleCard>
          <div className="mt-10"></div>
        </>
      )}
      {openCreateBusinessForm && (
        <CreateBusiness setOpenCreateBusinessForm={setOpenCreateBusinessForm} />
      )}
      {editBusinessModal && (
        <EditBusiness setEditBusinessModal={setEditBusinessModal} id={id} />
      )}
      {viewBusinessModal && (
        <>
          <ViewBusiness setViewBusinessModal={setViewBusinessModal} id={id} />
        </>
      )}
      {showDeleteBusinessModal && (
        <DeleteBusiness
          setShowDeleteBusinessModal={setShowDeleteBusinessModal}
          id={id}
        />
      )}
    </>
  );
}
