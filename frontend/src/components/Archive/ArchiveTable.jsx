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
import { deleteFiles, getAllFiles } from "../../State/Files/Action";
import { Box, IconButton, Modal } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import EditCompanyForm from "../Resources/EditCompany";
import { style } from "../Resources/Resources";
import EditFileForm from "./EditFile";

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
   
    backgroundColor: "#b9c7b5",
 
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export default function ArchiveTable() {
  const { company, file, auth } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    removeUrlParam("id");
    setOpen(false);
  };

  React.useEffect(() => {
    dispatch(getAllFiles({ jwt: auth.jwt || jwt }));
  }, []);

  const handleDeleteFile = (id) => {
    dispatch(deleteFiles({ id, jwt }));
  };

  const setUrlParam = (paramName, paramValue) => {
    navigate(`?${paramName}=${paramValue}`);
  };

  const removeUrlParam = (paramName) => {
    navigate("");
  };
  const handleOpenEditForm = (id) => {
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
              <StyledTableCell align="left">Description</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="right">Name</StyledTableCell>
              <StyledTableCell align="right">Supporter</StyledTableCell>
              <StyledTableCell align="right">Type</StyledTableCell>
              <StyledTableCell align="right">File</StyledTableCell>
              {(auth.user?.role === "ROLE_ADMIN" ||
                auth.user?.role === "ROLE_SUPER_ADMIN") && (
                <StyledTableCell align="right">Edit</StyledTableCell>
              )}
              {(auth.user?.role === "ROLE_ADMIN" ||
                auth.user?.role === "ROLE_SUPER_ADMIN") && (
                <StyledTableCell align="right">Delete</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {file.files.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{item.id}</StyledTableCell>
                <StyledTableCell align="left">
                  {item.description}
                </StyledTableCell>
                <StyledTableCell align="left">
                  {item.createdAt.split("T")[0]}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.assignedWorker.fullName}
                </StyledTableCell>
                <StyledTableCell align="right">
                  {item.support.fullName}
                </StyledTableCell>
                <StyledTableCell align="right">{item.type}</StyledTableCell>
                <StyledTableCell align="right">
                  <a href={item.file}>{"pdf"}</a>
                </StyledTableCell>
                {(auth.user?.role === "ROLE_ADMIN" ||
                  auth.user?.role === "ROLE_SUPER_ADMIN") && (
                  <StyledTableCell align="right">
                    <IconButton onClick={() => handleDeleteFile(item.id)}>
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                )}
                {(auth.user?.role === "ROLE_ADMIN" ||
                  auth.user?.role === "ROLE_SUPER_ADMIN") && (
                  <StyledTableCell align="right">
                    <IconButton onClick={() => handleOpenEditForm(item.id)}>
                      <Edit />
                    </IconButton>
                  </StyledTableCell>
                )}
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
          <EditFileForm handleClose={handleClose} />
        </Box>
      </Modal>
    </>
  );
}
