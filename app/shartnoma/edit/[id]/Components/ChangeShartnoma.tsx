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
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import PercentIcon from "@mui/icons-material/Percent";
import {
  createContract,
  getAllAcount,
  getAllBatalyon,
  getForBatalyon,
  updateContract,
} from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { formatString } from "@/app/Utils";

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
        clientMFO: data.clientmfo,
        clientAccount: data.clientaccount,
        clientSTR: data.clientstr,
        treasuryAccount: data.treasuryaccount,
        timeLimit: data.timelimit,
        treasuryaccount27: data.treasuryaccount27,
        address: data.address,
        taskTimeLimit: data.tasktimelimit, // Ensure this is assigned
        taskDate: data.taskdate,
        taskTime: data.tasktime,
        accountNumber: removeSpaces(data.accountnumber), // Ensure this is assigned
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
      router.push("/" + data.id);
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
    const checks = [
      { field: "clientMFO", length: 5, message: "5 ta raqam kiriting" },
      { field: "clientAccount", length: 20, message: "20 ta raqam kiriting" },
      { field: "clientSTR", length: 9, message: "9 ta raqam kiriting" },
    ];

    let temp: any = {};
    checks.forEach(({ field, length, message }) => {
      if (value[field]?.length !== length) {
        temp[field] = message;
      } else {
        temp[field] = "";
      }
    });

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const saqlash = () => {
    const chekcker = count ? validate() : true;

    const filtOrgans = organs.map((organ: any) => {
      return {
        name: organ.name,
        workerNumber: +organ.workerNumber,
      };
    });

    const shartnoma = {
      ...value,
      contractNumber: +value.contractNumber,
      clientMFO: +value.clientMFO,
      treasuryAccount: +value.treasuryAccount,
      clientSTR: +value.clientSTR,
      clientAccount: +value.clientAccount,
      taskTime: +value.taskTime,

      taskTimeLimit: +value.taskTimeLimit,
      battalions: filtOrgans,
    };
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
  };

  const handleChangeValue = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const validationFields = [
    { id: "clientAccount", label: "Buyurtmachi Xisob Raqami", length: 20 },
    { id: "clientMFO", label: "Buyurtmachi MFO", length: 5 },
    { id: "clientSTR", label: "Buyurtmachi STIR", length: 9 },

    { id: " treasuryaccount", label: "G'aznachilik xisobi", length: 25 },
    { id: " treasuryaccount27", label: "G'aznachilik xisobi 2", length: 25 },
  ];
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
      [e.target.name]: e.target.value,
    };
    setOrgans(updatedOrgans);
  };

  const GetOrganName = async () => {
    const res = await getForBatalyon(JWT);
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

  const [acount, setAcount] = useState([]);
  useEffect(() => {
    const getAcount = async () => {
      const res = await getAllAcount(JWT);

      setAcount(res.data);
    };
    getAcount();
  }, []);

  function removeSpaces(str: any) {
    const pureStr = str.replace(/\s+/g, "");

    return formatString(pureStr);
  }
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
            type="number"
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
            sx={{ width: "70%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.timeLimit || ""}
            name="timeLimit"
            autoComplete="off"
          />
          <FormControl sx={{ width: "30%" }}>
            <InputLabel id="demo-simple-select-label">
              {latinToCyrillic("Hisob Raqam")}
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={value?.accountNumber || ""}
              name="accountNumber"
              label={latinToCyrillic("Hisob Raqam")}
              onChange={handleChangeValue}
            >
              {acount &&
                acount.map((e: any) => (
                  <MenuItem key={e.accountnumber} value={e.accountnumber}>
                    {removeSpaces(e.accountnumber)}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
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
                id="clientAddress"
                label={latinToCyrillic("Buyurtmachi Manzili")}
                sx={{ width: "16.6%" }}
                onChange={handleChangeValue}
                variant="outlined"
                value={value.clientAddress}
                name="clientAddress"
                multiline
                autoComplete="off"
              />
              {validationFields.map((field) => (
                <TextField
                  key={field.id}
                  id={field.id}
                  label={latinToCyrillic(field.label)}
                  sx={{ width: "31%" }}
                  onChange={handleChangeValue}
                  variant="outlined"
                  value={value[field.id] || ""}
                  name={field.id}
                  autoComplete="off"
                  inputProps={{ maxLength: 27 }}
                  error={Boolean(errors[field.id])}
                  helperText={
                    errors[field.id] ||
                    `${
                      field.length - (value[field.id]?.length || field.length)
                    } ${latinToCyrillic("ta raqam kiriting")}`
                  }
                />
              ))}
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
          <TextField
            id="taskTimeLimit"
            type="number"
            label={latinToCyrillic("Time limit")}
            sx={{ width: "30%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.taskTimeLimit || ""}
            name="taskTimeLimit"
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PercentIcon />
                  </InputAdornment>
                ),
              }}
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
