"use client";
import React from "react";

import {
  CreateLocations,
  DeleteLocation,
  GetLocation,
  UpdateLocation,
} from "@/app/Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { extractNmae } from "@/app/Utils";
import LocationTab from "./LocationTab";
import CreateLocationlar from "./CreateLocation";
import LocationModal from "./LocationModal";
import { setModalLocation } from "@/app/Redux/locationSlice";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

function Location() {
  //Umumiy
  const dispatch = useDispatch();
  const JWT = useSelector((s: any) => s.auth.JWT);

  //All ranks
  const [allRanks, setAllRAnks] = React.useState<any>();

  const getAllRanks = async () => {
    const res = await GetLocation(JWT);

    setAllRAnks(res.data);
  };
  React.useEffect(() => {
    getAllRanks();
  }, []);

  //Modal
  const open = useSelector((s: any) => s.locat.modal);
  const [value, setValu] = React.useState<any>({
    name: open.name,
  });

  const deleteUnvon = async () => {
    const res = await DeleteLocation(JWT, open.id);

    if (res.success) {
      handleClose();

      dispatch(
        alertChange({
          open: true,
          message: open.name + " " + latinToCyrillic("o'chirildi"),
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
    const res = await UpdateLocation(JWT, value, open.id);

    if (res.success) {
      handleClose();

      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Batalyon nomi tahrirlandi"),
          status: "success",
        })
      );
      getAllRanks();
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
          message: latinToCyrillic("Malumotlarni to'liq to'ldiring!") ,
          status: "warning",
        })
      );
    }
  };
  const handleClose = () => {
    dispatch(setModalLocation({ type: 0, open: false, id: 0, name: "" }));
  };

  //create unvon
  const [data, setData] = React.useState<any>([]);
  const createRanks = async () => {
    const res = await CreateLocations(JWT, extractNmae(data));

    if (res.success) {
      getAllRanks();
      setData([]);
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Batalyonlar saqlandi!") ,
          status: "success",
        })
      );
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
  const saqlash = () => {
    if (data) {
      createRanks();
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Hali Batalyon mavjud emas!") ,
          status: "error",
        })
      );
    }
  };

  return (
    <div className="flex gap-4 max-w-[95%] mx-auto pt-5 flex-col">
      <LocationTab ranks={allRanks} />
      <CreateLocationlar saqlash={saqlash} data={data} setData={setData} />
      {open.open ? (
        <LocationModal
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

export default Location;
