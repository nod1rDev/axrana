import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import TextField from "@mui/material/TextField";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { useSelector, useDispatch } from "react-redux";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { GetCreateInfoWorker } from "@/app/Api/Apis";
import { IconButton } from "@mui/material";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import { cyrillicToLatin, latinToCyrillic } from "../add/Components/lotin";
import { ranksData } from "@/app/Utils";

export default function TipModal({
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
  const JWT = useSelector((s: any) => s.auth.JWT);
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const open = useSelector((s: any) => s.tip.modal);
  const [select, setSelect] = React.useState<any>();
  const [isLatinToCyrillic, setIsLatinToCyrillic] = React.useState(true);
  const [latinText, setLatinText] = React.useState("");
  const [cyrillicText, setCyrillicText] = React.useState("");
  const [isLotin, setIsLotin] = React.useState(true);

  const getSelect = async () => {
    const res = await GetCreateInfoWorker(JWT);
    setSelect(res);
    // Set default values for selects if necessary
  };

  React.useEffect(() => {
    getSelect();
  }, []);

  const dispatch = useDispatch();

  const handleChange = (i: any) => {
    if (i.target.name === "FIO") {
      setValue({
        ...value,
        FIO: i.target.value,
      });
    } else if (i.target.name === "selectRank") {
    } else if (i.target.name === "FIOkril") {
    } else {
      setValue({
        ...value,
        [i.target.name]: i.target.value,
      });
    }
  };

  const handleChange2 = (i: any) => {
    if (i.target.name === "FIO") {
      setValue({
        ...value,
        FIO: i.target.value,
      });
    } else if (i.target.name === "selectRank") {
    } else if (i.target.name === "FIOkril") {
    } else {
      setValue({
        ...value,
        [i.target.name]: i.target.value,
      });
    }
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
          sx={{
            "& .MuiDialog-paper": {
              maxWidth: "800px", // Custom width here
            },
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {open.name + " " + latinToCyrillic("o'zgartirin")}
          </DialogTitle>
          <div className="flex flex-row  min-w-[800px] p-4 gap-2 px-4">
            <div className="w-full flex justify-between gap-4">
              <FormControl sx={{ width: "40%" }} fullWidth>
                <InputLabel id="region-select-label">
                  {latinToCyrillic("Zvaniya")}{" "}
                </InputLabel>
                <Select
                  labelId="region-select-label"
                  id="region-select"
                  label={latinToCyrillic("Zvaniya")}
                  name="zvaniya"
                  value={value.zvaniya}
                  MenuProps={{
                    PaperProps: {
                      style: {
                        maxHeight: 1124, // Example max height, adjust as needed
                      },
                    },
                  }}
                  onChange={handleChange}
                >
                  {ranksData.map((e: any) => (
                    <MenuItem key={e.zvaniye} value={e.zvaniye}>
                      {e.zvaniye}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                label={latinToCyrillic("FIO")}
                value={value.FIO}
                onChange={handleChange}
                fullWidth
                name="FIO"
                sx={{ width: "60%" }}
                autoComplete="off"
                autoCorrect="off"
                spellCheck="false"
                InputProps={{
                  autoComplete: "off",
                  autoCorrect: "off",
                  spellCheck: "false",
                }}
              />
            </div>
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
      ) : (
        <Dialog
          fullScreen={fullScreen}
          open={open.open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {`"${open.name}"` +
              " " +
              latinToCyrillic("ushbu Fuqoroni ochirishni istaysizmi ?")}
          </DialogTitle>
          <div className="w-[300px] mt-5"></div>
          <DialogActions>
            <div className="flex justify-between w-full mt-3 pb-2">
              <Button variant="contained" color="inherit" onClick={handleClose}>
                {latinToCyrillic("Orqaga")}
              </Button>
              <Button onClick={handleDelete} color="error" variant="contained">
                {latinToCyrillic("O'chirish")}
              </Button>
            </div>
          </DialogActions>
        </Dialog>
      )}
    </React.Fragment>
  );
}
