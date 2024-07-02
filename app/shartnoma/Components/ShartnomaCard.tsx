"use client";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
function ShartnomaCard({ data }: { data: any }) {
  const router = useRouter();


  return (
    <div
      onClick={() => router.push("/shartnoma/read/" + data && data._id)}
      className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]"
    >
      <span className="font-bold text-center">
        {data && data.shartnomaNumber}
      </span>
      <span>{data && data.date}</span>
      <span>{data && data.buyurtmachi}</span>

      <div>
        <KeyboardArrowRightIcon fontSize="large" color="info" />
      </div>
    </div>
  );
}

export default ShartnomaCard;
