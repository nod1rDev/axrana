"use client";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

function ShartnomaCard({ data }: { data: any }) {
  console.log(data);

  return (
    <div className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]">
      <span>{data && data.contractNumber}</span>
      <div>
        <KeyboardArrowRightIcon fontSize="large" color="info" />
      </div>
    </div>
  );
}

export default ShartnomaCard;
