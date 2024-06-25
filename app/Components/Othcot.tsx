import React, { useEffect, useRef, useState } from "react";
import CustomizedTables from "./OtchotTab";
import { useSelector } from "react-redux";
import { GetOtchot, getCantractFilter } from "../Api/Apis";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Box, Button, Checkbox, IconButton } from "@mui/material";
import { Theme, useTheme } from "@mui/material/styles";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { FiltDate } from "../Utils";
import { useReactToPrint } from "react-to-print";
import dayjs, { Dayjs } from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import PrintIcon from "@mui/icons-material/Print";
import Documenttt from "./Document";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";

function Othcot() {
  const [data, setData] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState<any>({
    date1: new Date(),
    date2: new Date(),
  });
  const [isLotin, setIsLotin] = useState("uz");
  const getResoult = async () => {
    const res = await GetOtchot(JWT, isLotin);

    setData(res.data);
  };

  useEffect(() => {
    getResoult();
  }, []);

  const getSearchData = async () => {
    const res = await getCantractFilter(JWT, value, isLotin);

    setData(res.data);
  };

  const searchData = () => {
    setSearch(!search);
    if (!search) {
      getSearchData();
    } else {
      getResoult();
    }
  };

  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: (): any => componentRef.current,
  });

  useEffect(() => {
    getResoult();
  }, [isLotin]);

  return (
    <>
      <div>
        <div className="flex w-full  justify-between">
          <div className="flex flex-col gap-2">
            <div className="text-[28px] font-bold">Otchot</div>
            <FormControl sx={{ width: "160px" }}>
              <Select
                value={isLotin}
                onChange={(e: any) => setIsLotin(e.target.value)}
              >
                <MenuItem value={"uz"}>lotincha</MenuItem>
                <MenuItem value={"ru"}>krilcha</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-end text-[28px] mb-2 font-bold">
              Filter
            </div>
            <div className="flex translate-y-[-32px] items-center gap-4">
              <div className="  flex flex-col   md:ml-0 ">
                <div className=" ">Sana 1</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "DatePicker",
                      "TimePicker",
                      "DatePicker",
                      "DateRangePicker",
                    ]}
                  >
                    <DemoItem>
                      <DatePicker
                        defaultValue={dayjs(new Date())}
                        sx={{ width: "100%" }}
                        onChange={(e: any) =>
                          setValue({ ...value, date1: FiltDate(e) })
                        }
                        onAccept={(e: any) =>
                          setValue({ ...value, date1: FiltDate(e) })
                        }
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              <div className="  flex flex-col   md:ml-0 ">
                <div className=" ">Sana 2</div>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer
                    components={[
                      "DatePicker",
                      "TimePicker",
                      "DatePicker",
                      "DateRangePicker",
                    ]}
                  >
                    <DemoItem>
                      <DatePicker
                        defaultValue={dayjs(new Date())}
                        sx={{ width: "100%" }}
                        onChange={(e: any) =>
                          setValue({ ...value, date2: FiltDate(e) })
                        }
                        onAccept={(e: any) =>
                          setValue({ ...value, date2: FiltDate(e) })
                        }
                      />
                    </DemoItem>
                  </DemoContainer>
                </LocalizationProvider>
              </div>
              {search ? (
                <IconButton
                  size="large"
                  sx={{ width: "60px", height: "60px", mt: 3 }}
                  aria-label="delete"
                  onClick={searchData}
                >
                  <CloseIcon fontSize="inherit" color="error" />
                </IconButton>
              ) : (
                <IconButton
                  size="large"
                  sx={{ width: "60px", height: "60px", mt: 3 }}
                  aria-label="delete"
                  onClick={searchData}
                >
                  <SearchIcon fontSize="inherit" color="info" />
                </IconButton>
              )}
            </div>
          </div>
        </div>
        <div className="flex mb-4 justify-end">
          <Button
            onClick={handlePrint}
            variant="contained"
            startIcon={<PrintIcon />}
          >
            chop etish
          </Button>
        </div>
        <CustomizedTables language={isLotin} data={data} />
      </div>
      <div className=" hidden">
        <Documenttt language={isLotin} printData={data} ref={componentRef} />
      </div>
    </>
  );
}

export default Othcot;
