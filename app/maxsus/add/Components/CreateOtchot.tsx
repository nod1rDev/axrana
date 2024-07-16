"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import AddOtchot from "./AddOtchot";
function CreateOtchot() {
 
  const router = useRouter();
  return (
    <div className="w-[90%] mt-[5vh] mx-auto">
      <div className="flex justify-center mb-6 text-[28px] font-bold">
       {latinToCyrillic("Maxsus batalyonga otchot yaratish")} 
      </div>
      <div className="flex justify-between items-center w-full mb-6">
        <Button
          sx={{ width: "140px", height: "40px" }}
          onClick={() => router.push("/maxsus")}
          variant="contained"
        >
          {latinToCyrillic("Orqaga")}
        </Button>

       <div></div>
      </div>
      <AddOtchot/>
    </div>
  );
}

export default CreateOtchot;
