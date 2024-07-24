"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import CreateShartnoma from "./CreateShartnoma";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import { InputAdornment, TextField } from "@mui/material";
import { searchByClintName } from "@/app/Api/Apis";
import { useDispatch, useSelector } from "react-redux";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
function Shartnoma() {
  const [isLotin, setIsLotin] = useState("uz");
  const router = useRouter();
  const [value, setValue] = useState<any>({
    clientName: "",
  });
  const [data, setData] = useState<any>();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const handleChangeValue = (e: any) => {
    setValue({ [e.target.name]: e.target.value });
  };
  const dispatch = useDispatch();
  const getData = async () => {
    

    const res = await searchByClintName(JWT, value);
    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Buyurtmachi malumotlari keldi"),
          status: "sucess",
        })
      );
      setData(res.data);
    } else {
      setValue({ clientName: "" });
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Buyurtmachi malumotlari topilmadi"),
          status: "error",
        })
      );
    }
  };
  const handleSubmit = (e: any) => {
    e.preventDefault();
    getData();
  };
  return (
    <div className="w-[90%] mt-[5vh] mx-auto">
      <div className="flex justify-center mb-6 text-[28px] font-bold">
        {latinToCyrillic(" Shartnoma yaratish")}
      </div>
      <div className="flex justify-between items-center w-full mb-6">
        <Button
          sx={{ width: "140px", height: "40px" }}
          onClick={() => router.push("/shartnoma")}
          variant="contained"
        >
          {latinToCyrillic("Orqaga")}
        </Button>

        <div>
          <form onSubmit={handleSubmit}>
            <TextField
              id="clientName"
              label={latinToCyrillic("Buyurtmachi Ismi Orqali qidiring...")}
              sx={{ width: "400px" }}
              onChange={handleChangeValue}
              variant="outlined"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon color="info" />
                  </InputAdornment>
                ),
              }}
              value={value.clientName}
              name="clientName"
              autoComplete="off"
            />
          </form>
        </div>
      </div>
      <CreateShartnoma language={data} />
    </div>
  );
}

export default Shartnoma;
