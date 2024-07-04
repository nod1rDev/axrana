"use client";
import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
import Status from "./Status";
import Timerr from "./Timer";
function TopshiriqCard({ data, click }: { data: any; click?: boolean }) {
  const router = useRouter();
  const [status, setStatus] = useState<any>();
  const swapDayMonth = (dateString: string): any => {
    if (dateString !== undefined) {
      const [day, month, year] = dateString?.split(".");
      return `${month}.${day}.${year}`;
    } else {
      return new Date();
    }
  };
  useEffect(() => {
    const filtStat = data.bajarilgan
      ? "bajarildi"
      : data.bajarilmagan
      ? "bajarilmagan"
      : data.bajarilmoqda
      ? "bajarilmoqda"
      : "";
  

    setStatus(filtStat);
  }, [data]);
  return (
    <>
      <div
        onClick={() => (click ? router.push("/topshiriq/" + data._id) : null)}
        className="w-full flex   cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]"
      >
        <span className="font-bold text-center">
          {data && data.buyurtmachi}
        </span>
        <span>
          <Timerr date={data && swapDayMonth(data.topshiriqDate)} />
        </span>
        <span>{data && data.address}</span>

        <div className="flex  items-center">
          <Status status={status} />
          {click && <KeyboardArrowRightIcon fontSize="large" color="info" />}
        </div>
      </div>
    </>
  );
}

export default TopshiriqCard;
