"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useSelector, useDispatch } from "react-redux";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuHeader from "./Menu";
import { useRouter } from "next/navigation";
import { latinToCyrillic } from "../tip/add/Components/lotin";

export default function Header() {
  const admin = useSelector((s: any) => s.auth.admin);
  const router = useRouter();

  const navItems = !admin
    ? ["topshiriq", "shartnoma", "shaxsiy"]
    : ["shartnoma", "shaxsiy"];
  const [value, setValue] = React.useState<any>("shartnoma");
  const handleChange = (e: any) => {
    setValue(e.target.value);
    
  };
  React.useEffect(() => {
    const bir = navItems[0];
    if (bir == undefined) {
      setValue("shartnoma");
    }
    setValue(bir);
  }, [admin]);
  React.useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <Box sx={{ display: "flex", maxWidth: "100%" }}>
      <CssBaseline />
      <div className="max-w-[1580px] mx-auto">
        <AppBar component="nav" sx={{ maxWidth: "100%" }}>
          <div className="max-w-full ">
            <Toolbar>
              <div className=" flex-1">
                <FormControl sx={{ width: "200px" }}>
                  <Select
                    sx={{
                      color: "white", // Selectning tanlangan qiymat matni uchun rang
                      ".MuiSvgIcon-root": { color: "white" }, // Select icon uchun rang
                    }}
                    value={value}
                    onChange={handleChange}
                  >
                    {navItems.map((e: any) => (
                      <MenuItem onClick={() => router.push(`/${e}`)} value={e}>
                        {latinToCyrillic(e)}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>

              <div className="hidden ml-[100px] lg:block">
                <MenuHeader />
              </div>
            </Toolbar>
          </div>
        </AppBar>
      </div>
    </Box>
  );
}
