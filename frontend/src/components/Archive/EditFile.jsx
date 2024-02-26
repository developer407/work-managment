import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import CloseIcon from "@mui/icons-material/Close";
import { getEmployees } from "../../State/Authentication/Action";
import { uploadFileToPDFco } from "../../Utils/UploadPdf";
import { useLocation } from "react-router-dom";
import { getAllCompanies } from "../../State/Company/action";
import { getFilesById, updateFiles } from "../../State/Files/Action";
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  type: Yup.string().required("Type is required"),
  description: Yup.string().required("Description is required"),
  assignedWorkerId: Yup.string().required("Employee is required"),
  supporterId: Yup.string().required("Supporter is required"),
  companyId: Yup.string().required("Company is required"),
});

const EditFileForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [pdf, setPdf] = useState("");
  const { auth, company,file } = useSelector((store) => store);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    dispatch(getEmployees(jwt));
    dispatch(getAllCompanies({jwt:auth.jwt || jwt, city:null}));
    dispatch(getFilesById({ id, jwt }));
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      description: "",
      assignedWorkerId: "",
      supportId: "",
      companyId: "",
      file: "",
    },
    // validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      values.file = pdf;
dispatch(updateFiles({jwt,id,filesData:values}))
      setSubmitting(false);
      resetForm();
      setPdf("");
      handleClose();
    },
  });

  useEffect(() => {
    if (file.file) {
      const { name, type, description, assignedWorker, support, company } = file.file;

    //   console.log(name,type)
      formik.setValues({
        name,
        type,
        description,
        assignedWorkerId:assignedWorker.id,
        supportId:support.id,
        companyId:company.id,
        file, 
      });
      console.log("file.file",company)
      setPdf(file.file?.file)
    }
  }, [file.file]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const data = await uploadFileToPDFco(file);
    if (data.url) setPdf(data.url);
  };

  return (
    <div>
      <h1 className="pb-5 font-semibold text-lg text-center">
        Edit File Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <div>
          <TextField
            fullWidth
            className="w-full outline-none px-5 rounded-md focus:outline-none"
            label="Name"
            name="name"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.name}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
           
          />
        </div>
        <div>
          <TextField
            fullWidth
            className="w-full outline-none px-5 rounded-md"
            label="Description"
            name="description"
            variant="outlined"
            onChange={formik.handleChange}
            value={formik.values.description}
            error={formik.touched.description && Boolean(formik.errors.description)}
            helperText={formik.touched.description && formik.errors.description}
          />
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Type"
              className="outline-none w-full px-5 rounded-md"
              name="type"
              onChange={formik.handleChange}
              value={formik.values.type}
              error={formik.touched.type && Boolean(formik.errors.type)}
            >
              <MenuItem value="" disabled>
                Select Type
              </MenuItem>
              <MenuItem value="DAILY">daily</MenuItem>
              <MenuItem value="WEEKLY">weekly</MenuItem>
              <MenuItem value="MONTHLY">monthly</MenuItem>
            </Select>
          </FormControl>
        </div>

        <div>
          <FormControl fullWidth>
            <InputLabel id="company-select-label">Company</InputLabel>
            <Select
              labelId="company-select-label"
              id="company-simple-select"
              label="Company"
              className="outline-none w-full px-5 rounded-md"
              name="companyId"
              onChange={formik.handleChange}
              value={formik.values.companyId}
              error={formik.touched.companyId && Boolean(formik.errors.companyId)}
            >
              <MenuItem value="" disabled>
                Select Company
              </MenuItem>
              {company.companies.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.name}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="employee-select-label">Employee</InputLabel>
            <Select
              labelId="employee-select-label"
              id="employee-simple-select"
              label="Employee"
              className="outline-none w-full px-5 rounded-md"
              name="assignedWorkerId"
              onChange={formik.handleChange}
              value={formik.values.assignedWorkerId}
              error={formik.touched.assignedWorkerId && Boolean(formik.errors.assignedWorkerId)}
            >
              <MenuItem value="" disabled>
                Select Employee
              </MenuItem>
              {auth.employees.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.fullName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <FormControl fullWidth>
            <InputLabel id="supporter-select-label">Support</InputLabel>
            <Select
              labelId="supporter-select-label"
              id="demo-simple-select"
              label="Support"
              className="outline-none w-full px-5 rounded-md"
              name="supportId"
              onChange={formik.handleChange}
              value={formik.values.supportId}
              error={formik.touched.supportId && Boolean(formik.errors.supportId)}
            >
              <MenuItem value="" disabled>
                Select Supporter
              </MenuItem>
              {auth.employees.map((item) => (
                <MenuItem key={item.id} value={item.id}>{item.fullName}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {!pdf ? (
          <div>
            <TextField
              fullWidth
              className="w-full outline-none px-5 rounded-md"
              type="file"
              name="file"
              onChange={handleFileChange}
              variant="outlined"
            />
          </div>
        ) : (
          <div className="relative pt-3 ">
            <PictureAsPdfIcon sx={{fontSize:"3rem"}}/>
            <CloseIcon
              onClick={() => setPdf("")}
              className="absolute -top-3 left-0 cursor-pointer"
            />
          </div>
        )}
        <Button
          className="w-full"
          sx={{ padding: ".7rem" }}
          variant="contained"
          type="submit"
          disabled={formik.isSubmitting}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};

export default EditFileForm;
