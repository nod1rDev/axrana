"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { filterTasks, getAllTasks, searchTasks } from "@/app/Api/Apis";
import { IconButton, TablePagination } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import TopshiriqCard from "./TopshiriqCard";

function Topshiriq() {
  const [data, setData] = useState<any>([]);
  const [data2, setData2] = useState<any>();
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState<any>({
    date1: "",
    date2: "",
  });

  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const [page, setPage] = React.useState(0);
  const JWT = useSelector((s: any) => s.auth.JWT);

  const getTopshiriqApi = async () => {
    const res = await getAllTasks(JWT, page + 1, rowsPerPage);
    setData2(res);
    setData(res.data);
  };
  const reload = useSelector((s: any) => s.auth.relaod);
  useEffect(() => {
    getTopshiriqApi();
  }, [page, rowsPerPage, reload]);
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
    getTopshiriqApi();
  }, []);

  const getSearchData = async () => {
    const res = await searchTasks(JWT, value);
    setData(res.data);
  };

  const searchData = () => {
    setSearch(!search);
    if (!search) {
      getSearchData();
    } else {
      getTopshiriqApi();
    }
  };

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const getByStatus = async (value: any) => {
    const res = await filterTasks(JWT, value);

    setData(res.data);
  };
  const handleStatus = (e: any) => {
    setSearch(true);

    getByStatus(e.target.value);
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
    <div className="w-[95%] mt-6 mx-auto">
      <div className="flex w-full justify-between mb-10">
        <div className="flex flex-col">
          <h1 className="text-[28px]  font-bold">
            {latinToCyrillic("Topshiriqlar")}
          </h1>
          <span className=" text-slate-400 text-[14px] mt-[-8px]">
            {latinToCyrillic(data.length + " ta topshiriq mavjud")}
          </span>
        </div>
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
                <MenuItem value={"done"}>
                  {latinToCyrillic("Bajarilgan")}
                </MenuItem>
                <MenuItem value={"inProgress"}>
                  {" "}
                  {latinToCyrillic("Bajarilmoqda")}{" "}
                </MenuItem>
                <MenuItem value={"notDone"}>
                  {latinToCyrillic("Bajarilmagan")}{" "}
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
      <div className="flex flex-col gap-4">
        <div className="w-full flex cursor-pointer px-8 py-6 bg-[#1976D2] text-white rounded-2xl justify-between items-center hover:border hover:border-[#0096c7]">
          <span className="font-bold text-left w-[150px] overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Shartnoma Raqami")}
          </span>
          <span className="font-bold text-left w-[200px] ">
            {latinToCyrillic("Буюртмачи номи")}
          </span>
          <span
            className={`font-bold w-[240px] text-right  overflow-hidden text-ellipsis whitespace-nowrap `}
          >
            {latinToCyrillic("Topshiriq sanasi")}
          </span>

          <span className="w-[260px] text-right  overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Xodimlar soni")}
          </span>

          <span className="w-[180px] text-right  overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Topshiriq vaqti")}
          </span>
          <span className="w-[130px]  text-right overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Time limit")}
          </span>
          <span className="w-[300px]   overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Manzili")}
          </span>

          <div className="flex items-center ">{latinToCyrillic("Status")}</div>
        </div>
        {data &&
          data.map((e: any) => (
            <TopshiriqCard key={e.id} click={true} data={e} />
          ))}
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 20, 50, 100]}
        component="div"
        count={data2 ? data2.count : 0}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage={latinToCyrillic("Qatorlar")}
      />
    </div>
  );
}

export default Topshiriq;
