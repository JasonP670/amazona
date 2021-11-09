import React from "react";
import { Grid, Paper, Button, Typography, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { createAddress, selectUserData } from "../slices/userSlice";

export default function RegistrationForm() {
  const dispatch = useDispatch();
  const userInfo = useSelector(selectUserData);
  const token = userInfo.token;

  const paperStyle = {
    padding: "40px 20px",
    width: 250,
    margin: "20px auto",
    fontSize: "2rem",
  };
  const btnStyle = { marginTop: 10 };
  const inputStyle = { style: { fontSize: "1.8rem" } };

  const labelProps = { sx: { fontSize: "1.5rem" } };
  const initialValues = {
    name: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    postalCode: "",
    country: "",
  };
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Required"),
    addressLine1: Yup.string().required("Required"),
    addressLine2: Yup.string(),
    city: Yup.string().required("Required"),
    postalCode: Yup.string().required("Required"),
    country: Yup.string().required("Required"),
  });
  const onSubmit = (values, props) => {
    dispatch(createAddress({ token, values }));
    props.resetForm();
  };
  return (
    <Grid>
      <Paper elevation={5} style={paperStyle}>
        <Grid align="center">
          <Typography variant="h6">Add a New Address</Typography>
          <Typography variant="caption">
            Fill out this form to add a new address to your account
          </Typography>
        </Grid>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(props) => (
            <Form>
              <Field
                as={TextField}
                name="name"
                label="Name"
                fullWidth
                variant="standard"
                InputProps={inputStyle}
                InputLabelProps={labelProps}
                helperText={
                  <ErrorMessage name="name">
                    {(msg) => (
                      <div style={{ color: "red", fontSize: "1.6rem" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                }
                error={props.errors.name && props.touched.name}
                required
              />
              <Field
                as={TextField}
                name="addressLine1"
                label="Address Line 1"
                fullWidth
                variant="standard"
                InputProps={inputStyle}
                InputLabelProps={labelProps}
                helperText={
                  <ErrorMessage name="addressLine1">
                    {(msg) => (
                      <div style={{ color: "red", fontSize: "1.6rem" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                }
                error={props.errors.addressLine1 && props.touched.addressLine1}
                required
              />
              <Field
                as={TextField}
                name="addressLine2"
                label="Address Line 2"
                fullWidth
                variant="standard"
                InputProps={inputStyle}
                InputLabelProps={labelProps}
              />
              <Field
                as={TextField}
                name="city"
                label="City"
                fullWidth
                variant="standard"
                InputProps={inputStyle}
                InputLabelProps={labelProps}
                helperText={
                  <ErrorMessage name="city">
                    {(msg) => (
                      <div style={{ color: "red", fontSize: "1.6rem" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                }
                error={props.errors.city && props.touched.city}
                required
              />
              <Field
                as={TextField}
                name="postalCode"
                label="Postal Code"
                fullWidth
                variant="standard"
                InputProps={inputStyle}
                InputLabelProps={labelProps}
                helperText={
                  <ErrorMessage name="postalCode">
                    {(msg) => (
                      <div style={{ color: "red", fontSize: "1.6rem" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                }
                error={props.errors.postalCode && props.touched.postalCode}
                required
              />
              <Field
                as={TextField}
                name="country"
                label="Country"
                fullWidth
                variant="standard"
                InputProps={inputStyle}
                InputLabelProps={labelProps}
                helperText={
                  <ErrorMessage name="country">
                    {(msg) => (
                      <div style={{ color: "red", fontSize: "1.6rem" }}>
                        {msg}
                      </div>
                    )}
                  </ErrorMessage>
                }
                error={props.errors.country && props.touched.country}
                required
              />
              <Button type="submit" style={btnStyle} variant="contained">
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  );
}
