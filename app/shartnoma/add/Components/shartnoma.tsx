"use client";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import SearchIcon from "@mui/icons-material/Search";
import CreateShartnoma from "./CreateShartnoma";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { URL, searchByClintName } from "@/app/Api/Apis";
import { useDispatch, useSelector } from "react-redux";
import { styled } from "@mui/material/styles";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
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
function Shartnoma() {
  const [isLotin, setIsLotin] = useState("uz");
  const router = useRouter();
  const [file, setFile] = useState<any>(null);
  const [value, setValue] = useState<any>({
    clientName: "",
  });
  const [data, setData] = useState<any>();
  const JWT = useSelector((s: any) => s.auth.JWT);
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
  const admin = useSelector((s: any) => s.auth.admin);
  const dispatch = useDispatch();
  const handleSubmit = async () => {
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

    fetch(URL + "/contract/import/excel/data", requestOptions)
      .then((response) => response.text())
      .then((result: any) => {
        const res = textToJson(result);
        if (res.success) {
          dispatch(
            alertChange({
              open: true,
              message: latinToCyrillic("Exel file kiritildi"),
              status: "success",
            })
          );

          router.push("/shartnoma");
        } else {
          dispatch(
            alertChange({
              open: true,
              message: latinToCyrillic(res.message),
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
    <div className="w-[90%] mt-[5vh] mx-auto">
      <div className="flex justify-center mb-6 text-[28px] font-bold">
        {latinToCyrillic(" Shartnoma yaratish")}
      </div>
      <div className="flex justify-between items-center w-full mb-6">
        <Button
          sx={{ width: "140px", height: "40px" }}
          onClick={() => router.push("/shartnoma")}
          variant="contained"
        >
          {latinToCyrillic("Orqaga")}
        </Button>
      </div>
      <div className="flex w-full justify-between">
        <div className="flex gap-4 items-center">
          <Button
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            color="success"
            startIcon={<CloudUploadIcon />}
          >
            {latinToCyrillic("Exel file yuklash")}
            <VisuallyHiddenInput
              type="file"
              hidden
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              color="secondary"
            >
              {latinToCyrillic("Fileni Yuklash")}
            </Button>
          )}
        </div>
      </div>
      <CreateShartnoma />
    </div>
  );
}

export default Shartnoma;
