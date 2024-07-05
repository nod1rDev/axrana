"use client";
import React from "react";

function TadbirCard({ data }: { data: any }) {
  return (
    <div className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]">
      <span className="font-bold text-center">{data.shartnomaNumber}</span>
      <span>{data.buyurtmachi}</span>
      <span>{data.date}</span>
      <span>{data.address}</span>
      <span>{data.summa}</span>
    </div>
  );
}

export default TadbirCard;
