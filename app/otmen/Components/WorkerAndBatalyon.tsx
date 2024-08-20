import React from "react";
import WorkerTab from "./WorkerTab";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

function WorkerAndBatalyon({ data, sal }: { data: any; sal?: boolean }) {
  console.log(data);
  
  return (
    <div className="w-full">
      <div className="my-4">
        <WorkerTab here={true} data={data} />
      </div>
    </div>
  );
}

export default WorkerAndBatalyon;
