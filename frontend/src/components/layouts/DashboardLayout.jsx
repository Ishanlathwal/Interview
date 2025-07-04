import React from "react";
import { useSelector } from "react-redux";
import Navbar from "./Navbar.jsx";
import Sidemenu from "./Sidemenu.jsx";

const DashboardLayout = ({ children, activeMenu }) => {
  const { user } = useSelector((state) => state.user);
  return (
    <>
      <div className="">
        <Navbar activeMenu={activeMenu} />
        {user && (
          <div className="flex">
            <div className="max-[1080px]:hidden">
              <Sidemenu activeMenu={activeMenu} />
            </div>
            <div className="grow mx-5">{children}</div>
          </div>
        )}
      </div>
    </>
  );
};

export default DashboardLayout;
