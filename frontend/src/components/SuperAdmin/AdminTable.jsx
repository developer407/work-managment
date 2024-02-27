import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  tableCellClasses,
} from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdmin } from "../../State/SuperAdmin/action";
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

const AdminTable = () => {
  const { company, auth, superAdmin } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const handleDeleteAdmin = (id) => {
    dispatch(deleteAdmin({ jwt, userId: id }));
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>No</StyledTableCell>
            <StyledTableCell align="left">Full Name</StyledTableCell>
            <StyledTableCell align="left">Email</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {superAdmin.admins.map((item) => (
            <StyledTableRow key={item.id}>
              <StyledTableCell>{item.id}</StyledTableCell>
              <StyledTableCell align="left">{item.fullName}</StyledTableCell>
              <StyledTableCell align="left">{item.email}</StyledTableCell>
              <StyledTableCell align="right">{item.role}</StyledTableCell>
              {/* {auth.user?.role==="ROLE_ADMIN" &&<StyledTableCell align="right">
             <IconButton onClick={()=>handleUpdateCompany(item.id)}>
                <Edit />
              </IconButton>
            </StyledTableCell>} */}
              <StyledTableCell align="right">
                <IconButton onClick={() => handleDeleteAdmin(item.id)}>
                  <Delete />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdminTable;
