"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useReactToPrint } from "react-to-print";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import {
  deleteData2,
  getBatalyonUmumiyData,
  getBatalyonUmumiySearch,
  getByIdComan2,
  getByIdComand,
  getExcelWorker2,
  getExcelWorker3,
  searchByDateUmumiy,
  searchByDateUmumiy2,
} from "@/app/Api/Apis";
import WorkerAndBatalyon from "./Components/WorkerAndBatalyon";
import Document3 from "./Components/Document3";
import Document4 from "./Components/Document3";
import WorkerTab from "./Components/WorkerTab";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import WorkerTab2 from "./Components/WorkerTab2";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
function page() {
  const { id } = useParams();
  const [data, setData] = useState<any>();
  const [tasks, setTasks] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [text, setText] = useState<any>();
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState(false);
  const [searchStatus, setSearchStatus] = useState(false);
  const [value, setValue] = useState<any>({
    date1: "",
    date2: "",
  });
  const getData = async () => {
    const res = await getBatalyonUmumiyData(JWT, id);

    setText(res.data.batalyonName);
    setData(res);
    setSearchStatus(false);
  };

  useEffect(() => {
    getData();
  }, []);

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
    getData();
  }, []);

  const getSearchData = async () => {
    const res = await searchByDateUmumiy(JWT, id, value);
    setData(res);
    setSearchStatus(false);
  };
  const getSearchDataAndStatus = async () => {
    const res = await searchByDateUmumiy2(JWT, id, value, status);
    setData(res);
    setSearchStatus(true);
  };

  const searchData = () => {
    setSearch(!search);
    if (!search) {
      if (!status) {
        getSearchData();
      } else {
        getSearchDataAndStatus();
      }
    } else {
      getData();
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const getByStatus = async (value: any) => {
    const res = await getBatalyonUmumiySearch(JWT, id, value);
    setSearchStatus(true);
    setData(res);
  };
  const router = useRouter();
  const handleStatus = (e: any) => {
    setSearch(true);
    setStatus(e.target.value);
    getByStatus(e.target.value);
  };
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: (): any => componentRef.current,
  });
  const dispatch = useDispatch();
  const downloadExcel = async () => {
    try {
      const excelBlob = await getExcelWorker3(JWT, id);

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
      <div className=" hidden">
        <Document4 data={data} searchStatus={searchStatus} ref={componentRef} />
      </div>
      {data && (
        <>
          <div className="w-[95%] mt-5 flex-col  gap-6 mx-auto">
            <div className="mb-6 justify-between flex w-full">
              <Button
                startIcon={<ArrowBackIcon />}
                color="info"
                variant="contained"
                onClick={() => router.back()}
              >
                {"орқага"}
              </Button>
              <div className="flex gap-3">
                <Button
                  onClick={handlePrint}
                  color="success"
                  startIcon={<LocalPrintshopIcon />}
                  variant="contained"
                >
                  {latinToCyrillic("Chop etish")}
                </Button>
                <Button
                  onClick={downloadExcel}
                  startIcon={<CloudDownloadIcon />}
                  variant="contained"
                  color="success"
                >
                  {"Excel"}
                </Button>
              </div>
            </div>
            <div className="rounded-lg w-full mb-5  px-6 py-4 flex justify-between items-center">
              <h1 className="text-[24px] font-bold">Бригада умумий ҳисобот</h1>
              <div className="flex flex-col">
                <div className="flex items-center gap-4">
                  <FormControl sx={{ width: "200px" }}>
                    <InputLabel id="demo-simple-select-label">
                      {latinToCyrillic("Status")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      label={latinToCyrillic("Status")}
                      onChange={handleStatus}
                    >
                      <MenuItem value={"pay"}>
                        {latinToCyrillic("To'langan")}
                      </MenuItem>
                      <MenuItem value={"notPay"}>
                        {latinToCyrillic("To'lanmagan")}
                      </MenuItem>
                    </Select>
                  </FormControl>
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
                      aria-label="search"
                      onClick={searchData}
                    >
                      <SearchIcon fontSize="inherit" color="info" />
                    </IconButton>
                  )}
                </div>
              </div>
            </div>

            <div className="container rounded-lg  bg-[#f4f3ee] px-6 py-4 mx-auto p-4  flex flex-col">
              <div className="w-[95%] mx-auto flex gap-10 flex-col">
                <div className="w-full">
                  <h1 className={`w-full text-center   text-lg `}>
                    {data.data.batalyonName +
                      " " +
                      latinToCyrillic("harbiy qisim")}
                  </h1>
                  <div className="my-4">
                    {searchStatus ? (
                      <WorkerTab2
                        here={true}
                        data={data.data}
                        summa={data.summa}
                      />
                    ) : (
                      <WorkerTab here={true} data={data.data} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default page;
