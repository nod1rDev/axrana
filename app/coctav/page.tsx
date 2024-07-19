"use client";
import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, TextField } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  createAcount,
  createAuth,
  getAllAcount,
  getAuth,
  updateBatalyon,
} from "@/app/Api/Apis";
import { alertChange, setUserModal } from "@/app/Redux/ShaxsiySlice";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin"; // Correct import
import { setModalCoctav } from "../Redux/CoctavsSlice";
import CoctavModal from "./Components/CoctavModal";

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
    label: latinToCyrillic("Hsiob raqami"),
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

export default function page() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] =
    React.useState(100000000000000000000000);
  const [users, setUsers] = React.useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = React.useState<any>({
    accountnumber: "",
  });
  const [value2, setValue2] = React.useState<any>({
    accountnumber: "",
  });

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

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (value.accountnumber) {
      const res = await createAcount(JWT, value);
      if (res.success) {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic("Acount hisob qo'shildi"),
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

      getUsers();
    }
    setValue({
      accountnumber: "",
    });
  };
React.useEffect(()=>{},[])
  const handleChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    dispatch(setModalCoctav({ open: false, name: "" }));
  };
  const open = useSelector((s: any) => s.coctav.userModal);
  const updateAuth = async (valuee: any) => {
    const res = await updateBatalyon(JWT, valuee, open.id);
    if (res.success) {
      handleClose();
      setValue2({ accountnumber: null });
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Parol tahrirlandi"),
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
    if (value2.newPassword !== "") {
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
    setTimeout(() => getUsers(), 500);
  };

  const handleDelete = () => {};

  return (
    <>
      <Paper sx={{ width: "95%", mx: "auto", mt: "20px", overflow: "hidden" }}>
        <div className="w-full ">
          <h1 className="font-bold text-[18px] mt-2 ml-2">
            {latinToCyrillic("Hisob qo'shing")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-between gap-4 py-4 px-5"
          >
            <TextField
              id="outlined-basic"
              label={latinToCyrillic("Hisob raqami")}
              value={value.accountnumber}
              name="accountnumber"
              onChange={(e: any) => handleChange(e)}
              fullWidth
              variant="outlined"
            />

            <Button
              color="primary"
              type="submit"
              sx={{ width: "160px" }}
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
