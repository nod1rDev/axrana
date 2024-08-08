"use client";
// components/Table.tsx
import { formatNumber } from "@/app/Utils";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import React, { useEffect, useState } from "react";

const WorkerTab = ({ data, here }: { data: any; here: boolean }) => {
  const [payContracts, setPayContracts] = useState<any[]>([]);
  const [notPayContracts, setNotPayContracts] = useState<any[]>([]);

  useEffect(() => {
    if (data && data.tasks) {
      const filt1 = data.tasks.filter((e: any) => e.pay);
      const filt2 = data.tasks.filter((e: any) => !e.pay);
      setPayContracts(filt1);
      setNotPayContracts(filt2);
    }
  }, [data]);

  return (
    <table className="w-full border border-[#000] border-collapse">
      {here && (
        <thead>
          <tr>
            <th className="border border-[#000] w-[5%] font-[500] text-center">
              {latinToCyrillic("Shartnoma Raqami")}
            </th>
            <th className="border border-[#000] font-[500] w-[20%] text-center">
              {latinToCyrillic("Tadbir Sanasi")}
            </th>
            <th className="border border-[#000] font-[500] w-[13%] text-center">
              {latinToCyrillic("Buyurtmachi ismi")}
            </th>
            <th className="border border-[#000] font-[500] w-[13%] text-center">
              {latinToCyrillic("Manzil")}
            </th>
            <th className="border border-[#000] font-[500] w-[5%] text-center">
              {latinToCyrillic("Xodimlar soni")}
            </th>
            <th className="border border-[#000] font-[500] text-center w-[10%]">
              {latinToCyrillic("Jami summa")}
            </th>
            <th className="border border-[#000] font-[500] text-center w-[8%]">
              {latinToCyrillic("Naqd")}
            </th>
            <th className="border border-[#000] font-[500] text-center w-[8%]">
              {latinToCyrillic("Kridit")}
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {data?.tasks.map((item: any, index: number) => (
          <tr key={index}>
            <td className="border border-[#000] w-[5%] text-center">
              {item.contractnumber}
            </td>
            <td className="border border-[#000] w-[15%] text-center">
              {item.taskdate}
            </td>
            <td className="border border-[#000] w-[13%] text-center">
              {item.clientname}
            </td>
            <td className="border border-[#000] w-[13%] text-center">
              {item.address}
            </td>
            <td className="border border-[#000] w-[5%] text-center">
              {item.workernumber}
            </td>
            <td className="border border-[#000] w-[10%] text-center">
              {formatNumber(item.allmoney)}
            </td>
            <td className="border border-[#000] w-[8%] text-center">
              {item.pay ? formatNumber(item.allmoney) : 0}
            </td>
            <td className="border border-[#000] w-[8%] text-center">
              {!item.pay ? formatNumber(item.allmoney) : 0}
            </td>
          </tr>
        ))}

        <tr>
          <td
            colSpan={5}
            className="border border-[#000] text-center pr-2 font-bold"
          >
            {data.batalyonName}
          </td>
          <td
            colSpan={1}
            className="border border-[#000] text-center pr-2 font-bold"
          >
            {data.allMoney}
          </td>
          <td
            colSpan={1}
            className="border border-[#000] text-center pr-2 font-bold"
          >
            {data.summa}
          </td>
          <td
            colSpan={1}
            className="border border-[#000] text-center pr-2 font-bold"
          >
            {data.notPaySumma}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default WorkerTab;
