"use client";
import React, { useEffect, useState } from "react";
import Status from "../../Components/Status";

interface TaskDetailsProps {
  data: {
    battalion: string;
    contractnumber: string;
    clientname: string;
    taskdate: string;
    workernumber: string;
    timemoney: string;
    tasktime: string;
    timeLimit: string;
    inProgress: boolean;
    done: boolean;
    notDone: boolean;
  };
}

const TaskDetails: React.FC<TaskDetailsProps> = ({ data }) => {
  const [status, setStatus] = useState<any>();

  useEffect(() => {
    if (data) {
      const filtStat = data.done
        ? "bajarildi"
        : data.notDone
        ? "bajarilmagan"
        : data.inProgress
        ? "bajarilmoqda"
        : "";

      setStatus(filtStat);
    }
  }, [data]);
  return (
    <>
      {data && (
        <div className="w-full mx-auto p-4 text-xl font-bold ">
          <h2 className="text-5xl font-bold mb-6">Топшириқ тафсилотлари</h2>
          <p className="mb-4">{data.battalion}</p>
          <p className="mb-4">{data.contractnumber}</p>
          <p className="mb-4">{data.clientname}</p>
          <p className="mb-4">{data.taskdate}</p>
          <p className="mb-4">{data.workernumber}</p>
          <p className="mb-4">{data.timemoney}</p>
          <p className="mb-4">{data.tasktime}</p>
          <p className="mb-4">{data.timeLimit}</p>
          <div className="mt-6">
            <Status status={status} />
          </div>
        </div>
      )}
    </>
  );
};

export default TaskDetails;
