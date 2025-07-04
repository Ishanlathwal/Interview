import { Outlet, useLocation } from "react-router-dom";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import { useEffect, useState } from "react";

const Layout = () => {
  const [activeMenu, setActiveMenu] = useState("Dashboard");
  const location = useLocation();

  useEffect(() => {
    const pathSegments = location.pathname.split("/");
    const currentTab = pathSegments[2] || "dashboard";
    setActiveMenu(currentTab.toLowerCase());
  }, [location.pathname]);

  return (
    <>
      <DashboardLayout activeMenu={activeMenu}>
        <div className="my-5 mx-auto ">
          <Outlet />
        </div>
      </DashboardLayout>
    </>
  );
};

export default Layout;
