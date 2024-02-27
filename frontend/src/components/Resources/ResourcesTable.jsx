import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useSelector } from "react-redux";
import { Box, IconButton, Modal } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import AddCompanyForm from "./EditCompany";
import { style } from "./Resources";

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

export default function ResourcesTable() {
  const { company, auth } = useSelector((store) => store);
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    removeUrlParam("id");
    setOpen(false);
  };

  const handleDeleteCompany = () => {};

  const setUrlParam = (paramName, paramValue) => {
    navigate(`?${paramName}=${paramValue}`);
  };

  const removeUrlParam = (paramName) => {
    navigate("");
  };

  const handleUpdateCompany = (id) => {
    setUrlParam("id", id);
    handleOpen();
  };
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="left">Logo</StyledTableCell>
              <StyledTableCell align="left">Name</StyledTableCell>
              <StyledTableCell align="right">Adress</StyledTableCell>
              {(auth.user?.role === "ROLE_ADMIN" ||
                auth.user?.role === "ROLE_SUPER_ADMIN") && (
                <StyledTableCell align="right">Edit</StyledTableCell>
              )}
              {/* <StyledTableCell align="right">Delete</StyledTableCell> */}
            </TableRow>
          </TableHead>
          <TableBody>
            {company.companies.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{item.id}</StyledTableCell>
                <StyledTableCell align="left">
                  <img
                    className="h-10 w-10 object-cover"
                    src={item.logo}
                    alt=""
                  />
                </StyledTableCell>
                <StyledTableCell align="left">{item.name}</StyledTableCell>
                <StyledTableCell align="right">{item.address}</StyledTableCell>
                {(auth.user?.role === "ROLE_ADMIN" ||
                  auth.user?.role === "ROLE_SUPER_ADMIN") && (
                  <StyledTableCell align="right">
                    <IconButton onClick={() => handleUpdateCompany(item.id)}>
                      <Edit />
                    </IconButton>
                  </StyledTableCell>
                )}
                {/* <StyledTableCell align="right">
                 <IconButton onClick={()=>handleDeleteCompany(item.id)}>
                  <Delete />
                </IconButton>
              </StyledTableCell> */}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddCompanyForm handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}
