"use client";
import React from "react";

import { Createtips, Deletetip, Gettips, Updatetips } from "@/app/Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import { setModalUnvon } from "@/app/Redux/UnvonSlice";

import { alertChange } from "@/app/Redux/ShaxsiySlice";

import { extractNmae } from "@/app/Utils";

import { setModalCoctav } from "@/app/Redux/CoctavsSlice";
import { setModalTip } from "@/app/Redux/TipSlice";
import TipTab from "./TipTab";
import CreateTips from "./CreateTip";
import TipModal from "./TipModal";

function Tips() {
  //Umumiy
  const dispatch = useDispatch();
  const JWT = useSelector((s: any) => s.auth.JWT);

  //All ranks
  const [allRanks, setAllRAnks] = React.useState<any>();

  const getAllRanks = async () => {
    const res = await Gettips(JWT);

    setAllRAnks(res.data);
  };
  React.useEffect(() => {
    getAllRanks();
  }, []);

  //Modal
  const open = useSelector((s: any) => s.tip.modal);
  const [value, setValu] = React.useState<any>({
    name: open.name,
    lastName: open.lastName,
    sharif: open.sharif,
  });

  const deleteUnvon = async () => {
    const res = await Deletetip(JWT, open.id);

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
    const res = await Updatetips(JWT, value, open.id);

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
    setValu({ name: open.name, lastName: open.lastName, sharif: open.sharif });
  }, [open.open]);

  const handleSubmit = () => {
    if (value.name) {
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

  //create unvon
  const [data, setData] = React.useState<any>([]);
  const createRanks = async () => {
    const res = await Createtips(JWT, extractNmae(data));

    if (res.success) {
      getAllRanks();
      setData([]);
      dispatch(
        alertChange({
          open: true,
          message: "FIO lar saqlandi!",
          status: "success",
        })
      );
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
  const saqlash = () => {
    if (data) {
      createRanks();
    } else {
      dispatch(
        alertChange({
          open: true,
          message: "Hali locatsiya mavjud emas!",
          status: "error",
        })
      );
    }
  };

  return (
    <div className="flex gap-4 max-w-[95%] mx-auto pt-5 flex-col">
      <TipTab ranks={allRanks} />
      <CreateTips saqlash={saqlash} data={data} setData={setData} />
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
