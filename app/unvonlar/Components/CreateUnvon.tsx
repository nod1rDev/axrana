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
  id: "number" | "unvonNomi" | "unvonNarxi" | "actions";
  label: string;
  minWidth?: number | string;
  align?: "right" | "center" | "left";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "N", align: "left", minWidth: 5 },
  { id: "unvonNomi", label: "Unvon Nomi", align: "left", minWidth: "100%" },
  {
    id: "unvonNarxi",
    label: "Unvon Narxi",
    minWidth: 180,
    align: "center",
  },

  {
    id: "actions",
    label: "Amallar",
    minWidth: 200,
    align: "right",
  },
];

interface Data {
  number: any;
  unvonNomi: any;
  unvonNarxi: any;

  actions: any;
  id: number;
}

function createData(
  number: any,
  unvonNomi: any,
  unvonNarxi: any,

  actions: any,
  id: number
): Data {
  return { number, unvonNomi, unvonNarxi, actions, id };
}

export default function CreateUnvon({
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
    name: null,
    summa: null,
  });
  const [activeInp, setActiveInp] = React.useState<any>();
  const rows: any = data
    ? data.map((e: any) => createData(1, e.name, e.summa, 5, e._id))
    : [];
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
    if (valueInp.name && valueInp.summa) {
      setData([
        ...data,
        {
          name: valueInp.name,
          summa: valueInp.summa,
          date: DateFilt(),
          _id: Math.ceil(Math.random() * 100000),
        },
      ]);

      setValueInp({
        name: "",
        summa: "",
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
            Unvon {"qo'shish"}
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
              className="flex justify-between py-[6px]  px-5"
            >
              <TextField
                id="outlined-basic"
                label="Unvon Nomi"
                value={valueInp.name}
                name="name"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                InputProps={{
                  autoComplete: "off",
                  autoCorrect: "off",
                  spellCheck: "false",
                }}
                onChange={(e: any) => handleChange(e)}
                sx={{ width: "300px", height: "44px" }}
                variant="outlined"
              />
              <TextField
                id="outlined-basic"
                label="Unvon summa"
                value={valueInp.summa}
                type="number"
                name="summa"
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                InputProps={{
                  autoComplete: "off",
                  autoCorrect: "off",
                  spellCheck: "false",
                }}
                onChange={(e: any) => handleChange(e)}
                sx={{ width: "300px" }}
                variant="outlined"
              />
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
                              ) : e == 3 ? (
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
                                  defaultValue={row.unvonNomi}
                                  name="name"
                                  autoComplete="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  InputProps={{
                                    autoComplete: "off",
                                    autoCorrect: "off",
                                    spellCheck: "false",
                                  }}
                                  onChange={(e) => handleChange1(e)}
                                  sx={{ width: "300px", height: "44px" }}
                                  variant="outlined"
                                />
                              ) : e == 2 ? (
                                <TextField
                                  id="outlined-basic"
                                  defaultValue={row.unvonNarxi}
                                  onChange={(e) => handleChange1(e)}
                                  name="summa"
                                  type="number"
                                  autoComplete="off"
                                  autoCorrect="off"
                                  spellCheck="false"
                                  InputProps={{
                                    autoComplete: "off",
                                    autoCorrect: "off",
                                    spellCheck: "false",
                                  }}
                                  sx={{ minWidth: "300px",mt:"10px" }}
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
