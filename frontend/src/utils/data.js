import {
  LuLayoutDashboard,
  LuHandCoins,
  LuWalletMinimal,
  LuLogOut,
} from "react-icons/lu";

export const SIDE_MENU_DATA = [
  {
    id: "01",
    lable: "Dashboard",
    lableActive: "dashboard",
    icon: LuLayoutDashboard,
    path: "/main",
  },
  {
    id: "02",
    lable: "Budget",
    lableActive: "budget",
    icon: LuWalletMinimal,
    path: "/main/budget",
  },
  {
    id: "03",
    lable: "Expense",
    lableActive: "expense",
    icon: LuHandCoins,
    path: "/main/expense",
  },
  {
    id: "06",
    lable: "Logout",
    lableActive: "logout",
    icon: LuLogOut,
    path: "logout",
  },
];
