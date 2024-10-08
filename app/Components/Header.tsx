"use client";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SecurityIcon from "@mui/icons-material/Security";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AssignmentIcon from "@mui/icons-material/Assignment";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBar from "./MenuBar";
import MenuBar2 from "./MenuBar2";
import { puJWT } from "../Redux/AuthSlice";
import { latinToCyrillic } from "../tip/add/Components/lotin";
import Link from "next/link";
import InfoIcon from "@mui/icons-material/Info";

export default function Header() {
  const admin = useSelector((state: any) => state.auth.admin);
  const pathname = usePathname();
  const dispatch = useDispatch();

  const menuListAdmin = [
    {
      name: admin ? "Shartnoma" : "Topshiriq",
      path: admin ? "/shartnoma" : "/topshiriq",
      icon: admin ? <Diversity3Icon /> : <AssignmentIcon />,
    },
    {
      name: "Shaxsiy",
      path: "/shaxsiy",
      icon: <SecurityIcon />,
    },
    {
      name: "FIO",
      path: admin ? "/tip/batalyon" : "/tip",
      icon: <PermIdentityIcon />,
    },
  ];

  const [active, setActive] = React.useState<string>("");

  React.useEffect(() => {
    const matchingMenuItem = menuListAdmin.find(
      (item) => item.path === pathname
    );
    if (matchingMenuItem) {
      setActive(matchingMenuItem.path);
    } else {
      setActive(pathname);
    }
  }, [pathname, menuListAdmin]);

  const AuthOut = () => {
    sessionStorage.setItem("token", "out");
    dispatch(puJWT("out"));
    location.reload();
  };

  return (
    <div className="py-6 min-h-[100vh] w-[300px] fixed top-0 left-0 flex flex-col bg-[#1976D2] text-white">
      <Link href={"/"}>
        <div className="flex pl-3 gap-2 items-center">
          <div className="w-[54px] h-[54px] rounded-[999px] bg-white">
            <img
              className="w-[54px] h-[54px] rounded-[999px]"
              src="/icon-192x192.png"
              alt="Milliy Gvardiya"
            />
          </div>
          <h1 className="text-[26px] font-bold">
            {latinToCyrillic("Milliy Gvardiya")}
          </h1>
        </div>
      </Link>
      <div className="min-w-[300px] h-[1px] bg-white my-4"></div>
      <div className="flex flex-col px-3 gap-4">
        {menuListAdmin.map((e) => (
          <Link href={e.path} key={e.path}>
            <div
              onClick={() => setActive(e.path)}
              className={`flex gap-6 items-center px-4 w-full py-2 rounded-xl transition-all duration-300 ${
                active === e.path
                  ? "bg-white text-[#1976D2] transform scale-105"
                  : "bg-[#1976D2] text-white hover:bg-[#fff] hover:text-[#1976D2] hover:scale-105"
              }`}
            >
              {e.icon}
              <h1 className="text-[20px] font-bold text-center">
                {latinToCyrillic(e.name)}
              </h1>
            </div>
          </Link>
        ))}
        {admin && (
          <>
            <div className="mb-0">
              <MenuBar />
            </div>
            <div className="mb-0">
              <MenuBar2 />
            </div>
          </>
        )}
        {/* <Link href={"/info"}>
          <div
            onClick={() => setActive("/info")}
            className={`flex gap-6 items-center px-4 w-full py-2 rounded-xl transition-all duration-300 ${
              active === "/info"
                ? "bg-white text-[#1976D2] transform scale-105"
                : "bg-[#1976D2] text-white hover:bg-[#fff] hover:text-[#1976D2] hover:scale-105"
            }`}
          >
            <InfoIcon />
            <h1 className="text-[20px] font-bold text-center">
              {latinToCyrillic("Yuriqnoma")}
            </h1>
          </div>
        </Link> */}
        <button
          onClick={AuthOut}
          className={`flex gap-6 mt-10 items-center px-4 w-full py-2 rounded-xl transition-all duration-300 bg-red-600 text-white hover:bg-red-700 transform hover:scale-105`}
        >
          <LogoutIcon />
          <h1 className="text-[20px] font-bold text-center">
            {latinToCyrillic("Chiqish")}
          </h1>
        </button>
      </div>
    </div>
  );
}
