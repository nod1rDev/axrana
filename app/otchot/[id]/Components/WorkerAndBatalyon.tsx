import React from "react";
import WorkerTab from "./WorkerTab";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

function WorkerAndBatalyon({ data, sal }: { data: any; sal?: boolean }) {
  return (
    <div className="w-full">
      <h1
        className={`w-full text-center mb-1 text-lg ${sal ? "" : "font-[600]"}`}
      >
        {data?.batalyonName + " " + latinToCyrillic("harbiy qisim:")}
      </h1>
      <WorkerTab sal={data?.allsumma} data={data.workers} />
    </div>
  );
}

export default WorkerAndBatalyon;
