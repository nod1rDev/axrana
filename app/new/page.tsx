"use client";
import React, { useEffect, useState } from "react";
import Otchot from "./Components/Otchot";
import MenuBatalyon2 from "./Components/Otchot";
import { getBalalon } from "../Api/Apis";
import { useSelector } from "react-redux";

function page() {
  const [data, setData] = useState();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getData = async () => {
    const res = await getBalalon(JWT);
    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <MenuBatalyon2 data={data} />
    </div>
  );
}

export default page;
