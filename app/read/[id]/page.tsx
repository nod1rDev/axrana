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
import {
  NotpaymentToContract,
  getContractById,
  giveTime,
  paymentToContract,
} from "@/app/Api/Apis";
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

  function formatDate(dateString: string): string {
    if (dateString?.length > 0) {
      // Mapping of month names from Cyrillic to numeric format
      const months: { [key: string]: string } = {
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

      // Regular expression to match the input format
      const datePattern = /^(\d{4})-йил\s+(\d{1,2})-(\D+)$/;

      const match = dateString.match(datePattern);

      if (!match) {
        throw new Error("Invalid date format");
      }

      const [_, year, day, month] = match;

      // Convert the month name to its numeric equivalent
      const monthNumber = months[month.trim().toLowerCase()];

      if (!monthNumber) {
        throw new Error("Invalid month name");
      }

      // Return the date in the format "dd.mm.yyyy"
      return `${day.padStart(2, "0")}.${monthNumber}.${year}`;
    } else {
      return dateString;
    }
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
  const notPay = async () => {
    const res = await NotpaymentToContract(JWT, id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("To'lov bekor qilindi"),
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
              <div className="flex gap-2">
                <Button
                  color="secondary"
                  disabled
                  variant="contained"
                  onClick={pay}
                >
                  {latinToCyrillic("To'lov qilingan")}
                </Button>{" "}
                <Button color="secondary" variant="contained" onClick={notPay}>
                  {latinToCyrillic("To'lovni bekor qilish")}
                </Button>
              </div>
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
