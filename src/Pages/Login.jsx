import { Box, Container, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import login from "../Images/tos.webp";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

const Login = () => {
  const initialValues = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    navigate('/dashboard');
  };


  // useEffect(() => {
  //   const getloginapi = async () =>{
  //     try {
  //       let data =  await axios.get('http://localhost:3000/api/user/login');
  //       console.log(data.data);
  //     } catch (error) {
  //       console.log(error);  
  //     }
  //   }
  //   getloginapi()
  // }, [])
  

  let selector = useSelector((state)=>state.signup.item)
  console.log(selector);

  return (
    <Container className="login-wrapper">
      <Box className="row justify-content-center">
        <Box className="col-xl-8 col-lg-6 col-md-10 col-sm-12 p-0 login-box">
          <Box className="row">
            <Box className="col-md-4 col-sm-12 p-0">
              <img
                src={login}
                alt=""
                className="img-fluid  login-image"
                style={{ objectFit: "cover" }}
              />
            </Box>
            <Box className="col-md-8 col-sm-12 p-4 shadow-lg login-form">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form className="mx-auto rounded-3">
                    <h4 className="mt-2">Sign In</h4>
                    <hr />
                    <div className="mt-4 px-2">
                      <Field
                        as={TextField}
                        name="email"
                        label="Email Address"
                        variant="outlined"
                        className="form-control"
                        error={touched.email && !!errors.email}
                        helperText={touched.email && errors.email}
                      />
                    </div>
                    <div className="mt-4 px-2">
                      <Field
                        as={TextField}
                        name="password"
                        label="Password"
                        type="password"
                        autoComplete="current-password"
                        className="form-control"
                        error={touched.password && !!errors.password}
                        helperText={touched.password && errors.password}
                      />
                    </div>
                    <Box sx={{ textAlign: "right", marginTop: '12px' }}>
                      <span>
                        <NavLink to='/forgotpassword' style={{ textDecoration: 'none' }}>Forgot Password ?</NavLink>
                      </span>
                    </Box>
                    <Box className="text-center mt-3 mb-3">
                      <button type="submit" className="btn btn-primary w-75">
                        Sign In
                      </button>
                    </Box>
                    
                    <h6 className="text-center mb-4">
                      Don't have an account? <NavLink to='/signup' style={{ textDecoration: 'none', fontSize: '16px' }}> Sign up </NavLink> 
                    </h6>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;



