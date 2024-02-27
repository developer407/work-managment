import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../../State/Company/action";
import { getAllFiles } from "../../State/Files/Action";
import ArchiveTable from "./ArchiveTable";
import CreateFileForm from "./CreateFile";
import { style } from "../Resources/Resources";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { cityList } from "../Events/CityList";

const fileType = [
  { lable: "All", value: "" },
  { lable: "Daily", value: "DAILY" },
  { lable: "Weekly", value: "WEEKLY" },
  { lable: "Monthly", value: "MONTHLY" },
];
const Archive = () => {
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
    dispatch(getAllFiles({ jwt: auth.jwt || jwt,type:selectedFileType }));
  }, [selectedFileType]);

  const handleFilterByFileType=(item)=>{
setSelectedFileType(item.value)
  }
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:max-w-3xl mt-10">
     
       
        <div className="w-full pb-5 flex justify-between items-center">
        <p className="font-bold text-2xl pb-5">Archive</p>

       
          {(auth.user?.role==="ROLE_ADMIN"||
                  auth.user?.role === "ROLE_SUPER_ADMIN") && <IconButton onClick={handleOpen}>
            <BorderColorIcon />
          </IconButton>}
        </div>
        <div className="w-full lg:max-w-3xl px-10 py-2 bg-[#023020] flex mb-2 justify-evenly text-white">
          {fileType.map((item)=> <p onClick={()=>handleFilterByFileType(item)} className={`cursor-pointer ${item.value===selectedFileType?"text-[gray] font-bold":""}`}>{item.lable}</p>)}
      
        </div>
        <ArchiveTable />

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateFileForm handleClose={handleClose} />
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Archive;
