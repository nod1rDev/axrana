"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

import TextField from "@mui/material/TextField";
import {
  GetAllShartnoma,
  GetTopshiriqlar,
  SearchShartnoma,
} from "@/app/Api/Apis";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import TopshiriqCard from "./TopshiriqCard";
import Timerr from "./Timer";
function Topshiriq() {
  const [data, setData] = useState([]);

  const JWT = useSelector((s: any) => s.auth.JWT);
  const getTopshiriqApi = async () => {
    const res = await GetTopshiriqlar(JWT);

    setData(res.data);
  };
  useEffect(() => {
    getTopshiriqApi();
  }, []);
 
  return (
    <div className="w-[80%] mt-6 mx-auto">
      <div className="flex w-full justify-between mb-10">
        <div className="flex flex-col">
          <h1 className="text-[28px]  font-bold">
            {latinToCyrillic("Topshiriqlar")}
          </h1>
          <span className=" text-slate-400 text-[14px] mt-[-8px]">
            {latinToCyrillic(data.length + " ta topshiriq mavjud")}
          </span>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {data && data.map((e: any) => <TopshiriqCard click={true} data={e} />)}
      </div>
    </div>
  );
}

export default Topshiriq;
