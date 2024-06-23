"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { GetAllShartnoma } from "../Api/Apis";
import ShartnomaCard from "./Components/ShartnomaCard";

function page() {
  const [shartnomalar, setShartnomalar] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getAllContract = async () => {
    const res = await GetAllShartnoma(JWT);
    setShartnomalar(res.data);
  };
  useEffect(() => {
    getAllContract();
  }, []);
  const router = useRouter();
  return (
    <div className="w-[70%] mt-6 mx-auto">
      <div className="flex w-full justify-between mb-10">
        <div className="flex flex-col">
          <h1 className="text-[28px] font-bold">Shartnomalar</h1>
          <span className=" text-slate-400 text-[14px] mt-[-8px]">
            {shartnomalar
              ? `${shartnomalar.length} ta shartnoma mavjud`
              : "Shartnoma mavjud emas"}
          </span>
        </div>
        <div className="">
          <Button
            onClick={() => router.push("/shartnoma/add")}
            variant="contained"
          >
            {"Qo'shish"}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {shartnomalar &&
          shartnomalar.map((e: any) => <ShartnomaCard data={e} />)}
      </div>
    </div>
  );
}

export default page;
