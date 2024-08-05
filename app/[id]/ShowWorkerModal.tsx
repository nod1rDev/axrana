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
import { deltePushWorker } from "../Api/Apis";
import { alertChange } from "../Redux/ShaxsiySlice";

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
  id: "number" | "FIO" | "Tuman" | "Otryad" | "Vaqt";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 5 },

  { id: "FIO", label: latinToCyrillic("FIO"), align: "left", minWidth: 250 },
  {
    id: "Otryad",
    label: latinToCyrillic("Sana"),
    align: "center",
    minWidth: 250,
  },
  {
    id: "Vaqt",
    label: latinToCyrillic("Vaqt"),
    align: "center",
    minWidth: 250,
  },
  {
    id: "Tuman",
    label: latinToCyrillic("O'chirish"),
    align: "right",
    minWidth: 250,
  },
];

interface Data {
  number: any;
  FIO: any;
  Otryad: any;
  Vaqt: any;
  Tuman: any;
  task_id: any;
  id: number;
}

function createData(
  number: any,
  FIO: any,
  Otryad: any,
  Vaqt: any,
  Tuman: any,
  task_id: any,
  id: number
): Data {
  return {
    number,
    FIO,
    Otryad,
    Vaqt,
    Tuman,
    task_id,
    id,
  };
}

export default function ShowWorkerModal({
  ranks,
  active,
  handleClose,
}: {
  ranks: any;
  active?: any;
  handleClose: any;
}) {
  const theme = useTheme();
  const JWT = useSelector((s: any) => s.auth.JWT);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const open = useSelector((s: any) => s.lavozim.modal2);
  const [page, setPage] = React.useState(0);
  const [ranksData, setRasnksData] = React.useState<any>([]);
  const [rowsPerPage, setRowsPerPage] =
    React.useState(100000000000000000000000);

  const rows =
    ranksData !== "Hali batalyon topshiriqni bajarmadi" &&
    ranksData !== "Hali hech qaysi batalyon topshiriqni bajarmadi"
      ? ranksData.map((e: any, i: any) =>
          createData(
            i + 1,
            e.worker_name,
            e.taskdate,
            e.tasktime,
            null,
            e.task_id,
            e.id
          )
        )
      : [];

  const dispatch = useDispatch();
  const handleDelte = async (id: any, value: any, task_id: any) => {
    const res = await deltePushWorker(JWT, id, task_id);
    if (res.success) {
      const filtRanksData = ranksData.filter(
        (e: any) => e.worker_name !== value
      );
      setRasnksData(filtRanksData);
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Xodim o'chirildi ochirildi"),
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
  React.useEffect(() => {
    setRasnksData(ranks);
  
  }, [ranks]);
  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open.open}
        onClose={handleClose}
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: "8000px", // Custom width here
          },
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {ranksData !== "Hali batalyon topshiriqni bajarmadi" &&
          ranksData !== "Hali hech qaysi batalyon topshiriqni bajarmadi"
            ? latinToCyrillic(`Jami ${ranksData.length} xodim mavjud`)
            : latinToCyrillic(ranksData)}
        </DialogTitle>
        <div className="flex flex-row  min-w-[1000px] p-4 gap-2 px-4">
          <Paper sx={{ width: "100%" }}>
            <TableContainer sx={{ overflow: "auto", maxHeight: "100vh" }}>
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
                  {rows.map((row: any, i: any) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                        {columns.map((column, e) => {
                          const value = row[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {e == 0 ? (
                                i + 1
                              ) : e == 4 ? (
                                <IconButton
                                  sx={{ ml: 1 }}
                                  aria-label="delete"
                                  size="medium"
                                  onClick={() => {
                                    handleDelte(row.id, row.FIO, row.task_id);
                                  }}
                                >
                                  <RemoveCircleOutlineIcon
                                    fontSize="inherit"
                                    color="error"
                                  />
                                </IconButton>
                              ) : column.format && typeof value === "number" ? (
                                column.format(value)
                              ) : (
                                value
                              )}
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
