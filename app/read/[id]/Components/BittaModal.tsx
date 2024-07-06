import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

export default function BittaModal({
  value,
  setValue,
  handleSubmit,
  handleClose,
}: {
  value: any;
  setValue: any;
  handleSubmit: any;
  handleClose: any;
}) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const open = useSelector((s: any) => s.tip.modal2);

  const handleChange = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmite = async (e: any) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {latinToCyrillic("Topshiriq vaqtini o'zgartiring")}
        </DialogTitle>
        <form
          onSubmit={handleSubmite}
          className="flex flex-col w-full gap-2 px-4"
        >
          <TextField
            name="name"
            fullWidth
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            InputProps={{
              autoComplete: "off",
              autoCorrect: "off",
              spellCheck: "false",
            }}
            defaultValue={value}
            onChange={(e: any) => handleChange(e)}
            label={latinToCyrillic("Sana")}
            id="fullWidth"
          />

          <DialogActions>
            <div className="flex justify-between w-full mt-3 pb-2">
              <Button
                type="button"
                variant="contained"
                color="inherit"
                onClick={handleClose}
              >
                {latinToCyrillic("Orqaga")}
              </Button>
              <Button type="submit" color="info" variant="contained">
                {latinToCyrillic("Saqlash")}
              </Button>
            </div>
          </DialogActions>
        </form>
      </Dialog>
    </React.Fragment>
  );
}
