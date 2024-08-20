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
    <div className="w-full overflow-x-auto">
      {" "}
      {/* Container with horizontal scrolling */}
      <table className="min-w-[1200px] border border-[#000] border-collapse">
        {" "}
        {/* Set min-width for the table */}
        {here && (
          <thead>
            <tr>
              <th className="border border-[#000] min-w-[10px] font-[500] text-center">
                {latinToCyrillic("Shartnoma Raqami")}
              </th>
              <th className="border border-[#000] font-[500] min-w-[250px] text-center">
                {latinToCyrillic("Tadbir Sanasi")}
              </th>
              <th className="border border-[#000] font-[500] min-w-[150px] text-center">
                {latinToCyrillic("Buyurtmachi ismi")}
              </th>
              <th className="border border-[#000] font-[500] min-w-[200px] text-center">
                {latinToCyrillic("Manzil")}
              </th>
              <th className="border border-[#000] font-[500] min-w-[100px] text-center">
                {latinToCyrillic("Xodimlar soni")}
              </th>
              <th className="border border-[#000] font-[500] text-center min-w-[100px]">
                {latinToCyrillic("Shartnoma summasi")}
              </th>
              {data?.battalions?.map((e: any, index: number) => (
                <React.Fragment key={index}>
                  <th className="border border-[#000] text-[13px] font-[500] min-w-[100px] text-center">
                    {e.username + "-" + latinToCyrillic("xodimlar soni")}
                  </th>
                  <th className="border border-[#000] text-[13px] font-[500] min-w-[100px] text-center">
                    {e.username + "-" + latinToCyrillic("shartnoma summasi")}
                  </th>
                </React.Fragment>
              ))}
            </tr>
          </thead>
        )}
        <tbody>
          {data?.contracts?.map((item: any, index: number) => (
            <tr key={index}>
              <td className="border border-[#000] w-[5%] text-center">
                {item.contractnumber}
              </td>
              <td className="border border-[#000] w-[15%] text-center">
                {item.timelimit}
              </td>
              <td className="border border-[#000] w-[13%] text-center">
                {item.clientname}
              </td>
              <td className="border border-[#000] w-[13%] text-center">
                {item.address}
              </td>
              <td className="border border-[#000] w-[5%] text-center">
                {item.allworkernumber}
              </td>
              <td className="border border-[#000] w-[10%] text-center">
                {formatNumber(item.allmoney)}
              </td>
              {item?.tasks?.map((itemm: any, taskIndex: number) => (
                <React.Fragment key={taskIndex}>
                  <td className="border border-[#000] min-w-[20%] text-center">
                    {itemm.workernumber}
                  </td>
                  <td className="border border-[#000] min-w-[20%] text-center">
                    {formatNumber(itemm.allmoney)}
                  </td>
                </React.Fragment>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WorkerTab;
