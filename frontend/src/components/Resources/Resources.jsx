import React, { useEffect, useState } from "react";
import ResourcesTable from "./ResourcesTable";
import { Box, Button, IconButton, Menu, MenuItem, Modal } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../../State/Company/action";
import AddCompanyForm from "./AddCompany";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import { cityList } from "../Events/CityList";

export const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  outline:"none",
  boxShadow: 24,
  p: 4,
};

const Resources = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

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
    dispatch(getAllCompanies(auth.jwt || jwt));
  }, []);
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:max-w-3xl mt-10">
      <p className="font-bold text-4xl pb-5">Resources</p>
        <div className="w-full pb-5 flex justify-between">
          
          <div className="flex gap-4 items-center">
            <Button
              id="basic-button"
              aria-controls={openFilter ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={openFilter ? "true" : undefined}
              onClick={handleClick}
            >
              {selectedCity || "filter by city"}
              {openFilter ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={openFilter}
              onClose={handleCloseFilter}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              {cityList.map((item) => (
                <MenuItem onClick={() => handleChangeCity(item)}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </div>
          <IconButton onClick={handleOpen}>
            <BorderColorIcon />
          </IconButton>
        </div>
        <ResourcesTable />
       
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <AddCompanyForm handleClose={handleClose}/>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Resources;
