"use client";
import React, { useEffect, useState } from "react";
import { TextField, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import {
  deleteWorker,
  getAllBatalyon,
  getAllWorkers,
  searchWorker,
  updateWorker,
} from "@/app/Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

import { alertChange } from "@/app/Redux/ShaxsiySlice";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { setModalCoctav } from "@/app/Redux/CoctavsSlice";
import { setModalTip } from "@/app/Redux/TipSlice";
import TipTab from "./TipTab";

import TipModal from "./TipModal";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { latinToCyrillic } from "../add/Components/lotin";
import MenuBatalyon from "./MenuBatalyon";
import AdminTab from "./AdminTab";

function Tips() {
  // Umumiy
  const admin = useSelector((s: any) => s.auth.admin);
  const dispatch = useDispatch();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(20);
  const [batalyon, setBatalyon] = useState<any>({
    username: "",
    id: 0,
  });
  const batID = useSelector((s: any) => s.tip.batalyon);
  useEffect(() => {
    setBatalyon(batID);
  }, [batID.id]);
  // All ranks
  const [allRanks, setAllRanks] = React.useState<any[]>([]);
  const [filteredRanks, setFilteredRanks] = React.useState<any[]>([]);

  const getAllRanks = async () => {
    if (admin) {
      const res = await getAllWorkers(JWT, batID.id, page, rowsPerPage);
      setAllRanks(res.data);
      setFilteredRanks(res.data);
    } else {
      const res = await getAllWorkers(JWT, null, page, rowsPerPage);

      setAllRanks(res.data);
      setFilteredRanks(res.data);
    }
  };

  React.useEffect(() => {
    getAllRanks();
  }, [batalyon?.id]);

  // Modal
  const open = useSelector((s: any) => s.tip.modal);
  const [value, setValu] = React.useState<any>({});
  const [search, setSearch] = useState("");

  const deleteUnvon = async () => {
    const res = await deleteWorker(JWT, open.id);
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
  const [selector, setSlect] = useState([]);

  const EditUnvon = async (value: any) => {
    const res = await updateWorker(JWT, open.id, value);
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
  function splitFIO(fio: string) {
    const parts = fio?.split(" ");

    return {
      lastname: parts[0],
      firstname: parts[1],
      fatherName: parts[2],
    };
  }
  React.useEffect(() => {
    const { lastname, firstname, fatherName } = splitFIO(open.FIO);
    setValu({
      lastname: lastname,
      firstname: firstname,
      fatherName: fatherName,
      batalyon: open.batalyon,
    });
  }, [open.open]);

  const handleSubmit = () => {
    if (value.firstname) {
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
    dispatch(
      setModalTip({
        type: 0,
        open: false,
        id: 0,
        name: "",
        FIO: "Bekzod Abdullayev Ibrohimovich",
      })
    );
  };
  const searchWorkerByName = async (value: any) => {
    const res = await searchWorker(JWT, value);

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
  

  useEffect(() => {
    console.log(batalyon);
  }, [batalyon]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

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
    getAllRanks();
  };
  const getBatalyons = async () => {
    const res = await getAllBatalyon(JWT);

    setSlect(res.data);
  };

  useEffect(() => {
    getBatalyons();
  }, []);
  const handleSelect = (e: any) => {
    setBatalyon(e.target.value);
  };

  return (
    <>
      {admin ? (
        <>
          <div className="flex gap-4 relative max-w-[95%] mx-auto pt-5 flex-col">
            <div className="">
              <Button
                onClick={() => router.push("/tip/batalyon")}
                color="success"
                variant="contained"
              >
                {latinToCyrillic("Orqaga")}
              </Button>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
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
                        <IconButton>
                          <PersonSearchIcon color="info" />
                        </IconButton>
                      ),
                    }}
                  />
                </form>
              </div>
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
        </>
      ) : (
        <div className="flex gap-4 relative max-w-[95%] mx-auto pt-5 flex-col">
          <div className="flex justify-between items-center">
            <div className="flex gap-4 items-center">
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
                      <IconButton>
                        <PersonSearchIcon color="info" />
                      </IconButton>
                    ),
                  }}
                />
              </form>
            </div>
            <Button
              sx={{ width: "150px", height: "40px" }}
              onClick={() => router.push("/tip/add")}
              variant="contained"
            >
              {latinToCyrillic("Qo'shish")}
            </Button>
          </div>
          <AdminTab
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
      )}
    </>
  );
}

export default Tips;
