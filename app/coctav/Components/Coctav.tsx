"use client";
import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { extractNmae } from "@/app/Utils";
import CoctavTab from "./CoctavTab";
import CreateCoctavlar from "./CreateCoctav";
import CoctavModal from "./CoctavModal";
import { setModalCoctav } from "@/app/Redux/CoctavsSlice";
import { Createotryads, Deleteotryad, Getotryads, Updateotryads } from "@/app/Api/Apis";

function Coctav() {
  //Umumiy
  const dispatch = useDispatch();
  const JWT = useSelector((s: any) => s.auth.JWT);

  //All ranks
  const [allRanks, setAllRAnks] = React.useState<any>();

  const getAllRanks = async () => {
    const res = await Getotryads(JWT);

    setAllRAnks(res.data);
  };
  React.useEffect(() => {
    getAllRanks();
  }, []);

  //Modal
  const open = useSelector((s: any) => s.coctav.modal);
  const [value, setValu] = React.useState<any>({
    name: open.name,
  });

  const deleteUnvon = async () => {
    const res = await Deleteotryad(JWT, open.id);

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
    const res = await Updateotryads(JWT, value, open.id);

    if (res.success) {
      handleClose();

      dispatch(
        alertChange({
          open: true,
          message: "Otryad tahrirlandi",
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
    setValu({ name: open.name });
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
    dispatch(setModalCoctav({ type: 0, open: false, id: 0, name: "" }));
  };

  //create unvon
  const [data, setData] = React.useState<any>([]);
  const createRanks = async () => {
    const res = await Createotryads(JWT, extractNmae(data));

    if (res.success) {
      getAllRanks();
      setData([]);
      dispatch(
        alertChange({
          open: true,
          message: "Otryadlar saqlandi!",
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
          message: "Hali Otryad mavjud emas!",
          status: "error",
        })
      );
    }
  };

  return (
    <div className="flex gap-4 max-w-[95%] mx-auto pt-5 flex-col">
      <CoctavTab ranks={allRanks} />
      <CreateCoctavlar saqlash={saqlash} data={data} setData={setData} />
      {open.open ? (
        <CoctavModal
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

export default Coctav;
