import React, { useEffect } from "react";
import ResourcesTable from "./ResourcesTable";
import { IconButton } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies } from "../../State/Company/action";

const Resources = () => {
    const dispatch=useDispatch();
    const {auth}=useSelector(store=>store)
    const jwt=localStorage.getItem("jwt")

    useEffect(()=>{
        dispatch(getAllCompanies(auth.jwt || jwt))
    },[])
  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full lg:max-w-3xl mt-10">
        <div className="w-full pb-5 flex justify-between">
          <p className="font-bold text-lg">Resources</p>
          <IconButton>
            <BorderColorIcon />
          </IconButton>
        </div>
        <ResourcesTable />
      </div>
    </div>
  );
};

export default Resources;
