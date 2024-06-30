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
import { Createshartnomaa, GETworkers, UpdateShartnoma } from "@/app/Api/Apis";
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
  const [worker2, setWorker2] = useState<any>([]);
  const [organs, setOrgans] = useState<any>([]);
  const [count, setCount] = useState(0);

  const router = useRouter();
  interface Item {
    name: string;
    selected: boolean;
  }

  const filterItems = (items: Item[]): Item[] => {
    const nameToItemsMap: { [key: string]: Item[] } = {};
    const result: Item[] = [];

    // Bir xil `name` property ga ega bo'lgan obyektlarni guruhlash
    items.forEach((item) => {
      if (!nameToItemsMap[item.name]) {
        nameToItemsMap[item.name] = [];
      }
      nameToItemsMap[item.name].push(item);
    });

    // Har bir guruhda faqat `selected: true` bo'lgan obyektlarni qoldirish
    Object.keys(nameToItemsMap).forEach((name) => {
      const group = nameToItemsMap[name];
      const selectedItems = group.filter((item) => item.selected);

      if (selectedItems.length > 0) {
        result.push(...selectedItems);
      }
    });

    // Barcha obyektlarni qaytarish (ba'zi guruhlarda `selected: true` obyekt bo'lmasligi mumkin)
    return result;
  };
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
  }, []);

  const createShartnoman = async (shartnoma: any) => {
    const res = await Createshartnomaa(JWT, shartnoma);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Shartnoma Qo'shildi"),
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
      console.log(shartnoma);
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
                onChange={(e) => handleChangeOrgans(e, index)}
                variant="outlined"
                value={organs[index].name}
                name="name"
                autoComplete="off"
              />
              <TextField
                id={`organ-time-${index}`}
                label={latinToCyrillic("Ommaviy tadbir o'tadigan soati")}
                sx={{ width: "49%" }}
                onChange={(e) => handleChangeOrgans(e, index)}
                variant="outlined"
                value={organs[index].time}
                name="time"
                autoComplete="off"
              />
            </div>
            <div className="flex w-full justify-between items-center">
              <FormControl className="w-[100%]">
                <Autocomplete
                  multiple
                  id={`workers-${index}`}
                  options={getAvailableWorkers(index)}
                  disableCloseOnSelect
                  noOptionsText={latinToCyrillic("Xodim yo'q")}
                  value={organs[index].workers}
                  getOptionLabel={(option: any) =>
                    option.zvaniya + " " + option.FIO + " " + option.batalyon
                  }
                  isOptionEqualToValue={(option: any, value: any) =>
                    option._id === value._id
                  }
                  renderOption={(props, option, { selected }) => (
                    <li {...props} key={option._id}>
                      <Checkbox
                        style={{ marginRight: 8 }}
                        checked={selected}
                        onClick={(e: any) =>
                          handleWorkerCheckboxClick(e, index, option)
                        }
                      />
                      <div className="flex gap-2">
                        <span>{option.zvaniya}</span>
                        <span>{option.FIO}</span>
                        <span>{option.batalyon}</span>
                      </div>
                    </li>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      variant="outlined"
                      label={latinToCyrillic(`Hodimlar(${e.workers.length})`)}
                    />
                  )}
                  onChange={(_, selectedWorkers) =>
                    setOrgans((prevOrgans: any) => {
                      const updatedOrgans = [...prevOrgans];
                      updatedOrgans[index].workers = selectedWorkers.map(
                        (worker) => ({ ...worker, selected: true })
                      );
                      return updatedOrgans;
                    })
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
}

export default CreateShartnoma;
