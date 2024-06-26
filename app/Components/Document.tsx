"use client"; // components/Table.js
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Typography } from "@mui/material";
import { GetNames } from "../Api/Apis";
import { useSelector } from "react-redux";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#000",
    fontWeight: "600",
    fontSize: 18,
    backgroundColor: "#f1faee",
    textAlign: "center", // Center align text
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center", // Center align text
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({}));

interface Data {
  tr: number;
  name: string;
  rank: string;
  district: string;
  unit: string;
  contractNo: string;
  contractDate: string;
  contractAmount: number;

  serviceDuration: any;
  company: string;
  inn: any;
  manzil: any;
  raxbar: any;
  telefon: any;
}

function createData(
  tr: number,
  name: string,
  rank: string,
  district: string,
  unit: string,
  contractNo: string,
  contractDate: string,
  contractAmount: number,

  serviceDuration: any,
  company: string,
  inn: any,
  manzil: any,
  raxbar: any,
  telefon: any
): Data {
  return {
    tr,
    name,
    rank,
    district,
    unit,
    contractNo,
    contractDate,
    contractAmount,

    serviceDuration,
    company,
    inn,
    manzil,
    raxbar,
    telefon,
  };
}

const Documenttt = React.forwardRef(
  ({ printData, language }: any, ref: any) => {
    const [names, setNames] = React.useState<any>();
    const JWT = useSelector((s: any) => s.auth.JWT);
    const getUser = async () => {
      const res = await GetNames(JWT);
      setNames(res.data);
    };

    React.useEffect(() => {
      getUser();
    }, []);
    const rows =
      printData &&
      printData.map((e: any, i: any) =>
        createData(
          i + 1,
          e.FIO,
          e.unvon,
          e.tuman,
          e.otryad,
          e.shartnoma_N,
          e.shartnoma_sanasi,
          e.shartnoma_summasi,

          e.xizmat_muddati,
          e.korxona_nomi,
          e.inn,
          e.manzil,
          e.raxbar,
          e.telefon
        )
      );
    return (
      <div ref={ref} className="flex flex-col  p-10 w-full mx-auto">
        <div className="text-[36px] mx-auto  font-bold mb-5">
          Otchot {"Ro'yhati"}
        </div>
        <TableContainer sx={{ minWidth: 700 }} component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead sx={{ position: "sticky", top: "0px" }}>
              <TableRow>
                <StyledTableCell sx={{ minWidth: "90px" }}>т/р</StyledTableCell>
                <StyledTableCell sx={{ minWidth: "280px" }} align="right">
                  жалб килинган ходим ФИО
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "80px" }} align="right">
                  унвони
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "80px" }} align="right">
                  Туман
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "80px" }} align="right">
                  отряди
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "120px" }} align="right">
                  шартнома №
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "80px" }} align="right">
                  шартнома санаси
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "90px" }} align="right">
                  шартнома суммаси
                </StyledTableCell>

                <StyledTableCell sx={{ minWidth: "90px" }} align="right">
                  хисмат муддати
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "290px" }} align="right">
                  корхона номи
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "140px" }} align="right">
                  инн
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "140px" }} align="right">
                  манзил
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "180px" }} align="right">
                  рахбар ФИО
                </StyledTableCell>
                <StyledTableCell sx={{ minWidth: "140px" }} align="right">
                  телефон
                </StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row: any) => (
                <StyledTableRow key={row.tr}>
                  <StyledTableCell component="th" scope="row">
                    {row.tr}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.name}</StyledTableCell>
                  <StyledTableCell align="right">{row.rank}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.district}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.unit}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.contractNo}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.contractDate}
                  </StyledTableCell>
                  <StyledTableCell align="right">
                    {row.contractAmount}
                  </StyledTableCell>

                  <StyledTableCell align="right">
                    {row.serviceDuration}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.company}</StyledTableCell>
                  <StyledTableCell align="right">{row.inn}</StyledTableCell>
                  <StyledTableCell align="right">{row.manzil}</StyledTableCell>
                  <StyledTableCell align="right">{row.raxbar}</StyledTableCell>
                  <StyledTableCell align="right">{row.telefon}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <div className="flex mt-[5vh] flex-col gap-4 min-w-full  justify-start">
          <h1>Rahbar:{" " + names && names?.boss}</h1>
          <h1>Bosh hisobchi:{" " + names && names?.accountant}</h1>
          <h1 className="text-[100%]">
            Qabul qiluvchi imzosi: ____________________________________
          </h1>
        </div>
      </div>
    );
  }
);

export default Documenttt;
