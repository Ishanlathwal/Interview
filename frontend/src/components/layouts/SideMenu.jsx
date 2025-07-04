import React from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../redux/USER_REDUCER";
import { MdAdminPanelSettings } from "react-icons/md";
const Sidemenu = ({ activeMenu }) => {
  const { user } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (route) => {
    if (route === "logout") {
      dispatch(logOut());
      navigate("/login");
      return;
    }

    navigate(route);
  };

  return (
    <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
      <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
        {user?.avatar?.url ? (
          <img
            src={user?.avatar?.url || ""}
            alt="Profile"
            className="w-20 h-20 bg-slate-400 rounded-full"
          />
        ) : (
          <></>
        )}
        <h5 className="text-gray-950 font-medium leading-6">
          {user?.name || ""}
        </h5>
      </div>
      {user?.role === "admin" && (
        <button
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu === "admin" ? "text-white bg-[#ff6347]" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick("/main/admin")}
        >
          <MdAdminPanelSettings className="text-2xl" />
          All Expenses Admin
        </button>
      )}
      {SIDE_MENU_DATA.map((item) => (
        <button
          key={item.id}
          className={`w-full flex items-center gap-4 text-[15px] ${
            activeMenu == item.lableActive ? "text-white bg-[#ff6347]" : ""
          } py-3 px-6 rounded-lg mb-3`}
          onClick={() => handleClick(item.path)}
        >
          <item.icon className="text-xl " />
          {item.lable}
        </button>
      ))}
    </div>
  );
};

export default Sidemenu;
