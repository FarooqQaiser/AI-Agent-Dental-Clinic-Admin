import React, { useEffect, useState } from "react";
import { IoTrashOutline } from "react-icons/io5";

export default function CompletedAppointments({ completedAppointments }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(completedAppointments);
  }, [completedAppointments]);

  return (
    <>
      <table className="w-full p-5 rounded-2xl">
        <tr>
          <th className="font-semibold text-center p-2">Name</th>
          <th className="font-semibold text-center p-2">Number</th>
          <th className="font-semibold text-center p-2">Date</th>
          <th className="font-semibold text-center p-2">Time</th>
          <th className="font-semibold text-center p-2">Actions</th>
        </tr>
        {data.map((appointments, index) => {
          return (
            <>
              <tr key={index} className="">
                <td key={index} className="text-center p-2">
                  {appointments.name}
                </td>
                <td className="text-center p-2">{appointments.number}</td>
                <td className="text-center p-2">{appointments.date}</td>
                <td className="text-center p-2">{appointments.time}</td>
                <td className="text-center p-2">
                  <div className="flex w-full space-x-2 justify-center items-center">
                    <button
                      className="text-white bg-red-700 hover:bg-red-800 focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm p-2 text-center flex justify-center items-center tooltip"
                      data-tip="Delete appoinment"
                    >
                      <IoTrashOutline />
                    </button>
                  </div>
                </td>
              </tr>
            </>
          );
        })}
      </table>
    </>
  );
}
