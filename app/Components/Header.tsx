"use client";
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import Diversity3Icon from "@mui/icons-material/Diversity3";
import SecurityIcon from "@mui/icons-material/Security";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { puJWT } from "../Redux/AuthSlice";
import { latinToCyrillic } from "../tip/add/Components/lotin";
import LogoutIcon from "@mui/icons-material/Logout";
import AssignmentIcon from "@mui/icons-material/Assignment";
import StorageIcon from "@mui/icons-material/Storage";
import TokenIcon from "@mui/icons-material/Token";
import Link from "next/link";
import DnsIcon from "@mui/icons-material/Dns";
import MenuBar from "./MenuBar";
import MenuBar2 from "./MenuBar2";

export default function Header() {
  const admin = useSelector((s: any) => s.auth.admin);
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

  const router = useRouter();
  const dispatch = useDispatch();
  const [active, setActive] = React.useState<string>(menuListAdmin[0].path);
  const [selectedMenu, setSelectedMenu] = React.useState<string>("");

  const AuthOut = () => {
    sessionStorage.setItem("token", "out");
    dispatch(puJWT("out"));
    location.reload();
  };

  const handleClick = (path: string) => {
    setActive(path);
    router.push(path);
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const path = e.target.value;
    setSelectedMenu(path);
    handleClick(path);
  };

  const notAdmin: any = menuListAdmin.slice(0, 3);

  return (
    <div className="py-6 min-h-[100vh] w-[300px] fixed top-0 left-0 flex flex-col bg-[#1976D2] text-white">
      <Link href={"/"}>
        <div className="flex pl-3 gap-2 items-center">
          <div className="w-[54px] h-[54px] rounded-[999px] bg-white">
            <img
              className="w-[54px] h-[54px] rounded-[999px]"
              src="/icon-192x192.png"
              alt=""
            />
          </div>
          <h1 className="text-[26px] font-bold">
            {latinToCyrillic("Milliy Gvardiya")}
          </h1>
        </div>
      </Link>
      <div className="min-w-[300px] h-[1px] bg-white my-4"></div>
      <div className="flex flex-col px-3 gap-4">
        {admin
          ? menuListAdmin.map((e: any) => (
              <>
                <button
                  key={e.path}
                  onClick={() => handleClick(e.path)}
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
                </button>
              </>
            ))
          : notAdmin.map((e: any) => (
              <button
                key={e.path}
                onClick={() => handleClick(e.path)}
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
              </button>
            ))}
        {admin ? (
          <div className="mb-0">
            <MenuBar2 />
          </div>
        ) : null}
        {admin ? (
          <div className="mb-10">
            <MenuBar />
          </div>
        ) : (
          ""
        )}
        <button
          onClick={AuthOut}
          className={`flex gap-6 items-center px-4 w-full py-2 rounded-xl transition-all duration-300 bg-red-600 text-white hover:bg-red-700 transform hover:scale-105`}
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
