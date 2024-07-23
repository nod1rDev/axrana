// components/Table.tsx
import { formatNumber } from "@/app/Utils";
import React from "react";

interface TableProps {
  data: { worker_name: any; allsumma: any }[];
}

const WorkerTab = ({ data, sal }: { data: any; sal?: any }) => {
  return (
    <table
      className={`w-full ${
        sal ? "border" : "border-[2px]"
      } border-[#000] border-collapse`}
    >
      <tbody>
        {data.map((item: any, index: number) => (
          <tr key={index}>
            <td
              className={` ${
                sal
                  ? "border pl-2 pb-2 text-[16px]"
                  : "border-[2px]  pl-4  text-xl pb-4"
              }  border-[#000] w-[5%]`}
            >
              {index + 1}.
            </td>
            <td
              className={` ${
                sal
                  ? "border pl-2 pb-2 text-[16px]"
                  : "border-[2px]  pl-4  text-xl pb-4"
              }  border-[#000] w-[70%]`}
            >
              {item.worker_name}
            </td>
            <td
              className={` ${
                sal
                  ? "border  pb-2 text-[16px]"
                  : "border-[2px]     text-xl pb-4"
              }  border-[#000] text-center w-[25%]`}
            >
              {formatNumber(item.allsumma)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default WorkerTab;
