"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useReactToPrint } from "react-to-print";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import { getByIdComan2, getByIdComand } from "@/app/Api/Apis";
import WorkerAndBatalyon from "./Components/WorkerAndBatalyon";
import Document3 from "./Components/Document3";
import Document4 from "./Components/Document3";

function page() {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [tasks, setTasks] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [versiya, setVersiya] = useState(true);
  const getData = async () => {
    const res = await getByIdComan2(JWT, id);

    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  const dispatch = useDispatch();

  const router = useRouter();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: (): any => componentRef.current,
  });

  return (
    <>
      {data && (
        <>
          <div className=" hidden">
            <Document4 data={data} ref={componentRef} />
          </div>
          <div className="w-[95%] mt-5 flex-col  gap-6 mx-auto">
            <div className="mb-6">
              <Button
                startIcon={<ArrowBackIcon />}
                color="info"
                variant="contained"
                onClick={() => router.push("/maxsus")}
              >
                {"орқага"}
              </Button>
            </div>
            <div className="rounded-lg w-full mb-5 bg-[#f4f3ee] px-6 py-4 flex justify-between items-center">
              <h1 className="text-[24px] font-bold">
                {latinToCyrillic("Maxsus batalyon")}
              </h1>
              <div className="flex gap-3">
                <Button
                  onClick={handlePrint}
                  color="success"
                  startIcon={<LocalPrintshopIcon />}
                  variant="contained"
                >
                  {latinToCyrillic("Chop etish")}
                </Button>
              </div>
            </div>

            <div className="container rounded-lg  bg-[#f4f3ee] px-6 py-4 mx-auto p-4  flex flex-col">
              <h1 className="font-bold text-[20px] mx-auto my-10">
                {latinToCyrillic("Maxsus Batalyon")}
              </h1>
              <div className="w-[95%] mx-auto flex gap-10 flex-col">
                {data && data.map((e: any) => <WorkerAndBatalyon data={e} />)}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default page;
