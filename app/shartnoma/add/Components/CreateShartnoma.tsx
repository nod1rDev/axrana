import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Checkbox, IconButton } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Chip from "@mui/material/Chip";
import { useDispatch, useSelector } from "react-redux";
import { Createshartnomaa, GetForShartnoma, SearchBank } from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { useRouter } from "next/navigation";
import SaveIcon from "@mui/icons-material/Save";
import { FiltDate } from "@/app/Utils";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

function getStyles(name: string, personName: readonly string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

function CreateShartnoma({ language }: { language: any }) {
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [search, setSearch] = useState<any>();
  const [value, setValue] = useState<any>({
    contractDate: "",
    contractTurnOffDate: "",
    contractSumma: 0,
    boss: "",
    contractNumber: "",
    phone: "",
    content: "",
    name: "",
    inn: 0,
    address: "",
    accountNumber: "",
    bankName: "",
    workers: [],
  });

  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);
  const [workers, setWorkers] = React.useState<any>([]);
  const [active, setActive] = React.useState();
  const handleChange = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === "string" ? value.split(",") : value
    );
  };

  const getWorkersInfo = async () => {
    const res = await GetForShartnoma(JWT, language);

    setWorkers(
      res.data.map((e: any) => {
        return {
          worker: language == "uz" ? e.FIOlotin : e.FIOkril,
          selected: false,
          dayOrHour: "",
          timeType: "",
          _id: Math.ceil(Math.random() * 3124234),
        };
      })
    );
  };

  useEffect(() => {
    getWorkersInfo();
  }, [language]);

  const names = workers
    ? workers.map((e: any) => {
        return {
          name: e.worker,
          id: e._id,
          selected: e.selected,
          dayOrHour: e.dayOrHour,
          timeType: e.timeType,
        };
      })
    : [];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const createShartnoman = async (shartnoma: any) => {
    const res = await Createshartnomaa(JWT, shartnoma, language);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: "Shartnoma qo'shildi",
          status: "success",
        })
      );
      router.push("/shartnoma");
    } else {
      dispatch(
        alertChange({
          open: true,
          message: res.message,
          status: "error",
        })
      );
    }
  };
  const dispatch = useDispatch();
  const saqlash = () => {
    const filterWorkers = workers
      .filter((e: any) => e.selected)
      .map((e: any) => {
        return {
          worker: e.worker,
          dayOrHour: e.dayOrHour,
          timeType: e.timeType,
        };
      });
    const shartnoma = { ...value, workers: filterWorkers };

    if (
      shartnoma.contractDate &&
      shartnoma.contractNumber &&
      shartnoma.name &&
      shartnoma.accountNumber &&
      shartnoma.workers
    ) {
      createShartnoman(shartnoma);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: "Malumotlarni toliq toldiring",
          status: "warning",
        })
      );
    }
  };

  const handleChangeValue = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleChangeValue2 = (e: any) => {
    setSearch(e.target.value);
  };
  const setBankName = async () => {
    const res = await SearchBank(JWT, search);
    if (res.success) {
      console.log(res.data.name);

      setValue({ ...value, bankName: res.data.name });
      dispatch(
        alertChange({
          open: true,
          message: "Bank nomi muavaqiyatli topildi",
          status: "success",
        })
      );
    } else {
      dispatch(
        alertChange({
          open: true,
          message: "Bank nomi topilmadi",
          status: "error",
        })
      );
    }
  };
  const searchSubmit = (e: any) => {
    e.preventDefault();
    if (search) {
      setBankName();
    } else {
      dispatch(
        alertChange({
          open: true,
          message: "Bank raqamini kiriting",
          status: "warning",
        })
      );
    }
  };

  return (
    <>
      <div className="flex flex-col mt-[15vh] mb-[9vh] gap-0 w-full">
        <div className="flex w-full justify-between gap-4 ">
          <TextField
            id="outlined-basic"
            label="Shartnoma Raqam"
            sx={{ width: "25%" }}
            onChange={(e: any) => handleChangeValue(e)}
            variant="outlined"
            name="contractNumber"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />

          <div className=" translate-y-[-32px] flex flex-col w-[25%]  md:ml-0 ">
            <div className=" ">Shartnoma sanasi</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "TimePicker",
                  "DatePicker",
                  "DateRangePicker",
                ]}
              >
                <DemoItem>
                  <DatePicker
                    sx={{ width: "100%" }}
                    onChange={(e: any) =>
                      setValue({ ...value, contractDate: FiltDate(e) })
                    }
                    onAccept={(e: any) =>
                      setValue({ ...value, contractDate: FiltDate(e) })
                    }
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className=" translate-y-[-32px] flex flex-col w-[25%]  md:ml-0 ">
            <div className=" ">Amal qilish muddati</div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer
                components={[
                  "DatePicker",
                  "TimePicker",
                  "DatePicker",
                  "DateRangePicker",
                ]}
              >
                <DemoItem>
                  <DatePicker
                    sx={{ width: "100%" }}
                    onChange={(e: any) =>
                      setValue({ ...value, contractTurnOffDate: FiltDate(e) })
                    }
                    onAccept={(e: any) =>
                      setValue({ ...value, contractTurnOffDate: FiltDate(e) })
                    }
                  />
                </DemoItem>
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <TextField
            id="outlined-basic"
            label="Shartnoma Summasi"
            sx={{ width: "25%" }}
            onChange={(e: any) => handleChangeValue(e)}
            type="number"
            name="contractSumma"
            variant="outlined"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />
        </div>

        <div className="flex w-full justify-between mb-8 gap-4">
          <TextField
            id="outlined-basic"
            label="Korxona Inn"
            sx={{ width: "20%" }}
            onChange={(e: any) => handleChangeValue(e)}
            variant="outlined"
            name="inn"
            type="number"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />

          <TextField
            id="outlined-basic"
            label="Korxona Nomi"
            sx={{ width: "20%" }}
            onChange={(e: any) => handleChangeValue(e)}
            variant="outlined"
            name="name"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />

          <TextField
            id="outlined-basic"
            label=" Korxona Manzili"
            sx={{ width: "20%" }}
            onChange={(e: any) => handleChangeValue(e)}
            variant="outlined"
            name="address"
            multiline
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />

          <TextField
            id="outlined-basic"
            label=" Xisob Raqami"
            sx={{ width: "20%" }}
            onChange={(e: any) => handleChangeValue(e)}
            variant="outlined"
            name="accountNumber"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />
          <TextField
            id="outlined-basic"
            label="Raxbar Ismi"
            sx={{ width: "20%" }}
            onChange={(e: any) => handleChangeValue(e)}
            variant="outlined"
            name="boss"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />
        </div>

        <div className="flex justify-between mb-8 w-full gap-3">
          <form className="w-[25%]" onSubmit={searchSubmit}>
            <TextField
              id="outlined-basic"
              label="Bank Raqami"
              sx={{ width: "100%" }}
              onChange={(e: any) => handleChangeValue2(e)}
              variant="outlined"
              name="bankName"
              type="number"
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              InputProps={{
                autoComplete: "off",
                autoCorrect: "off",
                spellCheck: "false",
              }}
            />
          </form>
          <TextField
            id="outlined-basic"
            label="Bank Nomi"
            sx={{ width: "25%" }}
            onChange={(e: any) => handleChangeValue(e)}
            variant="outlined"
            name="bankName"
            value={value.bankName}
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            
            }}
          />
          <TextField
            id="outlined-basic"
            label="Telfon Raqam"
            sx={{ width: "25%" }}
            onChange={(e) => handleChangeValue(e)}
            type="number"
            name="phone"
            variant="outlined"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />
          <TextField
            id="outlined-basic"
            label="Shartnoma Mazmuni"
            multiline
            sx={{ width: "25%" }}
            onChange={(e: any) => handleChangeValue(e)}
            variant="outlined"
            name="content"
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
          />
        </div>
        <div>
          <div className="flex w-[100%] gap-10 ">
            <FormControl sx={{ width: "100%" }}>
              <InputLabel id="demo-multiple-chip-label">Ishchilar</InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                onOpen={() => setOpen(true)}
                onClose={() => setOpen(false)}
                value={personName}
                onChange={handleChange}
                input={
                  <OutlinedInput id="select-multiple-chip" label="ishchila" />
                }
                renderValue={(selected) => (
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {names.map((name: any) => (
                  <>
                    <div
                      onClick={() => setActive(name.id)}
                      className="flex justify-between w-full items-center mb-1 p-2"
                    >
                      <div className="flex gap-2 items-center">
                        <Checkbox
                          defaultChecked={name.selected}
                          onChange={(e: any) => {
                            setWorkers(
                              workers.map((e: any) => {
                                return e._id === name.id
                                  ? { ...e, selected: !name.selected }
                                  : e;
                              })
                            );
                          }}
                        />
                        <MenuItem
                          key={name.id}
                          value={name.name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name.name}
                        </MenuItem>
                      </div>
                      <div className="flex w-[50%] gap-4">
                        <TextField
                          id="outlined-basic"
                          label="Ishlash vaqti"
                          sx={{ width: "100%" }}
                          value={name.dayOrHour}
                          onChange={(i: any) => {
                            setWorkers(
                              workers.map((e: any) => {
                                return e._id === name.id
                                  ? { ...e, dayOrHour: +i.target.value }
                                  : e;
                              })
                            );
                          }}
                          variant="outlined"
                          type="number"
                          autoComplete="off"
                          autoCorrect="off"
                          spellCheck="false"
                          InputProps={{
                            autoComplete: "off",
                            autoCorrect: "off",
                            spellCheck: "false",
                          }}
                        />

                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Ishlash muddati
                          </InputLabel>
                          <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={name.timeType}
                            label="Ishlash muddati"
                            onChange={(i: any) => {
                              setWorkers(
                                workers.map((e: any) => {
                                  return e._id === name.id
                                    ? { ...e, timeType: i.target.value }
                                    : e;
                                })
                              );
                            }}
                          >
                            <MenuItem value={"soat"}>soat</MenuItem>
                            <MenuItem value={"kun"}>kun</MenuItem>
                          </Select>
                        </FormControl>
                      </div>
                    </div>
                  </>
                ))}
              </Select>
            </FormControl>
            {open && (
              <IconButton size="large" aria-label="delete">
                <SaveIcon fontSize="inherit" color="success" />
              </IconButton>
            )}
          </div>
        </div>
      </div>
      <div className="w-full mb-[18vh]">
        <Button onClick={saqlash} color="success" fullWidth variant="contained">
          Saqlash
        </Button>
      </div>
      <div></div>
    </>
  );
}

export default CreateShartnoma;
