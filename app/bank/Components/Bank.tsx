"use client";
import React, { useState } from "react";
import { styled } from "@mui/material/styles";
import { Createbank, Deletebank, Getbanks, URL, Updatebank } from "@/app/Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import { setModalUnvon } from "@/app/Redux/UnvonSlice";
import Button from "@mui/material/Button";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import BankTab from "./BankTab";
import CreateBank from "./CreateBank";
import BankModal from "./BankModal";
import { setModalBank } from "@/app/Redux/bankSlice";
const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});
function Bank() {
  //Umumiy
  const dispatch = useDispatch();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [file, setFile] = useState<any>(null);
  //All ranks
  const [allRanks, setAllRAnks] = React.useState<any>();

  const getAllRanks = async () => {
    const res = await Getbanks(JWT);

    setAllRAnks(res.data);
  };
  React.useEffect(() => {
    getAllRanks();
  }, []);

  //Modal
  const open = useSelector((s: any) => s.bank.modal);
  const [value, setValu] = React.useState<any>({
    name: open.name,
    number: open.number,
  });

  const deleteUnvon = async () => {
    const res = await Deletebank(JWT, open.id);

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
    const res = await Updatebank(JWT, value, open.id);

    if (res.success) {
      handleClose();

      dispatch(
        alertChange({
          open: true,
          message: "bakn nomi tahrirlandi",
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
    setValu({ name: open.name, number: open.number });
  }, [open.open]);

  const handleSubmit = () => {
    if (value.name && value.number) {
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
    dispatch(setModalBank({ type: 0, open: false, id: 0, name: "" }));
  };

  //create unvon
  const [data, setData] = React.useState<any>([]);
  const createRanks = async () => {
    const res = await Createbank(
      JWT,
      data.map((e: any) => {
        return { name: e.name, number: e.number };
      })
    );

    if (res.success) {
      getAllRanks();
      setData([]);
      dispatch(
        alertChange({
          open: true,
          message: "Banklar saqlandi!",
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
      console.log(data);

      createRanks();
    } else {
      dispatch(
        alertChange({
          open: true,
          message: "Hali bank mavjud emas!",
          status: "error",
        })
      );
    }
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files?.[0];

    setFile(selectedFile);
  };

  const textToJson = (text: string) => {
    try {
      const jsonObject = JSON.parse(text);
      return jsonObject;
    } catch (error) {
      return { success: false, message: "Invalid JSON format" };
    }
  };

  const handleSubmite = async () => {
    if (!file) return;

    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${JWT}`);

    const formdata = new FormData();
    formdata.append("file", file);

    const requestOptions: any = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
      redirect: "follow",
    };

    fetch(URL + "/bank/create/excel", requestOptions)
      .then((response) => response.text())
      .then((result: any) => {
        const res = textToJson(result);
        if (res.success) {
          dispatch(
            alertChange({
              open: true,
              message: "Exel file kiritildi",
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
      })
      .catch((error) =>
        dispatch(
          alertChange({
            open: true,
            message: error,
            status: "error",
          })
        )
      );
  };
  return (
    <div className="flex gap-4 max-w-[95%] mx-auto pt-5 flex-col">
      <div className="flex gap-4 items-center justify-end">
        <Button
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          color="success"
          startIcon={<CloudUploadIcon />}
        >
          Exel file yuklash
          <VisuallyHiddenInput
            type="file"
            hidden
            accept=".xlsx,.xls"
            onChange={handleFileChange}
          />
        </Button>
        {file && (
          <IconButton onClick={handleSubmite} size="large" aria-label="upload">
            <SaveIcon fontSize="inherit" color="info" />
          </IconButton>
        )}
      </div>
      <BankTab ranks={allRanks} />
      <CreateBank saqlash={saqlash} data={data} setData={setData} />
      {open.open ? (
        <BankModal
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

export default Bank;
