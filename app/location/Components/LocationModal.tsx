import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector } from "react-redux";


export default function LocationModal({
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
  const open = useSelector((s: any) => s.locat.modal);


  const handleChange = (e: any) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmite = async (e: any) => {
    e.preventDefault();
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
          <form
            onSubmit={handleSubmite}
            className="flex flex-col w-[300px] gap-2 px-4"
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
              defaultValue={value.name !== "" ? value.name : open.name}
              onChange={(e: any) => handleChange(e)}
              label="Tuman Nomi"
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
                  Orqaga
                </Button>
                <Button type="submit" color="info" variant="contained">
                  Saqlash
                </Button>
              </div>
            </DialogActions>
          </form>
        </Dialog>
      ) : (
        <Dialog
          fullScreen={fullScreen}
          open={open.open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {`"${open.name}"` + " " + "ushbu tumanni ochirishni istaysizmi ?"}
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
