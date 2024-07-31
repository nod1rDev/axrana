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
  deleteAcount,
  getAllAcount,
  getAuth,
  updateAcount,
  updateBatalyon,
} from "@/app/Api/Apis";
import { alertChange, setUserModal } from "@/app/Redux/ShaxsiySlice";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin"; // Correct import
import { setModalCoctav } from "../Redux/CoctavsSlice";
import CoctavModal from "./Components/CoctavModal";
import { formatString } from "../Utils";

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
    label: latinToCyrillic("Hisob raqami"),
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
    accountNumber: "",
  });
  const [value2, setValue2] = React.useState<any>({
    accountNumber: "",
  });
  const [accountError, setAccountError] = React.useState<string | null>(null);
  const [remainingChars, setRemainingChars] = React.useState<number>(20);

  const getUsers = async () => {
    const res = await getAllAcount(JWT);
    setUsers(res.data);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const rows = users
    ? users.map((e: any) => createData(1, e.accountnumber, null, e.id))
    : [];
  const dispatch = useDispatch();
  function removeSpaces(str: any) {
    console.log(str);

    const pureStr = str.replace(/\s+/g, "");

    return formatString(pureStr);
  }
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (value.accountNumber.length >= 20) {
      const pureVal = { accountNumber: removeSpaces(value.accountNumber) };
      const res = await createAcount(JWT, pureVal);
      if (res.success) {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic("Acount hisob qo'shildi"),
            status: "success",
          })
        );
        setValue({ ...value, accountNumber: "" });
      } else {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic(res.message),
            status: "error",
          })
        );
      }
      getUsers();
    } else {
      setAccountError(
        `Hisob raqami kamida 20 ta belgidan iborat bo'lishi kerak. Qolgan belgilari: ${
          20 - value.accountNumber.length
        }`
      );
    }
  };

  const handleChange = (e: any) => {
    const newValue = e.target.value;
    setValue({ ...value, [e.target.name]: newValue });
    if (e.target.name === "accountNumber") {
      setRemainingChars(20 - newValue.length);
      setAccountError(null);
    }
  };

  const handleClose = () => {
    dispatch(setModalCoctav({ open: false, name: "" }));
  };

  const open = useSelector((s: any) => s.coctav.modal);

  const updateAuth = async (valuee: any) => {
    const res = await updateAcount(JWT, valuee, +open.id);
    if (res.success) {
      handleClose();
      setValue2({ accountNumber: null });
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Hisob raqami tahrirlandi"),
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

  const handleSubmite = () => {
    if (value2.accountNumber !== "") {
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
    const res = await deleteAcount(JWT, +open.id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Hisob Raqam ochirildi"),
          status: "success",
        })
      );
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
    setValue2({ accountNumber: open.name });
  }, [open.name]);

  return (
    <>
      <Paper sx={{ width: "95%", mx: "auto", mt: "20px", overflow: "hidden" }}>
        <div className="w-full">
          <h1 className="font-bold text-[18px] mt-2 ml-2">
            {latinToCyrillic("Hisob qo'shing")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-between items-start gap-4 py-4 px-5"
          >
            <TextField
              id="outlined-basic"
              label={latinToCyrillic("Hisob raqami")}
              value={value.accountNumber}
              name="accountNumber"
              onChange={handleChange}
              fullWidth
              variant="outlined"
              error={!!accountError}
              helperText={accountError || `Qolgan belgilari: ${remainingChars}`}
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
                                      setModalCoctav({
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
                                      setModalCoctav({
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
                              column.format(formatString(value))
                            ) : (
                              formatString(value)
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
