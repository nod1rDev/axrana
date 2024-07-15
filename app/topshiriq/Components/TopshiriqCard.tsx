"use client";
import React, { useEffect, useState } from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/navigation";
import Status from "./Status";
import { useSelector, useDispatch } from "react-redux";

import { setModalShowWorker } from "@/app/Redux/LavozimSlice";
import { Button } from "@mui/material";
import ShowWorkerModal from "@/app/[id]/ShowWorkerModal";
import { getWorkersForTask } from "@/app/Api/Apis";
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
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [workers, setWorkers] = useState([]);
  const GEtworkers = async () => {
    const res = await getWorkersForTask(JWT, data.id);

    if (res.success) {
      setWorkers(res.data);
      dispatch(setModalShowWorker({ open: true }));
    }
  };

  useEffect(() => {
    const filtStat = data.done
      ? "bajarildi"
      : data.notdone
      ? "bajarilmagan"
      : data.inprogress
      ? "bajarilmoqda"
      : "";

    setStatus(filtStat);
  }, [data]);
  const dispatch = useDispatch();
  const hadleClose = () => {
    dispatch(setModalShowWorker({ open: false }));
  };


  return (
    <>
      <div
        onClick={() => (click ? router.push("/topshiriq/" + data.id) : null)}
        className="w-full flex   cursor-pointer px-8 py-6 bg-[#f1faee] rounded-2xl justify-between items-center  hover:border hover:border-[#0096c7]"
      >
        <span className="font-bold text-center">{data && data.clientname}</span>
        <span
          className={`font-bold ${
            status == "bajarilmoqda" || status == "bajarilmagan"
              ? "text-red-500"
              : ""
          }`}
        >
          {data && data.taskdate}
        </span>
        {!click ? (
          <Button onClick={GEtworkers} variant="contained" color="info">
            {data && data.workernumber}
          </Button>
        ) : (
          <span>{data && data.workernumber}</span>
        )}

        <span>{data && data.address}</span>

        <div className="flex  items-center">
          <Status status={status} />
          {click && <KeyboardArrowRightIcon fontSize="large" color="info" />}
        </div>
      </div>
      <ShowWorkerModal ranks={workers} handleClose={hadleClose} />
    </>
  );
}

export default TopshiriqCard;
