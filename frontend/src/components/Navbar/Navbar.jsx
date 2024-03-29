import { Avatar, Button, Menu, MenuItem } from "@mui/material";
import React, { useState } from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../State/Authentication/Action";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    dispatch(logout());
    handleClose();
  };
  return (
    <div className="flex lg:px-10 px-3 justify-between items-center py-2 bg-[#b9c7b5] text-[#023020]">
      <div className="flex items-center gap-5">
        <span
          onClick={() => navigate("/")}
          className="cursor-pointer hover:text-gray-300"
        >
          Home
        </span>
        <span
          onClick={() => navigate("/upcoming-events")}
          className="cursor-pointer hover:text-gray-300"
        >
          Upcoming Events
        </span>
        {(auth.user?.role === "ROLE_ADMIN" ||
          auth.user?.role === "ROLE_SUPER_ADMIN") && (
          <span
            onClick={() => navigate("/dashboard")}
            className="cursor-pointer hover:text-gray-300"
          >
            Dashboard
          </span>
        )}
      </div>

      <div>
        {auth.user ? (
          <>
            {" "}
            <Button
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            >
              <div className="lg:flex gap-2 items-center">
                <Avatar sx={{ bgcolor: "#023020" }}>
                  {auth.user?.fullName[0].toUpperCase()}
                </Avatar>
                <span className="text-[#023020] lg:block hidden">
                  {auth.user?.fullName}
                </span>
              </div>
            </Button>
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </>
        ) : (
          <Button sx={{ color: "white" }} onClick={() => navigate("/login")}>
            <PersonIcon />
            <span className="ml-2 hidden lg:block">Login</span>
          </Button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
