"use client";
import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";

import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";

import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useDispatch, useSelector } from "react-redux";

import { Button, TextField } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { alertChange } from "@/app/Redux/ShaxsiySlice";
import { DateFilt } from "@/app/Utils";

interface Column {
  id: "number" | "Familya" | "Ism" | "Ochestva" | "actions";
  label: string;
  minWidth?: number | string;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "N", align: "left", minWidth: 5 },
  { id: "Familya", label: "Familya", align: "left", minWidth: "100%" },
  { id: "Ism", label: "Ism", align: "left", minWidth: "100%" },
  { id: "Ochestva", label: "Sharif", align: "left", minWidth: "100%" },
  {
    id: "actions",
    label: "Amallar",
    minWidth: 100,
    align: "right",
  },
];

interface Data {
  number: any;
  Familya: any;
  name: any;
  sharif: any;
  actions: any;
  id: number;
}

function createData(
  number: any,
  Familya: any,
  name: any,
  sharif: any,
  actions: any,
  id: number
): Data {
  return { number, Familya, name, sharif, actions, id };
}

export default function CreateTips({
  saqlash,
  data,
  setData,
}: {
  saqlash: any;
  data: any;
  setData: any;
}) {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [valueInp, setValueInp] = React.useState<any>({
    lastName: null,
    name: null,
    sharif: null,
  });
  const [activeInp, setActiveInp] = React.useState<any>();

  const rows: any = data.map((e: any) =>
    createData(1, e.lastName, e.name, e.sharif, 5, e._id)
  );
  const handleDelete = (id: any) => {
    const filterData = data.filter((e: any) => e._id !== id);
    setData(filterData);
  };

  const dispatch = useDispatch();

  const handleChange = (e: any) => {
    setValueInp({ ...valueInp, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (valueInp.name) {
      setData([
        ...data,
        {
          lastName: valueInp.lastName,
          sharif: valueInp.sharif,
          name: valueInp.name,
          date: DateFilt(),
          _id: Math.ceil(Math.random() * 100000000),
        },
      ]);

      setValueInp({
        lastName: "",
        name: "",
        sharif: "",
      });
    } else {
      dispatch(
        alertChange({
          open: true,
          message: "Bo'sh qatorlarni toldiring!",
          status: "warning",
        })
      );
    }
  };

  const handleChange1 = (i: any) => {
    setData(
      data.map((e: any) => {
        return e._id === activeInp
          ? { ...e, [i.target.name]: i.target.value }
          : e;
      })
    );
  };

  return (
    <div>
      <Accordion sx={{ backgroundColor: "transparent" }}>
        <AccordionSummary aria-controls="panel1-content" id="panel1-header">
          <div className="flex gap-2 items-center">
            <KeyboardArrowDownIcon />
            FIO {"qo'shish"}
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <TableContainer
            sx={{
              maxHeight: 400,
              backgroundColor: "transparent",
              overflow: "auto",
            }}
          >
            <form
              onSubmit={handleSubmit}
              className="flex justify-between ml-10 py-[6px]  px-5"
            >
              <div className="flex gap-3">
                <TextField
                  id="outlined-basic"
                  label="Familya"
                  value={valueInp.lastName}
                  name="lastName"
                  onChange={(e: any) => handleChange(e)}
                  sx={{ width: "370px", height: "44px" }}
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Ism"
                  value={valueInp.name}
                  name="name"
                  onChange={(e: any) => handleChange(e)}
                  sx={{ width: "370px", height: "44px" }}
                  variant="outlined"
                />
                <TextField
                  id="outlined-basic"
                  label="Sharif"
                  value={valueInp.sharif}
                  name="sharif"
                  onChange={(e: any) => handleChange(e)}
                  sx={{ width: "370px", height: "44px" }}
                  variant="outlined"
                />
              </div>
              <IconButton type="submit" aria-label="delete" size="large">
                <AddCircleOutlineIcon color="success" fontSize="inherit" />
              </IconButton>
            </form>

            <Table stickyHeader aria-label="sticky table">
              <TableHead sx={{ background: "#edede9" }}>
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
              </TableHead>
              <TableBody>
                {rows
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((row: any, i: any) => {
                    return (
                      <TableRow
                        hover
                        role="checkbox"
                        onClick={() => setActiveInp(row.id)}
                        tabIndex={-1}
                        key={i}
                      >
                        {columns.map((column, e) => {
                          const value = row[column.id];

                          return (
                            <TableCell key={column.id} align={column.align}>
                              {e == 0 ? (
                                i + 1
                              ) : e == 4 ? (
                                <>
                                  <IconButton
                                    sx={{ ml: 1 }}
                                    aria-label="delete"
                                    size="medium"
                                    onClick={() => handleDelete(row.id)}
                                  >
                                    <RemoveCircleOutlineIcon
                                      fontSize="inherit"
                                      color="error"
                                    />
                                  </IconButton>
                                </>
                              ) : e == 1 ? (
                                <TextField
                                  id="outlined-basic"
                                  value={row.Familya}
                                  name="lastName"
                                  onChange={(e) => handleChange1(e)}
                                  sx={{ width: "100%", height: "44px" }}
                                  variant="outlined"
                                />
                              ) : e == 2 ? (
                                <TextField
                                  id="outlined-basic"
                                  value={row.name}
                                  name="name"
                                  onChange={(e) => handleChange1(e)}
                                  sx={{ width: "100%", height: "44px" }}
                                  variant="outlined"
                                />
                              ) : e == 3 ? (
                                <TextField
                                  id="outlined-basic"
                                  value={row.sharif}
                                  name="sharif"
                                  onChange={(e) => handleChange1(e)}
                                  sx={{ width: "100%", height: "44px" }}
                                  variant="outlined"
                                />
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
          <Button onClick={saqlash} variant="contained" sx={{ mt: 1 }}>
            Saqlash
          </Button>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
