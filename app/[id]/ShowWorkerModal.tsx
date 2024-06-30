"use client";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GetCreateInfoWorker } from "@/app/Api/Apis";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { latinToCyrillic } from "../tip/add/Components/lotin";

import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch } from "react-redux";
import { setModalTip } from "@/app/Redux/TipSlice";
import { styled } from "@mui/system";

const CustomTableHead = styled(TableHead)(({ theme }) => ({
  // Asosiy rang
  "& .MuiTableCell-root": {
    color: "#000",
    fontWeight: "600",
    backgroundColor: "#f1faee",
    // Matn rangini o'zgartirish
  },
}));
interface Column {
  id: "number" | "FIO" | "Tuman" | "Otryad";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 5 },
  {
    id: "Tuman",
    label: latinToCyrillic("Zvaniya"),
    minWidth: 100,
    align: "center",
  },
  { id: "FIO", label: latinToCyrillic("FIO"), align: "center", minWidth: 180 },

  {
    id: "Otryad",
    label: latinToCyrillic("Batalyon"),
    minWidth: 180,
    align: "center",
  },
];

interface Data {
  number: any;
  FIO: any;

  Tuman: any;
  Otryad: any;

  id: number;
}

function createData(
  number: any,
  FIO: any,

  Tuman: any,
  Otryad: any,

  id: number
): Data {
  return {
    number,
    FIO,

    Tuman,
    Otryad,

    id,
  };
}

export default function ShowWorkerModal({
  ranks,
  handleClose,
}: {
  ranks: any;
  handleClose: any;
}) {
  const theme = useTheme();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const open = useSelector((s: any) => s.lavozim.modal2);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] =
    React.useState(100000000000000000000000);

  const rows = ranks
    ? ranks.map((e: any, i: any) =>
        createData(i + 1, e.FIO, e.zvaniya, e.batalyon, e._id)
      )
    : [];

  const dispatch = useDispatch();

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open.open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "1200px", // Custom width here
          },
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {latinToCyrillic(`Jami ${ranks.length} xodim mavjud`)}
        </DialogTitle>
        <div className="flex flex-row  min-w-[1200px] p-4 gap-2 px-4">
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ overflow: "auto", maxHeight: "70vh" }}>
              <Table stickyHeader aria-label="sticky table">
                <CustomTableHead sx={{ background: "#edede9" }}>
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
                    .map((row: any, i: any) => {
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                          {columns.map((column, e) => {
                            const value = row[column.id];
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {e == 0
                                  ? i + 1
                                  : column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
        <DialogActions>
          <div className="flex justify-end w-full mt-3 pb-2">
            <Button variant="contained" color="info" onClick={handleClose}>
              {latinToCyrillic("Orqaga")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
