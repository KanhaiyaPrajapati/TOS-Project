import { Box, Container, TextField } from "@mui/material";
import React from "react";
import Lock from "../Images/lock.png";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { NavLink } from "react-router-dom";
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const ForgotPassword = () => {
  const initialValues = {
    email: "",
  };
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
  });

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    // navigate('/dashboard')
  };

  return (
    <>
      <Container
        className="forgotpass-wrapper p-0 m-0"
      >
        <div className="row">
          <div className="text-center pt-3">
            <img
              src={Lock}
              alt="image lock"
              className="img-fluid rounded"
              style={{ width: "80px", height: "70px" }}
            />

            <h5 className="fogot-text">Forgot your password?</h5>
            <h6>
              Please enter the email address associated with your account <br/>
              and We will email you a link to reset your password.
            </h6>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Field
                    as={TextField}
                    name="email"
                    label="Email Address"
                    variant="outlined"
                    className="form-control"
                    error={touched.email && !!errors.email}
                    helperText={touched.email && errors.email}
                  />
                  <Box className="text-center mt-4 mb-3">
                    <button type="submit" className="btn btn-primary w-50">
                      Sign In
                    </button>
                  </Box>
                  <NavLink to='/login'  style={{ color: "black" ,textDecoration:'none'}}>
                   Return to sign in
                  </NavLink>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </Container>
    </>
  );
};

export default ForgotPassword;
