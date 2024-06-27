import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";

export default function BankModal({
  value,
  setValue,
  handleSubmit,
  handleClose,
  handleDelete,
}: {
  value: any;
  setValue: any;
  handleSubmit: any;
  handleClose: any;
  handleDelete: any;
}) {
  const theme = useTheme();

  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const open = useSelector((s: any) => s.bank.modal);

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
      {open.type == 1 ? (
        <Dialog
          fullScreen={fullScreen}
          open={open.open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {open.name + " " + "o'zgartirin"}
          </DialogTitle>
          <div className="flex flex-col w-[300px] gap-2 px-4">
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
              value={value.name}
              onChange={(e: any) => handleChange(e)}
              label="Bank Nomi"
              id="fullWidth"
            />
            <TextField
              fullWidth
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              InputProps={{
                autoComplete: "off",
                autoCorrect: "off",
                spellCheck: "false",
              }}
              value={value.number}
              type="number"
              onChange={(e: any) => handleChange(e)}
              name="number"
              label="Bank Raqami"
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
      ) : (
        <Dialog
          fullScreen={fullScreen}
          open={open.open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {`"${open.name}"` + " " + "ushbu bankni ochirishni istaysizmi ?"}
          </DialogTitle>
          <div className="w-[300px] mt-5"></div>
          <DialogActions>
            <div className="flex justify-between w-full mt-3 pb-2">
              <Button variant="contained" color="inherit" onClick={handleClose}>
                Orqaga
              </Button>
              <Button onClick={handleDelete} color="error" variant="contained">
                {"O'chirish"}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}
