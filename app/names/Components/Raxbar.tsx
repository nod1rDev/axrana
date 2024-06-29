"use client";
import { GetNames, UpdateAuth, UpdateNames, getAuth } from "@/app/Api/Apis";
import { IconButton } from "@mui/material";
import React, { useState } from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useSelector, useDispatch } from "react-redux";
import { alertChange, setModalShaxsiy } from "@/app/Redux/ShaxsiySlice";
import EditRaxbar from "./EditRaxbar";
import { setModalRaxbar } from "@/app/Redux/names";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

function Raxbar() {
  const [userData, setUserData] = React.useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [id, setId] = useState<boolean>(false);
  const [value, setValue] = React.useState<any>({
    summa: null,
  });
  const getID = async () => {
    const res = await getAuth(JWT);

    setId(res.data.adminStatus);
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
    userData && setValue({ summa: userData.summa });
  }, [userData]);
  const dispatch = useDispatch();
  const updateAuth = async (value: any) => {
    const res = await UpdateNames(
      JWT,
      {
        summaName: value.summa,
      },
      userData._id
    );
    if (res.success) {
      handleClose();
      setValue({ summa: null });
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Malumotlar tahrirlandi"),
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
  const handleSubmit = () => {
    if (value.summa !== "" && value.accountant !== "") {
      updateAuth(value);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Bosh qatorlarni to'ldiring!"),
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
      <h1 className="font-bold text-[28px] mb-2">
        {latinToCyrillic("DXM summasi")}{" "}
      </h1>
      <div className="flex w-full justify-between">
        <div className="flex rounded-lg relative w-[400px]  bg-slate-50 px-6 py-4 gap-4 flex-col">
          {id && (
            <div className=" absolute top-0 right-0">
              <IconButton
                onClick={() => dispatch(setModalRaxbar(true))}
                aria-label="delete"
                size="large"
              >
                <AppRegistrationIcon color="primary" fontSize="inherit" />
              </IconButton>
            </div>
          )}

          <div className="flex items-center gap-2 ">
            <h1 className="font-bold text-[18px]">
              {latinToCyrillic("DXM summasi :")}
            </h1>
            <span className=" text-slate-400 font-bold">
              {userData && userData.summa}
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
