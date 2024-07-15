"use client";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
function ShartnomaCard({ data }: { data: any }) {
  const router = useRouter();
  const change = () => {
    router.push("/read/" + data.id);
  };

  return (
    <div
      onClick={change}
      className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]"
    >
      <span className="font-bold text-center">
        {data && data.contractnumber}
      </span>
      <span>{data && data.contractdate}</span>
      <span>{data && data.clientname}</span>
      <span>{data && data.address}</span>
      <div>
        <KeyboardArrowRightIcon fontSize="large" color="info" />
      </div>
    </div>
  );
}

export default ShartnomaCard;
