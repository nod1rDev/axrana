"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { DeleteShartnoma, GetSingleShartnoma } from "../Api/Apis";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import SingleTab from "./SingleTab";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { alertChange } from "../Redux/ShaxsiySlice";
import { latinToCyrillic } from "../tip/add/Components/lotin";
function page() {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const getData = async () => {
    const res = await GetSingleShartnoma(JWT, id);

    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);
  const dispatch = useDispatch();
  const deleteItem = async () => {
    const res = await DeleteShartnoma(JWT, data._id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Shartnoma Ochirildi"),
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
  return (
    <>
      <div className="w-[80%] flex-col  gap-6 mx-auto">
        <div className="mb-6">
          <Button
            startIcon={<ArrowBackIcon />}
            color="info"
            variant="contained"
            onClick={() => router.push("/shartnoma")}
          >
            {"орқага"}
          </Button>
        </div>
        <div className="rounded-lg w-full bg-[#f4f3ee] px-6 py-4 flex justify-between items-center">
          <h1 className="text-[24px] font-bold">{data.shartnomaNumber}</h1>
          <div className="flex gap-3">
            <Button
              startIcon={<DeleteIcon />}
              color="error"
              variant="contained"
              onClick={() => deleteItem()}
            >
              {"учириш"}
            </Button>
            <Button
              onClick={() => router.push("/shartnoma/edit/" + data._id)}
              startIcon={<ModeEditOutlineIcon />}
              variant="contained"
            >
              {"таҳрирлаш"}
            </Button>
          </div>
        </div>
        <div className="rounded-lg w-full mt-6 bg-[#f4f3ee] px-6 py-4 flex-col gap-4">
          <div className="font-bold text-[24px] w-full  text-center mb-4">
            шартнома
          </div>
          <div className="flex w-full flex-col gap-4">
            <div className="flex gap-1">
              <span className="text-[18px] ">
                {latinToCyrillic("Shartnoma raqami:")}
              </span>
              <span className="text-[18px] font-bold ">
                {data.shartnomaNumber}
              </span>
            </div>

            <div className="flex gap-1">
              <span className="text-[18px] ">
                {latinToCyrillic("Shartnoma sanasi:")}
              </span>
              <span className="text-[18px] font-bold ">{data.date}</span>
            </div>

            <div className="flex gap-1">
              <span className="text-[18px] ">
                {latinToCyrillic(" Buyurtmachi:")}
              </span>
              <span className="text-[18px] font-bold ">{data.buyurtmachi}</span>
            </div>

            <div className="flex gap-1">
              <span className="text-[18px] ">
                {latinToCyrillic(
                  "Bajaruchi fuqorolar xavsizligini va jamoat tartibini saqalash muddati:"
                )}
              </span>
              <span className="text-[18px] font-bold ">{data.timeLimit}</span>
            </div>

            <div className="flex gap-1">
              <span className="text-[18px] ">
                {latinToCyrillic("Tadbir o'tadigan joy manzil:")}
              </span>
              <span className="text-[18px] font-bold ">{data.address}</span>
            </div>
          </div>

          <div className="font-bold text-[24px] w-full  text-center my-5">
            ишчилар
          </div>
          <div className="mt-4 rounded-lg w-full">
            <SingleTab ranks={data.workers} />
          </div>
        </div>
      </div>
    </>
  );
}

export default page;
