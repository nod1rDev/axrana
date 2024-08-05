"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import ShartnomaCard from "./ShartnomaCard";
import TextField from "@mui/material/TextField";

import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TablePagination,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  filterContract,
  getAllContract,
  getExcelContract3,
  searchByAddress1,
  searchByClintName1,
  searchByNumber1,
} from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";

function Shartnoma() {
  const [shartnomalar, setShartnomalar] = useState([]);
  const [data, setData] = useState<any>();
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = useState(false);
  const [value2, setValue2] = useState("");
  const [serarchTip, setSearchTip] = useState(1);
  const [value, setValue] = useState<any>({
    date1: "",
    date: "",
  });
  const [value3, setValue3] = useState<any>({
    date1: "",
    date: "",
  });
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
    setValue3({ date1: filtDate, date2: filtDate });
  }, []);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getAllContractt = async () => {
    const res = await getAllContract(JWT, page + 1, rowsPerPage);

    setData(res);
    setShartnomalar(res.data);
  };
  useEffect(() => {
    getAllContractt();
  }, []);
  const getSearchData = async () => {
    const res = await filterContract(JWT, value);
    setData(res);
    setShartnomalar(res.data);
  };
  const router = useRouter();
  const getData2 = async () => {
    if (serarchTip == 1) {
      const res = await searchByNumber1(JWT, value2);
      setData(res);
      setShartnomalar(res.data);
    } else if (serarchTip == 2) {
      const res = await searchByClintName1(JWT, value2);
      setData(res);
      setShartnomalar(res.data);
    } else {
      const res = await searchByAddress1(JWT, value2);
      setData(res);
      setShartnomalar(res.data);
    }
  };
  const searchData = () => {
    setSearch(!search);
    if (!search) {
      if (value2) {
        getData2();
      } else {
        getSearchData();
      }
    } else {
      getAllContractt();
    }
  };
  useEffect(() => {
    getAllContractt();
  }, [page, rowsPerPage]);
  const handleChangeValue = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleChangeValue3 = (e: any) => {
    setValue3({ ...value, [e.target.name]: e.target.value });
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };
  const dispatch = useDispatch();
  const downloadExcel = async () => {
    try {
      const response = await getExcelContract3(JWT, value3);

      if (response.status === 200) {
        const excelBlob = await response.blob(); // Javobni blob formatida olish

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
            status: "success",
          })
        );
      } else {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic("Excel faylini yuklashda xatolik"),
            status: "error",
          })
        );
      }
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
  const handleSubmit3 = () => {
    downloadExcel();
  };

  return (
    <div className="w-[95%] flex flex-col mt-6 mx-auto">
      <div className="flex mb-5 justify-end">
        <Button
          onClick={() => router.push("/shartnoma/add")}
          variant="contained"
          size="large"
        >
          {latinToCyrillic("Qo'shish")}
        </Button>
      </div>
      <div className="flex w-full justify-between mb-10">
        <div className="flex flex-col gap-4">
          <div className="flex-col">
            <h1 className="text-[28px]  font-bold">
              {latinToCyrillic("Shartnomalar")}
            </h1>
            <span className=" text-slate-400 text-[14px] mt-[-8px]">
              {shartnomalar
                ? `${shartnomalar.length} ${latinToCyrillic(
                    "ta shartnoma mavjud"
                  )} `
                : latinToCyrillic("Shartnoma mavjud emas")}
            </span>
          </div>
          <div className="flex  items-center gap-4">
            <TextField
              id="date1"
              label={latinToCyrillic("Sana 1")}
              sx={{ width: "200px" }}
              onChange={handleChangeValue3}
              variant="outlined"
              value={value3.date1}
              name="date1"
              autoComplete="off"
            />

            <TextField
              id="date2"
              label={latinToCyrillic("Sana 2")}
              sx={{ width: "200px" }}
              onChange={handleChangeValue3}
              variant="outlined"
              value={value3.date2}
              name="date2"
              autoComplete="off"
            />
            <Button variant="contained" onClick={downloadExcel}>
              вақт оралиғидаги шартномалар
            </Button>
          </div>
        </div>
        <div className="flex gap-10  ">
          <div className="flex gap-2 items-center">
            <TextField
              id="date1"
              label={latinToCyrillic("Qidiring")}
              sx={{ width: "200px" }}
              onChange={(e: any) => setValue2(e.target.value)}
              variant="outlined"
              value={value2}
              autoComplete="off"
            />
            <FormControl sx={{ width: "200px" }}>
              <InputLabel id="demo-simple-select-label">
                {latinToCyrillic("Filter turi")}
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={serarchTip}
                label={latinToCyrillic("Filter turi")}
                onChange={(e: any) => setSearchTip(e.target.value)}
              >
                <MenuItem value={1}>
                  {latinToCyrillic("Shartnoma raqami")}
                </MenuItem>
                <MenuItem value={2}>{latinToCyrillic("Klint ismi")}</MenuItem>
                <MenuItem value={3}>{latinToCyrillic("Manzil")}</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex  items-center gap-4">
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
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {shartnomalar &&
          shartnomalar.map((e: any) => <ShartnomaCard data={e} />)}
      </div>

      <div className="flex justify-end mt-4">
        <TablePagination
          rowsPerPageOptions={[5, 10, 20, 50, 100]}
          component="div"
          count={data?.count ? data.count : 0}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          labelRowsPerPage={latinToCyrillic("Qatorlar")}
        />
      </div>
    </div>
  );
}

export default Shartnoma;
