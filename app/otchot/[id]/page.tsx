"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";

import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { useReactToPrint } from "react-to-print";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import { getByIdComand } from "@/app/Api/Apis";
import WorkerAndBatalyon from "./Components/WorkerAndBatalyon";
import Document3 from "./Components/Document3";

function page() {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [tasks, setTasks] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [versiya, setVersiya] = useState(true);
  const getData = async () => {
    const res = await getByIdComand(JWT, id);
    setTasks(res.data);
    setData(res.command[0]);
  };

  useEffect(() => {
    getData();
  }, []);
  const dispatch = useDispatch();
  const deleteItem = async () => {
    const res: any = "salom";

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Shartnoma ochirildi"),
          status: "success",
        })
      );

      router.push("/shartnoma");
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    }
  };
  const router = useRouter();
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: (): any => componentRef.current,
  });

  const getMonthNameInCyrillic = (month: number): string => {
    const months = [
      "Январь",
      "Февраль",
      "Март",
      "Апрель",
      "Май",
      "Июнь",
      "Июль",
      "Август",
      "Сентябрь",
      "Октябрь",
      "Ноябрь",
      "Декабрь",
    ];
    return months[month];
  };
  const getCurrentYearAndMonth = (): any => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth(); // getMonth() returns 0-indexed month (0 = January, 11 = December)
    const monthName = getMonthNameInCyrillic(month);

    return { year: year, month: monthName };
  };
  return (
    <>
      {data && (
        <>
          <div className=" hidden">
            <Document3 tasks={tasks} data={data} ref={componentRef} />
          </div>
          <div className="w-[95%] mt-5 flex-col  gap-6 mx-auto">
            <div className="mb-6">
              <Button
                startIcon={<ArrowBackIcon />}
                color="info"
                variant="contained"
                onClick={() => router.push("/otchot")}
              >
                {"орқага"}
              </Button>
            </div>
            <div className="rounded-lg w-full mb-5 bg-[#f4f3ee] px-6 py-4 flex justify-between items-center">
              <h1 className="text-[24px] font-bold">{data?.commandnumber}</h1>
              <div className="flex gap-3">
                {/* <Button
                  startIcon={<DeleteIcon />}
                  color="error"
                  variant="contained"
                  onClick={() => deleteItem()}
                >
                  {"учириш"}
                </Button> */}
                {/* <Button
                  onClick={() => router.push("/shartnoma/edit/" + id)}
                  startIcon={<ModeEditOutlineIcon />}
                  variant="contained"
                >
                  {"таҳрирлаш"}
                </Button> */}
                <Button
                  onClick={handlePrint}
                  color="success"
                  startIcon={<LocalPrintshopIcon />}
                  variant="contained"
                >
                  {latinToCyrillic("Chop etish")}
                </Button>
              </div>
            </div>

            <div className="container rounded-lg  bg-[#f4f3ee] px-6 py-4 mx-auto p-4  flex flex-col">
              <div className="flex justify-between mb-20 w-full">
                <div className="flex-1"></div>
                <div className="flex flex-col gap-2  ">
                  <p className="text-center text-xl w-[400px]">
                    O'zbekiston Respublikasi Milliy Gvardiyasining Toshkent
                    shahar bo'yicha boshqarma boshlig'ining
                    {" " + data?.commanddate} {" " + data?.commandnumber}-sonli
                    buyrug'iga
                  </p>
                  <span className=" text-center w-[400px] text-xl">
                    1-ILOVA
                  </span>
                </div>
              </div>

              <div className="w-[90%] mb-20 flex flex-col font-bold gap-1 mx-auto text-2xl">
                <div className="text-center">
                  {data?.date1 + " "}
                  {latinToCyrillic("kunidan")}

                  {" " + data?.date2 + " "}

                  {latinToCyrillic(
                    "kuniga qadar omaviy tadbirlar jamoat tartibini saqlashda ishtirok etgan harbiylar xizmatchilar"
                  )}
                </div>
                <div className="w-full text-center">
                  {latinToCyrillic("RO'YHATI")}
                </div>
              </div>

              <div className="w-[95%] mx-auto flex gap-10 flex-col">
                {tasks && tasks.map((e: any) => <WorkerAndBatalyon data={e} />)}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}

export default page;
