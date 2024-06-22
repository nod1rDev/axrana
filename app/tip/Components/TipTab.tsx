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
  id: "number" | "Familya" | "Ism" | "Sharif" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "N", align: "left", minWidth: 5 },
  { id: "Familya", label: "Familya", align: "left", minWidth: 100 },

  {
    id: "Ism",
    label: "Ism",
    minWidth: 180,
    align: "center",
  },
  {
    id: "Sharif",
    label: "Sharif",
    minWidth: 180,
    align: "center",
  },
  {
    id: "actions",
    label: "Amallar",
    minWidth: 150,
    align: "right",
  },
];

interface Data {
  number: any;
  Familya: any;

  Ism: any;
  Sharif: any;
  actions: any;
  id: number;
}

function createData(
  number: any,
  Familya: any,

  Ism: any,
  Sharif: any,
  actions: any,
  id: number
): Data {
  return { number, Familya, Ism, Sharif, actions, id };
}

export default function TipTab({ ranks }: { ranks: any }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = ranks
    ? ranks.map((e: any) => createData(1, e.name, e.date, "sharif", 5, e.id))
    : [];

  const dispatch = useDispatch();

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ overflow: "auto", maxHeight: 400 }}>
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
                              <IconButton
                                onClick={() =>
                                  dispatch(
                                    setModalTip({
                                      type: 1,
                                      open: true,
                                      id: row.id,
                                      name: row.Ism,
                                      lastName: row.Familya,
                                      sharif: row.Sharif,
                                    })
                                  )
                                }
                                aria-label="delete"
                                size="medium"
                              >
                                <ModeEditOutlineIcon
                                  fontSize="inherit"
                                  color="info"
                                />
                              </IconButton>

                              <IconButton
                                sx={{ ml: 1 }}
                                aria-label="delete"
                                size="medium"
                                onClick={() =>
                                  dispatch(
                                    setModalTip({
                                      type: 2,
                                      open: true,
                                      id: row.id,
                                      name: row.Ism,
                                      lastName: row.Familya,
                                      sharif: row.Sharif,
                                    })
                                  )
                                }
                              >
                                <RemoveCircleOutlineIcon
                                  fontSize="inherit"
                                  color="error"
                                />
                              </IconButton>
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
