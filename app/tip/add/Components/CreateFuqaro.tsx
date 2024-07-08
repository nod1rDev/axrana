"use client";
import React, { useEffect, useState } from "react";
import LatCyrConverter, { latinToCyrillic } from "./lotin";
import { useSelector, useDispatch } from "react-redux";
import { GetCreateInfoWorker, URL, setExelFile } from "@/app/Api/Apis";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "@mui/material/styles";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconButton } from "@mui/material";
import { useRouter } from "next/navigation";
import { ranksData } from "@/app/Utils";

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

function CreateFuqaro({ data, setData }: { data: any; setData: any }) {
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [createInp, setCreateInp] = useState({
    FIO: "",

    zvaniya: "",
  });
  const [select, setSelect] = useState<any>({});
  const [clear, setClear] = useState(1);
  const [file, setFile] = useState<any>(null);
  const dispatch = useDispatch();

  const getSelect = async () => {
    const res = await GetCreateInfoWorker(JWT);
    setSelect(res);
  };

  useEffect(() => {
    getSelect();
  }, []);

  const handleCreateChange = (i: any) => {
    const { name, value } = i.target;
    if (name === "selectRank") {
    } else {
      setCreateInp({ ...createInp, [name]: value });
    }
  };

  const saqlsh = (e: any) => {
    e.preventDefault();
    if (createInp.FIO && createInp.zvaniya) {
      if (createInp.FIO) {
        setData([
          ...data,
          { ...createInp, _id: Math.ceil(Math.random() * 15415645488) },
        ]);
        setCreateInp({
          FIO: "",
          zvaniya: "",
        });
        setClear(clear + 213);
      } else {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic("Familya Isim Sharifni togri kiriting"),
            status: "warning",
          })
        );
      }
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Malumotlarni to'liq to'ldiring"),
          status: "warning",
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
  const router = useRouter();

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

    fetch(URL + "/worker/create/excel", requestOptions)
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

          router.push("/tip");
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
    <form onSubmit={saqlsh} className="w-full mt-6 flex flex-col gap-4">
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
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <IconButton onClick={handleSubmit} size="large" aria-label="upload">
              <SaveIcon fontSize="inherit" color="info" />
            </IconButton>
          )}
        </div>
        <Button type="submit" variant="contained">
          {latinToCyrillic("Qo'shish")}
        </Button>
      </div>

      <div className="w-full flex justify-between gap-5">
        <FormControl sx={{ width: "40%" }} fullWidth>
          <InputLabel id="region-select-label">
            {latinToCyrillic("Zvaniya")}{" "}
          </InputLabel>
          <Select
            labelId="region-select-label"
            id="region-select"
            label={latinToCyrillic("Zvaniya")}
            name="zvaniya"
            value={createInp.zvaniya}
            onChange={handleCreateChange}
          >
            {ranksData.map((e: any) => (
              <MenuItem key={e.zvaniye} value={e.zvaniye}>
                {e.zvaniye}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <div className="w-[60%]">
          <LatCyrConverter
            clear={clear}
            setValue={setCreateInp}
            value={createInp}
          />
        </div>
      </div>
    </form>
  );
}

export default CreateFuqaro;
