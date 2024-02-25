import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useDispatch, useSelector } from "react-redux";
import { getAllEvents } from "../../State/Events/action";

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
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function EventTable() {
  const { company, file,event } = useSelector((store) => store);
  const jwt=localStorage.getItem("jwt")
  const dispatch=useDispatch();
  React.useEffect(()=>{
    dispatch(getAllEvents({jwt}))
  },[])
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="left">Date</StyledTableCell>
            <StyledTableCell align="left">Company</StyledTableCell>
            <StyledTableCell align="right">Evnet</StyledTableCell>
            <StyledTableCell align="right">Description</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {event.events.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell>{item.id}</StyledTableCell>
              <StyledTableCell align="left">
                {item.date}
              </StyledTableCell>
              <StyledTableCell align="left">
                {item.company.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {item.name}
              </StyledTableCell>
              <StyledTableCell align="right">
                {item.description}
              </StyledTableCell>
             
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
