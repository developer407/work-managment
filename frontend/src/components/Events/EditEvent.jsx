import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getAllCompanies, getCompanyById } from "../../State/Company/action";
import { createEvent, getEventById, updateEvent } from "../../State/Events/action";
import { useLocation } from "react-router-dom";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  date: Yup.date().required("Date is required"),
  description: Yup.string().required("Description is required"),
  city: Yup.string().required("City is required"),
});

const EditEventForm = ({ handleClose }) => {
  const { company, event } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const id = searchParams.get("id");
  const [companyId,setCompanyId]=useState(null);

  useEffect(() => {
    dispatch(getAllCompanies({jwt}));
    dispatch(getEventById({ jwt, id }));
   
  }, []);

  useEffect(()=>{
    if(companyId){
       dispatch(getCompanyById({jwt,id:companyId})) 
    }
  },[companyId])

  const formik = useFormik({
    initialValues: {
      name:  "",
      date:  "",
      description: "",
      city:  "",
      companyId:  null,
      company:null,
    },
    validationSchema: validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      console.log(values);
      setSubmitting(false);
      values.company=company.company
      dispatch(updateEvent({ eventData: values, jwt,id }));
      handleClose();
    },
  });

  useEffect(() => {
    if (event.event) {
        setCompanyId(event.event.company.id)
      formik.setValues({
        name: event.event.name,
        date: event.event.date,
        description: event.event.description,
        city: event.event.city,
        companyId: event.event.company.id,
      });
    }
  }, [event.event]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            name="name"
            label="Name"
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.errors.name && <div>{formik.errors.name}</div>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            name="date"
            label="Date"
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            onChange={formik.handleChange}
            value={formik.values.date}
          />
          {formik.errors.date && <div>{formik.errors.date}</div>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            name="description"
            label="Description"
            multiline
            rows={2}
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          {formik.errors.description && <div>{formik.errors.description}</div>}
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            variant="outlined"
            name="city"
            label="City"
            onChange={formik.handleChange}
            value={formik.values.city}
          />
          {formik.errors.city && <div>{formik.errors.city}</div>}
        </Grid>
        <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel id="company-select-label">
                  company
                </InputLabel>
                <Select
                  labelId="company-select-label"
                  id="simple-select-id"
                  label="company"
                  className="outline-none w-full px-5 rounded-md"
                  name="companyId"
                  onChange={formik.handleChange}
                  value={formik.values.companyId}
                >
                  <MenuItem value="" disabled>
                    Select company
                  </MenuItem>
                  {company.companies.map((item) => (
                    <MenuItem value={item.id}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
        <Grid item xs={12}>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={formik.isSubmitting}
          >
            Submit
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default EditEventForm;
