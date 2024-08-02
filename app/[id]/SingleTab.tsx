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
import { getWorkersForWatch } from "../Api/Apis";
import { setModalShowWorker } from "../Redux/LavozimSlice";
import ShowWorkerModal from "./ShowWorkerModal";
import { formatNumber } from "../Utils";
// Define the data structure for a row
interface TableRowData {
  id: number;
  department: string;
  personnel: number;
  hours: number;
  rate: number;
  total: number;
  money: any;
  chegirma: any;
}

// Style for bordered cells
const BorderedTableCell = styled(TableCell)({
  border: "1px solid black",
  textAlign: "center",
  fontSize: "12px",
  padding: "4px",
});

const LeftBorderedTableRow = styled(TableRow)({
  borderLeft: "1px solid black",
});

const BudgetTable: any = ({
  data1,
  raq,
  dataId,
  address,
}: {
  data1: any;
  raq: any;
  dataId: any;
  address: any;
}) => {
  const JWT = useSelector((s: any) => s.auth.JWT);
  const [worker, setWorker] = React.useState([]);
  const dispatch = useDispatch();
  const data: TableRowData[] = data1
    ? data1.map((organ: any) => {
        return {
          id: organ.id,
          department: organ.battalionname,
          personnel: organ.workernumber,
          hours: organ.tasktime,
          rate: organ.timemoney,
          total: organ.allmoney,
          money: organ.money,
          chegirma: organ.discountmoney ? organ.discountmoney : "___",
        };
      })
    : [];
  const getOne = async (organId: any) => {
    const res = await getWorkersForWatch(JWT, organId, "task");

    setWorker(res.data);
    if (res.success) {
      dispatch(setModalShowWorker({ open: true }));
    }
  };
  const getAll = async () => {
    const res = await getWorkersForWatch(JWT, dataId, "contract");

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
        <div className="flex pb-6 justify-end flex-col gap-0">
          <div className="font-bold text-[16px] flex justify-end">
            {data1 && address.contractdate}
          </div>
          <div className="font-bold text-[16px] flex justify-end">
            {data1 && raq + latinToCyrillic("-sonli qaror loyihasi")}
          </div>
        </div>

        <h2 className="text-16 w-[90%] mx-auto text-center font-semibold mb-4">
          Оммавий тадбирни ўтказишда фуқаролар хавфсизлигини таъминлаш ва жамоат
          тартибини сақлашни ташкил этишда
        </h2>

        <h2 className="text-16 text-center font-bold mb-8">
          ХАРАЖАТЛАР СМЕТАСИ
        </h2>
        <TableContainer
          component={Paper}
          style={{ width: "100%", overflowX: "auto" }}
        >
          <Table style={{ width: "100%", tableLayout: "fixed" }}>
            <TableHead>
              <TableRow>
                <BorderedTableCell>
                  {latinToCyrillic("Tadbir o'tadigan joy nomi")}
                </BorderedTableCell>
                <BorderedTableCell>
                  Жалб этиладиган шахсий таркиб ваколатли давлат идоралари ёки
                  органлар номи
                </BorderedTableCell>
                <BorderedTableCell>
                  {latinToCyrillic("Jami ishlatilgan shaxsiy tarkib soni")}
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
                  {latinToCyrillic("Chegirma")}{" "}
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
                <BorderedTableCell>6</BorderedTableCell>
              </LeftBorderedTableRow>
              {data.map((row: any, i: number) => (
                <LeftBorderedTableRow key={row.id}>
                  <div className="font-bold text-[10px] max-w-[90%] mx-auto mt-4 text-center">
                    {i === 0 ? address.address && address.address : null}
                  </div>

                  <BorderedTableCell>{row.department}</BorderedTableCell>
                  <BorderedTableCell>
                    <Button
                      onClick={() =>
                        row.department !== "Toshkent Shahar IIBB" &&
                        row.department !== "98162" &&
                        row.department !== "98157" &&
                        row.department !== "Тошкент шаҳар МГ"
                          ? showModal(row.id)
                          : ""
                      }
                      color="inherit"
                      variant="text"
                    >
                      {row.personnel}
                    </Button>
                  </BorderedTableCell>
                  <BorderedTableCell>
                    {formatNumber(row.hours)}
                  </BorderedTableCell>
                  <BorderedTableCell>
                    {formatNumber(row.rate)}
                  </BorderedTableCell>
                  <BorderedTableCell>
                    {formatNumber(row.money)}
                  </BorderedTableCell>
                  <BorderedTableCell>
                    {formatNumber(row.chegirma)}
                  </BorderedTableCell>
                  <BorderedTableCell>
                    {formatNumber(row.total)}
                  </BorderedTableCell>
                </LeftBorderedTableRow>
              ))}
              <LeftBorderedTableRow>
                <BorderedTableCell colSpan={2}>
                  {latinToCyrillic("Jami")}
                </BorderedTableCell>
                <BorderedTableCell>
                  <Button onClick={getAll} color="inherit" variant="text">
                    {address && formatNumber(address.allworkernumber)}
                  </Button>
                </BorderedTableCell>
                <BorderedTableCell></BorderedTableCell>
                <BorderedTableCell></BorderedTableCell>
                <BorderedTableCell>
                  {address && formatNumber(address.money)}
                </BorderedTableCell>
                <BorderedTableCell>
                  {address && address.discountmoney
                    ? formatNumber(address.discountmoney)
                    : "___"}
                </BorderedTableCell>
                <BorderedTableCell>
                  {address && formatNumber(address.allmoney)}
                </BorderedTableCell>
              </LeftBorderedTableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
      <ShowWorkerModal active={true} ranks={worker} handleClose={hadleClose} />
    </>
  );
};

export default BudgetTable;
