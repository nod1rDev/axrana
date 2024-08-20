"use client";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import React, { useEffect, useRef, useState } from "react";
import WorkerAndBatalyon from "./WorkerAndBatalyon";
import WorkerTab from "./WorkerTab";

const Document20 = React.forwardRef(({ data, text }: any, ref: any) => {
  return (
    <>
      <div ref={ref} className="w-full flex flex-col">
        <div className="w-[100%] mx-auto flex gap-10 flex-col">
          <WorkerTab here={true} data={data} />
        </div>
      </div>
    </>
  );
});

export default Document20;
