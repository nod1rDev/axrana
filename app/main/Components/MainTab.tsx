// components/Table.tsx
import { formatNumber } from "@/app/Utils";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import React from "react";

interface TableProps {
  data: {
    Xodim: string;
    Tolangan_summa: string;
    Tolanmagan_summa: number;
    Umumiy_summa: string;
  }[];
}

const MaiTab = ({ data }: TableProps) => {
  return (
    <table className="w-full border border-[#000] border-collapse">
      <thead>
        <tr>
          <th className="border border-[#000] px-2 py-1 text-left">
            {latinToCyrillic("x/r")}
          </th>
          <th className="border border-[#000] px-2 py-1 text-left">
            {" "}
            {latinToCyrillic("Xodim")}
          </th>
          <th className="border border-[#000] px-2 py-1 text-left">
            {latinToCyrillic("Tolangan summa")}
          </th>
          <th className="border border-[#000] px-2 py-1 text-left">
            {latinToCyrillic("Tolanmagan summa")}
          </th>
          <th className="border border-[#000] px-2 py-1 text-left">
            {latinToCyrillic("Umumiy summa")}
          </th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}>
            <td className="border border-[#000] px-2 py-1">{index + 1}</td>
            <td className="border border-[#000] px-2 py-1">{item.Xodim}</td>
            <td className="border border-[#000] px-2 py-1">
              {item.Tolangan_summa}
            </td>
            <td className="border border-[#000] px-2 py-1">
              {item.Tolanmagan_summa}
            </td>
            <td className="border border-[#000] px-2 py-1">
              {formatNumber(item.Umumiy_summa)}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default MaiTab;
