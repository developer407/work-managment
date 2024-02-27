import { Create } from "@mui/icons-material";
import { Box, IconButton, Modal } from "@mui/material";
import React, { useEffect } from "react";
import AdminTable from "./AdminTable";
import { useDispatch, useSelector } from "react-redux";
import CreateAdmin from "./CreateAdmin";
import { style } from "../Resources/Resources";
import { getAllAdmins } from "../../State/SuperAdmin/action";

const Admin = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getAllAdmins(jwt));
  }, []);
  return (
    <>
      <div className="flex pb-2 justify-between items-center text-xl font-semibold">
        <p>Admins</p>
        <IconButton onClick={handleOpen}>
          <Create />
        </IconButton>
      </div>
      <AdminTable />
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <CreateAdmin />
        </Box>
      </Modal>
    </>
  );
};

export default Admin;
