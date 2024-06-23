"use client";
import React, { useState } from "react";
import AddFuqaroTab from "./AddFuqaroTab";
import CreateFuqaro from "./CreateFuqaro";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import { Createworkers } from "@/app/Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
function AddFuqoro() {
  const [data, setData] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const router = useRouter();
  const create = async () => {
    const res = await Createworkers(JWT, data);
    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: "Fuqoro Qo'shildi",
          status: "success",
        })
      );
      router.push("/tip")
    } else {
      dispatch(
        alertChange({
          open: true,
          message: res.message,
          status: "error",
        })
      );
    }
  };
  const dispatch = useDispatch();
  const handleSave = () => {
    create();
    setData([]);
  };
  return (
    <div className="flex flex-col max-w-[90%] mx-auto">
      <div className=" mx-auto text-[28px] font-bold mb-4">
        Fuqoro {"qo'shish"}
      </div>
      <div className="mb-4">
        <Button onClick={() => router.push("/tip")} variant="contained">
          Orqaga
        </Button>
      </div>
      <AddFuqaroTab setData={setData} ranks={data} />
      <div className="mt-16">
        <CreateFuqaro data={data} setData={setData} />
      </div>
      <div className="w-full">
        <Button
          onClick={handleSave}
          color="success"
          fullWidth
          sx={{ mt: "20px" }}
          variant="contained"
        >
          Saqlash
        </Button>
      </div>
    </div>
  );
}

export default AddFuqoro;
