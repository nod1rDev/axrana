"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ChangeShartnoma from "./ChangeShartnoma";

function EditShartnoma({ data }: { data: any }) {
  const [isLotin, setIsLotin] = useState("uz");
  const router = useRouter();

  
  return (
    <div className="w-[95%] mt-[5vh] mx-auto">
      <div className="flex justify-center mb-6 text-[28px] font-bold">
        Shartnoma tahrirlash
      </div>
      <div className="flex justify-between items-center w-full mb-6">
        <Button
          sx={{ width: "140px", height: "40px" }}
          onClick={() => router.push("/" + data._id)}
          variant="contained"
        >
          Orqaga
        </Button>

        <FormControl sx={{ width: "160px" }}>
          <Select
            value={isLotin}
            onChange={(e: any) => setIsLotin(e.target.value)}
          >
            <MenuItem value={"uz"}>lotincha</MenuItem>
            <MenuItem value={"ru"}>krilcha</MenuItem>
          </Select>
        </FormControl>
      </div>
      <ChangeShartnoma ShartNomaData={data} language={isLotin} />
    </div>
  );
}

export default EditShartnoma;
