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
      className="w-full flex cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center hover:border hover:border-[#0096c7]"
    >
      <span className="font-bold text-left w-[100px] ">
        {data && data.contractnumber}
      </span>
      <span className="w-[200px] overflow-hidden  text-ellipsis whitespace-nowrap">
        {data && data.contractdate}
      </span>
      <span className="w-[400px] overflow-hidden text-ellipsis whitespace-nowrap">
        {data && data.clientname}
      </span>
      <span className="w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
        {data && data.address}
      </span>
      <div>
        <KeyboardArrowRightIcon fontSize="large" color="info" />
      </div>
    </div>
  );
}

export default ShartnomaCard;
