import { Button } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex lg:px-10 px-3 justify-between items-center py-2 bg-blue-500 text-white">
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
        <span onClick={() => navigate("/dashboard")} 
        className="cursor-pointer hover:text-gray-300">
          Dashboard
        </span>
      </div>

      <div>
        <PersonIcon />
        <Button sx={{ color: "white" }}>Login</Button>
      </div>
    </div>
  );
};

export default Navbar;
