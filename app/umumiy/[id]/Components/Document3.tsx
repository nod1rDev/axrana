"use client";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import React, { useEffect, useRef, useState } from "react";
import WorkerAndBatalyon from "./WorkerAndBatalyon";
import WorkerTab2 from "./WorkerTab2";
import WorkerTab from "./WorkerTab";

const Document4 = React.forwardRef(({ data, searchStatus }: any, ref: any) => {
  return (
    <>
      <div ref={ref} className=" w-full flex flex-col">
        <div className="w-[95%] mx-auto flex gap-10 flex-col">
          <div className="w-full">
            <h1 className={`w-full text-center   text-lg `}>
              {data?.data.batalyonName + " " + latinToCyrillic("harbiy qisim")}
            </h1>
            <div className="my-4">
              {searchStatus ? (
                <WorkerTab2 here={true} data={data?.data} summa={data?.summa} />
              ) : (
                <WorkerTab here={true} data={data?.data} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

export default Document4;
