"use client";
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
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import Status from "@/app/topshiriq/Components/Status";

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
  id: "number" | "FIO" | "Tuman" | "Otryad" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 5 },
  {
    id: "Tuman",
    label: latinToCyrillic("Organ nomi"),
    minWidth: 200,
    align: "center",
  },
  {
    id: "FIO",
    label: latinToCyrillic("Nazorat qilish muddati"),
    align: "center",
    minWidth: 280,
  },

  {
    id: "Otryad",
    label: latinToCyrillic("Xodimlar soni"),
    minWidth: 280,
    align: "center",
  },
  {
    id: "actions",
    label: latinToCyrillic("Status"),
    minWidth: 150,
    align: "right",
  },
];

interface Data {
  number: any;
  FIO: any;

  Tuman: any;
  Otryad: any;
  actions: any;
  id: number;
}

function createData(
  number: any,
  FIO: any,

  Tuman: any,
  Otryad: any,
  actions: any,
  id: number
): Data {
  return {
    number,
    FIO,

    Tuman,
    Otryad,
    actions,
    id,
  };
}

export default function BittaTab({ ranks }: { ranks: any }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] =
    React.useState(100000000000000000000000);

  const rows = ranks
    ? ranks.map((e: any, i: any) =>
        createData(
          i + 1,
          e.time,
          e.name,
          e.workerNumber,

          e.bajarilmagan
            ? "bajarilmagan"
            : e.bajarilmoqda
            ? "bajarilmoqda"
            : e.bajarilgan
            ? "bajarildi"
            : "",

          e._id
        )
      )
    : [];

  const dispatch = useDispatch();

  return (
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
                          {e == 0 ? (
                            i + 1
                          ) : e == 4 ? (
                            <>
                              <div className="flex justify-end">
                                <Status status={row.actions} />
                              </div>
                            </>
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
  );
}
