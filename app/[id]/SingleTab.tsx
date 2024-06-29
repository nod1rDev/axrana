"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

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
  id: "number" | "lotinFIO" | "krilFIO" | "UnvonNom";

  label: string;
  minWidth?: number;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 5 },
  { id: "lotinFIO", label: "фио", align: "center", minWidth: 100 },

  {
    id: "krilFIO",
    label: "фио",
    minWidth: 180,
    align: "center",
  },
  {
    id: "UnvonNom",
    label: "ишлаш мудати",
    minWidth: 180,
    align: "center",
  },
];

interface Data {
  number: any;
  lotinFIO: any;
  krilFIO: any;
  UnvonNom: any;

  id: number;
}

function createData(
  number: any,
  lotinFIO: any,
  krilFIO: any,
  UnvonNom: any,

  id: number
): Data {
  return { number, lotinFIO, krilFIO, UnvonNom, id };
}

export default function SingleTab({ ranks }: { ranks: any }) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const rows = ranks
    ? ranks.map((e: any, i: any) =>
        createData(
          i + 1,
          e.FIOlotin,
          e.FIOkril,
          e.dayOrHour + " " + e.timeType,
          e._id
        )
      )
    : [];

  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ overflow: "auto", maxHeight: 300 }}>
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
  );
}
