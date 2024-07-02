"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

import TextField from "@mui/material/TextField";
import { GetAllShartnoma, SearchShartnoma } from "@/app/Api/Apis";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import TopshiriqCard from "./TopshiriqCard";
import Timerr from "./Timer";
function Topshiriq() {
  const now = new Date();
  const fiveMinutesLater = new Date(now.getTime() + 5 * 60000);
  console.log(fiveMinutesLater);

  return (
    <div className="w-[70%] mt-6 mx-auto">
      <div className="flex w-full justify-between mb-10">
        <div className="flex flex-col">
          <h1 className="text-[28px]  font-bold">
            {latinToCyrillic("Topshiriqlar")}
          </h1>
          <span className=" text-slate-400 text-[14px] mt-[-8px]">
            {latinToCyrillic("3 ta topshiriq mavjud")}
          </span>
        </div>

        <Timerr date={fiveMinutesLater} />
      </div>
      <div className="flex flex-col gap-4">
        <TopshiriqCard />
      </div>
    </div>
  );
}

export default Topshiriq;
