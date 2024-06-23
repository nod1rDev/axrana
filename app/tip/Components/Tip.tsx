"use client";
import React from "react";

import {
  Createtips,
  Deletetip,
  Deleteworker,
  Gettips,
  Getworkers,
  Updatetips,
  Updateworkers,
} from "@/app/Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import { setModalUnvon } from "@/app/Redux/UnvonSlice";

import { alertChange } from "@/app/Redux/ShaxsiySlice";

import { extractNmae } from "@/app/Utils";

import { setModalCoctav } from "@/app/Redux/CoctavsSlice";
import { setModalTip } from "@/app/Redux/TipSlice";
import TipTab from "./TipTab";

import TipModal from "./TipModal";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";

function Tips() {
  //Umumiy
  const dispatch = useDispatch();
  const JWT = useSelector((s: any) => s.auth.JWT);

  //All ranks
  const [allRanks, setAllRAnks] = React.useState<any>();

  const getAllRanks = async () => {
    const res = await Getworkers(JWT);

    setAllRAnks(res.data);
  };
  React.useEffect(() => {
    getAllRanks();
  }, []);

  //Modal
  const open = useSelector((s: any) => s.tip.modal);
  const [value, setValu] = React.useState<any>({});

  const deleteUnvon = async () => {
    const res = await Deleteworker(JWT, open.id);

    if (res.success) {
      handleClose();

      dispatch(
        alertChange({
          open: true,
          message: open.name + " " + "o'chirildi",
          status: "success",
        })
      );
      getAllRanks();
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
  const deleteAllRanks = () => {
    deleteUnvon();
  };
  const EditUnvon = async (value: any) => {
    const res = await Updateworkers(JWT, value, open.id);

    if (res.success) {
      handleClose();

      dispatch(
        alertChange({
          open: true,
          message: "FIO tahrirlandi",
          status: "success",
        })
      );
      getAllRanks();
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

  React.useEffect(() => {
    setValu({
      FIOlotin: open.FIOlotin,
      FIOkril: open.FIOkril,
      selectRank: open.selectRank,
      selectRankSumma: open.selectRankSumma,
      selectRegion: open.selectRegion,
      selectOtryad: open.selectOtryad,
    });
  }, [open.open]);

  const handleSubmit = () => {
    if (value.FIOlotin && value.selectOtryad) {
      EditUnvon(value);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: "Malumotlarni to'liq to'ldiring!",
          status: "warning",
        })
      );
    }
  };
  const handleClose = () => {
    dispatch(setModalTip({ type: 0, open: false, id: 0, name: "" }));
  };

  const router = useRouter();

  return (
    <div className="flex gap-4 relative max-w-[95%] mx-auto pt-5 flex-col">
      <div className="  flex justify-end">
        <Button onClick={() => router.push("/tip/add")} variant="contained">
          {"Qo'shish"}
        </Button>
      </div>
      <TipTab ranks={allRanks} />
      {open.open ? (
        <TipModal
          handleDelete={deleteAllRanks}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          value={value}
          setValue={setValu}
        />
      ) : null}
    </div>
  );
}

export default Tips;
