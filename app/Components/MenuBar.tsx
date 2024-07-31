import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import StorageIcon from "@mui/icons-material/Storage"; // Icon for Hisob raqami
import { latinToCyrillic } from "../tip/add/Components/lotin";
import { useRouter } from "next/navigation";
import CollectionsBookmarkIcon from "@mui/icons-material/CollectionsBookmark";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import ShareLocationIcon from "@mui/icons-material/ShareLocation";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
import NumbersIcon from '@mui/icons-material/Numbers';
const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 260,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

export default function MenuBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const router = useRouter();

  return (
    <div className="w-full">
      <Button
        id="demo-customized-button"
        aria-controls={open ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        variant="contained"
        disableElevation
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "17px",
          fontWeight: "bold",
          textAlign: "start",
        }}
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {latinToCyrillic("Spravichnik")}
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            router.push("/names");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <AccountBalanceIcon />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {latinToCyrillic("BXM")}
            </span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/coctav");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <StorageIcon />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {latinToCyrillic("Hisob Raqami")}
            </span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/shahar");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <CollectionsBookmarkIcon />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {latinToCyrillic("Ijrochi")}
            </span>
          </div>
        </MenuItem>

        <MenuItem
          onClick={() => {
            router.push("/boshliq");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <InterpreterModeIcon />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {latinToCyrillic("Boshliq")}
            </span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/manzil");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <ShareLocationIcon />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {latinToCyrillic("Manzil")}
            </span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/bank");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <AccountBalanceWalletIcon />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {latinToCyrillic("Bank")}
            </span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/mfo");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <FeaturedPlayListIcon />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {latinToCyrillic("Mfo")}
            </span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/str");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <NumbersIcon />
            <span style={{ fontSize: "16px", fontWeight: "bold" }}>
              {latinToCyrillic("Str")}
            </span>
          </div>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
