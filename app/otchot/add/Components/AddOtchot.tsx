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
import { createContract, createResult, getAllBatalyon } from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { useRouter } from "next/navigation";
import AddIcon from "@mui/icons-material/Add";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function AddOtchot() {
  const JWT = useSelector((s: any) => s.auth.JWT);
  const dispatch = useDispatch();
  const [value, setValue] = useState<any>({});
  const router = useRouter();
  const createResout = async () => {
    const res = await createResult(JWT, value);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Otchot yaratildi"),
          status: "success",
        })
      );
      router.push("/otchot");
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
    console.log(value);

    createResout();
  };
  const handleChangeValue = (e: any) => {
    if (e.target.name == "commandNumber") {
      setValue({ ...value, [e.target.name]: +e.target.value });
    }else{
      setValue({ ...value, [e.target.name]: e.target.value });
    }
  };

  return (
    <>
      <div className="flex flex-col mt-[15vh] mb-[9vh] gap-0 w-full">
        <div className="flex w-full justify-between mb-4 gap-4">
          <TextField
            id="date1"
            label={latinToCyrillic("Boshlanish sanasi")}
            sx={{ width: "25%" }}
            value={value.date1}
            onChange={handleChangeValue}
            variant="outlined"
            name="date1"
            autoComplete="off"
          />
          <TextField
            id="date2"
            label={latinToCyrillic("Tugatilish Sanasi")}
            sx={{ width: "25%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.date2}
            name="date2"
            autoComplete="off"
          />
          <TextField
            id="commandNumber"
            label={latinToCyrillic("Buyruq Raqami")}
            sx={{ width: "25%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.commandNumber}
            name="commandNumber"
            autoComplete="off"
          />
          <TextField
            id="commandDate"
            label={latinToCyrillic("Buyruq Sanasi")}
            sx={{ width: "25%" }}
            onChange={handleChangeValue}
            variant="outlined"
            value={value.commandDate}
            name="commandDate"
            autoComplete="off"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <Button variant="contained" color="success" fullWidth onClick={saqlash}>
          {latinToCyrillic("Saqlash")}
        </Button>
      </div>
    </>
  );
}

export default AddOtchot;
