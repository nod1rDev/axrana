"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import EditShartnoma from "./Components/EditShartnoma";
function page() {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getData = async () => {
    const res: any = "salom";

    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  const router = useRouter();
  return (
    <>
      <div className="w-[80%] flex-col  gap-6 mx-auto">
        {/* <EditShartnoma data={data} /> */}
      </div>
    </>
  );
}

export default page;
