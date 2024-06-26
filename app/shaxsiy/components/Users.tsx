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
import { createAuth, getAuth } from "@/app/Api/Apis";
import { alertChange } from "@/app/Redux/ShaxsiySlice";

interface Column {
  id: "number" | "FoydalanuvchiNomi" | "FoydalanuvchiParoli";
  label: string;
  minWidth?: number;
  align?: "left" | "center";
  format?: (value: number) => string;
}

const columns: readonly Column[] = [
  { id: "number", label: "No", align: "left", minWidth: 170 },
  {
    id: "FoydalanuvchiNomi",
    label: "Foydalanuvchi Nomi",
    align: "center",
    minWidth: 100,
  },
  {
    id: "FoydalanuvchiParoli",
    label: "Foydalanuvchi Paroli",
    minWidth: 170,
    align: "center",
  },
];

interface Data {
  number: number;
  FoydalanuvchiNomi: string;
  FoydalanuvchiParoli: number | string;
  id: number;
}

function createData(
  number: number,
  FoydalanuvchiNomi: string,
  FoydalanuvchiParoli: number | string,
  id: number
): Data {
  return { number, FoydalanuvchiNomi, FoydalanuvchiParoli, id };
}

export default function Users() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(100000000000000000000000);
  const [users, setUsers] = React.useState<any>();
  const JWT = useSelector((state: any) => state.auth.JWT);
  const [value, setValue] = React.useState<any>({
    username: "",
    password: "",
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
    ? users.map((e: any) => createData(1, e.username, e.password, e._id))
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
            message: "Foydalanuvchi qoshildi",
            status: "success",
          })
        );
      } else {
        dispatch(
          alertChange({
            open: true,
            message: res.message,
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

  return (
    <>
      <Paper sx={{ width: "60%", overflow: "hidden" }}>
        <div className="w-full ">
          <h1 className="font-bold text-[18px] mt-2 ml-2">
            Foydalanuvchi qoshish
          </h1>
          <form
            onSubmit={handleSubmit}
            className="flex justify-between py-4 px-5"
          >
            <TextField
              id="outlined-basic"
              label="Foydalanuvchi Nomi"
              value={value.username}
              name="username"
              onChange={(e: any) => handleChange(e)}
              sx={{ width: "350px" }}
              variant="outlined"
            />
            <TextField
              id="outlined-basic"
              label="Foydalanuvchi Paroli"
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
              {"Qo'shish"}
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
    </>
  );
}
