"use client";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getInfos } from "../Api/Apis";
import MenuBatalyon10 from "./MenuBatalyon";

function page() {
  const [data, setData] = useState();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getData = async () => {
    const res = await getInfos(JWT);
    console.log(res);

    setData(res.data);
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <MenuBatalyon10 data={data} />
    </div>
  );
}

export default page;
