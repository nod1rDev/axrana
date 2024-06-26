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
  };
  React.useEffect(() => {
    getSelect();
  }, []);
  const dispatch = useDispatch();

  const handleChange = (i: any) => {
    if (i.target.name == "FIOlotin") {
      setValue({
        ...value,
        FIOlotin: i.target.value,
        FIOkril: latinToCyrillic(i.target.value),
      });
    } else if (i.target.name == "selectRank") {
      const filter = select.ranks.find((e: any) => i.target.value === e.name);
      setValue({
        ...value,
        selectRank: filter.name,
        selectRankSumma: filter.summa,
      });
    } else if (i.target.name == "FIOkril") {
      setValue({
        ...value,
        FIOlotin: cyrillicToLatin(i.target.value),
        FIOkril: i.target.value,
      });
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
  const handleSwitch = () => {
    setIsLatinToCyrillic(!isLatinToCyrillic);
    if (!isLotin) {
      setLatinText(cyrillicText);
      setCyrillicText(latinText);
    } else {
      setLatinText(latinText);
      setCyrillicText(cyrillicText);
    }
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
              maxWidth: "1120px", // Custom width here
            },
          }}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">
            {open.name + " " + "o'zgartirin"}
          </DialogTitle>
          <div className="flex flex-row  min-w-[1120px] p-4 gap-2 px-4">
            {isLatinToCyrillic ? (
              <div className="flex w-[33.333%] items-center justify-between gap-3">
                <TextField
                  label="Lotin"
                  value={value.FIOlotin}
                  onChange={handleChange}
                  fullWidth
                  name="FIOlotin"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  InputProps={{
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                  }}
                />

                <IconButton
                  sx={{ width: "40px", height: "40px" }}
                  aria-label="delete"
                  onClick={handleSwitch}
                  size="medium"
                >
                  <CompareArrowsIcon fontSize="inherit" />
                </IconButton>

                <TextField
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  InputProps={{
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                  }}
                  label="Kirill"
                  value={value.FIOkril}
                  disabled
                  fullWidth
                />
              </div>
            ) : (
              <div className="flex w-[33.333%] items-center justify-between gap-3">
                <TextField
                  label="Kirill"
                  value={value.FIOkril}
                  onChange={handleChange}
                  fullWidth
                  name="FIOkril"
                  autoComplete="off"
                  autoCorrect="off"
                  spellCheck="false"
                  InputProps={{
                    autoComplete: "off",
                    autoCorrect: "off",
                    spellCheck: "false",
                  }}
                />
                <IconButton
                  aria-label="delete"
                  onClick={handleSwitch}
                  sx={{ width: "40px", height: "40px" }}
                  size="medium"
                >
                  <CompareArrowsIcon fontSize="inherit" />
                </IconButton>
                <TextField
                  label="Lotin"
                  sx={{
                    "& .MuiInputBase-input.Mui-disabled": {
                      color: "#000000", // Text color inside the input when disabled
                      opacity: 1, // Ensure the text is fully opaque
                    },
                  }}
                  value={value.FIOlotin}
                  disabled
                  fullWidth
                />
              </div>
            )}

            <div className="w-[33.333%] flex justify-between gap-3">
              <FormControl fullWidth>
                <InputLabel id="rank-select-label">Unvon</InputLabel>
                <Select
                  labelId="rank-select-label"
                  id="rank-select"
                  label="Unvon"
                  name="selectRank"
                  value={value.selectRank}
                  onChange={handleChange}
                >
                  {select &&
                    select.ranks.map((e: any) => (
                      <MenuItem key={e.name} value={e.name}>
                        {e.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="rank-summa-select-label">
                  Unvon Summa
                </InputLabel>
                <Select
                  labelId="rank-summa-select-label"
                  id="rank-summa-select"
                  label="Unvon Summa"
                  name="selectRankSumma"
                  value={value.selectRankSumma}
                  disabled
                >
                  <MenuItem value={value.selectRankSumma}>
                    {value.selectRankSumma}
                  </MenuItem>
                </Select>
              </FormControl>
            </div>

            <div className="w-[33.333%] flex justify-between gap-4">
              <FormControl fullWidth>
                <InputLabel id="region-select-label">Tuman</InputLabel>
                <Select
                  labelId="region-select-label"
                  id="region-select"
                  label="Tuman"
                  name="selectRegion"
                  value={value.selectRegion}
                  onChange={handleChange}
                >
                  {select &&
                    select.locations.map((e: any) => (
                      <MenuItem key={e.name} value={e.name}>
                        {e.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              <FormControl fullWidth>
                <InputLabel id="otryad-select-label">Otryad</InputLabel>
                <Select
                  labelId="otryad-select-label"
                  id="otryad-select"
                  label="Otryad"
                  name="selectOtryad"
                  value={value.selectOtryad}
                  onChange={handleChange}
                >
                  {select &&
                    select.otryads.map((e: any) => (
                      <MenuItem key={e.name} value={e.name}>
                        {e.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </div>
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
            {open.name + " " + "o'chiririshga rozimisiz?"}
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
