"use client";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
import Status from "./Status";
import Timerr from "./Timer";
function TopshiriqCard({ data }: { data: any }) {
  const router = useRouter();
  const swapDayMonth = (dateString: string): string => {
    const [day, month, year] = dateString.split(".");
    return `${month}.${day}.${year}`;
  };

  return (
    <>
      <div className="w-full flex  cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]">
        <span className="font-bold text-center">
          {data && data.buyurtmachi}
        </span>
        <span>
          <Timerr date={data && swapDayMonth(data.topshiriqDate)} />
        </span>
        <span>{data && data.address}</span>

        <div className="flex  items-center">
          <Status pinding />
          <KeyboardArrowRightIcon fontSize="large" color="info" />
        </div>
      </div>
    </>
  );
}

export default TopshiriqCard;
