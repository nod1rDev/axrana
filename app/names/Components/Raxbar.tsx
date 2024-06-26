"use client";
import { GetNames, UpdateAuth, UpdateNames, getAuth } from "@/app/Api/Apis";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useSelector, useDispatch } from "react-redux";
import { alertChange, setModalShaxsiy } from "@/app/Redux/ShaxsiySlice";
import EditRaxbar from "./EditRaxbar";
import { setModalRaxbar } from "@/app/Redux/names";

function Raxbar() {
  const [userData, setUserData] = React.useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [id, setId] = useState();
  const [value, setValue] = React.useState<any>({
    boss: null,
    accountant: null,
  });
  const getID = async () => {
    const res = await getAuth(JWT);

    setId(res.data._id);
  };
  const getUser = async () => {
    const res = await GetNames(JWT);
    setUserData(res.data);
  };

  React.useEffect(() => {
    getUser();
    getID();
  }, []);

  React.useEffect(() => {
    userData &&
      setValue({ boss: userData.boss, accountant: userData.accountant });
  }, [userData]);
  const dispatch = useDispatch();
  const updateAuth = async (value: any) => {
    const res = await UpdateNames(
      JWT,
      {
        bossName: value.boss,
        accountantName: value.accountant,
      },
      userData._id
    );
    if (res.success) {
      handleClose();
      setValue({ boss: null, accountant: null });
      dispatch(
        alertChange({
          open: true,
          message: "Malumotlar tahrirlandi",
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
  const handleSubmit = () => {
    if (value.boss !== "" && value.accountant !== "") {
      updateAuth(value);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: "Bosh qatorlarni to'ldiring!",
          status: "warning",
        })
      );
    }
    setTimeout(() => getUser(), 500);
  };

  const handleClose = () => {
    dispatch(setModalRaxbar(false));
  };

  return (
    <>
      <h1 className="font-bold text-[28px] mb-2">Raxbar va Bosh hisobchi</h1>
      <div className="flex w-full justify-between">
        <div className="flex rounded-lg relative w-[400px]  bg-slate-50 px-6 py-4 gap-4 flex-col">
          <div className=" absolute top-2 right-2">
            <IconButton
              onClick={() => dispatch(setModalRaxbar(true))}
              aria-label="delete"
              size="large"
            >
              <AppRegistrationIcon color="primary" fontSize="inherit" />
            </IconButton>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold text-[18px]">Raxbar ismi:</h1>
            <span className=" text-slate-400 font-bold">
              {userData && userData.boss}
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold text-[18px]">Bosh hisobchi ismi:</h1>
            <span className=" text-slate-400 font-bold">
              {userData && userData.accountant}
            </span>
          </div>
        </div>
      </div>
      <EditRaxbar
        setValue={setValue}
        value={value}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </>
  );
}

export default Raxbar;
