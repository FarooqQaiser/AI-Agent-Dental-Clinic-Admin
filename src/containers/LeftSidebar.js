import routes from "../routes/sidebar";
import { NavLink, Link, useLocation } from "react-router-dom";
// import SidebarSubmenu from "./SidebarSubmenu";
import XMarkIcon from "@heroicons/react/24/outline/XMarkIcon";
// import { useDispatch } from "react-redux";
import { RiRobot3Fill } from "react-icons/ri";
import { useState } from "react";
import { FaBars } from "react-icons/fa6";

function LeftSidebar() {
  const [sidebarWidth, setSidebarWidth] = useState(240); // Initialize with the full width (320px)
  const location = useLocation();

  // const dispatch = useDispatch();

  const close = (e) => {
    document.getElementById("left-sidebar-drawer").click();
  };

  const handleWidth = () => {
    setSidebarWidth((prevWidth) => (prevWidth === 240 ? 80 : 240));
  };

  return (
    <div
      className="drawer-side z-30 transition-all duration-300 overflow-x-hidden"
      style={{ width: `${sidebarWidth}px` }}
    >
      <label htmlFor="left-sidebar-drawer" className="drawer-overlay"></label>
      <ul className="menu pt-2 bg-base-100 w-full min-h-full   text-base-content">
        <button
          className="btn btn-ghost bg-base-300  btn-circle z-50 top-0 right-0 mt-4 mr-2 absolute lg:hidden"
          onClick={() => close()}
        >
          <XMarkIcon className="h-5 inline-block w-5" />
        </button>

        <li className="mb-2 font-semibold text-xl py-1 bg-[#5D17EB] rounded-lg">
          <Link className="w-full">
            <button
              className="w-full flex items-center justify-between gap-16 disable pointer-events-none lg:pointer-events-auto"
              onClick={handleWidth}
            >
              {sidebarWidth === 240 && (
                <div className="flex-row flex items-center gap-1 ">
                  <div className=" p-2 rounded-xl text-white">
                    <RiRobot3Fill />
                  </div>
                  <span className="text-white text-base">AVA 0.1</span>
                </div>
              )}
              <div
                className={`flex justify-center items-center text-white  rounded-xl  ${
                  sidebarWidth === 240 ? "" : "p-2 "
                }`}
              >
                <FaBars className="text-xl" />
              </div>
            </button>
            {/* <div className="flex-row flex items-center gap-1 ">
              <div className=" p-2 rounded-xl text-white">
                <RiRobot3Fill className="mask mask-squircle w-10 " />
              </div>
              <span className="text-white text-base">AI Agent </span>
            </div> */}
          </Link>{" "}
        </li>
        {routes.map((route, k) => {
          return (
            <li key={k}>
              <NavLink
                end
                to={route.path}
                className={({ isActive }) =>
                  `${
                    isActive ? "font-semibold bg-base-200 " : "font-normal "
                  } mt-1`
                }
              >
                {route.icon}
                {sidebarWidth === 240 && <span>{route.name}</span>}{" "}
                {/* Show text only when full width */}
                {location.pathname === route.path ? (
                  <span
                    className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary"
                    aria-hidden="true"
                  ></span>
                ) : null}
              </NavLink>
            </li>
            // <li className="" key={k}>
            //   {route.submenu ? (
            //     <SidebarSubmenu {...route} />
            //   ) : (
            //     <NavLink
            //       end
            //       to={route.path}
            //       className={({ isActive }) =>
            //         `${
            //           isActive ? "font-semibold  bg-base-200 " : "font-normal"
            //         }`
            //       }
            //     >
            //       {route.icon} {route.name}
            //       {location.pathname === route.path ? (
            //         <span
            //           className="absolute inset-y-0 left-0 w-1 rounded-tr-md rounded-br-md bg-primary "
            //           aria-hidden="true"
            //         ></span>
            //       ) : null}
            //     </NavLink>
            //   )}
            // </li>
          );
        })}
      </ul>
    </div>
  );
}

export default LeftSidebar;
