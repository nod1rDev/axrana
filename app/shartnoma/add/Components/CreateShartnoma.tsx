import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  IconButton,
  FormControl,
  Switch,
  InputAdornment,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createContract, getAllAcount, getForBatalyon } from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PercentIcon from "@mui/icons-material/Percent";

function CreateShartnoma({ language }: { language: any }) {
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = useState<any>({});
  const [errors, setErrors] = useState<any>({});
  const [smetaVal3, setSmetaVal3] = useState(false);
  const [count, setCount] = useState(false);
  const [organs, setOrgans] = useState<any>([]);
  const [worker2, setWorker2] = useState<any>([]);

  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    GetOrganName();
  }, []);
  useEffect(() => {
    if (language?.clientname) {
      setValue({
        clientName: language.clientname,
        clientAddress: language.clientaddress,
        clientMFO: language.clientmfo,
        clientAccount: language.clientaccount,
        clientSTR: language.clientstr,
        treasuryAccount: language.treasuryaccount,
        address: language.address,
        timeLimit: language.timelimit,
      });
    }
  }, [language]);

  const createShartnoman = async (shartnoma: any) => {
    const res = await createContract(JWT, shartnoma);
    const message = res.success
      ? latinToCyrillic("Shartnoma Qo'shildi")
      : latinToCyrillic(res.message);
    dispatch(
      alertChange({
        open: true,
        message,
        status: res.success ? "success" : "error",
      })
    );
    if (res.success) router.push("/shartnoma");
  };

  const [acount, setAcount] = useState([]);

  useEffect(() => {
    const getAcount = async () => {
      const res = await getAllAcount(JWT);
      setAcount(res.data);
    };
    getAcount();
  }, []);

  const validate = () => {
    const checks = [
      { field: "clientMFO", length: 5, message: "5 ta raqam kiriting" },
      { field: "clientAccount", length: 20, message: "20 ta raqam kiriting" },
      { field: "clientSTR", length: 9, message: "9 ta raqam kiriting" },
      { field: "treasuryAccount", length: 25, message: "25 ta raqam kiriting" },
    ];

    let temp: any = {};
    checks.forEach(({ field, length, message }) => {
      temp[field] = value[field]?.length === length ? "" : message;
    });

    setErrors(temp);
    return Object.values(temp).every((x) => x === "");
  };

  const saqlash = () => {
    if (count ? validate() : true) {
      const filtOrgans = organs.map((organ: any) => ({
        name: organ.name,
        workerNumber: +organ.workerNumber,
      }));

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
    setOrgans(organs.filter((_: any, i: number) => i !== index));
  };

  const validationFields = [
    { id: "clientAccount", label: "Buyurtmachi Xisob Raqami", length: 20 },
    { id: "clientMFO", label: "Buyurtmachi MFO", length: 5 },
    { id: "clientSTR", label: "Buyurtmachi STIR", length: 9 },
    { id: "treasuryAccount", label: "G'aznachilik xisobi", length: 25 },
  ];

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
              value={value.accountNumber || ""}
              name="accountNumber"
              label={latinToCyrillic("Hisob Raqam")}
              onChange={handleChangeValue}
            >
              {acount &&
                acount.map((e: any) => (
                  <MenuItem key={e.accountnumber} value={e.accountnumber}>
                    {e.accountnumber}
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
                value={value.clientAddress || ""}
                name="clientAddress"
                multiline
                autoComplete="off"
              />
              {validationFields.map(({ id, label, length }) => (
                <TextField
                  key={id}
                  id={id}
                  label={latinToCyrillic(label)}
                  sx={{ width: "16.6%" }}
                  onChange={handleChangeValue}
                  variant="outlined"
                  type="number"
                  value={value[id] || ""}
                  name={id}
                  autoComplete="off"
                  error={!!errors[id]}
                  helperText={errors[id] ? latinToCyrillic(errors[id]) : ""}
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
        <div className="flex w-full gap-4 mb-4">
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
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PercentIcon />
                  </InputAdornment>
                ),
              }}
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
              onChange={(e) => handleChangeOrgans(e, index)}
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
            color="success"
            onClick={saqlash}
            fullWidth
          >
            {latinToCyrillic("Saqlash")}
          </Button>
        </div>
      </div>
    </>
  );
}

export default CreateShartnoma;
