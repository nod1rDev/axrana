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
const navItems = ["Shaxsiy", "shartnoma"];
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
              <Typography
                variant="h4"
                component="div"
                sx={{
                  flexGrow: 1,
                  display: { xs: "block", sm: "block" },
                  ml: { xs: "100px", lg: "50px" },
                  fontWeight: "bold",
                  letterSpacing: "5px",
                }}
              >
                <Link href={"/"}>Aхрана</Link>
              </Typography>
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {navItems.map((item) => (
                  <Button
                    key={item}
                    onClick={() => router.push(`/${item.toLowerCase()}`)}
                    sx={{ color: "#fff", fontWeight: "bold", ml: 3 }}
                  >
                    {latinToCyrillic(item)}
                  </Button>
                ))}
              </Box>
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
