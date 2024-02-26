import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  Backdrop,
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCompany, getAllCompanies } from "../../State/Company/action";
import CloseIcon from "@mui/icons-material/Close";
import { getEmployees } from "../../State/Authentication/Action";
import { createFiles } from "../../State/Files/Action";
import { uploadFileToPDFco } from "../../Utils/UploadPdf";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Description is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});

const initialValues = {
  name: "",
  type: "",
  description: "",
  assignedWorkerId: null,
  supporterId: null,
  companyId: null,
  file: "",
};

const CreateFileForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [file, setFile] = useState("");
  const { auth, company } = useSelector((store) => store);
  const [uploadingFile, setUploadingFile] = useState(false);

  const handleSubmit = (values, action) => {
    values.file = file;
    action.setSubmitting(false);
    console.log(action);
    dispatch(createFiles({ fileData: values, jwt }));

    console.log(values);
    action.resetForm();
    setFile("");
    handleClose();
  };

  const handleFileChange = async (event) => {
    setUploadingFile(true)
    const file = event.target.files[0];
    const data = await uploadFileToPDFco(file);
    if (data.url) setFile(data.url);
    setUploadingFile(false)
  };

  useEffect(() => {
    dispatch(getEmployees(jwt));
    dispatch(getAllCompanies(jwt));
  }, []);

  return (
    <div>
      <h1 className="pb-5 font-semibold text-lg text-center">
        Fill Company Details
      </h1>
      <Formik
        initialValues={initialValues}
        // validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, handleChange }) => (
          <Form className="space-y-3">
            <div>
              <TextField
                fullWidth
                className="w-full outline-none px-5 rounded-md focus:outline-none"
                label="Name"
                name="name"
                variant="outlined"
                onChange={handleChange}
                sx={{
                  "& .MuiOutlinedInput-root:focus fieldset": {
                    outline: "none",
                  },
                }}
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <TextField
                fullWidth
                className="w-full outline-none px-5 rounded-md"
                label="Description"
                name="description"
                variant="outlined"
                onChange={handleChange}
              />
              <ErrorMessage
                name="description"
                component="div"
                className="error"
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
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select Type
                  </MenuItem>
                  <MenuItem value="DAILY">daily</MenuItem>
                  <MenuItem value="WEEKLY">weekly</MenuItem>
                  <MenuItem value="MONTHLY">monthly</MenuItem>
                </Select>
              </FormControl>
              <ErrorMessage name="type" component="div" className="error" />
            </div>

            <div>
              <FormControl fullWidth>
                <InputLabel id="company-select-label">company</InputLabel>
                <Select
                  labelId="company-select-label"
                  id="demo-simple-select"
                  label="company"
                  className="outline-none w-full px-5 rounded-md"
                  name="companyId"
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select company
                  </MenuItem>
                  {company.companies.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorMessage name="type" component="div" className="error" />
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="employee-select-label">Employee</InputLabel>
                <Select
                  labelId="employee-select-label"
                  id="demo-simple-select"
                  label="employees"
                  className="outline-none w-full px-5 rounded-md"
                  name="assignedWorkerId"
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select employee
                  </MenuItem>
                  {auth.employees.map((item) => (
                    <MenuItem value={item.id}>{item.fullName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorMessage
                name="assignedWorkerId"
                component="div"
                className="error"
              />
            </div>
            <div>
              <FormControl fullWidth>
                <InputLabel id="supporter-select-label">Supporter</InputLabel>
                <Select
                  labelId="suppoter-select-label"
                  id="demo-simple-select"
                  label="supporter"
                  className="outline-none w-full px-5 rounded-md"
                  name="supporterId"
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select supporter
                  </MenuItem>
                  {auth.employees.map((item) => (
                    <MenuItem value={item.id}>{item.fullName}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorMessage
                name="supporterId"
                component="div"
                className="error"
              />
            </div>
            {!file ? (
              <div>
                <TextField
                  fullWidth
                  className="w-full outline-none px-5 rounded-md"
                  type="file"
                  name="logo"
                  onChange={handleFileChange}
                  variant="outlined"
                />
                <ErrorMessage name="logo" component="div" className="error" />
              </div>
            ) : (
              <div className="relative pt-3 ">
                <p>file name</p>
                <CloseIcon
                  onClick={() => setFile("")}
                  className="absolute -top-3 left-0 cursor-pointer"
                />
              </div>
            )}
            <Button
              className="w-full"
              sx={{ padding: ".7rem" }}
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </Form>
        )}
      </Formik>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={uploadingFile}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default CreateFileForm;
