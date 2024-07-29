"use client";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import React, { useEffect, useRef, useState } from "react";
import WorkerAndBatalyon from "./WorkerAndBatalyon";

const Document6 = React.forwardRef(({ data, text }: any, ref: any) => {
  return (
    <>
      <div ref={ref} className="w-full flex flex-col">
        <div className="w-[90%] mb-20 flex flex-col font-bold gap-1 mx-auto text-2xl">
          <div className="text-center">
            {text?.date1 + " "}
            {latinToCyrillic("kunidan")}

            {" " + text?.date2 + " "}

            {latinToCyrillic(
              "kuniga qadar omaviy tadbirlar jamoat tartibini saqlashda ishtirok etgan harbiylar xizmatchilar"
            )}
          </div>
          <div className="w-full text-center">
            {latinToCyrillic("RO'YHATI")}
          </div>
        </div>
        <div className="w-[95%] mx-auto flex gap-10 flex-col">
          {data && data.map((e: any) => <WorkerAndBatalyon data={e} />)}
        </div>
      </div>
    </>
  );
});

export default Document6;
