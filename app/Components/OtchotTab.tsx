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

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: "#000",
    fontWeight: "600",
    backgroundColor: "#f1faee",
    textAlign: "center", // Center align text
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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
  company: string
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
  };
}

const rows = [
  createData(
    1,
    "Абдукаримов Хикмат Умар угли",
    "сержант",
    "Асaка",
    "1-отряд",
    "шт-0826",
    "3/10/2024",
    3000000,
    "Футбол 2024 Лига чемпионат",
    4,
    "Асaка Футбол Мажмуаси"
  ),
  createData(
    2,
    "Вохидов Умар Акмалович",
    "майор",
    "Асaка",
    "1-отряд",
    "шт-0826",
    "3/10/2024",
    3000000,
    "Футбол 2024 Лига чемпионат",
    2,
    "Асaка Футбол Мажмуаси"
  ),
  createData(
    3,
    "Жасуров Хикмат Отaжон угли",
    "рядовой",
    "Андижон",
    "2-отряд",
    "23",
    "15/06/2024",
    150000000,
    "Концерт",
    1,
    "Андижон Марказий уйингохи"
  ),
];

export default function CustomizedTables({ data }: { data: any }) {
  const rows =
    data &&
    data.map((e: any, i: any) =>
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
        e.name
      )
    );
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>т/р</StyledTableCell>
            <StyledTableCell align="right">
              жалб килинган ходим ФИО
            </StyledTableCell>
            <StyledTableCell align="right">унвони</StyledTableCell>
            <StyledTableCell align="right">Туман</StyledTableCell>
            <StyledTableCell align="right">отряди</StyledTableCell>
            <StyledTableCell align="right">шартнома №</StyledTableCell>
            <StyledTableCell align="right">шартнома санаси</StyledTableCell>
            <StyledTableCell align="right">шартнома суммаси</StyledTableCell>
            <StyledTableCell align="right">Шартнома мазмуни</StyledTableCell>
            <StyledTableCell align="right">
              ходим хисмат муддати
            </StyledTableCell>
            <StyledTableCell align="right">корхона номи</StyledTableCell>
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
              <StyledTableCell align="right">{row.contractNo}</StyledTableCell>
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
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
