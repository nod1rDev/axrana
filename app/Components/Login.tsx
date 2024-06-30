"use client";
import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { loginAuth, SelectAuth } from "../Api/Apis";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../Redux/AuthSlice";
import { useRouter } from "next/navigation";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { alertChange } from "../Redux/ShaxsiySlice";

import { db } from "../firebase";
import { ref, set } from "firebase/database";
import { latinToCyrillic } from "../tip/add/Components/lotin";

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function Login() {
  const dispatch = useDispatch();
  const [data, setData] = React.useState<any>();
  const [password, setPassword] = React.useState<any>();
  const [select, setSelect] = React.useState<any>();

  const login = async (username: any, password: any) => {
    const res = await loginAuth(username, password);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Foydalanuvchi muvofaqiyatli kirdi!"),
          status: "success",
        })
      );
      sessionStorage.setItem("token", res.token);

      sessionStorage.setItem("id", res.data.id);

      setTimeout(() => window.location.reload(), 200);
      router.push("/");
    } else {
      dispatch(
        alertChange({
          open: true,
          message: res.message,
          status: "error",
        })
      );
    }
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    setPassword(data.get("password"));

    if (data.get("password") && select) {
      dispatch(
        setUser({
          username: select,
          password: data.get("password"),
        })
      );

      login(select, data.get("password"));
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Malumotlarni to'liq toldiring!"),
          status: "warning",
        })
      );
    }
  };
  const router = useRouter();

  const getAuth = async () => {
    const res = await SelectAuth();


    setData(res.data);
  };

  React.useEffect(() => {
    getAuth();
  }, []);

  React.useEffect(() => {
    const input: any = document.getElementById("myInput");
    if (input) {
      input.setAttribute("autocomplete", "off");
      // Optionally set the form's autocomplete to 'off'
      input.closest("form").setAttribute("autocomplete", "off");
    }
  }, []);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };

  return (
    <div className="max-w-full h-[100vh] login       bg-no-repeat bg-cover ">
      <div className="  flex items-center justify-center  ">
        <div className="max-w-[400px]   bg-opacity-[15%] mt-[8%] rounded-lg bg-slate-50 ">
          <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <Box
                sx={{
                  marginTop: 8,
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
                  <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" fontWeight={"700"} variant="h5">
                  {latinToCyrillic("Milliy_Gvardiya")}
                </Typography>
                <Box
                  component="form"
                  onSubmit={handleSubmit}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">
                      {latinToCyrillic("Foydalanuvchi")}
                    </InputLabel>
                    <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      value={select}
                      label={latinToCyrillic("Foydalanuvchi")}
                      sx={{ background: "#E8F0FE" }}
                      onChange={(e: any) => setSelect(e.target.value)}
                    >
                      {data
                        ? data.map((e: any) => (
                            <MenuItem value={e.username}>{e.username}</MenuItem>
                          ))
                        : []}
                    </Select>
                  </FormControl>
                  <FormControl sx={{ width: "100%", mt: 2 }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">
                      {latinToCyrillic("Paroli")}
                    </InputLabel>
                    <OutlinedInput
                      sx={{
                        backgroundColor: "whitesmoke",
                        borderRadius: "5px",

                        width: "100%",
                      }}
                      
                      endAdornment={
                        <InputAdornment position="end">
                          <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      }
                      label={latinToCyrillic("Paroli")}
                      name="password"
                      id="outlined-adornment-password"
                    />
                  </FormControl>

                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    {latinToCyrillic("Kirish")}
                  </Button>
                  <Grid container></Grid>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
        </div>
      </div>
    </div>
  );
}
