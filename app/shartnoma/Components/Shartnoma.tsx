"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import ShartnomaCard from "./ShartnomaCard";
import TextField from "@mui/material/TextField";
import { GetAllShartnoma, SearchShartnoma } from "@/app/Api/Apis";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
function Shartnoma() {
  const [shartnomalar, setShartnomalar] = useState([]);
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
  const getAllContract = async () => {
    const res = await GetAllShartnoma(JWT);
    console.log(res);

    setShartnomalar(res.data);
  };
  useEffect(() => {
    getAllContract();
  }, []);
  const getSearchData = async () => {
    const res = await SearchShartnoma(JWT, value);

    setShartnomalar(res.data);
  };
  const router = useRouter();
  const searchData = () => {
    setSearch(!search);
    if (!search) {
      getSearchData();
    } else {
      getAllContract();
    }
  };

  const handleChangeValue = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <div className="w-[70%] mt-6 mx-auto">
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
        <div className="flex flex-col">
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
        <div className="flex flex-col">
          <div className="flex justify-end text-[28px]  font-bold">
            {latinToCyrillic("Filter")}
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
    </div>
  );
}

export default Shartnoma;
