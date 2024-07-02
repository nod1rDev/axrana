"use client";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
import Status from "./Status";
function TopshiriqCard() {
  const router = useRouter();

  return (
    <>
      <div className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]">
        <span className="font-bold text-center">110</span>
        <span>02.05.2024</span>
        <span>Asaka Bank</span>

        <div className="flex  items-center">
          <Status paid />
          <KeyboardArrowRightIcon fontSize="large" color="info" />
        </div>
      </div>

      <div className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]">
        <span className="font-bold text-center">140</span>
        <span>02.05.2024</span>
        <span>Unisoft</span>

        <div className="flex  items-center">
          <Status pinding />
          <KeyboardArrowRightIcon fontSize="large" color="info" />
        </div>
      </div>

      <div className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]">
        <span className="font-bold text-center">130</span>
        <span>02.05.2024</span>
        <span>Agrobank</span>

        <div className="flex  items-center">
          <Status draft />
          <KeyboardArrowRightIcon fontSize="large" color="info" />
        </div>
      </div>
    </>
  );
}

export default TopshiriqCard;
