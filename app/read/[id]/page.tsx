"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import { GetStatus } from "@/app/Api/Apis";
import BittaTab from "./Components/BittaTab";

function Page() {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [count, setCount] = useState(0);
  const JWT = useSelector((state: any) => state.auth.JWT);

  const getData = async () => {
    const res = await GetStatus(JWT, id);
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  const dispatch = useDispatch();

  useEffect(() => {
    if (data && data.length > 0) {
      const newCount = data.reduce((acc: number, e: any) => {
        if (e.bajarilgan) {
          return acc + 1;
        }
        return acc;
      }, 0);
      setCount(newCount);
    }
  }, [data]);

  const router = useRouter();

  const otish = () => {
    if (count === data.length) {
      router.push("/" + id);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(
            "Barcha organlar statusi bajarilgan bo'lishi shart!"
          ),
          status: "error",
        })
      );
    }
  };

  return (
    <>
      <div className="w-[80%] mt-5 flex-col gap-6 mx-auto">
        <div className="mb-6 flex justify-between w-full items-center">
          <Button
            startIcon={<ArrowBackIcon />}
            color="info"
            variant="contained"
            onClick={() => router.push("/shartnoma")}
          >
            {"орқага"}
          </Button>
          <h1 className="font-bold text-[28px]">
            {latinToCyrillic("Organlar Statusi")}
          </h1>
          <Button color="success" variant="contained" onClick={otish}>
            {latinToCyrillic("Shartnomani ko'rish")}
          </Button>
        </div>
        <BittaTab ranks={data} />
      </div>
    </>
  );
}

export default Page;
