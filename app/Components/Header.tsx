"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Link from "next/link";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuHeader from "./Menu";
import { useRouter } from "next/navigation";
import { latinToCyrillic } from "../tip/add/Components/lotin";

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}

const drawerWidth = 240;
const navItems = ["shartnoma", "shaxsiy"];
const navItems2 = [
  "Unvonlar",
  "Joylashuv",
  "Shaxsiy",
  "Fuqorolar",
  "Lavozimlar",
  "Eng kam ish haqi",
  " Chiqish",
];

export default function Header(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [value, setValue] = React.useState("shartnoma");
  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems2.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;
  const router = useRouter();
  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  React.useEffect(() => {}, [value]);

  return (
    <Box sx={{ display: "flex", maxWidth: "100%" }}>
      <CssBaseline />
      <div className="max-w-[1580px] mx-auto">
        <AppBar component="nav" sx={{ maxWidth: "100%" }}>
          <div className="max-w-full ">
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, display: { sm: "none" } }}
              >
                <MenuIcon />
              </IconButton>
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
                        {e}
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
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
    </Box>
  );
}
