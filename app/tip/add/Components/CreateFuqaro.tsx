"use client";
import React, { useEffect, useState } from "react";
import LatCyrConverter from "./lotin";
import { useSelector, useDispatch } from "react-redux";
import { GetCreateInfoWorker } from "@/app/Api/Apis";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Button from "@mui/material/Button";
import { alertChange } from "@/app/Redux/ShaxsiySlice";

function CreateFuqaro({ data, setData }: { data: any; setData: any }) {
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [createInp, setCreateInp] = useState<any>({
    FIOlotin: null,
    FIOkril: null,
    selectRank: "",
    selectRankSumma: "",
    selectRegion: "",
    selectOtryad: "",
  });
  const [select, setSelect] = useState<any>();
  const [clear, setClear] = useState(1);
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
      const filter = select.ranks.find((e: any) => value === e.name);
      setCreateInp({
        ...createInp,
        selectRank: filter.name,
        selectRankSumma: filter.summa,
      });
    } else {
      setCreateInp({ ...createInp, [name]: value });
    }
  };
  const dispatch = useDispatch();
  const saqlsh = (e: any) => {
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

  return (
    <form onSubmit={saqlsh} className="w-full mt-6 flex flex-col gap-4">
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
            {select &&
              select.ranks.map((e: any) => (
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
            disabled
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
            {select &&
              select.locations.map((e: any) => (
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
            {select &&
              select.otryads.map((e: any) => (
                <MenuItem key={e.name} value={e.name}>
                  {e.name}
                </MenuItem>
              ))}
          </Select>
        </FormControl>
      </div>

      <div className="flex justify-end">
        <Button type="submit" variant="contained">
          {"Qo'shish"}
        </Button>
      </div>
    </form>
  );
}

export default CreateFuqaro;
