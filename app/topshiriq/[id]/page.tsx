"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useDispatch, useSelector } from "react-redux";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { latinToCyrillic } from "@/app/tip/add/Components/lotin";
import {
  CreateWorkerForOrgan,
  GetTopshiriqlar,
  Getworkers,
} from "@/app/Api/Apis";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import TopshiriqCard from "../Components/TopshiriqCard";
import { alertChange } from "@/app/Redux/ShaxsiySlice";

const Page = () => {
  const { id } = useParams();
  const [data, setData] = useState<any>([]);
  const [workers, setWorkers] = useState([]);
  const JWT = useSelector((s: any) => s.auth.JWT);

  const getData = async () => {
    const res = await GetTopshiriqlar(JWT);
    const single = res.data.find((e: any) => e._id === id);
    setData(single);
  };

  const GetWorkers = async () => {
    const res = await Getworkers(JWT);
    const filData = res.data.map((e: any) => ({
      zvaniya: e.zvaniya,
      FIO: e.FIO,
      selected: false,
      _id: e._id,
    }));
    setWorkers(filData);
  };

  useEffect(() => {
    getData();
    GetWorkers();
  }, []);

  const handleToggle = (id: string) => {
    setWorkers((prevWorkers: any) =>
      prevWorkers.map((worker: any) =>
        worker._id === id ? { ...worker, selected: !worker.selected } : worker
      )
    );
  };
  const dispatch = useDispatch();
  const router = useRouter();
  const CreateWorker = async (value: any) => {
    const res = await CreateWorkerForOrgan(JWT, value, id);

    if (res.success) {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic("Xodimlar qo'shildi"),
          status: "success",
        })
      );
      router.push("/topshiriq");
    } else {
      dispatch(
        alertChange({
          open: true,
          message: latinToCyrillic(res.message),
          status: "error",
        })
      );
    }
  };
  const handleSubmit = () => {
    const FiltWorker = workers.filter((e: any) => e.selected === true);
    const pureWorker = FiltWorker.map((e: any) => {
      return { FIO: e.FIO, zvaniya: e.zvaniya };
    });
    if (pureWorker) {
      CreateWorker(pureWorker);
    }else{
        dispatch(
            alertChange({
              open: true,
              message: latinToCyrillic("Hodim tanlang!"),
              status: "warning",
            })
          );
    }
  };
  return (
    <>
      <div className="w-[80%] mt-5 flex-col gap-6 mx-auto">
        <div className="mb-6 flex justify-between w-full items-center">
          <Button
            startIcon={<ArrowBackIcon />}
            color="info"
            variant="contained"
            onClick={() => router.push("/topshiriq")}
          >
            {"орқага"}
          </Button>
        </div>
        <div className="mb-6">
          <TopshiriqCard click={false} data={data} />
        </div>
        {data && (data.bajarilmoqda) && (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              {latinToCyrillic("Hodim qo'shish")}
            </AccordionSummary>
            <AccordionDetails>
              <List
                sx={{
                  width: "100%",
                  maxWidth: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {workers.map((value: any) => {
                  const labelId = `checkbox-list-label-${value._id}`;
                  return (
                    <ListItem key={value._id} disablePadding>
                      <ListItemButton
                        role={undefined}
                        onClick={() => handleToggle(value._id)}
                        dense
                      >
                        <ListItemIcon>
                          <Checkbox
                            edge="start"
                            checked={value.selected}
                            disableRipple
                            inputProps={{ "aria-labelledby": labelId }}
                          />
                        </ListItemIcon>
                        <ListItemText
                          id={labelId}
                          primary={`${value.zvaniya} ${value.FIO}`}
                        />
                      </ListItemButton>
                    </ListItem>
                  );
                })}
              </List>

              <Button
                variant="contained"
                color="success"
                sx={{ mt: 5 }}
                fullWidth
                onClick={handleSubmit}
              >
                {latinToCyrillic("Saqlash")}
              </Button>
            </AccordionDetails>
          </Accordion>
        )}
      </div>
    </>
  );
};

export default Page;
