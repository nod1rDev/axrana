"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

import BittaTab from "./Components/BittaTab";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { setModalBitta } from "@/app/Redux/TipSlice";
import BittaModal from "./Components/BittaModal";
import { getContractById, giveTime, paymentToContract } from "@/app/Api/Apis";
function Page() {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [count, setCount] = useState(0);
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = useState("");
  const [payment, setPayment] = useState(false);
  const modal = useSelector((s: any) => s.tip.modal2);
  const getData = async () => {
    const res = await getContractById(JWT, id);
    const payy = res.data[0].ispay;
    setPayment(payy);
    setData(res);
  };

  useEffect(() => {
    getData();
  }, []);
  function removeHyphens(input: string) {
    return input.replace(/-/g, "");
  }

  function formatDate(dateString: string) {
    if (dateString) {
      // Sana satrini bo'sh joy va tire orqali bo'linadi
      const [dayMonth, year] = dateString.split(" ");
      const [day, month] = dayMonth.split("-");

      const monthMap: { [key: string]: string } = {
        январь: "01",
        февраль: "02",
        март: "03",
        апрель: "04",
        май: "05",
        июнь: "06",
        июль: "07",
        август: "08",
        сентябрь: "09",
        октябрь: "10",
        ноябрь: "11",
        декабрь: "12",
      };

      const monthNumber = monthMap[month];

      // "йил" so'zini olib tashlash va yildagi har qanday "-" belgilarini olib tashlash
      const cleanedYear = removeHyphens(year.replace("йил", ""));

      return `${day}.${monthNumber}.${cleanedYear}`;
    }
    return "";
  }
  useEffect(() => {
    const pureDate = formatDate(modal.sana);
    setValue(pureDate);
  }, [modal.open]);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      setModalBitta({ open: false, shartnomaId: 0, organId: 0, sana: "" })
    );
  };
  const updateDate = async () => {
    const res = await giveTime(JWT, value, modal.organId);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Vaqt uzaytirildi"),
          status: "success",
        })
      );
      getData();
      handleClose();
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

  const handleSubmit = () => {
    if (value) {
      updateDate();
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Sana kiriting"),
          status: "warning",
        })
      );
    }
  };

  const router = useRouter();

  const otish = () => {
    router.push("/" + id);
  };
  const pay = async () => {
    const res = await paymentToContract(JWT, id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("To'lov muvofaqiyatli amalga oshirildi"),
          status: "success",
        })
      );
      getData();
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

  return (
    <>
      <div className="w-[95%] mt-5 flex-col gap-6 mx-auto">
        <div className="mb-6 flex justify-between w-full items-center">
          <Button
            startIcon={<ArrowBackIcon />}
            color="info"
            variant="contained"
            onClick={() => router.push("/shartnoma")}
          >
            {"орқага"}
          </Button>

          <h1 className="text-[28px] font-bold">
            {latinToCyrillic("Organlar Statusi")}
          </h1>
          <div className="flex gap-2">
            {payment ? (
              <Button
                color="secondary"
                disabled
                variant="contained"
                onClick={pay}
              >
                {latinToCyrillic("To'lov qilingan")}
              </Button>
            ) : (
              <Button color="secondary" variant="contained" onClick={pay}>
                {latinToCyrillic("To'lov Qilmoq")}
              </Button>
            )}

            <Button color="success" variant="contained" onClick={otish}>
              {latinToCyrillic("Shartnomani ko'rish")}
            </Button>
          </div>
        </div>
        <BittaTab ranks={data.tasks} />
      </div>
      <BittaModal
        setValue={setValue}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
        value={value}
      />
    </>
  );
}

export default Page;
