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
  contractContent: string;
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
  contractContent: string,
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
    contractContent,
    serviceDuration,
    company,
    inn,
    manzil,
    raxbar,
    telefon,
  };
}

const Documenttt = React.forwardRef(({ printData }: any, ref: any) => {
  const rows =
    printData &&
    printData.map((e: any, i: any) =>
      createData(
        i + 1,
        e.FIOlotin,
        e.rank,
        e.region,
        e.otryad,
        e.contractNumber,
        e.contractDate,
        e.rankSumma,
        e.content,
        e.dayOrhour + " " + e.timeType,
        e.name,
        e.inn,
        e.address,
        e.boss,
        e.phone
      )
    );
  return (
    <div ref={ref} className="flex flex-col  p-10 w-full mx-auto">
      <div className="text-[36px] mx-auto  font-bold mb-5">
        Otchot {"Ro'yhati"}
      </div>
      <TableContainer
        sx={{ minWidth: 700, maxHeight: "400px", overflow: "auto" }}
        component={Paper}
      >
        <Table
          sx={{ minWidth: 700, maxHeight: "400px", overflow: "auto" }}
          aria-label="customized table"
        >
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
              <StyledTableCell sx={{ minWidth: "280px" }} align="right">
                Шартнома мазмуни
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
                <StyledTableCell align="right">{row.district}</StyledTableCell>
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
                  {row.contractContent}
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

      <div className="flex mt-16 flex-col gap-4 min-w-full  justify-start">
        <h1 className="text-[100%]">
          Qabul qiluvchi imzosi: ____________________________________ tasdiqlamoq
        </h1>
        <h1>
          Rahbar: ________________________________
        </h1>
        <h1>
          Bosh hisobchi: ________________________________
        </h1>
      </div>
    </div>
  );
});

export default Documenttt;
