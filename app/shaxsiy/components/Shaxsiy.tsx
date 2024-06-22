"use client";
import { UpdateAuth, getAuth } from "@/app/Api/Apis";
import { IconButton } from "@mui/material";
import React from "react";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { useSelector, useDispatch } from "react-redux";
import { alertChange, setModalShaxsiy } from "@/app/Redux/ShaxsiySlice";
import EditModal from "./EditModal";
import Users from "./Users";
function Shaxsiy() {
  const [userData, setUserData] = React.useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = React.useState<any>({
    oldPassword: null,
    newPassword: null,
  });

  const getUser = async () => {
    const res = await getAuth(JWT);
    if (res.admin !== undefined) {
      setUserData(res.admin);
    } else {
      setUserData(res.data);
    }
  };

  React.useEffect(() => {
    getUser();
  }, []);
  const dispatch = useDispatch();
  const updateAuth = async (value: any) => {
    const res = await UpdateAuth(JWT, value.oldPassword, value.newPassword);
    if (res.success) {
      handleClose();
      setValue({ oldPassword: null, newPassword: null });
      dispatch(
        alertChange({
          open: true,
          message: "Password tahrirlandi",
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
    if (value.oldPassword !== "" && value.newPassword !== "") {
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
    dispatch(setModalShaxsiy(false));
  };

  return (
    <>
      <h1 className="font-bold text-[28px] mb-2">Shaxsiy malumotlar</h1>
      <div className="flex w-full justify-between">
        <div className="flex rounded-lg relative w-[400px]  bg-slate-50 px-6 py-4 gap-4 flex-col">
          <div className=" absolute top-2 right-2">
            <IconButton
              onClick={() => dispatch(setModalShaxsiy(true))}
              aria-label="delete"
              size="large"
            >
              <AppRegistrationIcon color="primary" fontSize="inherit" />
            </IconButton>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold text-[18px]">Ishlatuvchinig nomi:</h1>
            <span className=" text-slate-400 font-bold">
              {userData && userData.username}
            </span>
          </div>

          <div className="flex flex-col">
            <h1 className="font-bold text-[18px]">Ishlatuvchinig paroli:</h1>
            <span className=" text-slate-400 font-bold">
              {userData && userData.passwordInfo}
            </span>
          </div>
        </div>

        {/* {userData && userData.adminStatus ? <Users /> : null} */}
      </div>
      <EditModal
        setValue={setValue}
        value={value}
        handleSubmit={handleSubmit}
        handleClose={handleClose}
      />
    </>
  );
}

export default Shaxsiy;
