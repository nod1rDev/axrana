// components/Table.tsx
import { formatNumber } from "@/app/Utils";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import React from "react";

interface TableProps {
  data: {
    contractnumber: any;
    taskdate: any;
    clientname: any;
    address: any;
    workernumber: any;
    allmoney: any;
    summa: any;
    notPaySumma: any;
    payContracts: any[];
    notPayContracts: any[];
  };
  here: boolean;
}

const WorkerTab = ({ data, here }: { data: any; here: boolean }) => {
  console.log(data);

  return (
    <table className="w-full border border-[#000] border-collapse">
      {here && (
        <thead>
          <tr>
            <th className="border border-[#000] w-[5%] font-[500] text-center">
              {latinToCyrillic("Shartnoma Raqami")}
            </th>
            <th className="border border-[#000] font-[500] w-[15%] text-center">
              {latinToCyrillic("Tadbir Sanasi")}
            </th>
            <th className="border border-[#000] font-[500] w-[18%] text-center">
              {latinToCyrillic("Buyurtmachi ismi")}
            </th>
            <th className="border border-[#000] font-[500]  w-[18%] text-center">
              {latinToCyrillic("Manzil")}
            </th>
            <th className="border border-[#000] font-[500] w-[5%] text-center">
              {latinToCyrillic("Xodimlar soni")}
            </th>
           
            <th className="border border-[#000] font-[500] text-center w-[15%]">
              {latinToCyrillic("Jami summa")}
            </th>
          </tr>
        </thead>
      )}
      <tbody>
        {data?.payContracts.map((item: any, index: number) => (
          <tr key={index}>
            <td className="border border-[#000] w-[5%] text-center">
              {item.contractnumber}
            </td>
            <td className="border border-[#000] w-[15%] text-center">
              {item.taskdate}
            </td>
            <td className="border border-[#000] w-[18%] text-center">
              {item.clientname}
            </td>
            <td className="border border-[#000] w-[18%] text-center">
              {item.address}
            </td>
            <td className="border border-[#000] w-[5%] text-center">
              {item.workernumber}
            </td>
          
            <td className="border border-[#000] text-center w-[15%]">
              {formatNumber(item.allmoney)}
            </td>
          </tr>
        ))}
        <tr>
          <td
            colSpan={7}
            className="border border-[#000] text-right pr-2 font-bold"
          >
            {latinToCyrillic("to‘lov qilingan shartnomalar jami summasi :") +
              " " +
              formatNumber(data?.summa) +
              " " +
              latinToCyrillic("so'm")}
          </td>
        </tr>
        {data?.notPayContracts.map((item: any, index: number) => (
          <tr key={index}>
            <td className="border border-[#000] w-[5%] text-center">
              {item.contractnumber}
            </td>
            <td className="border border-[#000] w-[15%] text-center">
              {item.taskdate}
            </td>
            <td className="border border-[#000] w-[18%] text-center">
              {item.clientname}
            </td>
            <td className="border border-[#000] w-[18%] text-center">
              {item.address}
            </td>
            <td className="border border-[#000] w-[5%] text-center">
              {item.workernumber}
            </td>
       
            <td className="border border-[#000] text-center w-[15%]">
              {formatNumber(item.allmoney)}
            </td>
          </tr>
        ))}
        <tr>
          <td
            colSpan={7}
            className="border border-[#000] text-right pr-2 font-bold"
          >
            {latinToCyrillic("to‘lov qilinmagan shartnomalar jami summasi :") +
              " " +
              formatNumber(data?.notPaySumma) +
              " " +
              latinToCyrillic("so'm")}
          </td>
        </tr>
      </tbody>
    </table>
  );
};

export default WorkerTab;
