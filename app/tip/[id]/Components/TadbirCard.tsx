"use client";
import React from "react";
import { latinToCyrillic } from "../../add/Components/lotin";
import { formatNumber } from "@/app/Utils";

function TadbirCard({ data }: { data: any }) {
  return (
    <div className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]">
      <span className="font-bold text-center">{data.clientname}</span>
      <span>{data.taskdate}</span>
      <span>{data.address}</span>
      <span>{formatNumber(data.summa)}</span>
      <span>
        {data.pay ? latinToCyrillic("To'landi") : latinToCyrillic("To'lanmadi")}
      </span>
    </div>
  );
}

export default TadbirCard;
