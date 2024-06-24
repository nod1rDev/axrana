import React, { useEffect, useState } from "react";
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
import dayjs, { Dayjs } from "dayjs";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
function Othcot() {
  const [data, setData] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [search, setSearch] = useState(false);
  const [value, setValue] = useState({
    date1: "",
    date2: "",
  });
  const getResoult = async () => {
    const res = await GetOtchot(JWT);

    setData(res.data);
  };

  useEffect(() => {
    getResoult();
  }, []);

  const getSearchData = async () => {
    const res = await getCantractFilter(JWT, value);

    setData(res.data);
  };

  const searchData = () => {
    setSearch(!search);
    if (!search) {
      if (value.date1 && value.date2) {
        getSearchData();
      }
    } else {
      getResoult();
    }
  };

  return (
    <div>
      <div className="flex w-full  justify-between">
        <div className="text-[28px] font-bold">Otchot</div>
        <div className="flex flex-col">
          <div className="flex justify-end text-[28px] mb-6 font-bold">
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
      <CustomizedTables data={data} />
    </div>
  );
}

export default Othcot;
