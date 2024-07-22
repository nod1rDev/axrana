import React from "react";
import WorkerTab from "./WorkerTab";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

function WorkerAndBatalyon({ data, sal }: { data: any; sal?: boolean }) {
  return (
    <div className="w-full">
      <h1 className={`w-full text-center   text-lg `}>
        {data?.batalyonName + " " + latinToCyrillic("harbiy qisim")}
      </h1>
      <div className="my-4">
        <WorkerTab here={true} data={data} />
      </div>
      
    </div>
  );
}

export default WorkerAndBatalyon;
