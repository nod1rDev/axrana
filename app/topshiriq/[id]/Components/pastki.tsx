import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Checkbox,
  IconButton,
  ListItemButton,
  ListItemText,
  TextField,
} from "@mui/material";
import React, { useCallback } from "react";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import CloseIcon from "@mui/icons-material/Close";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import debounce from "lodash/debounce";

interface Worker {
  FIO: string;
  selected: boolean;
  tasktime: string;
  taskdate: string;
  _id: string;
}

interface CustomAccordionProps {
  handleSearch: (e: React.FormEvent) => void;
  search: string;
  setSearch: (value: string) => void;
  clearSearch: () => void;
  handleSubmit: () => void;
  filteredWorkers: Worker[];
  handleToggle: (id: string) => void;
  handleTaskTimeChange: (id: string, value: string) => void;
  handleTaskDateChange: (id: string, value: string) => void;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  handleSearch,
  search,
  setSearch,
  clearSearch,
  handleSubmit,
  filteredWorkers,
  handleToggle,
  handleTaskTimeChange,
  handleTaskDateChange,
}) => {
  const debouncedHandleTaskTimeChange = useCallback(
    debounce((id: string, value: string) => handleTaskTimeChange(id, value), 0),
    []
  );

  const debouncedHandleTaskDateChange = useCallback(
    debounce(
      (id: string, value: string) => handleTaskDateChange(id, value),
      300
    ),
    []
  );

  return (
    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        {latinToCyrillic("Hodim qo'shish")}
      </AccordionSummary>
      <AccordionDetails>
        <div className="flex flex-col pb-5 border-b gap-3">
          <h1 className="font-bold">{latinToCyrillic("Filter")}</h1>
          <form onSubmit={handleSearch} className="flex items-center w-full">
            <TextField
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              fullWidth
              label={latinToCyrillic("FIO orqali qidiring")}
              autoComplete="off"
              autoCorrect="off"
              spellCheck="false"
              InputProps={{
                autoComplete: "off",
                autoCorrect: "off",
                spellCheck: "false",
                endAdornment: search ? (
                  <IconButton onClick={clearSearch}>
                    <CloseIcon color="error" />
                  </IconButton>
                ) : (
                  <IconButton type="submit">
                    <PersonSearchIcon color="info" />
                  </IconButton>
                ),
              }}
            />
          </form>
          <Button
            variant="contained"
            color="success"
            sx={{ mt: 5 }}
            onClick={handleSubmit}
          >
            {latinToCyrillic("Saqlash")}
          </Button>
        </div>
        <div className="w-full">
          {filteredWorkers.map((value: Worker) => {
            const labelId = `checkbox-list-label-${value._id}`;
            return (
              <div className="flex w-full justify-between" key={value._id}>
                <Checkbox
                  onClick={() => handleToggle(value._id)}
                  edge="start"
                  checked={value.selected}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
                <ListItemText id={labelId} primary={`${value.FIO}`} />

                <div className="flex gap-5">
                  <TextField
                    id="outlined-basic"
                    label={latinToCyrillic("Topshiriq mudati")}
                    variant="outlined"
                    type="number"
                    value={value.tasktime}
                    onChange={(e) =>
                      debouncedHandleTaskTimeChange(value._id, e.target.value)
                    }
                  />
                  <TextField
                    id="outlined-basic"
                    label={latinToCyrillic("Topshiriq vaqti")}
                    variant="outlined"
                    value={value.taskdate}
                    onChange={(e) =>
                      debouncedHandleTaskDateChange(value._id, e.target.value)
                    }
                  />
                </div>
              </div>
            );
          })}
        </div>
      </AccordionDetails>
    </Accordion>
  );
};

export default CustomAccordion;
