"use client";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import React, { useEffect, useRef, useState } from "react";
import WorkerAndBatalyon from "./WorkerAndBatalyon";

const Document7 = React.forwardRef(({ data, text }: any, ref: any) => {
  console.log(data);

  return (
    <>
      <div ref={ref} className="w-full flex flex-col">
        <div className="w-[95%] mx-auto flex gap-10 flex-col">
          <WorkerAndBatalyon data={data} />
        </div>
      </div>
    </>
  );
});

export default Document7;
