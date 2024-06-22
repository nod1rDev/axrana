"use client";
import React from "react";
import UnvonTab from "./UnvonTab";
import { CreateRank, DeleteRank, GetRanks, UpdateRank } from "@/app/Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import { setModalUnvon } from "@/app/Redux/UnvonSlice";
import UnvonModal from "./UnvonModal";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import CreateUnvon from "./CreateUnvon";
import { extractNameAndSumma } from "@/app/Utils";

function Unvon() {
  //Umumiy
  const dispatch = useDispatch();
  const JWT = useSelector((s: any) => s.auth.JWT);

  //All ranks
  const [allRanks, setAllRAnks] = React.useState<any>();

  const getAllRanks = async () => {
    const res = await GetRanks(JWT);

    setAllRAnks(res.data);
  };
  React.useEffect(() => {
    getAllRanks();
  }, []);

  //Modal
  const open = useSelector((s: any) => s.unvon.modal);
  const [value, setValu] = React.useState<any>({
    name: open.name,
    summa: open.summa,
  });

  const deleteUnvon = async () => {
    const res = await DeleteRank(JWT, open.id);

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
    const res = await UpdateRank(JWT, value, open.id);

    if (res.success) {
      handleClose();

      dispatch(
        alertChange({
          open: true,
          message: "Unvon tahrirlandi",
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
    setValu({ name: open.name, summa: open.summa });
  }, [open.open]);

  const handleSubmit = () => {
    if (value.name && value.summa) {
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
    dispatch(setModalUnvon({ type: 0, open: false, id: 0, name: "" }));
  };

  //create unvon
  const [data, setData] = React.useState<any>([]);
  const createRanks = async () => {
    const res = await CreateRank(JWT, extractNameAndSumma(data));

    if (res.success) {
      getAllRanks();
      setData([]);
      dispatch(
        alertChange({
          open: true,
          message: "Unvonlar saqlandi!",
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
          message: "Hali unvon mavjud emas!",
          status: "error",
        })
      );
    }
  };

  return (
    <div className="flex gap-4 max-w-[95%] mx-auto pt-5 flex-col">
      <UnvonTab ranks={allRanks} />
      <CreateUnvon saqlash={saqlash} data={data} setData={setData} />
      {open.open ? (
        <UnvonModal
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

export default Unvon;
