"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ChangeShartnoma from "./ChangeShartnoma";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

function EditShartnoma({ data }: { data: any }) {
  const [isLotin, setIsLotin] = useState("uz");
  const router = useRouter();
 

  return (
    <div className="w-[100%] mt-[5vh] mx-auto">
      <div className="flex justify-center mb-6 text-[28px] font-bold">
        {latinToCyrillic("Shartnoma tahrirlash")}
      </div>
      <div className="flex justify-between items-center w-full mb-6">
        <Button
          sx={{ width: "140px", height: "40px" }}
          onClick={() => router.push("/" + data._id)}
          variant="contained"
        >
          {latinToCyrillic("Orqaga")}
        </Button>

        <div></div>
      </div>
      <ChangeShartnoma ShartNomaData={data} language={isLotin} />
    </div>
  );
}

export default EditShartnoma;
