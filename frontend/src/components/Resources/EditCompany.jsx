import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { createCompany, getCompanyById, updateCompany } from "../../State/Company/action";
import { uploadToCloudinary } from "../../Utils/UploadToCloudaniry";
import CloseIcon from "@mui/icons-material/Close";
import { useLocation } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  address: Yup.string().required("Address is required"),
  city: Yup.string().required("City is required"),
  country: Yup.string().required("Country is required"),
});

const EditCompanyForm = ({ handleClose }) => {
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("jwt");
  const { company } = useSelector((store) => store);
  const [logo, setLogo] = useState("");
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");

  useEffect(() => {
    dispatch(getCompanyById({ id, jwt }));
  }, [id]);

  const formik = useFormik({
    initialValues: {
      name: "",
      address: "",
      city: "",
      country: "",
      logo: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      values.logo = logo;
      dispatch(updateCompany({id,jwt,companyData:values}))
      setSubmitting(false);
      resetForm();
      setLogo("");
      handleClose();
    },
  });

  useEffect(() => {
    if (company.company) {
      const { name, address, city, country, logo } = company.company;
      formik.setValues({ name, address, city, country, logo });
      setLogo(logo)
    }
  }, [company]);

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    const url = await uploadToCloudinary(file, "image");
    if (url) setLogo(url);
  };

  return (
    <div>
      <h1 className="pb-5 font-semibold text-lg text-center">
        Edit Company Details
      </h1>
      <form onSubmit={formik.handleSubmit} className="space-y-3">
        <div>
          <input
            className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
            placeholder="company name..."
            type="text"
            name="name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name ? (
            <div className="error">{formik.errors.name}</div>
          ) : null}
        </div>
        <div>
          <input
            className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
            placeholder="address..."
            type="text"
            name="address"
            onChange={formik.handleChange}
            value={formik.values.address}
          />
          {formik.touched.address && formik.errors.address ? (
            <div className="error">{formik.errors.address}</div>
          ) : null}
        </div>
        <div>
          <input
            className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
            placeholder="city..."
            type="text"
            name="city"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          {formik.touched.city && formik.errors.city ? (
            <div className="error">{formik.errors.city}</div>
          ) : null}
        </div>
        <div>
          <input
            className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
            placeholder="country..."
            type="text"
            name="country"
            onChange={formik.handleChange}
            value={formik.values.country}
          />
          {formik.touched.country && formik.errors.country ? (
            <div className="error">{formik.errors.country}</div>
          ) : null}
        </div>
        {!logo ? (
          <div>
            <input
              className="border 
              border-gray-500 py-2 w-full outline-none px-5 rounded-md"
              placeholder="logo"
              type="file"
              name="logo"
              onChange={handleFileChange}
            />
            {formik.touched.logo && formik.errors.logo ? (
              <div className="error">{formik.errors.logo}</div>
            ) : null}
          </div>
        ) : (
          <div className="relative pt-3 ">
            <img className="h-14 w-14" src={logo} alt="" />
            <CloseIcon
              onClick={() => setLogo("")}
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

export default EditCompanyForm;
