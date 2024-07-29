"use client";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import React, { useEffect, useRef, useState } from "react";
import MaiTab from "./MainTab";

const Document5 = React.forwardRef(({ data }: any, ref: any) => {
  return (
    <>
      <div ref={ref} className=" w-full   flex flex-col">
        <h1 className="font-bold my-6 text-center text-[18px]">
          {latinToCyrillic("RO'YHAT")}
        </h1>
        <div className="w-[95%] mx-auto flex gap-10 flex-col">
          <MaiTab data={data} />
        </div>
      </div>
    </>
  );
});

export default Document5;
