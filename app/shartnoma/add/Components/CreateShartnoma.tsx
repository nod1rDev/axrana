import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  IconButton,
  FormControl,
  InputLabel,
  Checkbox,
  Autocomplete,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Createshartnomaa, GETworkers } from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

function CreateShartnoma({ language }: { language: any }) {
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [value, setValue] = useState<any>({
    date: "",
    shartnomaNumber: "",
    timeLimit: "",
    buyurtmachi: "",
    address: "",
    organs: [],
  });

  const [workers, setWorkers] = useState<any[]>([]);
  const [organs, setOrgans] = useState<any>([
    {
      name: "",
      time: "",
      workers: [],
      _id: Math.ceil(Math.random() * 10000),
    },
  ]);

  const router = useRouter();

  const getWorkerFor = async () => {
    const res = await GETworkers(JWT);
    setWorkers(
      res.data.map((e: any) => {
        return {
          ...e,
          selected: false,
        };
      })
    );
  };

  useEffect(() => {
    getWorkerFor();
  }, []);

  const createShartnoman = async (shartnoma: any) => {
    const res = await Createshartnomaa(JWT, shartnoma);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Shartnoma qo'shildi"),
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

  const dispatch = useDispatch();
  const saqlash = () => {
    const filtOrgans = organs.map((organ: any) => {
      return {
        name: organ.name,
        time: organ.time,
        workers: organ.workers.map((worker: any) => {
          return {
            FIO: worker.FIO,
            batalyon: worker.batalyon,
            zvaniya: worker.zvaniya,
          };
        }),
      };
    });
    const shartnoma = { ...value, organs: filtOrgans };
    if (shartnoma.organs && shartnoma.shartnomaNumber) {
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

  const handleChangeOrgans = (e: any, index: number) => {
    const updatedOrgans = [...organs];
    updatedOrgans[index] = {
      ...updatedOrgans[index],
      [e.target.name]: e.target.value,
    };
    setOrgans(updatedOrgans);
  };

  const handleWorkerSelect = (index: number, worker: any) => {
    const updatedWorkers = workers.map((w) =>
      w._id === worker._id ? { ...w, selected: !w.selected } : w
    );
    setWorkers(updatedWorkers);

    const updatedOrgans = [...organs];
    const organWorkers = updatedOrgans[index].workers;
    if (organWorkers.find((w: any) => w._id === worker._id)) {
      updatedOrgans[index].workers = organWorkers.filter(
        (w: any) => w._id !== worker._id
      );
    } else {
      updatedOrgans[index].workers = [...organWorkers, worker];
    }
    setOrgans(updatedOrgans);
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
    const removedWorkers = organs[index].workers;
    const updatedWorkers = workers.map((w) => {
      if (removedWorkers.find((rw: any) => rw._id === w._id)) {
        return { ...w, selected: false };
      }
      return w;
    });
    setWorkers(updatedWorkers);

    const updatedOrgans = organs.filter((_: any, i: any) => i !== index);
    setOrgans(updatedOrgans);
  };

  const getAvailableWorkers = (currentOrganIndex: number) => {
    const selectedWorkers = organs.flatMap((organ: any, index: any) =>
      index !== currentOrganIndex ? organ.workers : []
    );
    return workers.filter(
      (worker) => !selectedWorkers.some((w: any) => w._id === worker._id)
    );
  };

  const handleWorkerCheckboxClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    index: number,
    worker: any
  ) => {
    e.stopPropagation();
    handleWorkerSelect(index, worker);
  };

  function getFirstWord(text: string): string {
    // Find the index of the first space
    const firstSpaceIndex = text.indexOf(" ");

    // If a space is found, return the substring up to the space
    if (firstSpaceIndex !== -1) {
      return text.substring(0, firstSpaceIndex);
    } else {
      // If no space is found, return the entire string
      return text;
    }
  }

  return (
    <>
      <div className="flex flex-col mt-[15vh] mb-[9vh] gap-0 w-full">
        <div className="flex w-full justify-between mb-4 gap-4 ">
          <TextField
            id="shartnomaNumber"
            label={latinToCyrillic("Shartnoma Raqam")}
            sx={{ width: "35%" }}
            onChange={handleChangeValue}
            variant="outlined"
            name="shartnomaNumber"
            autoComplete="off"
          />
          <TextField
            id="date"
            label={latinToCyrillic("Shartnoma sanasi")}
            sx={{ width: "30%" }}
            onChange={handleChangeValue}
            variant="outlined"
            name="date"
            autoComplete="off"
          />
          <TextField
            id="buyurtmachi"
            label={latinToCyrillic("Buyurtmachi")}
            sx={{ width: "35%" }}
            onChange={handleChangeValue}
            variant="outlined"
            name="buyurtmachi"
            autoComplete="off"
          />
        </div>
        <div className="flex w-full justify-between mb-4 gap-4">
          <TextField
            id="timeLimit"
            label={latinToCyrillic(
              "Bajaruchi fuqorolar xavsizligini va jamoat tartibini saqlash muddati"
            )}
            multiline
            sx={{ width: "50%" }}
            onChange={handleChangeValue}
            variant="outlined"
            name="timeLimit"
            autoComplete="off"
          />
          <TextField
            id="address"
            label={latinToCyrillic("Tadbir o'tadigan joy manzil")}
            sx={{ width: "50%" }}
            onChange={handleChangeValue}
            variant="outlined"
            name="address"
            multiline
            autoComplete="off"
          />
        </div>
        <div className="flex gap-4 flex-col w-full">
          <div className="text-[24px] font-bold mb-2">
            {latinToCyrillic("Smeta")}
          </div>
          {organs.map((organ: any, index: any) => (
            <div key={organ._id} className="flex gap-4 w-full">
              <TextField
                label={latinToCyrillic("Organ nomi")}
                multiline
                sx={{ width: "26%" }}
                onChange={(e) => handleChangeOrgans(e, index)}
                variant="outlined"
                name="name"
                value={organ.name}
                autoComplete="off"
              />
              <TextField
                label={latinToCyrillic("Ommaviy tadbir o'tadigan soati")}
                multiline
                sx={{ width: "28%" }}
                onChange={(e) => handleChangeOrgans(e, index)}
                variant="outlined"
                name="time"
                value={organ.time}
                autoComplete="off"
              />
              <FormControl sx={{ width: "38%" }}>
                <Autocomplete
                  multiple
                  options={getAvailableWorkers(index)}
                  getOptionLabel={(option: any) => getFirstWord(option.FIO)}
                  value={organ.workers}
                  onChange={(e, newValue) => {
                    const selectedWorkers = newValue;
                    setOrgans((prev: any) =>
                      prev.map((o: any, i: any) =>
                        i === index ? { ...o, workers: selectedWorkers } : o
                      )
                    );
                    const selectedWorkerIds = selectedWorkers.map(
                      (w: any) => w._id
                    );
                    setWorkers((prev) =>
                      prev.map((w) =>
                        selectedWorkerIds.includes(w._id)
                          ? { ...w, selected: true }
                          : { ...w, selected: false }
                      )
                    );
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label={`${latinToCyrillic("Xodimlar")} (${
                        organ.workers.length
                      })`}
                    />
                  )}
                  renderOption={(props, option) => (
                    <li
                      {...props}
                      onClick={(e: any) =>
                        handleWorkerCheckboxClick(e, index, option)
                      }
                    >
                      <Checkbox checked={option.selected} />
                      <div className="flex gap-2">
                        <span>{option.zvaniya},</span>
                        <span>{option.FIO},</span>
                        <span>{option.batalyon}</span>
                      </div>
                    </li>
                  )}
                  disableCloseOnSelect
                />
              </FormControl>
              <div className="flex gap-2 w-[10%]">
                <IconButton
                  sx={{ width: "60px", height: "60px" }}
                  onClick={() => handleRemoveOrgan(index)}
                >
                  <RemoveCircleIcon fontSize="medium" color="error" />
                </IconButton>
                <IconButton
                  sx={{ width: "60px", height: "60px" }}
                  onClick={handleAddOrgan}
                >
                  <AddIcon fontSize="medium" color="success" />
                </IconButton>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="w-full mb-[5vh]">
        <Button onClick={saqlash} color="success" fullWidth variant="contained">
          {latinToCyrillic("Saqlash")}
        </Button>
      </div>
    </>
  );
}

export default CreateShartnoma;
