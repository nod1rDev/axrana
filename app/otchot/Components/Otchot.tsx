"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

import TextField from "@mui/material/TextField";

import { IconButton, TablePagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import {
  filterContract,
  filterOtchot,
  getAllContract,
  getComand,
} from "@/app/Api/Apis";
import OtchotCard from "./OtchotCard";

function Otchot() {
  const [shartnomalar, setShartnomalar] = useState([]);
  const [data, setData] = useState<any>();
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [page, setPage] = React.useState(0);
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState<any>({
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
  }, []);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getAllContractt = async () => {
    const res = await getComand(JWT, page, rowsPerPage);

    setData(res);
    setShartnomalar(res.data);
  };
  useEffect(() => {
    getAllContractt();
  }, []);
  const getSearchData = async () => {
    const res = await filterOtchot(JWT, value);
    setData(res);
    setShartnomalar(res.data);
  };
  const router = useRouter();
  const searchData = () => {
    setSearch(!search);
    if (!search) {
      getSearchData();
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

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  return (
    <div className="w-[80%] flex flex-col mt-6 mx-auto">
      <div className="flex mb-5 justify-end">
        <Button
          onClick={() => router.push("/otchot/add")}
          variant="contained"
          size="large"
        >
          {latinToCyrillic("Qo'shish")}
        </Button>
      </div>
      <div className="flex w-full justify-between mb-10">
        <div className="flex flex-col">
          <h1 className="text-[28px]  font-bold">батальон ҳисобот</h1>
          <span className=" text-slate-400 text-[14px] mt-[-8px]">
            {shartnomalar
              ? `${shartnomalar.length} ${latinToCyrillic(
                  "ta batalyon otchot mavjud"
                )} `
              : latinToCyrillic("batalyon otchot mavjud emas")}
          </span>
        </div>
        <div className="flex flex-col">
          
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
        {shartnomalar && shartnomalar.map((e: any) => <OtchotCard data={e} />)}
      </div>

      <div className="flex justify-end mt-4">
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={shartnomalar.length}
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

export default Otchot;
