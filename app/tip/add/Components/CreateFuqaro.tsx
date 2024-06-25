"use client";
import React, { useEffect, useState } from "react";
import LatCyrConverter from "./lotin";
import { useSelector, useDispatch } from "react-redux";
import { GetCreateInfoWorker, setExelFile } from "@/app/Api/Apis";
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
    FIOlotin: null,
    FIOkril: null,
    selectRank: "",
    selectRankSumma: "",
    selectRegion: "",
    selectOtryad: "",
  });
  const [select, setSelect] = useState<any>({});
  const [clear, setClear] = useState(1);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  const getSelect = async () => {
    const res = await GetCreateInfoWorker(JWT);
    setSelect(res);
  };

  useEffect(() => {
    getSelect();
  }, []);

  const handleCreateChange = (i:any) => {
    const { name, value } = i.target;
    if (name === "selectRank") {
      const filter = select.ranks.find((e:any) => value === e.name);
      setCreateInp({
        ...createInp,
        selectRank: filter.name,
        selectRankSumma: filter.summa,
      });
    } else {
      setCreateInp({ ...createInp, [name]: value });
    }
  };

  const saqlsh = (e:any) => {
    e.preventDefault();
    if (
      createInp.FIOlotin &&
      createInp.selectRankSumma &&
      createInp.selectOtryad
    ) {
      setData([
        ...data,
        { ...createInp, _id: Math.ceil(Math.random() * 15415645488) },
      ]);
      setCreateInp({
        FIOlotin: null,
        FIOkril: null,
        selectRank: "",
        selectRankSumma: "",
        selectRegion: "",
        selectOtryad: "",
      });
      setClear(clear + 213);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: "Malumotlarni to'liq to'ldiring",
          status: "warning",
        })
      );
    }
  };

  const handleFileChange = (event: any) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:3000/result/excel", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${JWT}`,
        },
      });

      if (response.ok) {
        const res = await response.json();
        console.log("File uploaded successfully");
        dispatch(
          alertChange({
            open: true,
            message: "Exel file kiritildi",
            status: "success",
          })
        );
      } else {
        const res = await response.json();
        console.error("Failed to upload file", res);
        dispatch(
          alertChange({
            open: true,
            message: res.message || "Failed to upload file",
            status: "error",
          })
        );
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      dispatch(
        alertChange({
          open: true,
          message: "Error uploading file",
          status: "error",
        })
      );
    }
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
            Exel file yuklash
            <VisuallyHiddenInput
              type="file"
              hidden
              accept=".xlsx,.xls"
              onChange={handleFileChange}
            />
          </Button>
          {file && (
            <IconButton
              onClick={handleSubmit}
              size="medium"
              aria-label="upload"
            >
              <SaveIcon fontSize="inherit" color="info" />
            </IconButton>
          )}
        </div>

        <Button type="submit" variant="contained">
          {"Qo'shish"}
        </Button>
      </div>
      <LatCyrConverter
        clear={clear}
        setValue={setCreateInp}
        value={createInp}
      />

      <div className="w-full flex justify-between gap-[140px]">
        <FormControl fullWidth>
          <InputLabel id="rank-select-label">Unvon</InputLabel>
          <Select
            labelId="rank-select-label"
            id="rank-select"
            label="Unvon"
            name="selectRank"
            value={createInp.selectRank}
            onChange={handleCreateChange}
          >
            {select.ranks &&
              select.ranks.map((e:any) => (
                <MenuItem key={e.name} value={e.name}>
                  {e.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="rank-summa-select-label">Unvon Summa</InputLabel>
          <Select
            labelId="rank-summa-select-label"
            id="rank-summa-select"
            label="Unvon Summa"
            name="selectRankSumma"
            value={createInp.selectRankSumma}
          >
            <MenuItem value={createInp.selectRankSumma}>
              {createInp.selectRankSumma}
            </MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className="w-full flex justify-between gap-[140px]">
        <FormControl fullWidth>
          <InputLabel id="region-select-label">Tuman</InputLabel>
          <Select
            labelId="region-select-label"
            id="region-select"
            label="Tuman"
            name="selectRegion"
            value={createInp.selectRegion}
            onChange={handleCreateChange}
          >
            {select.locations &&
              select.locations.map((e:any) => (
                <MenuItem key={e.name} value={e.name}>
                  {e.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <InputLabel id="otryad-select-label">Otryad</InputLabel>
          <Select
            labelId="otryad-select-label"
            id="otryad-select"
            label="Otryad"
            name="selectOtryad"
            value={createInp.selectOtryad}
            onChange={handleCreateChange}
          >
            {select.otryads &&
              select.otryads.map((e:any) => (
                <MenuItem key={e.name} value={e.name}>
                  {e.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>
    </form>
  );
}

export default CreateFuqaro;
