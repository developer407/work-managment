import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../../State/Company/action";
import { getAllFiles } from "../../State/Files/Action";

import AddToolsForm from "./CreateTools";
import ToolsTable from "./ToolTable";
import { style } from "../Resources/Resources";
import { getAllTools } from "../../State/Tools/action";

const fileType = [
  { lable: "All", value: "" },
  { lable: "Daily", value: "DAILY" },
  { lable: "Weekly", value: "WEEKLY" },
  { lable: "Monthly", value: "MONTHLY" },
];
const Tools = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [selectedFileType,setSelectedFileType]=useState("");

  const [selectedCity, setSelectedCity] = useState("");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openFilter = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseFilter = () => {
    setAnchorEl(null);
  };

  const handleChangeCity = (item) => {
    setSelectedCity(item);
    handleCloseFilter();
  };

  useEffect(() => {
    dispatch(getAllTools({ jwt: auth.jwt || jwt }));
  }, []);

  const handleFilterByFileType=(item)=>{
setSelectedFileType(item.value)
  }
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:max-w-3xl mt-10">
     
       
        <div className="w-full pb-5 flex justify-between items-center">
        <p className="font-bold text-2xl pb-5">Tools</p>

          
          {auth.user?.role==="ROLE_ADMIN" && <IconButton onClick={handleOpen}>
            <BorderColorIcon />
          </IconButton>}
        </div>
        
        <ToolsTable />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddToolsForm handleClose={handleClose} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Tools;
