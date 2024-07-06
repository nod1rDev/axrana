"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import { DeleteShartnoma, GetStatus, UpdateDate } from "@/app/Api/Apis";
import BittaTab from "./Components/BittaTab";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import { setModalBitta } from "@/app/Redux/TipSlice";
import BittaModal from "./Components/BittaModal";
function Page() {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [count, setCount] = useState(0);
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = useState("");
  const modal = useSelector((s: any) => s.tip.modal2);
  const getData = async () => {
    const res = await GetStatus(JWT, id);
    setData(res.data);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setValue(modal.sana);
  }, [modal.open]);
  const dispatch = useDispatch();
  const handleClose = () => {
    dispatch(
      setModalBitta({ open: false, shartnomaId: 0, organId: 0, sana: "" })
    );
  };
  const updateDate = async () => {
    const res = await UpdateDate(JWT, value, modal.shartnomaId, modal.organId);

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

  return (
    <>
      <div className="w-[80%] mt-5 flex-col gap-6 mx-auto">
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

          <Button color="success" variant="contained" onClick={otish}>
            {latinToCyrillic("Shartnomani ko'rish")}
          </Button>
        </div>
        <BittaTab ranks={data} />
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
