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
import { deleteEvent, getAllEvents } from "../../State/Events/action";
import { Box, IconButton, Modal } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import EditEventForm from "./EditEvent";
import { useNavigate } from "react-router-dom";
import { style } from "../Resources/Resources";

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
  const { company, file, event, auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    removeUrlParam("id");
    setOpen(false);
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
  React.useEffect(() => {
    dispatch(getAllEvents({ jwt }));
  }, []);

  const handleDeleteEvent = (id) => {
    dispatch(deleteEvent({ id, jwt }));
  };
  return (
    <div>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>No</StyledTableCell>
              <StyledTableCell align="left">Date</StyledTableCell>
              <StyledTableCell align="left">Company</StyledTableCell>
              <StyledTableCell align="right">Evnet</StyledTableCell>
              <StyledTableCell align="right">Description</StyledTableCell>
              {(auth.user?.role === "ROLE_ADMIN"||
                  auth.user?.role === "ROLE_SUPER_ADMIN") && (
                <StyledTableCell align="right">Edit</StyledTableCell>
              )}
              {(auth.user?.role === "ROLE_ADMIN"||
                  auth.user?.role === "ROLE_SUPER_ADMIN") && (
                <StyledTableCell align="right">Delete</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {event.events.map((item) => (
              <StyledTableRow key={item.id}>
                <StyledTableCell>{item.id}</StyledTableCell>
                <StyledTableCell align="left">{item.date}</StyledTableCell>
                <StyledTableCell align="left">
                  {item.company.name}
                </StyledTableCell>
                <StyledTableCell align="right">{item.name}</StyledTableCell>
                <StyledTableCell align="right">
                  {item.description}
                </StyledTableCell>

                {(auth.user?.role === "ROLE_ADMIN"||
                  auth.user?.role === "ROLE_SUPER_ADMIN") && (
                  <StyledTableCell align="right">
                    <IconButton onClick={() => handleOpenEditForm(item.id)}>
                      <Edit />
                    </IconButton>
                  </StyledTableCell>
                )}
                {(auth.user?.role === "ROLE_ADMIN" ||
                  auth.user?.role === "ROLE_SUPER_ADMIN") && (
                  <StyledTableCell align="right">
                    <IconButton onClick={() => handleDeleteEvent(item.id)}>
                      <Delete />
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
          <EditEventForm handleClose={handleClose} />
        </Box>
      </Modal>
    </div>
  );
}
