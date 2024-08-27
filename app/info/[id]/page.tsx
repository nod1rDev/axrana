"use client";
import React, { useEffect, useRef, useState } from "react";
import { Button, Container, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { URL, getInfosByID, getInfosID } from "@/app/Api/Apis";
import { useParams, useRouter } from "next/navigation";
import ReactPlayer from "react-player";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
function Page() {
  const { id } = useParams();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [data, setData] = useState<string | null>(null);
  const [text, setText] = useState<any>();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const getData = async () => {
    // Ma'lumotlarni olish
    const res = await getInfosByID(JWT, id, "bytes=0-999");
    const res2 = await getInfosID(JWT, id);

    setData(res.data);
    setText(res2.data);
  };

  useEffect(() => {
    getData();
  }, []);
  const router = useRouter()

  return (
    <>
    <div className="mt-10 ml-10">
      <Button
        startIcon={<ArrowBackIcon />}
        color="info"
        variant="contained"
        onClick={() => (router.back())}
      >
        {"орқага"}
      </Button>
      </div>
      <div className="max-w-[98%] mx-auto  p-6 text-black  ">
        <h1 className="font-bold text-[48px] text-center  mb-6">
          {text && text.title + latinToCyrillic(" yuriqnomasi")}
        </h1>

        {data && (
          <div className="flex justify-center ">
            <ReactPlayer
              url={URL + "/" + data}
              controls={true}
              width="50%"
              height="auto"
              className="rounded-lg overflow-hidden shadow-md"
            />
          </div>
        )}
        <span className=" text-[28px] block text-center mt-4 mb-10">
          {text && text.descr}
        </span>

        <span className="text-[32px] mt-10 font-[500]">
          {latinToCyrillic("Dasturchi telefon raqami: 99-299-69-37")}
        </span>
      </div>
    </>
  );
}

export default Page;
