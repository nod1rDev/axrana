"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Box,
  styled,
} from "@mui/material";
import { latinToCyrillic } from "../tip/add/Components/lotin";

import { useSelector, useDispatch } from "react-redux";
import { GetWorkerByOrgan, GetWorkerByOrgan1 } from "../Api/Apis";
import { setModalShowWorker } from "../Redux/LavozimSlice";
import ShowWorkerModal from "./ShowWorkerModal";
// Define the data structure for a row
interface TableRowData {
  id: number;
  department: string;
  personnel: number;
  hours: number;
  rate: number;
  total: number;
}

// Style for bordered cells
const BorderedTableCell = styled(TableCell)({
  border: "1px solid black",
  textAlign: "center",
  padding: "8px",
});

const LeftBorderedTableRow = styled(TableRow)({
  borderLeft: "1px solid black",
});

const BudgetTable: any = ({
  data1,
  raq,
  dataId,
}: {
  data1: any;
  raq: any;
  dataId: any;
}) => {
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [worker, setWorker] = React.useState([]);
  const dispatch = useDispatch();
  const data: TableRowData[] = data1
    ? data1.organs.map((organ: any) => {
        return {
          id: organ._id,
          department: organ.name,
          personnel: organ.workerNumber,
          hours: organ.time,
          rate: organ.timeMoney,
          total: organ.allMoney,
        };
      })
    : [];
  const getOne = async (organId: any) => {
    const res = await GetWorkerByOrgan1(JWT, dataId, organId);

    setWorker(res.data);
    if (res.success) {
      dispatch(setModalShowWorker({ open: true }));
    }
  };
  const getAll = async () => {
    const res = await GetWorkerByOrgan(JWT, dataId);

    setWorker(res.data);
    if (res.success) {
      dispatch(setModalShowWorker({ open: true }));
    }
  };
  const hadleClose = () => {
    dispatch(setModalShowWorker({ open: false }));
  };
  const showModal = (organId: any) => {
    getOne(organId);
  };
  const showModa2 = () => {
    getAll();
  };
  return (
    <>
      <Box>
        <div className="flex  pb-6 justify-end flex-col gap-0">
          <div className="font-bold text-[18px] flex justify-end">
            {data1 && data1.date}
          </div>
          <div className="font-bold text-[18px] flex justify-end">
            {data1 && raq + latinToCyrillic("-sonli qaror loyihasi")}
          </div>
        </div>

        <h2 className="text-xl w-[90%] mx-auto text-center font-semibold mb-4">
          Оммавий тадбирни ўтказишда фуқаролар хавфсизлигини таъминлаш ва жамоат
          тартибини сақлашни ташкил этишда
        </h2>

        <h2 className="text-2xl text-center font-bold mb-8">
          ХАРАЖАТЛАР СМЕТАСИ
        </h2>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <BorderedTableCell>
                  {latinToCyrillic("Tadbir o'tkaziladigan joy nomi")}
                </BorderedTableCell>
                <BorderedTableCell>
                  Жалб этиладиган шахсий таркиб ваколатли давлат идоралари ёки
                  органлар номи
                </BorderedTableCell>
                <BorderedTableCell>
                  {latinToCyrillic("Jami ishlatiladigan shaxsiy tarkib soni")}
                </BorderedTableCell>
                <BorderedTableCell>
                  {latinToCyrillic("Ommaiy tadbir o'tkazish vaqti (soat)")}
                </BorderedTableCell>
                <BorderedTableCell>
                  {latinToCyrillic("Bir kishilik soatbay ish haqi (BHM*7%)")}
                </BorderedTableCell>
                <BorderedTableCell>
                  {" "}
                  {latinToCyrillic("Jami hisoblangan (3*4*5)")}{" "}
                </BorderedTableCell>
                <BorderedTableCell>
                  {" "}
                  {latinToCyrillic("Umumiy hisoblangan")}{" "}
                </BorderedTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <LeftBorderedTableRow>
                <BorderedTableCell>1</BorderedTableCell>
                <BorderedTableCell>2</BorderedTableCell>
                <BorderedTableCell>3</BorderedTableCell>
                <BorderedTableCell>4</BorderedTableCell>
                <BorderedTableCell>5</BorderedTableCell>
                <BorderedTableCell>6</BorderedTableCell>
                <BorderedTableCell>6</BorderedTableCell>
              </LeftBorderedTableRow>
              {data.map((row: any, i: number) => (
                <LeftBorderedTableRow key={row.id}>
                  <div className="font-bold text-center">
                    {i === 0 ? data1 && data1.address : null}
                  </div>
                  <BorderedTableCell>{row.department}</BorderedTableCell>
                  <BorderedTableCell>
                    <Button
                      onClick={() => showModal(row.id)}
                      color="inherit"
                      variant="text"
                    >
                      {" "}
                      {row.personnel}
                    </Button>
                  </BorderedTableCell>
                  <BorderedTableCell>{row.hours}</BorderedTableCell>
                  <BorderedTableCell>
                    {row.rate.toLocaleString()}
                  </BorderedTableCell>
                  <BorderedTableCell>
                    {row.total.toLocaleString()}
                  </BorderedTableCell>
                  <BorderedTableCell>
                    {row.total.toLocaleString()}
                  </BorderedTableCell>
                </LeftBorderedTableRow>
              ))}
              <LeftBorderedTableRow>
                <BorderedTableCell colSpan={2}>
                  {latinToCyrillic("Jami")}
                </BorderedTableCell>
                <BorderedTableCell>
                  <Button onClick={getAll} color="inherit" variant="text">
                    {" "}
                    {data1 && data1.allworkerNumber}
                  </Button>
                </BorderedTableCell>
                <BorderedTableCell></BorderedTableCell>
                <BorderedTableCell>
                  {data1 && data1.timeMoney}
                </BorderedTableCell>
                <BorderedTableCell>
                  {data1 && data1.allAllMoney}
                </BorderedTableCell>
                <BorderedTableCell>
                  {data1 && data1.allAllMoney}
                </BorderedTableCell>
              </LeftBorderedTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ShowWorkerModal ranks={worker} handleClose={hadleClose} />
    </>
  );
};

export default BudgetTable;
