"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, TextField, FormHelperText } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  createAcount,
  createAuth,
  createBank,
  createBoshliq,
  createManzil,
  createShahar,
  deleteAcount,
  deleteBank,
  deleteBoshliq,
  deleteManzil,
  deleteShahar,
  getAllAcount,
  getAllBank,
  getAllBoshliq,
  getAllManzil,
  getAllShahar,
  getAuth,
  updateAcount,
  updateBank,
  updateBatalyon,
  updateBoshliq,
  updateManzil,
  updateShahar,
} from "@/app/Api/Apis";
import { alertChange, setUserModal } from "@/app/Redux/ShaxsiySlice";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin"; // Correct import
import { setModalCoctav } from "../Redux/CoctavsSlice";
import CoctavModal from "./Components/CoctavModal";

import { setModalBank, setModalManzil, setModalboshliq } from "../Redux/storageSlice";


interface Column {
  id: "number" | "FoydalanuvchiNomi" | "nima" | "actions";
  label: string;
  minWidth?: number | string;
  align?: "left" | "center" | "right";
  flex?: number;
  positsion?: string;
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 10 },
  {
    id: "FoydalanuvchiNomi",
    label: latinToCyrillic("Bank"),
    align: "left",
    minWidth: 900,
  },

  {
    id: "actions",
    label: latinToCyrillic("Amallar"),
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  number: number;
  FoydalanuvchiNomi: string;

  actions: any;
  id: number;
}

function createData(
  number: number,
  FoydalanuvchiNomi: string,

  actions: any,
  id: number
): Data {
  return { number, FoydalanuvchiNomi, actions, id };
}

export default function Page() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] =
    React.useState(100000000000000000000000);
  const [users, setUsers] = React.useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = React.useState<any>({
    bank: "",
  });
  const [value2, setValue2] = React.useState<any>({
    bank: "",
  });
  const [accountError, setAccountError] = React.useState<string | null>(null);
  const [remainingChars, setRemainingChars] = React.useState<number>(20);

  const getUsers = async () => {
    const res = await getAllBank(JWT);
    setUsers(res.data);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const rows = users
    ? users.map((e: any) => createData(1, e.bank, null, e.id))
    : [];
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (value.bank) {
      const pureVal = { bank: value.bank };
      const res = await createBank(JWT, pureVal);
      if (res.success) {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic("Bank qo'shildi"),
            status: "success",
          })
        );
        setValue({ ...value, bank: "" });
        getUsers();
      } else {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic(res.message),
            status: "error",
          })
        );
      }
    }
  };

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setValue({ ...value, [e.target.name]: newValue });
  };

  const handleClose = () => {
    dispatch(setModalBank({ open: false, name: "" }));
  };

  const open = useSelector((s: any) => s.sto.bank);

  const updateAuth = async (valuee: any) => {
    const res = await updateBank(JWT, valuee, +open.id);
    if (res.success) {
      handleClose();
      setValue2({ bank: null });
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Bank  tahrirlandi"),
          status: "success",
        })
      );
      getUsers();
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

  const handleSubmite = () => {
    if (value2.bank !== "") {
      updateAuth(value2);
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Bosh qatorlarni to'ldiring!"),
          status: "warning",
        })
      );
    }
  };

  const deleteData = async () => {
    const res = await deleteBank(JWT, +open.id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Bank ochirildi"),
          status: "success",
        })
      );
      getUsers();
      handleClose();
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

  const handleDelete = () => {
    deleteData();
  };

  React.useEffect(() => {
    setValue2({ bank: open.name });
  }, [open.name]);

  return (
    <>
      <Paper sx={{ width: "95%", mx: "auto", mt: "20px", overflow: "hidden" }}>
        <div className="w-full">
          <h1 className="font-bold text-[18px] mt-2 ml-2">
            {latinToCyrillic("Bank qo'shing")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-between items-start gap-4 py-4 px-5"
          >
            <TextField
              id="outlined-basic"
              label={latinToCyrillic("Bank")}
              value={value.bank}
              name="bank"
              onChange={handleChange}
              fullWidth
              variant="outlined"
            />
            <Button
              color="primary"
              type="submit"
              sx={{ width: "160px", height: "54px" }}
              variant="contained"
            >
              {latinToCyrillic("Qo'shish")}
            </Button>
          </form>
        </div>
        <TableContainer sx={{ maxHeight: "100%", overflow: "auto" }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
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
                    <TableRow hover role="checkbox" tabIndex={-1} key={i}>
                      {columns.map((column, e) => {
                        const value = row[column.id];
                        return (
                          <TableCell key={column.id} align={column.align}>
                            {e === 0 ? (
                              i + 1
                            ) : e === 2 ? (
                              <>
                                <IconButton
                                  onClick={() =>
                                    dispatch(
                                      setModalBank({
                                        type: 1,
                                        open: true,
                                        id: row.id,
                                        name: row.FoydalanuvchiNomi,
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
                                      setModalBank({
                                        type: 2,
                                        open: true,
                                        id: row.id,
                                        name: row.FoydalanuvchiNomi,
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
      <CoctavModal
        handleClose={handleClose}
        handleDelete={handleDelete}
        handleSubmit={handleSubmite}
        value={value2}
        setValue={setValue2}
      />
    </>
  );
}
