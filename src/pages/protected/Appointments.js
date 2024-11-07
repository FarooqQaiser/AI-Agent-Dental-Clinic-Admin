import React, { useEffect, useState } from "react";
import TitleCard from "../../components/Cards/TitleCard";
import PendingAppointments from "../../components/Appointments/PendingAppointments";
import CompletedAppointments from "../../components/Appointments/CompletedAppointments";
// import { FiInfo } from "react-icons/fi";
import "../../components/Appointments/Appointments.css";
import { useDispatch } from "react-redux";
import { setPageTitle } from "../../features/common/headerSlice";

export default function Appointments() {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("pending");

  const [pendingAppointments, setPendingAppointments] = useState([
    {
      name: "appointment1",
      number: "appointmentNumber1",
      date: "appointmentDate1",
      time: "appointmentTime1",
    },
    {
      name: "appointment2",
      number: "appointmentNumber2",
      date: "appointmentDate2",
      time: "appointmentTime2",
    },
    {
      name: "appointment3",
      number: "appointmentNumber3",
      date: "appointmentDate3",
      time: "appointmentTime3",
    },
    {
      name: "appointment4",
      number: "appointmentNumber4",
      date: "appointmentDate4",
      time: "appointmentTime4",
    },
    {
      name: "appointment5",
      number: "appointmentNumber5",
      date: "appointmentDate5",
      time: "appointmentTime5",
    },
  ]);

  const [completedAppointments, setCompletedAppointments] = useState([
    {
      name: "appointment1",
      number: "appointmentNumber1",
      date: "appointmentDate1",
      time: "appointmentTime1",
    },
    {
      name: "appointment2",
      number: "appointmentNumber2",
      date: "appointmentDate2",
      time: "appointmentTime2",
    },
    {
      name: "appointment3",
      number: "appointmentNumber3",
      date: "appointmentDate3",
      time: "appointmentTime3",
    },
    {
      name: "appointment4",
      number: "appointmentNumber4",
      date: "appointmentDate4",
      time: "appointmentTime4",
    },
    {
      name: "appointment5",
      number: "appointmentNumber5",
      date: "appointmentDate5",
      time: "appointmentTime5",
    },
  ]);

  useEffect(() => {
    dispatch(setPageTitle({ title: "Appointments" }));
  }, [dispatch]);

  return (
    <>
      <TitleCard title={"Appointments"}>
        <div className="w-full mb-12 flex gap-5 justify-start">
          <button
            className={`h-10 text-white rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center ${
              activeTab === "pending"
                ? "bg-[#FFFFFF] dark:bg-[#14171A]"
                : "bg-[#5D17EB] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium "
            }`}
            onClick={() => setActiveTab("pending")}
          >
            Pending
          </button>
          <button
            className={`h-10 text-white rounded-lg text-sm px-5 py-2.5 text-center flex justify-center items-center ${
              activeTab === "completed"
                ? "bg-[#FFFFFF] dark:bg-[#14171A]"
                : "bg-[#5D17EB] hover:bg-[#3F00E7] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium "
            }`}
            onClick={() => setActiveTab("completed")}
          >
            Completed
          </button>
        </div>
        <div className="overflow-x-scroll">
          {activeTab === "pending" ? (
            <>
              <PendingAppointments
                pendingAppointments={pendingAppointments}
                setPendingAppointments={setPendingAppointments}
                setCompletedAppointments={setCompletedAppointments}
                completedAppointments={completedAppointments}
              />
            </>
          ) : (
            <>
              <CompletedAppointments
                completedAppointments={completedAppointments}
              />
            </>
          )}
        </div>
      </TitleCard>
    </>
  );
}
