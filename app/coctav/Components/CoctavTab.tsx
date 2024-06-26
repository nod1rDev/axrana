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
import { setModalCoctav } from "@/app/Redux/CoctavsSlice";
import { styled } from "@mui/system";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

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
  id: "number" | "unvonNomi" | "unvonDate" | "actions";
  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 5 },
  {
    id: "unvonNomi",
    label: latinToCyrillic("Zvaniya Nomi"),
    align: "left",
    minWidth: 600,
  },

  {
    id: "actions",
    label: "Амаллар",
    minWidth: 10,
    align: "right",
  },
];

interface Data {
  number: any;
  unvonNomi: any;

  actions: any;
  id: number;
}

function createData(
  number: any,
  unvonNomi: any,

  actions: any,
  id: number
): Data {
  return { number, unvonNomi, actions, id };
}

export default function CoctavTab({ ranks }: { ranks: any }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] =
    React.useState(1000000000000000000000000000000000000000000000000);

  const rows = ranks
    ? ranks.map((e: any) => createData(1, e.name, 5, e._id))
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
                          ) : e == 2 ? (
                            <>
                              <IconButton
                                onClick={() =>
                                  dispatch(
                                    setModalCoctav({
                                      type: 1,
                                      open: true,
                                      id: row.id,
                                      name: row.unvonNomi,
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
                                    setModalCoctav({
                                      type: 2,
                                      open: true,
                                      id: row.id,
                                      name: row.unvonNomi,
                                      summa: row.unvonNarxi,
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
