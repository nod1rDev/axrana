import * as React from "react";
import Button from "@mui/material/Button";
import { useRouter } from "next/navigation";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import DnsIcon from "@mui/icons-material/Dns";
import TokenIcon from "@mui/icons-material/Token";
import StorageIcon from "@mui/icons-material/Storage";
import { latinToCyrillic } from "../tip/add/Components/lotin";

export default function MenuBar2() {
  const [showMenu, setShowMenu] = React.useState(false);
  const router = useRouter();

  const handleButtonClick = () => {
    setShowMenu(!showMenu);
  };

  const handleMenuItemClick = (path: string) => {
    router.push(path);
    setShowMenu(false); // Hide the menu after navigation
  };

  return (
    <div className="w-full">
      <Button
        variant="contained"
        sx={{
          width: "100%",
          alignItems: "center",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "17px",
          fontWeight: "bold",
          textAlign: "start",
        }}
        onClick={handleButtonClick}
      >
        {latinToCyrillic("Hisobot")}
      </Button>
      {showMenu && (
        <div className="mt-2">
          <div
            className="flex items-center cursor-pointer p-2"
            onClick={() => handleMenuItemClick("/umumiy")}
          >
            <DonutSmallIcon />
            <span style={{ fontSize: "17px", fontWeight: "bold", marginLeft: "8px" }}>
              Бригада умумий ҳисобот
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer p-2"
            onClick={() => handleMenuItemClick("/main")}
          >
            <DnsIcon />
            <span style={{ fontSize: "17px", fontWeight: "bold", marginLeft: "8px" }}>
              батальон умумий ҳисобот
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer p-2"
            onClick={() => handleMenuItemClick("/maxsus")}
          >
            <TokenIcon />
            <span style={{ fontSize: "17px", fontWeight: "bold", marginLeft: "8px" }}>
              Бригада ҳисобот
            </span>
          </div>
          <div
            className="flex items-center cursor-pointer p-2"
            onClick={() => handleMenuItemClick("/otchot")}
          >
            <StorageIcon />
            <span style={{ fontSize: "17px", fontWeight: "bold", marginLeft: "8px" }}>
              батальон ҳисобот
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
