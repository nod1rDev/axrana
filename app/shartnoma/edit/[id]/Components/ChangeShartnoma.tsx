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
import { createContract, getAllBatalyon, updateContract } from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function ChangeShartnoma({ data, taskss }: { data: any; taskss: any }) {
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [value, setValue] = useState<any>({});

  const [errors, setErrors] = useState<any>({});
  const [smetaVal3, setSmetaVal3] = useState(false);
  const [workers, setWorkers] = useState<any>(false);
  const [worker2, setWorker2] = useState<any>([]);
  const [organs, setOrgans] = useState<any>([]);
  const [count, setCount] = useState(false);

  const router = useRouter();
  const dispatch = useDispatch();
  function convertDate(dateString: string): string {
    // Oylik nomlar ro'yxati
    const months: { [key: string]: string } = {
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

    // Sanani bo'laklarga ajratish
    const datePattern = /^(\d{2})-(\D+)\s(\d{4})-йил$/;
    const match = dateString.match(datePattern);

    if (!match) {
      throw new Error("Invalid date format");
    }

    const [, day, month, year] = match;

    // Oyni raqamli formatga o'zgartirish
    const monthNumber = months[month.trim()];

    if (!monthNumber) {
      throw new Error("Invalid month name");
    }

    // Yangi formatga o'tkazish
    return `${day.padStart(2, "0")}.${monthNumber}.${year}`;
  }
  useEffect(() => {
    GetOrganName();
  }, []);
  useEffect(() => {
    if (data && taskss) {
      const pureData = {
        contractNumber: data.contractnumber,
        contractDate: convertDate(data.contractdate),
        clientName: data.clientname,
        clientAddress: data.clientaddress,
        clientMFO: data.clientmfo, // faqat 5 ta kirita olishi kerak frontdan tosiq qoying
        clientAccount: data.clientaccount, // faqat 20 ta kirita olishi kerak frontdan tosiq qoying
        clientSTR: data.clientstr, //faqat 9 ta kirita olishi kerak frontdan tosiq qoying
        treasuryAccount: data.treasuryaccount, //faqat 25 ta kirita olishi kerak frontdan tosiq qoying
        timeLimit: data.timelimit,
        address: data.address,
        taskDate: data.taskdate,
        taskTime: data.tasktime,
      };
      setValue(pureData);

      const organ = taskss.map((e: any) => {
        return {
          id: e.id,
          name: e.battalionname,
          workerNumber: e.workernumber,
        };
      });

      setOrgans(organ);
    }
  }, [data]);
  const createShartnoman = async (shartnoma: any) => {
    const res = await updateContract(JWT, shartnoma, data.id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Shartnoma Tahrirlandi"),
          status: "success",
        })
      );
      router.push("/shartnoma");
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

  const validate = () => {
    let temp: any = {};
    temp.clientMFO = value.clientMFO.length === 5 ? "" : "5 ta raqam kiriting";
    temp.clientAccount =
      value.clientAccount.length === 20 ? "" : "20 ta raqam kiriting";
    temp.clientSTR = value.clientSTR.length === 9 ? "" : "9 ta raqam kiriting";
    temp.treasuryAccount =
      value.treasuryAccount.length === 25 ? "" : "25 ta raqam kiriting";
    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const saqlash = () => {
    const chekcker = count ? validate() : true;

    if (chekcker) {
      const filtOrgans = organs.map((organ: any) => {
        return {
          name: organ.name,
          workerNumber: organ.workerNumber,
        };
      });

      const shartnoma = { ...value, battalions: filtOrgans };
      if (shartnoma.contractNumber) {
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
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Malumotlarni to'g'ri kiriting"),
          status: "error",
        })
      );
    }
  };

  const handleChangeValue = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleChangeOrgans = (e: any, index: number) => {
    const updatedOrgans = [...organs];
    updatedOrgans[index] = {
      ...updatedOrgans[index],
      [e.target.name]: e.target.value,
    };
    setOrgans(updatedOrgans);
  };
  const handleChangeOrgans2 = (e: any, index: number) => {
    const updatedOrgans = [...organs];
    updatedOrgans[index] = {
      ...updatedOrgans[index],
      [e.target.name]: +e.target.value,
    };
    setOrgans(updatedOrgans);
  };

  const GetOrganName = async () => {
    const res = await getAllBatalyon(JWT);
    setWorker2(res.data);
  };

  const handleAddOrgan = () => {
    setOrgans([
      ...organs,
      {
        name: "",
        time: "",
        workers: [],
        _id: Math.ceil(Math.random() * 10000),
      },
    ]);
  };

  const handleRemoveOrgan = (index: number) => {
    const updatedOrgans = organs.filter((_: any, i: number) => i !== index);
    setOrgans(updatedOrgans);
  };

  return (
    <>
      <div className="flex flex-col mt-[15vh] mb-[9vh] gap-0 w-full">
        <div className="flex w-full justify-between mb-4 gap-4">
          <TextField
            id="contractNumber"
            label={latinToCyrillic("Shartnoma Raqam")}
            sx={{ width: "30%" }}
            value={value.contractNumber || ""}
            onChange={handleChangeValue}
            variant="outlined"
            name="contractNumber"
            autoComplete="off"
          />
          <TextField
            id="contractDate"
            label={latinToCyrillic("Shartnoma Sanasi")}
            sx={{ width: "30%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.contractDate || ""}
            name="contractDate"
            autoComplete="off"
          />
          <TextField
            id="address"
            label={latinToCyrillic("Tadbir o'tadigan joy manzil")}
            sx={{ width: "40%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.address || ""}
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
            value={value.timeLimit || ""}
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
            id="clientName"
            label={latinToCyrillic("Buyurtmachi Nomi")}
            sx={{ width: "16.6%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.clientName || ""}
            name="clientName"
            autoComplete="off"
          />
          {count && (
            <>
              <TextField
                id="buyurtmachi"
                label={latinToCyrillic("Buyurtmachi Manzili")}
                sx={{ width: "16.6%" }}
                onChange={handleChangeValue}
                variant="outlined"
                value={value.clientAddress || ""}
                name="clientAddress"
                multiline
                autoComplete="off"
              />
              <TextField
                id="buyurtmachi"
                label={latinToCyrillic("Buyurtmachi Xisob Raqami")}
                sx={{ width: "16.6%" }}
                onChange={handleChangeValue}
                variant="outlined"
                type="number"
                value={value.clientAccount || ""}
                name="clientAccount"
                autoComplete="off"
                error={errors.clientAccount && count ? true : false}
                helperText={errors.clientAccount}
              />
              <TextField
                id="buyurtmachi"
                label={latinToCyrillic("Buyurtmachi MFO")}
                sx={{ width: "16.6%" }}
                onChange={handleChangeValue}
                variant="outlined"
                type="number"
                value={value.clientMFO || ""}
                name="clientMFO"
                autoComplete="off"
                error={errors.clientMFO && count ? true : false}
                helperText={errors.clientMFO}
              />
              <TextField
                id="buyurtmachi"
                label={latinToCyrillic("Buyurtmachi STIR")}
                sx={{ width: "16.6%" }}
                onChange={handleChangeValue}
                variant="outlined"
                type="number"
                value={value.clientSTR || ""} // krilchada boladi keyin qilasiz hozir man ishlavoli
                name="clientSTR"
                autoComplete="off"
                error={errors.clientSTR && count ? true : false}
                helperText={errors.clientSTR}
              />
              <TextField
                id="buyurtmachi"
                label={latinToCyrillic("G'aznachilik xisobi")}
                sx={{ width: "16.6%" }}
                onChange={handleChangeValue}
                variant="outlined"
                type="number"
                value={value.treasuryAccount || ""}
                name="treasuryAccount"
                autoComplete="off"
                error={errors.treasuryAccount && count ? true : false}
                helperText={errors.treasuryAccount}
              />
            </>
          )}
        </div>
        <div className="font-bold text-[28px] flex gap-3 mb-4">
          <Switch
            checked={smetaVal3}
            onChange={() => setSmetaVal3(!smetaVal3)}
            inputProps={{ "aria-label": "controlled" }}
          />{" "}
          <span>{latinToCyrillic("Smeta")}</span>
        </div>
        <div className="flex w-full  gap-4 mb-4">
          <TextField
            id="taskDate"
            label={latinToCyrillic("Vazifa bajarish sanasi")}
            sx={{ width: "30%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.taskDate || ""}
            name="taskDate"
            autoComplete="off"
          />
          <TextField
            id="taskTime"
            label={latinToCyrillic("ommavit tadbir otkaziladigan vaqt")}
            sx={{ width: "30%" }}
            onChange={handleChangeValue}
            variant="outlined"
            type="number"
            value={value.taskTime || ""}
            name="taskTime"
            autoComplete="off"
          />
          {smetaVal3 && (
            <TextField
              id="discount"
              type="number"
              label={latinToCyrillic("Chegirma")}
              sx={{ width: "30%" }}
              onChange={handleChangeValue}
              variant="outlined"
              value={value.discount || ""}
              name="discount"
              autoComplete="off"
            />
          )}
        </div>
        {organs.map((organ: any, index: number) => (
          <div
            key={organ._id}
            className="flex w-full items-center justify-between gap-4 mb-4"
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

            <TextField
              id={`organ-workerNumber-${index}`}
              label={latinToCyrillic("Xodim Soni")}
              sx={{ width: "49%" }}
              onChange={(e) => handleChangeOrgans2(e, index)}
              variant="outlined"
              type="number"
              value={organs[index].workerNumber}
              name="workerNumber"
              autoComplete="off"
            />
            <IconButton
              color="secondary"
              onClick={() => handleRemoveOrgan(index)}
            >
              <RemoveCircleIcon />
            </IconButton>
          </div>
        ))}
        <div className="flex justify-end mb-4">
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddOrgan}
            startIcon={<AddIcon />}
          >
            {latinToCyrillic("Organ")}
          </Button>
        </div>
        <div className="flex justify-end">
          <Button
            variant="contained"
            color="primary"
            onClick={saqlash}
            sx={{ width: "20%" }}
          >
            {latinToCyrillic("Saqlash")}
          </Button>
        </div>
      </div>
    </>
  );
}

export default ChangeShartnoma;
