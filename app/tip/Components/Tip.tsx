"use client";
import React, { useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  Createtips,
  Deletetip,
  Deleteworker,
  Gettips,
  Getworkers,
  SearchWorkerByFIO,
  Updatetips,
  Updateworkers,
} from "@/app/Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import { alertChange } from "@/app/Redux/ShaxsiySlice";

import { extractNmae } from "@/app/Utils";

import { setModalCoctav } from "@/app/Redux/CoctavsSlice";
import { setModalTip } from "@/app/Redux/TipSlice";
import TipTab from "./TipTab";

import TipModal from "./TipModal";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { latinToCyrillic } from "../add/Components/lotin";

function Tips() {
  // Umumiy
  const dispatch = useDispatch();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  // All ranks
  const [allRanks, setAllRanks] = React.useState<any[]>([]);
  const [filteredRanks, setFilteredRanks] = React.useState<any[]>([]);

  const getAllRanks = async () => {
    const res = await Getworkers(JWT, page + 1, rowsPerPage);
    setAllRanks(res.data);
    setFilteredRanks(res.data);
  };

  React.useEffect(() => {
    getAllRanks();
  }, []);

  // Modal
  const open = useSelector((s: any) => s.tip.modal);
  const [value, setValu] = React.useState<any>({});
  const [search, setSearch] = useState("");

  const deleteUnvon = async () => {
    const res = await Deleteworker(JWT, open.id);
    if (res.success) {
      handleClose();
      dispatch(
        alertChange({
          open: true,
          message: open.name + " " + latinToCyrillic("o'chirildi"),
          status: "success",
        })
      );
      getAllRanks();
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

  const deleteAllRanks = () => {
    deleteUnvon();
  };

  const EditUnvon = async (value: any) => {
    const res = await Updateworkers(JWT, value, open.id);
    if (res.success) {
      handleClose();
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("FIO tahrirlandi"),
          status: "success",
        })
      );
      getAllRanks();
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

  React.useEffect(() => {
    setValu({
      FIO: open.FIO,
      zvaniya: open.zvaniya,
    });
  }, [open.open]);

  const handleSubmit = () => {
    if (value.FIO && value.zvaniya) {
      EditUnvon(value);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Malumotlarni to'liq to'ldiring!"),
          status: "warning",
        })
      );
    }
  };

  const handleClose = () => {
    dispatch(setModalTip({ type: 0, open: false, id: 0, name: "" }));
  };
  const searchWorkerByName = async (value: any) => {
    const res = await SearchWorkerByFIO(JWT, value);

    if (!res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    } else {
      setAllRanks(res.data);
      setFilteredRanks(res.data);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(search);

    searchWorkerByName(search);
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredRanks(allRanks);
  };

  const router = useRouter();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    getAllRanks();
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  return (
    <div className="flex gap-4 relative max-w-[95%] mx-auto pt-5 flex-col">
      <div className="flex justify-between items-center">
        <form onSubmit={handleSearch} className="flex items-center">
          <TextField
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            label={latinToCyrillic("FIO orqali qidiring")}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
              endAdornment: search ? (
                <IconButton onClick={clearSearch}>
                  <CloseIcon color="error" />
                </IconButton>
              ) : (
                <IconButton >
                  <PersonSearchIcon color="info" />
                </IconButton>
              ),
            }}
          />
        </form>
        <Button
          sx={{ width: "150px", height: "40px" }}
          onClick={() => router.push("/tip/add")}
          variant="contained"
        >
          {latinToCyrillic("Qo'shish")}
        </Button>
      </div>
      <TipTab
        page={page}
        handleChangePage={handleChangePage}
        handleChangeRowsPerPage={handleChangeRowsPerPage}
        rowsPerPage={rowsPerPage}
        ranks={filteredRanks}
      />
      {open.open ? (
        <TipModal
          handleDelete={deleteAllRanks}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          value={value}
          setValue={setValu}
        />
      ) : null}
    </div>
  );
}

export default Tips;
