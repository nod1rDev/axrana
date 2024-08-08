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
import ListItemIcon from "@mui/material/ListItemIcon";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import { getAllWorkers2, getByTask, pushWorkers } from "@/app/Api/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TopshiriqCard from "../Components/TopshiriqCard";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { changeReload } from "@/app/Redux/AuthSlice";
import { ListItemText } from "@mui/material";

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

  const dispatch = useDispatch();
  const router = useRouter();

  const createWorker = async (value: any) => {
    const res = await pushWorkers(
      JWT,
      id,
      value,
      +infoData.tasktime,
      infoData.taskdate
    );

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
        id: +e._id,
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
  function cyrillicToLatin(input: string): string {
    const map: { [key: string]: string } = {
      А: "A",
      Б: "B",
      В: "V",
      Г: "G",
      Д: "D",
      Е: "E",
      Ё: "Yo",
      Ж: "Zh",
      З: "Z",
      И: "I",
      Й: "Y",
      К: "K",
      Л: "L",
      М: "M",
      Н: "N",
      О: "O",
      П: "P",
      Р: "R",
      С: "S",
      Т: "T",
      У: "U",
      Ф: "F",
      Х: "X",
      Ц: "Ts",
      Ч: "Ch",
      Ш: "Sh",
      Щ: "Shch",
      Ъ: "",
      Ы: "I",
      Ь: "",
      Э: "E",
      Ю: "Yu",
      Я: "Ya",
      а: "a",
      б: "b",
      в: "v",
      г: "g",
      д: "d",
      е: "e",
      ё: "yo",
      ж: "zh",
      з: "z",
      и: "i",
      й: "y",
      к: "k",
      л: "l",
      м: "m",
      н: "n",
      о: "o",
      п: "p",
      р: "r",
      с: "s",
      т: "t",
      у: "u",
      ф: "f",
      х: "x",
      ц: "ts",
      ч: "ch",
      ш: "sh",
      щ: "shch",
      ъ: "",
      ы: "i",
      ь: "",
      э: "e",
      ю: "yu",
      я: "ya",
    };

    return input
      .split("")
      .map((char) => map[char] || char)
      .join("");
  }
  function normalizeText(input: string): string {
    const latinized = checkName(input) ? input : cyrillicToLatin(input);
    

    const normalized = latinized
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .trim();
    return normalized.replace(/[\W_]+/g, "");
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = workers.filter((worker) => {
      const normalizedWorker = normalizeText(worker.FIO);
      const normalizedSearch = normalizeText(search);

      return normalizedWorker.includes(normalizedSearch);
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

  const cyrillicAlphabet = [
    "А",
    "Б",
    "В",
    "Г",
    "Д",
    "Е",
    "Ё",
    "Ж",
    "З",
    "И",
    "Й",
    "К",
    "Л",
    "М",
    "Н",
    "О",
    "П",
    "Р",
    "С",
    "Т",
    "У",
    "Ф",
    "Х",
    "Ц",
    "Ч",
    "Ш",
    "Щ",
    "Ъ",
    "Ы",
    "Ь",
    "Э",
    "Ю",
    "Я",
    "а",
    "б",
    "в",
    "г",
    "д",
    "е",
    "ё",
    "ж",
    "з",
    "и",
    "й",
    "к",
    "л",
    "м",
    "н",
    "о",
    "п",
    "р",
    "с",
    "т",
    "у",
    "ф",
    "х",
    "ц",
    "ч",
    "ш",
    "щ",
    "ъ",
    "ы",
    "ь",
    "э",
    "ю",
    "я",
  ];

  const isLatin = (char: string): boolean => !cyrillicAlphabet.includes(char);

  const checkName = (name: string): boolean => {
    for (let i = 0; i < name.length; i++) {
      if (!isLatin(name[i])) {
        return false;
      }
    }
    return true;
  };

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
          <span className="font-bold text-left w-[300px] ">
            {latinToCyrillic("Буюртмачи номи")}
          </span>
          <span
            className={`font-bold w-[260px] text-left overflow-hidden text-ellipsis whitespace-nowrap `}
          >
            {latinToCyrillic("Topshiriq sanasi")}
          </span>

          <span className="w-[340px] text-left overflow-hidden text-ellipsis whitespace-nowrap">
            {latinToCyrillic("Xodimlar soni")}
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
                {memoizedFilteredWorkers.map((value: Worker) => {
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
