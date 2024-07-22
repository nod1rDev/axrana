"use client";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import React, { useEffect, useRef, useState } from "react";
import WorkerAndBatalyon from "./WorkerAndBatalyon";

const Document4 = React.forwardRef(({ data }: any, ref: any) => {
  return (
    <>
      <div ref={ref} className="w-full  flex flex-col">
        <h1 className="font-bold text-[20px] mx-auto my-10">
          {latinToCyrillic("Maxsus Batalyon")}
        </h1>
        <div className="w-[95%] mx-auto flex gap-10 flex-col">
          {data && data.map((e: any) => <WorkerAndBatalyon data={e} />)}
        </div>
      </div>
    </>
  );
});

export default Document4;
