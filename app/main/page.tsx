"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useReactToPrint } from "react-to-print";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import { excel2, exel1, getByIdComand, getExcel } from "@/app/Api/Apis";
import MaiTab from "./Components/MainTab";
import Document5 from "./Components/Document5";

function page() {
  const [data, setData] = useState<any>([]);
  const [tasks, setTasks] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [versiya, setVersiya] = useState(true);
  const getData = async () => {
    const res = await getExcel(JWT);

    setTasks(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const dispatch = useDispatch();
  const downloadExcel = async () => {
    try {
      const excelBlob = await excel2(JWT);

      // URL yaratish
      const url = window.URL.createObjectURL(excelBlob);

      // <a> elementi yaratish va yuklab olishni amalga oshirish
      const a = document.createElement("a");
      a.href = url;
      a.download = "excel_file.xlsx"; // Yuklab olinadigan fayl nomi
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Excel file yuklandi"),
          status: "sucess",
        })
      );
    } catch (error) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Excel faylini yuklashda xatolik"),
          status: "error",
        })
      );
    }
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: (): any => componentRef.current,
  });
  return (
    <>
      <div className=" hidden">
        <Document5 data={tasks} ref={componentRef} />
      </div>
      {data && (
        <>
          <div className="w-[95%] mt-5 flex-col  gap-6 mx-auto">
            <div className="rounded-lg w-full mb-5 bg-[#f4f3ee] px-6 py-4 flex justify-between items-center">
              <h1 className="text-[24px] font-bold">батальон умумий ҳисобот</h1>
              <div className="flex justify-between gap-3">
                <Button
                  onClick={downloadExcel}
                  startIcon={<CloudDownloadIcon />}
                  variant="contained"
                >
                  {"Excel"}
                </Button>
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

            <div className="container w-full rounded-lg  bg-[#f4f3ee] px-6 py-4 mx-auto   flex flex-col">
              <h1 className="font-bold my-6 text-center text-[18px]">
                {latinToCyrillic("RO'YHAT")}
              </h1>
              <div className="w-[95%] mx-auto flex gap-10 flex-col">
                <MaiTab data={tasks} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default page;
