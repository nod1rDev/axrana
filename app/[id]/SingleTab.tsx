import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  styled,
} from "@mui/material";

// Define the data structure for a row
interface TableRowData {
  id: number;
  department: string;
  personnel: number;
  hours: number;
  rate: number;
  total: number;
}

// Define the data
const data: TableRowData[] = [
  {
    id: 1,
    department: "MG Toshkent shahar boʻyicha boshqarmasi 81109/y.k",
    personnel: 10,
    hours: 4,
    rate: 23800,
    total: 952000,
  },
  {
    id: 2,
    department: "98157/y.k",
    personnel: 10,
    hours: 4,
    rate: 23800,
    total: 952000,
  },
  {
    id: 3,
    department: "IIB",
    personnel: 7,
    hours: 4,
    rate: 23800,
    total: 666400,
  },
];

const totals = {
  personnel: data.reduce((acc, row) => acc + row.personnel, 0),
  rate: 23800,
  total: data.reduce((acc, row) => acc + row.total, 0),
};

// Style for bordered cells
const BorderedTableCell = styled(TableCell)({
  border: "1px solid black",
  textAlign: "center",
  padding: "8px",
});

const LeftBorderedTableRow = styled(TableRow)({
  borderLeft: "1px solid black",
});

const BudgetTable: React.FC = () => {
  return (
    <Box p={3}>
      <Typography variant="h6" align="right">
        20-iyun 2024-yildagi
      </Typography>
      <Typography variant="h6" align="right">
        118-sonli qaror loyihasi
      </Typography>
      <Typography variant="h5" align="center" gutterBottom>
        Ommaiy tadbirni o'tkazishda fuqarolar xavfsizligini ta'minlash va jamoat
        tartibini saqlash uchun xarajatlar smetasi
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <BorderedTableCell>
                Tadbir o'tkaziladigan joy nomi
              </BorderedTableCell>
              <BorderedTableCell>
                Жалб этиладиган шахсий таркиб ваколатли давлат идоралари ёки
                органлар номи
              </BorderedTableCell>
              <BorderedTableCell>
                Jami ishlatiladigan shaxsiy tarkib soni
              </BorderedTableCell>
              <BorderedTableCell>
                Ommaiy tadbir o'tkazish vaqti (soat)
              </BorderedTableCell>
              <BorderedTableCell>
                Bir kishilik soatbay ish haqi (BHM*7%)
              </BorderedTableCell>
              <BorderedTableCell>Jami hisoblangan (3*4*5)</BorderedTableCell>
              <BorderedTableCell>Umumiy hisoblangan</BorderedTableCell>
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
            {data.map((row, i) => (
              <LeftBorderedTableRow key={row.id}>
                <div className="font-bold text-center">
                  {i === 0 ? "“NEXT” кўнгил очар маркази" : null}
                </div>
                <BorderedTableCell>{row.department}</BorderedTableCell>
                <BorderedTableCell>{row.personnel}</BorderedTableCell>
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
              <BorderedTableCell colSpan={2}>Jami</BorderedTableCell>
              <BorderedTableCell>{totals.personnel}</BorderedTableCell>
              <BorderedTableCell></BorderedTableCell>
              <BorderedTableCell>
                {totals.rate.toLocaleString()}
              </BorderedTableCell>
              <BorderedTableCell>
                {totals.total.toLocaleString()}
              </BorderedTableCell>
              <BorderedTableCell>
                {totals.total.toLocaleString()}
              </BorderedTableCell>
            </LeftBorderedTableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BudgetTable;
