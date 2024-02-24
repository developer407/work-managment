import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));





export default function ArchiveTable() {
    const {company,file}=useSelector(store=>store);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="left">Description</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Supporter</StyledTableCell>
            <StyledTableCell align="right">Type</StyledTableCell>
            <StyledTableCell align="right">File</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {file.files.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell >
                {item.id}
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.description}
              </StyledTableCell>
              <StyledTableCell align="left">
                {/* {item.createdAt} */}
            {item.createdAt.split("T")[0]}</StyledTableCell>
              <StyledTableCell align="right">{item.assignedWorker.fullName}</StyledTableCell>
              <StyledTableCell align="right">{item.support.fullName}</StyledTableCell>
              <StyledTableCell align="right">{item.type}</StyledTableCell>
              <StyledTableCell align="right">{"pdf"}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}