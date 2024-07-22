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
  filterOtchot2,
  getAllContract,
  getComand,
  getComand2,
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
    const res = await getComand2(JWT, page, rowsPerPage);

    setData(res);
    setShartnomalar(res.data);
  };
  useEffect(() => {
    getAllContractt();
  }, []);
  const getSearchData = async () => {
    const res = await filterOtchot2(JWT, value);
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

  return <div></div>;
}

export default Otchot;
