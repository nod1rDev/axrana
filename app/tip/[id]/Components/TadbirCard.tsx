"use client";
import React from "react";
import { latinToCyrillic } from "../../add/Components/lotin";

function TadbirCard({ data }: { data: any }) {
  return (
    <div className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]">
      <span className="font-bold text-center">{data.clientname}</span>
      <span>{data.taskdate}</span>
      <span>{data.address}</span>
      <span>{data.summa}</span>
      <span>
        {data.ispay
          ? latinToCyrillic("To'landi")
          : latinToCyrillic("To'lanmadi")}
      </span>
    </div>
  );
}

export default TadbirCard;
