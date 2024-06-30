import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";

export default function EditRaxbar({
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
  const open = useSelector((s: any) => s.names.modal);

  const handleChange = (e: any) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmite = async () => {
    handleSubmit();
  };

  return (
    <React.Fragment>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {latinToCyrillic("BXM summasini ozgartirin!")}
        </DialogTitle>
        <div className="flex flex-row justify-between w-[600px] gap-2 px-4">
          <TextField
            name="summa"
            error={value.summa == ""}
            fullWidth
            value={value.summa}
            onChange={(e: any) => handleChange(e)}
            label={latinToCyrillic("BXM summa")}
            id="fullWidth"
          />
          
        </div>
        <DialogActions>
          <div className="flex justify-between w-full mt-3 pb-2">
            <Button variant="contained" color="inherit" onClick={handleClose}>
              {latinToCyrillic("Orqaga")}
            </Button>
            <Button onClick={handleSubmite} color="info" variant="contained">
              {latinToCyrillic("Saqlash")}
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
