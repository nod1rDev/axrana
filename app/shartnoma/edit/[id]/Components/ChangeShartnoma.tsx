import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import {
  Box,
  Button,
  IconButton,
  FormControl,
  Checkbox,
  Autocomplete,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GETworkers, GetWorkerByOrgan, UpdateShartnoma } from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

interface Worker {
  FIO: string;
  batalyon: string;
  zvaniya: string;
  _id: string;
  selected?: boolean;
}

interface Organ {
  name: string;
  time: string;
  workers: Worker[];
  _id: string | number;
}

interface ShartnomaData {
  date: string;
  shartnomaNumber: string;
  timeLimit: string;
  buyurtmachi: string;
  address: string;
  smeta?: {
    organs: Organ[];
  };
  _id: string;
}

interface ChangeShartnomaProps {
  language: string;
  ShartNomaData: ShartnomaData;
}

const ChangeShartnoma: React.FC<ChangeShartnomaProps> = ({
  language,
  ShartNomaData,
}) => {
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = useState({
    date: "",
    shartnomaNumber: "",
    timeLimit: "",
    buyurtmachi: "",
    address: "",
    organs: [] as Organ[],
  });

  const [workers, setWorkers] = useState<Worker[]>([]);
  const [organs, setOrgans] = useState<Organ[]>([]);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (ShartNomaData) {
      const formattedData: any = {
        ...ShartNomaData,
        date: formatDate(ShartNomaData.date),
      };
      setValue(formattedData);
      setOrgans(
        ShartNomaData.smeta?.organs.map((e) => ({
          name: e.name,
          time: e.time,
          workers: e.workers.map((i) => ({
            FIO: i.FIO,
            batalyon: i.batalyon,
            zvaniya: i.zvaniya,
            _id: i._id,
            selected: true,
          })),
          _id: e._id,
        })) || []
      );
      getWorkerFor();
    }
  }, [ShartNomaData]);

  function processArray(array: Worker[]) {
    const processedArray: Worker[] = [];
    const FIOMap: { [key: string]: Worker[] } = {};

    array.forEach((obj) => {
      if (!FIOMap[obj.FIO]) {
        FIOMap[obj.FIO] = [];
      }
      FIOMap[obj.FIO].push(obj);
    });

    Object.keys(FIOMap).forEach((FIO) => {
      const objects = FIOMap[FIO];
      if (objects.length > 1) {
        objects[0].selected = true;
        processedArray.push(objects[0]);
      } else {
        objects[0].selected = false;
        processedArray.push(objects[0]);
      }
    });

    return processedArray;
  }

  const getWorkerFor = async () => {
    if (ShartNomaData) {
      const res = await GETworkers(JWT);
      const worker1 = res.data.map((e: Worker) => ({
        ...e,
        selected: false,
      }));
      const organWorker = await getOrganWorker();
      const filter = processArray([...worker1, ...organWorker]);
      setWorkers(filter);
    }
  };

  const getOrganWorker = async () => {
    const res = await GetWorkerByOrgan(JWT, ShartNomaData._id);

    if (res.success) {
      return res.data.map((e: Worker) => ({
        ...e,
        selected: true,
      }));
    } else {
      return [];
    }
  };

  const createShartnoman = async (shartnoma: typeof value) => {
    const res = await UpdateShartnoma(JWT, shartnoma, ShartNomaData._id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Shartnoma tahrirlandi"),
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

  const saqlash = () => {
    const filtOrgans = organs.map((organ) => ({
      name: organ.name,
      time: organ.time,
      workers: organ.workers.map((worker) => ({
        FIO: worker.FIO,
        batalyon: worker.batalyon,
        zvaniya: worker.zvaniya,
      })),
    }));

    const shartnoma: any = { ...value, organs: filtOrgans };
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

  const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleChangeOrgans = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const updatedOrgans = [...organs];
    updatedOrgans[index] = {
      ...updatedOrgans[index],
      [e.target.name]: e.target.value,
    };
    setOrgans(updatedOrgans);
  };

  const handleWorkerSelect = (index: number, worker: Worker) => {
    const updatedWorkers = workers.map((w) =>
      w._id === worker._id ? { ...w, selected: !w.selected } : w
    );
    setWorkers(updatedWorkers);

    const updatedOrgans = [...organs];
    const organWorkers = updatedOrgans[index].workers;
    if (organWorkers.find((w) => w._id === worker._id)) {
      updatedOrgans[index].workers = organWorkers.filter(
        (w) => w._id !== worker._id
      );
    } else {
      updatedOrgans[index].workers = [
        ...organWorkers,
        { ...worker, selected: true },
      ];
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
      if (removedWorkers.find((rw) => rw._id === w._id)) {
        return { ...w, selected: false };
      }
      return w;
    });
    setWorkers(updatedWorkers);

    const updatedOrgans = organs.filter((_, i) => i !== index);
    setOrgans(updatedOrgans);
  };

  const getAvailableWorkers = (currentOrganIndex: number) => {
    const selectedWorkers = organs.flatMap((organ, index) =>
      index !== currentOrganIndex ? organ.workers : []
    );

    return workers.filter(
      (worker) => !selectedWorkers.some((w) => w._id === worker._id)
    );
  };

  const handleWorkerCheckboxClick = (
    e: React.MouseEvent<HTMLButtonElement>,
    index: number,
    worker: Worker
  ) => {
    e.stopPropagation();
    handleWorkerSelect(index, worker);
  };

  function removeHyphens(input: string) {
    return input.replace(/-/g, "");
  }

  function formatDate(dateString: string) {
    if (dateString) {
      const [day, month, year] = dateString.split(" ");

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

      if (!monthNumber) {
        throw new Error(`Invalid month: ${month}`);
      }

      return removeHyphens(`${day}.${monthNumber}.${year}`);
    }
    return "";
  }

  return (
    <>
      <div className="flex flex-col mt-[15vh] mb-[9vh] gap-0 w-full">
        <div className="flex w-full justify-between mb-4 gap-4 ">
          <TextField
            id="shartnomaNumber"
            label={latinToCyrillic("Shartnoma Raqam")}
            sx={{ width: "35%" }}
            value={value.shartnomaNumber}
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
            value={value.date}
            name="date"
            autoComplete="off"
          />
          <TextField
            id="buyurtmachi"
            label={latinToCyrillic("Buyurtmachi")}
            sx={{ width: "30%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.buyurtmachi}
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
            sx={{ width: "49%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.timeLimit}
            name="timeLimit"
            autoComplete="off"
          />
          <TextField
            id="address"
            label={latinToCyrillic("Tadbir o'tadigan joy manzil")}
            sx={{ width: "49%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.address}
            name="address"
            autoComplete="off"
          />
        </div>
        <div className="font-bold text-[28px]">{latinToCyrillic("Smeta")}</div>
        {organs?.map((e: any, index: any) => (
          <div
            key={index}
            className="flex  gap-2 mt-3 mb-4 border-2 border-sky-600 rounded-xl p-4"
          >
            <div className="flex w-full gap-3 justify-between">
              <TextField
                id={`organ-name-${index}`}
                label={latinToCyrillic("Organ nomi")}
                sx={{ width: "49%" }}
                onChange={(e: any) => handleChangeOrgans(e, index)}
                variant="outlined"
                value={organs[index].name}
                name="name"
                autoComplete="off"
              />
              <TextField
                id={`organ-time-${index}`}
                label={latinToCyrillic("Ommaviy tadbir o'tadigan soati")}
                sx={{ width: "49%" }}
                onChange={(e: any) => handleChangeOrgans(e, index)}
                variant="outlined"
                type="number"
                value={organs[index].time}
                name="time"
                autoComplete="off"
              />
            </div>
            <div className="flex w-full justify-between items-center">
              <FormControl className="w-full">
                <Autocomplete
                  multiple
                  options={getAvailableWorkers(index)}
                  getOptionLabel={(option: any) =>
                    option.zvaniya + " " + option.FIO + " " + option.batalyon
                  }
                  renderOption={(props, option) => (
                    <li {...props}>
                      <Checkbox
                        icon={<AddIcon />}
                        checkedIcon={<RemoveCircleIcon />}
                        checked={option.selected}
                        onClick={(e) =>
                          handleWorkerCheckboxClick(e, index, option)
                        }
                      />
                      {option.FIO}
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={latinToCyrillic(`Hodimlar(${e.workers.length})`)}
                    />
                  )}
                  value={organs[index].workers}
                  onChange={(event, newValue) => {
                    const updatedOrgans = [...organs];
                    updatedOrgans[index].workers = newValue;
                    setOrgans(updatedOrgans);
                  }}
                  isOptionEqualToValue={(option, value) =>
                    option._id === value._id
                  }
                />
              </FormControl>
              <IconButton
                color="error"
                className="h-[56px]"
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
};

export default ChangeShartnoma;
