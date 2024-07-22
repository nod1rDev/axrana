"use client";
import React, { useEffect, useState } from "react";

import { getAllBatalyon, getBatalyonUmumiy, getExcelWorker1 } from "@/app/Api/Apis";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

import CloudDownloadIcon from "@mui/icons-material/CloudDownload";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "../tip/add/Components/lotin";
import MenuBatalyon2 from "./Components/MenuBatalyon2";
function page() {
  const [select, setSelect] = useState();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getBatalyons = async () => {
    const res = await getBatalyonUmumiy(JWT);

    setSelect(res.data);
  };

  useEffect(() => {
    getBatalyons();
  }, []);

  
 
  return (
    <div>
      <div className="flex flex-col ">
        <MenuBatalyon2 data={select} />
      </div>
    </div>
  );
}

export default page;
