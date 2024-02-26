import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Backdrop, Button, CircularProgress } from "@mui/material";
import { useDispatch } from "react-redux";
import { createCompany } from "../../State/Company/action";
import { uploadToCloudinary } from "../../Utils/UploadToCloudaniry";
import CloseIcon from '@mui/icons-material/Close';
import { createTool } from "../../State/Tools/action";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  
  logo: Yup.string().required("Logo is required"),
});

const initialValues = {
  name: "",
  description: "",
  logo: "",
};

const AddToolsForm = ({handleClose}) => {
  const [uploadingFile, setUploadingFile] = useState(false);
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const [logo,setLogo]=useState("");

  const handleSubmit = (values, action) => {
    
     console.log("tool data ",values)
    dispatch(createTool({ toolData: values, jwt: jwt }));
   
    setLogo("")
    handleClose()
    action.resetForm()
    action.setSubmitting(false)
  };

  const handleFileChange = async (event,setFieldValue) => {
    setUploadingFile(true)
    const file = event.target.files[0];
    const url = await uploadToCloudinary(file, "image");
    if(url){
        setLogo(url)
        setFieldValue("logo",url)
    }
    setUploadingFile(false)
    
    // console.log("file",url)
  };

  return (
    <div>
      <h1 className="pb-5 font-semibold text-lg text-center">
        Fill Tools Details
      </h1>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting,setFieldValue }) => (
          <Form className="space-y-3">
            <div>
              {/* <label htmlFor="name">Name</label> */}
              <Field
                className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
                placeholder="tool name"
                type="text"
                name="name"
              />
              <ErrorMessage name="name" component="div" className="error" />
            </div>
            <div>
              <Field
                className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
                placeholder="description"
                type="text"
                name="description"
              />
              <ErrorMessage name="description" component="div" className="error" />
            </div>
           
            
            {!logo?<div>
              <Field
                className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
                placeholder="logo"
                type="file"
                name="logo"
                onChange={(e)=>handleFileChange(e,setFieldValue)}
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
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={uploadingFile}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
};

export default AddToolsForm;
