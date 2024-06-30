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
import { Createshartnomaa, GETworkers, UpdateShartnoma } from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

function ChangeShartnoma({
  language,
  ShartNomaData,
}: {
  language: any;
  ShartNomaData: any;
}) {
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
  React.useEffect(() => {
    if (ShartNomaData) {
      setValue(ShartNomaData);
      setOrgans(
        ShartNomaData.smeta?.organs.map((e: any) => {
          return {
            name: e.name,
            time: e.time,
            workers: e.workers.map((i: any) => {
              return {
                FIO: i.FIO,
                batalyon: i.batalyon,
                zvaniya: i.zvaniya,
                _id: i._id,
                selected: true,
              };
            }),
            _id: e._id,
          };
        })
      );
      getWorkerFor();
    }
  }, [ShartNomaData]);
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
    if (organs) {
      const res = await GETworkers(JWT);
      const worker1 = res.data.map((e: any) => {
        return {
          ...e,
          selected: false,
        };
      });
      setWorkers(filterItems([...worker1, ...worker2]));
      console.log(filterItems([...worker1, ...worker2]));
    }
  };

  useEffect(() => {
    if (organs) {
      organs.forEach((work: any) => {
        setWorker2([...worker2, ...work.workers]);
      });
    }
  }, [organs]);

  useEffect(() => {
    if (worker2 && count <= 1) {
      setCount(count + 1);
      console.log(count);

      getWorkerFor();
    }
  }, [worker2]);

  const createShartnoman = async (shartnoma: any) => {
    const res = await UpdateShartnoma(JWT, shartnoma, ShartNomaData._id);
    console.log(JWT, shartnoma, ShartNomaData._id);

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
            sx={{ width: "35%" }}
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
            value={value.timeLimit}
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
            value={value.address}
            name="address"
            multiline
            autoComplete="off"
          />
        </div>
        <div className="flex gap-4 flex-col w-full">
          <div className="text-[24px] font-bold mb-2">
            {latinToCyrillic("Smeta")}
          </div>
          {organs &&
            organs.map((organ: any, index: any) => (
              <div key={organ._id} className="flex gap-4 w-full">
                <TextField
                  label={latinToCyrillic("Organ nomi")}
                  sx={{ width: "26%" }}
                  onChange={(e) => handleChangeOrgans(e, index)}
                  variant="outlined"
                  name="name"
                  value={organ.name}
                  autoComplete="off"
                />
                <TextField
                  label={latinToCyrillic("Ommaviy tadbir o'tadigan soati")}
                  sx={{ width: "28%" }}
                  onChange={(e) => handleChangeOrgans(e, index)}
                  variant="outlined"
                  name="time"
                  type="number"
                  value={organ.time}
                  autoComplete="off"
                />
                <FormControl sx={{ width: "38%" }}>
                  <Autocomplete
                    multiple
                    options={getAvailableWorkers(index)}
                    getOptionLabel={(option: any) =>
                      option.zvaniya + " " + option.FIO + " " + option.batalyon
                    }
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
                          <span>{option.zvaniya}</span>
                          <span>{option.FIO}</span>
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

export default ChangeShartnoma;
