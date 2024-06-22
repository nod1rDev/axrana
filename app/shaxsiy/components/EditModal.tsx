import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";


export default function EditModal({
  value,
  setValue,
  handleSubmit,
  handleClose,
}: {
  value: any;
  setValue: any;
  handleSubmit: any;
  handleClose:any
}) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const open = useSelector((s: any) => s.shax.modal);


  

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
          {"Shaxsiy parolingizni ozgartirin"}
        </DialogTitle>
        <div className="flex flex-col w-full gap-2 px-4">
          <TextField
            name="oldPassword"
            error={value.oldPassword == ""}
            fullWidth
            value={value.oldPassword}
            onChange={(e: any) => handleChange(e)}
            label="Amaldagi Parol"
            id="fullWidth"
          />
          <TextField
            fullWidth
            error={value.newPassword == ""}
            value={value.newPassword}
            onChange={(e: any) => handleChange(e)}
            name="newPassword"
            label="Yangi Parol"
            id="fullWidth"
          />
        </div>
        <DialogActions>
          <div className="flex justify-between w-full mt-3 pb-2">
            <Button variant="contained" color="inherit" onClick={handleClose}>
              Orqaga
            </Button>
            <Button onClick={handleSubmite} color="info" variant="contained">
              Saqlash
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
