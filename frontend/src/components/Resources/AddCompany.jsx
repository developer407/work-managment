import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { useDispatch } from "react-redux";
import { createCompany } from "../../State/Company/action";
import { uploadToCloudinary } from "../../Utils/UploadToCloudaniry";
import CloseIcon from '@mui/icons-material/Close';

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});

const initialValues = {
  name: "",
  address: "",
  city: "",
  country: "",
  logo: "",
};

const AddCompanyForm = ({handleClose}) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [logo,setLogo]=useState("");

  const handleSubmit = (values, action) => {
    values.logo=logo
    action.setSubmitting(false)
    console.log(action)
    action.resetForm()
    dispatch(createCompany({ companyData: values, jwt: jwt }));
    setLogo("")
    handleClose()
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const url = await uploadToCloudinary(file, "image");
    if(url)
    setLogo(url)
    // console.log("file",url)
  };

  return (
    <div>
      <h1 className="pb-5 font-semibold text-lg text-center">
        Fill Company Details
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-3">
            <div>
              {/* <label htmlFor="name">Name</label> */}
              <Field
                className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
                placeholder="company name..."
                type="text"
                name="name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <Field
                className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
                placeholder="address..."
                type="text"
                name="address"
              />
              <ErrorMessage name="address" component="div" className="error" />
            </div>
            <div>
              <Field
                className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
                placeholder="city..."
                type="text"
                name="city"
              />
              <ErrorMessage name="city" component="div" className="error" />
            </div>
            <div>
              <Field
                className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
                placeholder="country..."
                type="text"
                name="country"
              />
              <ErrorMessage name="country" component="div" className="error" />
            </div>
            {!logo?<div>
              <Field
                className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
                placeholder="logo"
                type="file"
                name="logo"
                onChange={handleFileChange}
              />
              <ErrorMessage name="logo" component="div" className="error" />
            </div>:<div className="relative pt-3 ">
              <img className="h-14 w-14" src={logo} alt="" />
              <CloseIcon onClick={()=>setLogo("")} className="absolute -top-3 left-0 cursor-pointer"/>
              </div>}
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
    </div>
  );
};

export default AddCompanyForm;
