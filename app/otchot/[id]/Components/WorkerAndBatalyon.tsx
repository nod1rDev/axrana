import React from "react";
import WorkerTab from "./WorkerTab";

function WorkerAndBatalyon({ data, sal }: { data: any; sal?: boolean }) {
  return (
    <div className="w-full">
      <h1
        className={`w-full text-center mb-1 text-lg ${sal ? "" : "font-[600]"}`}
      >
        {data?.batalyonName + " "} harbiy qismi:
      </h1>
      <WorkerTab sal={sal} data={data.workers} />
    </div>
  );
}

export default WorkerAndBatalyon;
