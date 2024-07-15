"use client";
import React, { useEffect, useState } from "react";
import MenuBatalyon from "../Components/MenuBatalyon";
import { getAllBatalyon } from "@/app/Api/Apis";
import { useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { latinToCyrillic } from "../add/Components/lotin";

function page() {
  const [select, setSelect] = useState();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getBatalyons = async () => {
    const res = await getAllBatalyon(JWT);

    setSelect(res.data);
  };

  useEffect(() => {
    getBatalyons();
  }, []);
  const router = useRouter()
  return (
    <div>
      
      <MenuBatalyon data={select} />
    </div>
  );
}

export default page;
