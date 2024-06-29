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
import { UpdateUsers, createAuth, getAuth } from "@/app/Api/Apis";
import { alertChange, setUserModal } from "@/app/Redux/ShaxsiySlice";
import IconButton from "@mui/material/IconButton";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import EditUser from "./userEdit";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
interface Column {
  id: "number" | "FoydalanuvchiNomi" | "FoydalanuvchiParoli" | "actions";
  label: string;
  minWidth?: number;
  align?: "left" | "center" | "right";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "т/р", align: "left", minWidth: 170 },
  {
    id: "FoydalanuvchiNomi",
    label: latinToCyrillic("Foydalanuvchi Nomi"),
    align: "left",
    minWidth: 100,
  },
  {
    id: "FoydalanuvchiParoli",
    label: latinToCyrillic("Foydalanuvchi Paroli"),
    minWidth: 170,
    align: "center",
  },
  {
    id: "actions",
    label: latinToCyrillic("Tahrirlash"),
    minWidth: 170,
    align: "right",
  },
];

interface Data {
  number: number;
  FoydalanuvchiNomi: string;
  FoydalanuvchiParoli: number | string;
  actions: any;
  id: number;
}

function createData(
  number: number,
  FoydalanuvchiNomi: string,
  FoydalanuvchiParoli: number | string,
  actions: any,
  id: number
): Data {
  return { number, FoydalanuvchiNomi, FoydalanuvchiParoli, actions, id };
}

export default function Users() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] =
    React.useState(100000000000000000000000);
  const [users, setUsers] = React.useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = React.useState<any>({
    username: "",
    password: "",
  });
  const [value2, setValue2] = React.useState<any>({
    username: null,
    oldPassword: null,
    newPassword: null,
  });

  const getUsers = async () => {
    const res = await getAuth(JWT);

    setUsers(res.users);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  React.useEffect(() => {
    getUsers();
  }, []);

  const rows = users
    ? users.map((e: any) => createData(1, e.username, e.password, null, e._id))
    : [];
  const dispatch = useDispatch();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (value.username && value.password) {
      const res = await createAuth(JWT, value.username, value.password);
      if (res.success) {
        dispatch(
          alertChange({
            open: true,
            message: latinToCyrillic("Foydalanuvchi qoshildi"),
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
      username: "",
      password: "",
    });
  };

  const handleChange = (e: any) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    dispatch(setUserModal({ open: false, name: "" }));
  };
  const open = useSelector((s: any) => s.shax.userModal);
  const updateAuth = async (valuee: any) => {
    const res = await UpdateUsers(JWT, valuee, open.id);
    if (res.success) {
      handleClose();
      setValue2({ username: null, oldPassword: null, newPassword: null });
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Password tahrirlandi"),
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
    if (value2.oldPassword !== "" && value2.newPassword !== "") {
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

  return (
    <>
      <Paper sx={{ width: "60%", overflow: "hidden" }}>
        <div className="w-full ">
          <h1 className="font-bold text-[18px] mt-2 ml-2">
            {latinToCyrillic("Foydalanuvchi qoshish")}
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-between py-4 px-5"
          >
            <TextField
              id="outlined-basic"
              label={latinToCyrillic("Foydalanuvchi Nomi")}
              value={value.username}
              name="username"
              onChange={(e: any) => handleChange(e)}
              sx={{ width: "350px" }}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label={latinToCyrillic("Foydalanuvchi Paroli")}
              value={value.password}
              name="password"
              onChange={(e: any) => handleChange(e)}
              sx={{ width: "350px" }}
              variant="outlined"
            />
            <Button
              color="primary"
              type="submit"
              sx={{ width: "130px" }}
              variant="contained"
            >
              {latinToCyrillic("Qo'shish")}
            </Button>
          </form>
        </div>
        <TableContainer sx={{ maxHeight: 400, overflow: "auto" }}>
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
                            ) : e == 3 ? (
                              <>
                                <IconButton
                                  onClick={() =>
                                    dispatch(
                                      setUserModal({
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
      <EditUser
        handleClose={handleClose}
        handleSubmit={handleSubmite}
        value={value2}
        setValue={setValue2}
      />
    </>
  );
}
