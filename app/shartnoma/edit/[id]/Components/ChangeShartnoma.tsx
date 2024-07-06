import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  IconButton,
  FormControl,
  Checkbox,
  Autocomplete,
  Switch,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Createshartnomaa,
  GETworkers,
  GetForBatalyon,
  GetSingleShartnoma,
  UpdateShartnoma,
} from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function ChangeShartnoma({ data }: { data: any }) {
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [value, setValue] = useState<any>({
    date: "",
    shartnomaNumber: "",
    timeLimit: "",
    buyurtmachi: {
      name: "",
    },
    topshiriqDate: "",
    address: "",
    organs: [],
  });

  const [workers, setWorkers] = useState<any[]>([]);
  const [worker2, setWorker2] = useState<any>([]);
  const [organs, setOrgans] = useState<any>([]);
  const [count, setCount] = useState(false);

  const router = useRouter();
  interface Item {
    name: string;
    selected: boolean;
  }

  const getWorkerFor = async () => {
    const res = await GETworkers(JWT);
    const worker1 = res.data.map((e: any) => {
      return {
        ...e,
        selected: false,
      };
    });
    setWorkers(worker1);
  };

  useEffect(() => {
    getWorkerFor();
    GetOrganName();
  }, []);

  const createShartnoman = async (shartnoma: any) => {
    const res = await UpdateShartnoma(JWT, shartnoma, data._id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Shartnoma Tahrirlandi"),
          status: "success",
        })
      );
      router.push("/" + data._id);
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

  useEffect(() => {
    const newOrgans = data.smeta?.organs.map((e: any) => {
      return { name: e.name, time: e.time, workerNumber: e.workerNumber };
    });

    if (data) {
      setOrgans(newOrgans);

      setValue({
        ...data,
        buyurtmachi: { ...data.buyurtmachi },
        date: formatDate(data.date),
        topshiriqDate: formatDate(data.date),
      });
    }
  }, [data]);

  const dispatch = useDispatch();
  const saqlash = () => {
    const filtOrgans = organs.map((organ: any) => {
      return {
        name: organ.name,
        time: organ.time,
        workerNumber: organ.workerNumber,
      };
    });
    const shartnoma = {
      ...value,
      organs: filtOrgans,
    };

    if (shartnoma.shartnomaNumber) {
      createShartnoman(shartnoma);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Malumotlarni toliq toldiring"),
          status: "warning",
        })
      );
    }
  };

  const handleChangeValue = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  const handleChangeValue2 = (e: any) => {
    setValue({
      ...value,
      buyurtmachi: { ...value.buyurtmachi, [e.target.name]: e.target.value },
    });
  };

  const handleChangeOrgans = (e: any, index: number) => {
    const updatedOrgans = [...organs];
    updatedOrgans[index] = {
      ...updatedOrgans[index],
      [e.target.name]: e.target.value,
    };
    setOrgans(updatedOrgans);
  };

  const GetOrganName = async () => {
    const res = await GetForBatalyon(JWT);
    setWorker2(res.data);
  };

  const handleAddOrgan = () => {
    setOrgans([
      ...organs,
      {
        name: "",
        time: "",
        workerNumber: "",
        _id: Math.ceil(Math.random() * 10000),
      },
    ]);
  };
  function removeHyphens(input: string) {
    return input.replace(/-/g, "");
  }

  function formatDate(dateString: string) {
    if (dateString) {
      // Sana satrini bo'sh joy va tire orqali bo'linadi
      const [dayMonth, year] = dateString.split(" ");
      const [day, month] = dayMonth.split("-");

      const monthMap: { [key: string]: string } = {
        январь: "01",
        февраль: "02",
        март: "03",
        апрель: "04",
        май: "05",
        июнь: "06",
        июль: "07",
        август: "08",
        сентябрь: "09",
        октябрь: "10",
        ноябрь: "11",
        декабрь: "12",
      };

      const monthNumber = monthMap[month];

      // "йил" so'zini olib tashlash va yildagi har qanday "-" belgilarini olib tashlash
      const cleanedYear = removeHyphens(year.replace("йил", ""));

      return `${day}.${monthNumber}.${cleanedYear}`;
    }
    return "";
  }

  const handleRemoveOrgan = (index: number) => {
    const updatedOrgans = organs.filter((_: any, i: number) => i !== index);
    setOrgans(updatedOrgans);
  };
  return (
    <>
      <div className="flex flex-col mt-[15vh] mb-[9vh] gap-0 w-full">
        <div className="flex w-full justify-between mb-4 gap-4 ">
          <TextField
            id="shartnomaNumber"
            label={latinToCyrillic("Shartnoma Raqam")}
            sx={{ width: "30%" }}
            value={value.shartnomaNumber}
            onChange={handleChangeValue}
            variant="outlined"
            name="shartnomaNumber"
            autoComplete="off"
          />
          <TextField
            id="date"
            label={latinToCyrillic("Shartnoma Sanasi")}
            sx={{ width: "30%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.date}
            name="date"
            autoComplete="off"
          />
          <TextField
            id="address"
            label={latinToCyrillic("Tadbir o'tadigan joy manzil")}
            sx={{ width: "40%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.address}
            name="address"
            autoComplete="off"
          />
        </div>
        <div className="flex w-full justify-between mb-4 gap-4">
          <TextField
            id="timeLimit"
            label={latinToCyrillic(
              "Bajaruchi fuqorolar xavsizligini va jamoat tartibini saqlash muddati"
            )}
            sx={{ width: "100%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.timeLimit}
            name="timeLimit"
            autoComplete="off"
          />
        </div>
        <div className="font-bold text-[28px] flex gap-3 mb-4">
          <Switch
            checked={count}
            onChange={() => setCount(!count)}
            inputProps={{ "aria-label": "controlled" }}
          />{" "}
          <span>{latinToCyrillic("Buyurtmachi")}</span>
        </div>
        <div className="flex gap-4 mb-4">
          <TextField
            id="buyurtmachi"
            label={latinToCyrillic("Buyurtmachi Nomi")}
            sx={{ width: "20%" }}
            onChange={handleChangeValue2}
            variant="outlined"
            value={value.buyurtmachi?.name}
            name="name"
            autoComplete="off"
          />

          {count && (
            <>
              {" "}
              <TextField
                id="buyurtmachi"
                label={latinToCyrillic("Buyurtmachi Manzili")}
                sx={{ width: "20%" }}
                onChange={handleChangeValue2}
                variant="outlined"
                value={value.buyurtmachi.address}
                name="address"
                autoComplete="off"
              />
              <TextField
                id="buyurtmachi"
                label={latinToCyrillic("Buyurtmachi Xisob Raqami")}
                sx={{ width: "20%" }}
                onChange={handleChangeValue2}
                variant="outlined"
                type="number"
                value={value.buyurtmachi.accountNumber}
                name="accountNumber"
                autoComplete="off"
              />
              <TextField
                id="buyurtmachi"
                label={latinToCyrillic("Buyurtmachi MFIO")}
                sx={{ width: "20%" }}
                onChange={handleChangeValue2}
                variant="outlined"
                type="number"
                value={value.buyurtmachi.MFIO}
                name="MFIO"
                autoComplete="off"
              />
              <TextField
                id="buyurtmachi"
                label={latinToCyrillic("Buyurtmachi CTIR")}
                sx={{ width: "20%" }}
                onChange={handleChangeValue2}
                variant="outlined"
                type="number"
                value={value.buyurtmachi.CTIR}
                name="CTIR"
                autoComplete="off"
              />
            </>
          )}
        </div>
        <div className="font-bold mb-2 text-[28px]">
          {latinToCyrillic("Smeta")}
        </div>
        <TextField
          id="topshiriqDate"
          label={latinToCyrillic("Topshiriq Sanasi")}
          sx={{ width: "30%" }}
          onChange={handleChangeValue}
          variant="outlined"
          value={value.topshiriqDate}
          name="topshiriqDate"
          autoComplete="off"
        />
        {organs?.map((e: any, index: any) => (
          <div
            key={index}
            className="flex  gap-2 mt-3 mb-4 border-2 border-sky-600 rounded-xl p-4"
          >
            <FormControl sx={{ width: "40%" }}>
              <InputLabel id={`select-label-${index}`}>
                {latinToCyrillic("Organ Nomi")}
              </InputLabel>
              <Select
                labelId={`select-label-${index}`}
                id={`select-${index}`}
                label={latinToCyrillic("Organ Nomi")}
                value={organs[index].name}
                name="name"
                onChange={(e) => handleChangeOrgans(e, index)}
              >
                {worker2 &&
                  worker2.map((item: any) => (
                    <MenuItem key={item.username} value={item.username}>
                      {item.username}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
            <div className="flex w-[60%] gap-3 justify-between">
              <TextField
                id={`organ-time-${index}`}
                label={latinToCyrillic("Ommaviy tadbir o'tadigan soati")}
                sx={{ width: "49%" }}
                onChange={(e) => handleChangeOrgans(e, index)}
                variant="outlined"
                type="number"
                value={organs[index].time}
                name="time"
                autoComplete="off"
              />
              <TextField
                id={`organ-workerNumber-${index}`}
                label={latinToCyrillic("Xodim Soni")}
                sx={{ width: "49%" }}
                onChange={(e) => handleChangeOrgans(e, index)}
                variant="outlined"
                type="number"
                value={organs[index].workerNumber}
                name="workerNumber"
                autoComplete="off"
              />
              <IconButton
                color="error"
                onClick={() => handleRemoveOrgan(index)}
              >
                <RemoveCircleIcon />
              </IconButton>
            </div>
          </div>
        ))}
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="info"
            onClick={handleAddOrgan}
            endIcon={<AddIcon />}
          >
            {latinToCyrillic("Organ")}
          </Button>
        </div>
        <div className="flex w-full  mt-4">
          <Button
            fullWidth
            variant="contained"
            color="success"
            onClick={saqlash}
          >
            {latinToCyrillic("Saqlash")}
          </Button>
        </div>
      </div>
    </>
  );
}

export default ChangeShartnoma;
