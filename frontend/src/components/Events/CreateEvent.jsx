import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCompanies } from '../../State/Company/action';
import { createEvent } from '../../State/Events/action';

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  date: Yup.date().required('Date is required'),
  description: Yup.string().required('Description is required'),
  city: Yup.string().required('City is required'),
});

const initialValues = {
  name: '',
  date: '',
  description: '',
  city: '',
  company:null
};

const EventForm = ({handleClose,setSelectedCity}) => {
    const { company, file,event } = useSelector((store) => store);
    const jwt=localStorage.getItem("jwt")
    const dispatch=useDispatch();

  const handleSubmit = (values, { setSubmitting }) => {
    // Handle form submission here
    console.log(values);
    setSubmitting(false);
    dispatch(createEvent({eventData:values,jwt}))
    handleClose()
    setSelectedCity(null)
  };

  useEffect(() => {
    dispatch(getAllCompanies(jwt));
  }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ isSubmitting,handleChange }) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                name="name"
                label="Name"
              />
              <ErrorMessage name="name" component="div" />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                name="date"
                label="Date"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <ErrorMessage name="date" component="div" />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                name="description"
                label="Description"
                multiline
                rows={4}
              />
              <ErrorMessage name="description" component="div" />
            </Grid>
            <Grid item xs={12}>
              <Field
                as={TextField}
                fullWidth
                variant="outlined"
                name="city"
                label="City"
              />
              <ErrorMessage name="city" component="div" />
            </Grid>
            <Grid item xs={12}>
            <FormControl fullWidth>
                <InputLabel id="company-select-label">
                  company
                </InputLabel>
                <Select
                  labelId="company-select-label"
                  id="demo-simple-select"
                  label="company"
                  className="outline-none w-full px-5 rounded-md"
                  name="company"
                  onChange={handleChange}
                >
                  <MenuItem value="" disabled>
                    Select company
                  </MenuItem>
                  {company.companies.map((item) => (
                    <MenuItem value={item}>{item.name}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <ErrorMessage name="type" component="div" className="error" />
            </Grid>
            <Grid item xs={12}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                disabled={isSubmitting}
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default EventForm;
