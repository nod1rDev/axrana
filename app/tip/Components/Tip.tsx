"use client";
import React, { useEffect, useState } from "react";
import { TextField, IconButton, Button } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import {
  deleteWorker,
  getAllBatalyon,
  getAllWorkers,
  getExcelWorker1,
  searchWorker,
  updateWorker,
} from "@/app/Api/Apis";
import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { useSelector, useDispatch } from "react-redux";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { setModalTip } from "@/app/Redux/TipSlice";
import TipTab from "./TipTab";
import TipModal from "./TipModal";
import { useRouter } from "next/navigation";
import { latinToCyrillic } from "../add/Components/lotin";
import AdminTab from "./AdminTab";
 
function Tip() {
  // Umumiy
  const admin = useSelector((s: any) => s.auth.admin);
  const dispatch = useDispatch();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(20);
  const [batalyon, setBatalyon] = useState<any>({ username: "", id: 0 });
  const batID = useSelector((s: any) => s.tip.batalyon);
  const [allRanks, setAllRanks] = useState<any[]>([]);
  const [filteredRanks, setFilteredRanks] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [selector, setSelector] = useState([]);
  const open = useSelector((s: any) => s.tip.modal);
  const [value, setValue] = useState<any>({});
  const [change, setChange] = useState(1);
  const router = useRouter();

  useEffect(() => {
    setBatalyon(batID);
  }, [batID.id]);

  const getAllRanks = async () => {
    try {
      if (admin) {
        const idd = sessionStorage.getItem("batalyonId");
        const res = await getAllWorkers(JWT, idd, page, rowsPerPage);
        setAllRanks(res.data);
        setFilteredRanks(res.data);
      } else {
        const res = await getAllWorkers(JWT, null, page, rowsPerPage);
        setAllRanks(res.data);
        setFilteredRanks(res.data);
      }
    } catch (error) {
      console.error("Failed to fetch ranks:", error);
    }
  };

  useEffect(() => {
    const handleReload = () => {
      const [navigationEntry] = window.performance.getEntriesByType(
        "navigation"
      ) as PerformanceNavigationTiming[];
      if (navigationEntry.type === "reload") {
        getAllRanks();
      }
    };

    handleReload();
    getAllRanks();
  }, [batalyon?.id, page, rowsPerPage]);
  useEffect(() => {
    getAllRanks();
  }, [batalyon?.id, page, rowsPerPage, change]);

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

  useEffect(() => {
    const { lastname, firstname, fatherName } = splitFIO(open.FIO);
    setValue({
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    searchWorkerByName(search);
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredRanks(allRanks);
  };

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
    setSelector(res.data);
  };

  useEffect(() => {
    getBatalyons();
  }, []);

  const handleSelect = (e: any) => {
    setBatalyon(e.target.value);
  };

  const downloadExcel = async () => {
    try {
      const excelBlob = await getExcelWorker1(JWT);

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
      {admin ? (
        <div className="flex gap-4 relative max-w-[95%] mx-auto pt-5 flex-col">
          <div className="flex justify-between">
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
              setValue={setValue}
            />
          ) : null}
        </div>
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
              setValue={setValue}
            />
          ) : null}
        </div>
      )}
    </>
  );
}

export default Tip;
