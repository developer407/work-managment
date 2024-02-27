import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  Typography,
  CssBaseline,
  Container,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../State/Authentication/Action";
import { createAdmin, createAdminAction } from "../../State/SuperAdmin/action";

const CreateAdmin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jwt = localStorage.getItem("jwt");
  const { auth } = useSelector((store) => store);

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string().required("Full Name is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    onSubmit: (values) => {
      console.log("Form values:", values);
      dispatch(createAdminAction({ jwt: auth.jwt || jwt, adminData: values }));
    },
  });

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div>
        <Typography className="text-center" variant="h5">
          Register
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Full Name"
            name="fullName"
            id="fullName"
            autoComplete="fullName"
            helperText={formik.errors.fullName}
            error={formik.touched.fullName && Boolean(formik.errors.fullName)}
            onChange={formik.handleChange}
            value={formik.values.fullName}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Email Address"
            name="email"
            id="email"
            autoComplete="email"
            helperText={formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            label="Password"
            name="password"
            type="password"
            id="password"
            helperText={formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
            onChange={formik.handleChange}
            value={formik.values.password}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Create New Admin
          </Button>
        </form>
      </div>
    </Container>
  );
};

export default CreateAdmin;
