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
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import {
  deleteData2,
  excel23,
  excelBat,
  exel1,
  filterContract,
  filterContract2,
  getByIdComan2,
  getByIdComan3,
  getByIdComand,
} from "@/app/Api/Apis";
import WorkerAndBatalyon from "./Components/WorkerAndBatalyon";
import Document3 from "./Components/Document3";
import Document4 from "./Components/Document3";
import Document6 from "./Components/Document3";
import Document7 from "./Components/Document3";
import { IconButton, TextField } from "@mui/material";

function page() {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [tasks, setTasks] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [text, setText] = useState<any>();
  const [versiya, setVersiya] = useState(true);
  const getData = async () => {
    const res = await getByIdComan3(JWT, id);

    setText(res.data);
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
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState({
    date1: "",
    date2: "",
  });
  const downloadExcel = async () => {
    try {
      const excelBlob = await excelBat(JWT, data);

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
  const handleChangeValue = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const getSearchData = async () => {
    const res = await filterContract2(JWT, id, value);

    setData(res);
  };
  const searchData = () => {
    setSearch(!search);
    if (!search) {
      getSearchData();
    } else {
      getData();
    }
  };

  function formatDateToDDMMYYYY(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // getMonth() 0-indexed
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  useEffect(() => {
    const date = new Date();
    const filtDate = formatDateToDDMMYYYY(date);
    setValue({ date1: filtDate, date2: filtDate });
  }, []);
  return (
    <>
      {data && (
        <>
          <div className=" hidden">
            <Document7 data={data} text={text} ref={componentRef} />
          </div>
          <div className="w-[95%] mt-5 flex-col  gap-6 mx-auto">
            <div className="mb-6 flex justify-between w-full">
              <Button
                startIcon={<ArrowBackIcon />}
                color="info"
                variant="contained"
                onClick={() => router.back()}
              >
                {"орқага"}
              </Button>
            </div>
            <div className="rounded-lg w-full mb-5 bg-[#f4f3ee] px-6 py-4 flex justify-between items-center">
              <h1 className="text-[24px] font-bold">
                {" "}
                {latinToCyrillic("Bataly'on shartnomalar kesimida")}
              </h1>
              <div className="flex gap-3">
                <div className="flex  items-center gap-4 mr-10">
                  <TextField
                    id="date1"
                    label={latinToCyrillic("Sana 1")}
                    sx={{ width: "200px" }}
                    onChange={handleChangeValue}
                    variant="outlined"
                    value={value.date1}
                    name="date1"
                    autoComplete="off"
                  />

                  <TextField
                    id="date2"
                    label={latinToCyrillic("Sana 2")}
                    sx={{ width: "200px" }}
                    onChange={handleChangeValue}
                    variant="outlined"
                    value={value.date2}
                    name="date2"
                    autoComplete="off"
                  />

                  {search ? (
                    <IconButton
                      size="large"
                      sx={{ width: "60px", height: "60px" }}
                      aria-label="delete"
                      onClick={searchData}
                    >
                      <CloseIcon fontSize="inherit" color="error" />
                    </IconButton>
                  ) : (
                    <IconButton
                      size="large"
                      sx={{ width: "60px", height: "60px" }}
                      aria-label="delete"
                      onClick={searchData}
                    >
                      <SearchIcon fontSize="inherit" color="info" />
                    </IconButton>
                  )}
                </div>
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
              <div className="w-[95%] mx-auto flex gap-10 flex-col">
                <WorkerAndBatalyon data={data} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default page;
