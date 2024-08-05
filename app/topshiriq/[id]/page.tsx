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
import {
  getAllTasks,
  getAllWorkers,
  getAllWorkers2,
  getByTask,
  pushWorkers,
} from "@/app/Api/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TopshiriqCard from "../Components/TopshiriqCard";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { setModalN1 } from "@/app/Redux/CoctavsSlice";
import ModalN1 from "./Components/pastki";
import PermDeviceInformationIcon from "@mui/icons-material/PermDeviceInformation";
import { changeReload } from "@/app/Redux/AuthSlice";

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

// Debounce function
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
  const [infoData, setInfoData] = useState({
    tasktime: "",
    taskdate: "",
  });
  const getData = async () => {
    const res = await getByTask(JWT, id);

    setData(res.data);
  };

  const getWorkers = async () => {
    const res = await getAllWorkers2(JWT);

    const filData = res.data.map((e: any, i: number) => ({
      FIO: e.fio,
      selected: false,
      tasktime: "",
      taskdate: "",
      _id: i + 1,
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
      const random: number = Math.ceil(Math.random() * 100000);
      dispatch(changeReload(random));
      router.push("/topshiriq/" + id);
      location.reload();
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
  const handleChageInfoData = (e: any) => {
    setInfoData({ ...infoData, [e.target.name]: e.target.value });
  };
  const handleSubmit = () => {
    const FiltWorker = workers.filter((e) => e.selected);
    const pureWorker = FiltWorker.map((e) => {
      return {
        fio: e.FIO,
        taskdate: infoData.taskdate,
        tasktime: +infoData.tasktime,
      };
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
    const filtered = workers.filter((worker) => {
      const pureWorkers = worker.FIO.toLowerCase().toString();
      const pureSearch = search.toLowerCase().trim().toString();
      return pureWorkers.includes(pureSearch);
    });
   

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
          {latinToCyrillic("орқага")}
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
            className={`font-bold w-[200px] text-center overflow-hidden text-ellipsis whitespace-nowrap `}
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
                className="flex items-center gap-3 w-full"
              >
                <Button variant="contained" color="info" type="submit">
                  {latinToCyrillic("Qidirush")}
                </Button>
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
              <span className="font-bold text-[18px] mt-5 mb-2 flex justify-end w-full">
                {latinToCyrillic("jami ") +
                  workers?.filter((e: any) => e.selected).length +
                  " " +
                  latinToCyrillic("xodim biriktirildi")}
              </span>
              <Button
                variant="contained"
                color="success"
                onClick={handleSubmit}
              >
                {latinToCyrillic("Saqlash")}
              </Button>
            </div>
            <div className="flex justify-end py-2 gap-5">
              <TextField
                autoComplete="off"
                label={latinToCyrillic("Vaqt")}
                variant="outlined"
                sx={{ width: 400 }}
                type="number"
                name="tasktime"
                value={infoData.tasktime}
                onChange={handleChageInfoData}
              />
              <TextField
                autoComplete="off"
                label={latinToCyrillic("Sana")}
                variant="outlined"
                name="taskdate"
                sx={{ width: 400 }}
                value={infoData.taskdate}
                onChange={handleChageInfoData}
              />
            </div>
            <List
              sx={{
                width: "100%",
                maxWidth: "100%",
                bgcolor: "background.paper",
              }}
            >
              <div className="flex flex-col gap-4">
                {filteredWorkers.map((value: Worker) => {
                  const labelId = `checkbox-list-label-${value._id}`;
                  return (
                    <ListItem key={value._id} disablePadding>
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
                    </ListItem>
                  );
                })}
              </div>
            </List>
          </AccordionDetails>
        </Accordion>
      )}
    </div>
  );
};

export default Page;
