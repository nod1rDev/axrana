"use client";
import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { getAllTasks, getAllWorkers, pushWorkers } from "@/app/Api/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TopshiriqCard from "../Components/TopshiriqCard";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { setModalN1 } from "@/app/Redux/CoctavsSlice";
import ModalN1 from "./Components/pastki";
import PermDeviceInformationIcon from '@mui/icons-material/PermDeviceInformation';
interface Worker {
  FIO: string;
  selected: boolean;
  tasktime: string;
  taskdate: string;
  _id: string;
}

interface Task {
  id: string;
  inprogress: boolean;
}

// Debounce funksiyasini yaratish
const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func(...args);
    }, delay);
  };
};

const Page: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [data, setData] = useState<Task | null>(null);
  const [workers, setWorkers] = useState<Worker[]>([]);
  const [filteredWorkers, setFilteredWorkers] = useState<Worker[]>([]);
  const [search, setSearch] = useState<string>("");
  const JWT = useSelector((state: any) => state.auth.JWT);

  const getData = async () => {
    const res = await getAllTasks(JWT);
    const single = res.data.find((e: any) => e.id === id);
    setData(single);
  };

  const getWorkers = async () => {
    const res = await getAllWorkers(JWT, null, 1, 100);
    const filData = res.data.map((e: any) => ({
      FIO: e.fio,
      selected: false,
      tasktime: "",
      taskdate: "",
      _id: e.id,
    }));
    setWorkers(filData);
    setFilteredWorkers(filData);
  };

  useEffect(() => {
    getData();
    getWorkers();
  }, []);

  const handleToggle = useCallback((id: string) => {
    setWorkers((prevWorkers) =>
      prevWorkers.map((worker) =>
        worker._id === id ? { ...worker, selected: !worker.selected } : worker
      )
    );
    setFilteredWorkers((prevFiltered) =>
      prevFiltered.map((worker) =>
        worker._id === id ? { ...worker, selected: !worker.selected } : worker
      )
    );
  }, []);

  const debouncedHandleTaskTimeChange = useCallback(
    debounce((id: string, value: string) => {
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) =>
          worker._id === id ? { ...worker, tasktime: value } : worker
        )
      );
      setFilteredWorkers((prevFiltered) =>
        prevFiltered.map((worker) =>
          worker._id === id ? { ...worker, tasktime: value } : worker
        )
      );
    }, 0.1),
    []
  );

  const debouncedHandleTaskDateChange = useCallback(
    debounce((id: string, value: string) => {
      setWorkers((prevWorkers) =>
        prevWorkers.map((worker) =>
          worker._id === id ? { ...worker, taskdate: value } : worker
        )
      );
      setFilteredWorkers((prevFiltered) =>
        prevFiltered.map((worker) =>
          worker._id === id ? { ...worker, taskdate: value } : worker
        )
      );
    }, 0.1),
    []
  );

  const handleTaskTimeChange = (id: string, value: string) => {
    debouncedHandleTaskTimeChange(id, value);
  };

  const handleTaskDateChange = (id: string, value: string) => {
    debouncedHandleTaskDateChange(id, value);
  };

  const dispatch = useDispatch();
  const router = useRouter();

  const createWorker = async (value: any) => {
    const res = await pushWorkers(JWT, id, value);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Xodimlar qo'shildi"),
          status: "success",
        })
      );
      router.push("/topshiriq");
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

  const handleSubmit = () => {
    const FiltWorker = workers.filter((e) => e.selected);
    const pureWorker = FiltWorker.map((e) => {
      return { fio: e.FIO, taskdate: e.taskdate, tasktime: +e.tasktime };
    });

    if (pureWorker.length > 0) {
      createWorker(pureWorker);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Hodim tanlang!"),
          status: "warning",
        })
      );
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = workers.filter((worker) =>
      worker.FIO.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredWorkers(filtered);
  };

  const clearSearch = () => {
    setSearch("");
    setFilteredWorkers(workers);
  };

  const memoizedFilteredWorkers = useMemo(
    () => filteredWorkers,
    [filteredWorkers]
  );

  return (
    <div className="w-[80%] mt-5 flex-col gap-6 mx-auto">
      <div className="mb-6 flex justify-between w-full items-center">
        <Button
          startIcon={<ArrowBackIcon />}
          color="info"
          variant="contained"
          onClick={() => router.push("/topshiriq")}
        >
          {"орқага"}
        </Button>
        
      </div>
      <div className="mb-6 flex-col gap-4">
        <div className="w-full flex cursor-pointer mb-4 px-8 py-6 bg-[#1976D2] text-white rounded-2xl justify-between items-center hover:border hover:border-[#0096c7]">
          <span className="font-bold text-left w-[180px] overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Shartnoma Raqami")}
          </span>
          <span className="font-bold text-left w-[220px] ">
            {latinToCyrillic("Буюртмачи номи")}
          </span>
          <span
            className={`font-bold w-[200px] text-center overflow-hidden text-ellipsis whitespace-nowrap ${
              status === "bajarilmoqda" || status === "bajarilmagan"
                ? "text-red-500"
                : ""
            }`}
          >
            {latinToCyrillic("Topshiriq sanasi")}
          </span>

          <span className="w-[140px] text-center overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Xodimlar soni")}
          </span>

          <span className="w-[150px] text-center overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Topshiriq vaqti")}
          </span>
          <span className="w-[170px] text-center overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Time limit")}
          </span>
          <span className="w-[300px] overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Manzili")}
          </span>

          <div className="flex items-center text-center">
            {latinToCyrillic("Status")}
          </div>
        </div>
        {data && <TopshiriqCard click={false} data={data} />}
      </div>
      {data && data.inprogress && (
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            {latinToCyrillic("Hodim qo'shish")}
          </AccordionSummary>
          <AccordionDetails>
            <div className="flex flex-col pb-5 border-b  gap-3">
              <h1 className="font-bold">{latinToCyrillic("Filter")}</h1>
              <form
                onSubmit={handleSearch}
                className="flex items-center w-full"
              >
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
                      <IconButton type="submit">
                        <PersonSearchIcon color="info" />
                      </IconButton>
                    ),
                  }}
                />
              </form>
              <Button
                variant="contained"
                color="success"
                sx={{ mt: 5 }}
                onClick={handleSubmit}
              >
                {latinToCyrillic("Saqlash")}
              </Button>
            </div>
            <List
              sx={{
                width: "100%",
                maxWidth: "100%",
                bgcolor: "background.paper",
              }}
            >
              {memoizedFilteredWorkers.map((value: Worker) => {
                const labelId = `checkbox-list-label-${value._id}`;
                return (
                  <ListItem key={value._id} disablePadding>
                    <ListItemButton role={undefined}>
                      <ListItemIcon>
                        <Checkbox
                          onClick={() => handleToggle(value._id)}
                          edge="start"
                          checked={value.selected}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText id={labelId} primary={`${value.FIO}`} />
                      <div className="flex gap-5">
                        <TextField
                          id="outlined-basic"
                          label={latinToCyrillic("Vaqt")}
                          variant="outlined"
                          type="number"
                          value={value.tasktime}
                          onChange={(e) =>
                            handleTaskTimeChange(value._id, e.target.value)
                          }
                        />
                        <TextField
                          id="outlined-basic"
                          label={latinToCyrillic("Sana")}
                          variant="outlined"
                          value={value.taskdate}
                          onChange={(e) =>
                            handleTaskDateChange(value._id, e.target.value)
                          }
                        />
                      </div>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </AccordionDetails>
        </Accordion>
      )}
      
    </div>
  );
};

export default Page;
