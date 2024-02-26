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
import { Box, IconButton, Modal } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { deleteCompany } from "../../State/Company/action";
import { deleteTool } from "../../State/Tools/action";

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

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function ToolsTable() {
  const { company, auth, tool } = useSelector((store) => store);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    removeUrlParam("id");
    setOpen(false);
  };

  const handleDeleteTool = (id) => {
    dispatch(deleteTool({ id, jwt }));
  };

  const setUrlParam = (paramName, paramValue) => {
    navigate(`?${paramName}=${paramValue}`);
  };

  const removeUrlParam = (paramName) => {
    navigate("");
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
              <StyledTableCell align="right">Description</StyledTableCell>
              {/* {auth.user?.role==="ROLE_ADMIN" && <StyledTableCell align="right">Edit</StyledTableCell>} */}
              {auth.user?.role === "ROLE_ADMIN" && (
                <StyledTableCell align="right">Delete</StyledTableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {tool.tools.map((item) => (
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
                <StyledTableCell align="right">
                  {item.description}
                </StyledTableCell>
                {/* {auth.user?.role==="ROLE_ADMIN" &&<StyledTableCell align="right">
               <IconButton onClick={()=>handleUpdateCompany(item.id)}>
                  <Edit />
                </IconButton>
              </StyledTableCell>} */}
                {auth.user?.role === "ROLE_ADMIN" && (
                  <StyledTableCell align="right">
                    <IconButton onClick={() => handleDeleteTool(item.id)}>
                      <Delete />
                    </IconButton>
                  </StyledTableCell>
                )}
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
      <AddCompanyForm handleClose={handleClose}/>
    </Box>
  </Modal> */}
    </>
  );
}
