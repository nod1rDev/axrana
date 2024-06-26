"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import Select from "@mui/material/Select";
import { styled } from "@mui/system";
import { TextField, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { GetCreateInfoWorker } from "@/app/Api/Apis";
import { latinToCyrillic } from "./lotin";

const CustomTableHead = styled(TableHead)(({ theme }) => ({
  "& .MuiTableCell-root": {
    color: "#000",
    fontWeight: "600",
    backgroundColor: "#f1faee",
  },
}));

interface Column {
  id:
    | "number"
    | "FIO"
    | "UnvonNom"
    | "UnvonSum"
    | "Tuman"
    | "Otryad"
    | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
}

const columns: readonly Column[] = [
  { id: "number", label: "N", align: "left", minWidth: 5 },
  { id: "FIO", label: "FIO", align: "left", minWidth: 100 },
  { id: "UnvonNom", label: "Unvon Nomi", minWidth: 180, align: "center" },
  { id: "UnvonSum", label: "Unvon Summasi", minWidth: 180, align: "center" },
  { id: "Tuman", label: "Tuman", minWidth: 180, align: "center" },
  { id: "Otryad", label: "Otryad", minWidth: 180, align: "center" },
  { id: "actions", label: "Amallar", minWidth: 100, align: "right" },
];

interface Data {
  number: any;
  FIO: any;
  UnvonNom: any;
  UnvonSum: any;
  Tuman: any;
  Otryad: any;
  actions: any;
  id: number;
}

function createData(
  number: any,
  FIO: any,
  UnvonNom: any,
  UnvonSum: any,
  Tuman: any,
  Otryad: any,
  actions: any,
  id: number
): Data {
  return { number, FIO, UnvonNom, UnvonSum, Tuman, Otryad, actions, id };
}



export default function AddFuqaroTab({
  ranks,
  setData,
}: {
  ranks: any;
  setData: any;
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100000000000000000000000000);
  const [latinText, setLatinText] = useState("");
  const [active, setActive] = useState<number | null>(null);
  const [select, setSelect] = useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);

  const getSelect = async () => {
    const res = await GetCreateInfoWorker(JWT);

    setSelect(res);
  };

  useEffect(() => {
    getSelect();
  }, []);

  const handleLatinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLatinText(value);
    if (active !== null) {
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item._id === active
            ? { ...item, FIOlotin: value, FIOkril: latinToCyrillic(value) }
            : item
        )
      );
    }
  };

  const rows = ranks
    ? ranks.map((e: any, i: number) =>
        createData(
          i + 1,
          { FIOlotin: e.FIOlotin, FIOkril: e.FIOkril },
          e.selectRank,
          e.selectRankSumma,
          e.selectRegion,
          e.selectOtryad,
          null,
          e._id
        )
      )
    : [];

  const handleUnvon = (event: any) => {
    const { value } = event.target;
    if (active !== null) {
      const filter = select.ranks.find((rank: any) => rank.name === value);
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item._id === active
            ? {
                ...item,
                selectRank: filter.name,
                selectRankSumma: filter.summa,
              }
            : item
        )
      );

      setData((prevData: any) =>
        prevData.map((item: any) =>
          item._id === active
            ? {
                ...item,
                selectRank: filter.name,
                selectRankSumma: filter.summa,
              }
            : item
        )
      );
    }
  };

  const handleTwo = (event: any) => {
    const { name, value } = event.target;
    if (active !== null) {
      setData((prevData: any) =>
        prevData.map((item: any) =>
          item._id === active ? { ...item, [name]: value } : item
        )
      );
    }
  };

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ overflow: "auto", maxHeight: "70vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <CustomTableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </CustomTableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row: any, i: any) => (
                <TableRow
                  hover
                  onClick={() => setActive(row.id)}
                  role="checkbox"
                  tabIndex={-1}
                  key={i}
                >
                  {columns.map((column, index) => {
                    const value = row[column.id];

                    return (
                      <TableCell key={column.id} align={column.align}>
                        {index === 0 ? (
                          i + 1
                        ) : index === 1 ? (
                          <div className="flex w-full items-center justify-between gap-3">
                            <TextField
                              value={row.FIO.FIOlotin}
                              onChange={handleLatinChange}
                              fullWidth
                              autoComplete="off"
                              autoCorrect="off"
                              spellCheck="false"
                              InputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "false",
                              }}
                            />
                            <TextField
                              value={row.FIO.FIOkril}
                              disabled
                              autoComplete="off"
                              autoCorrect="off"
                              spellCheck="false"
                              InputProps={{
                                autoComplete: "off",
                                autoCorrect: "off",
                                spellCheck: "false",
                              }}
                              fullWidth
                            />
                          </div>
                        ) : index === 2 ? (
                          <FormControl fullWidth>
                            <Select
                              labelId="rank-select-label"
                              id="rank-select"
                              name="selectRank"
                              onChange={handleUnvon}
                              value={row.UnvonNom}
                            >
                              {select &&
                                select.ranks.map((rank: any) => (
                                  <MenuItem key={rank.name} value={rank.name}>
                                    {rank.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        ) : index === 3 ? (
                          <TextField value={row.UnvonSum} disabled fullWidth />
                        ) : index === 4 ? (
                          <FormControl fullWidth>
                            <Select
                              labelId="region-select-label"
                              id="region-select"
                              name="selectRegion"
                              onChange={handleTwo}
                              value={row.Tuman}
                            >
                              {select &&
                                select.locations.map((region: any) => (
                                  <MenuItem
                                    key={region.name}
                                    value={region.name}
                                  >
                                    {region.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        ) : index === 5 ? (
                          <FormControl fullWidth>
                            <Select
                              labelId="otryad-select-label"
                              id="otryad-select"
                              name="selectOtryad"
                              onChange={handleTwo}
                              value={row.Otryad}
                            >
                              {select &&
                                select.otryads.map((otryad: any) => (
                                  <MenuItem
                                    key={otryad.name}
                                    value={otryad.name}
                                  >
                                    {otryad.name}
                                  </MenuItem>
                                ))}
                            </Select>
                          </FormControl>
                        ) : index === 6 ? (
                          <IconButton
                            onClick={() => {
                              setData((prevData: any) =>
                                prevData.filter((_: any, idx: any) => idx !== i)
                              );
                            }}
                          >
                            <RemoveCircleOutlineIcon color="error" />
                          </IconButton>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  );
}
