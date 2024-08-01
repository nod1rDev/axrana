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
import {
  deleteData2,
  excel23,
  exel1,
  getByIdComan2,
  getByIdComand,
} from "@/app/Api/Apis";
import WorkerAndBatalyon from "./Components/WorkerAndBatalyon";
import Document3 from "./Components/Document3";
import Document4 from "./Components/Document3";
import Document6 from "./Components/Document3";

function page() {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [tasks, setTasks] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [text, setText] = useState<any>();
  const [versiya, setVersiya] = useState(true);
  const getData = async () => {
    const res = await getByIdComan2(JWT, id);
    console.log(res);

    setText(res.commandDate[0]);
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
  const deleteData = async () => {
    const res = await deleteData2(JWT, id);
    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Otchot ochirlidi"),
          status: "success",
        })
      );
      router.push("/maxsus");
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    }
  };
  const downloadExcel = async () => {
    try {
      const excelBlob = await excel23(JWT, id);

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
  return (
    <>
      {data && (
        <>
          <div className=" hidden">
            <Document6 data={data} text={text} ref={componentRef} />
          </div>
          <div className="w-[95%] mt-5 flex-col  gap-6 mx-auto">
            <div className="mb-6 flex justify-between w-full">
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
              <h1 className="text-[24px] font-bold"> Бригада ҳисобот</h1>
              <div className="flex gap-3">
                <Button
                  onClick={deleteData}
                  color="error"
                  startIcon={<DeleteIcon />}
                  variant="contained"
                >
                  {latinToCyrillic("O'chirish")}
                </Button>
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

            <div className="container rounded-lg  bg-[#f4f3ee] px-6 py-4 mx-auto p-4  flex flex-col">
              <div className="w-[90%] mb-20 flex flex-col font-bold gap-1 mx-auto text-2xl">
                <div className="text-center">
                  {text?.date1 + " "}
                  {latinToCyrillic("kunidan")}

                  {" " + text?.date2 + " "}

                  {latinToCyrillic(
                    "kuniga qadar omaviy tadbirlar jamoat tartibini saqlashda ishtirok etgan harbiylar xizmatchilar"
                  )}
                </div>
                <div className="w-full text-center">
                  {latinToCyrillic("RO'YHATI")}
                </div>
              </div>
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
