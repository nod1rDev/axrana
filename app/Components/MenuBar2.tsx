import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance"; // Icon for BXM
import StorageIcon from "@mui/icons-material/Storage"; // Icon for Hisob raqami
import { latinToCyrillic } from "../tip/add/Components/lotin";
import { useRouter } from "next/navigation";
import DnsIcon from "@mui/icons-material/Dns";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import TokenIcon from "@mui/icons-material/Token";
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
        fontSize: 24,
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

export default function MenuBar2() {
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
        {latinToCyrillic("Hisobot")}
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
            router.push("/umumiy");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <DonutSmallIcon />
            <span style={{ fontSize: "17px", fontWeight: "bold" }}>
              Бригада умумий ҳисобот
            </span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/main");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <DnsIcon />
            <span style={{ fontSize: "17px", fontWeight: "bold" }}>
              батальон умумий ҳисобот
            </span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/maxsus");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <TokenIcon />
            <span style={{ fontSize: "17px", fontWeight: "bold" }}>
              Бригада ҳисобот
            </span>
          </div>
        </MenuItem>
        <MenuItem
          onClick={() => {
            router.push("/otchot");
            handleClose();
          }}
          disableRipple
        >
          <div className="flex items-center  w-full">
            <StorageIcon />
            <span style={{ fontSize: "17px", fontWeight: "bold" }}>
              батальон ҳисобот
            </span>
          </div>
        </MenuItem>
      </StyledMenu>
    </div>
  );
}
