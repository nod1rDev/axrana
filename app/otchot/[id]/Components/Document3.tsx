"use client";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import React, { useEffect, useRef, useState } from "react";
import WorkerAndBatalyon from "./WorkerAndBatalyon";

const Document7 = React.forwardRef(({ data, tasks }: any, ref: any) => {
  return (
    <>
      <div ref={ref} className="w-full  flex flex-col">
        <div className="flex justify-between mb-10 w-full">
          <div className="flex-1"></div>
          <div className="flex flex-col gap-0  ">
            <p className="text-center  w-[300px]">
              O'zbekiston Respublikasi Milliy Gvardiyasining Toshkent shahar
              bo'yicha boshqarma boshlig'ining
              {" " + data?.commanddate} {" " + data?.commandnumber}-sonli
              buyrug'iga
            </p>
            <span className=" text-center w-[300px] text-lg ">1-ILOVA</span>
          </div>
        </div>

        <div className="w-[100%] mb-10 flex flex-col font-bold gap-1 mx-auto ">
          <div className="text-center">
            {data?.date1 + " "}
            {latinToCyrillic("kunidan")}
            {" " + data?.date2 + " "}
            {latinToCyrillic(
              "kuniga qadar omaviy tadbirlar jamoat tartibini saqlashda ishtirok etgan harbiylar xizmatchilar"
            )}
          </div>
          <div className="w-full text-center">
            {" "}
            {latinToCyrillic("RO'YHATI")}
          </div>
        </div>

        <div className="w-[100%] mx-auto flex gap-10 flex-col">
          {tasks &&
            tasks.map((e: any) => <WorkerAndBatalyon sal={true} data={e} />)}
        </div>
      </div>
    </>
  );
});

export default Document7;
