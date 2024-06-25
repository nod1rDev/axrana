"use client";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
function ShartnomaCard({ data }: { data: any }) {
const router = useRouter()

  return (
    <div onClick={()=>router.push("/shartnoma/"+ data && data._id)} className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]">
      <span className="font-bold text-center">{data && data.contractNumber}</span>
      <span>{data && data.contractTurnOffDate}</span>
      <span>{data && data.boss}</span>
      <span className="font-bold flex justify-end">{data && data.contractSumma}</span>
      <div>
        <KeyboardArrowRightIcon fontSize="large" color="info" />
      </div>
    </div>
  );
}

export default ShartnomaCard;
