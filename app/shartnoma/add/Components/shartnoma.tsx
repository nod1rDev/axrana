"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import CreateShartnoma from "./CreateShartnoma";
function Shartnoma() {
  const [isLotin, setIsLotin] = useState("uz");
  const router = useRouter();
  return (
    <div className="w-[90%] mt-[5vh] mx-auto">
      <div className="flex justify-center mb-6 text-[28px] font-bold">
        Shartnoma yaratish
      </div>
      <div className="flex justify-between items-center w-full mb-6">
        <Button
          sx={{ width: "140px", height: "40px" }}
          onClick={() => router.push("/shartnoma")}
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
      <CreateShartnoma language={isLotin} />
    </div>
  );
}

export default Shartnoma;