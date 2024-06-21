// import React from "react";
// import signupimage from "../Images/tos.webp";
// import {
//   Box,
//   Container,
//   TextField,
//   FormControl,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
//   Select,
//   MenuItem,
//   InputLabel,
// } from "@mui/material";
// import { Field, Form, Formik, ErrorMessage } from "formik";
// import { NavLink, useNavigate } from "react-router-dom";
// import * as Yup from "yup";
// import { useEffect } from "react";
// import axios from "axios";

// const SignUp = () => {
//   const initialValues = {
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     gender: "",
//     role: "",
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     fullName: Yup.string().required("Please Enter the Name"),
//     password: Yup.string().required("Password is required"),
//     confirmPassword: Yup.string()
//       .required("Password is not matched")
//       .oneOf([Yup.ref("password"), null], "Passwords must match"),
//     phone: Yup.number().required("Please Enter the phone number"),
//     gender: Yup.string().required("Please select your gender"),
//     role: Yup.string().required("Please select your role"),
//   });
//   let navigate = useNavigate();

//   const handleSubmit = (values, actions) => {
//     console.log(values);
//     actions.resetForm();
//     navigate("/login");
//     getapi();
//   };

//   const getapi = async () =>{
//     const obj ={
//       fullName: "krishna",
//       email: "krishna123@gmail.com",
//       password: "Hello@12367",
//       confirmPassword: "Hello@12367",
//       phone: "9856327410",
//       gender: "male",
//       role: "admin",
//     }
//     try {
//       let data =  axios.post("http://localhost:3000/api/user/create",obj);
//       console.log(data.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }

//   return (
//     <>
//       <Container className="signup-container">
//         <div
//           className="row gx-0 p-0 m-0"
//           style={{ display: "flex", justifyContent: "center" }}
//         >
//           <Box className="col-lg-4 col-sm-12 m-0 p-0">
//             <img
//               src={signupimage}
//               alt="Signup"
//               className="img-fluid h-100 image-signup"
//               style={{ objectFit: "cover" }}
//             />
//           </Box>
//           <Box className="col-lg-6 col-sm-12 shadow-lg px-3 py-3 signup-form">
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ errors, touched }) => (
//                 <Form className="mx-auto rounded-3">
//                   <div className="d-flex justify-content-between mx-3 my-2">
//                     <div>
//                       <h5>Sign Up</h5>
//                     </div>
//                     <div>
//                       <h6>
//                         <NavLink
//                           to="/login"
//                           style={{
//                             color: "rgb(22, 119, 255)",
//                             textDecoration: "none",
//                             marginLeft: "7px",
//                           }}
//                         >
//                           Already have an account?
//                         </NavLink>
//                       </h6>
//                     </div>
//                   </div>
//                   <hr />

//                   <div className="row gy-3 pt-2">
//                     <div className="col-lg-6 col-md-6 col-sm-12 px-2">
//                       <Field
//                         as={TextField}
//                         name="fullName"
//                         label="Full Name"
//                         variant="outlined"
//                         className="form-control"
//                         error={touched.fullName && !!errors.fullName}
//                         helperText={touched.fullName && errors.fullName}
//                       />
//                     </div>
//                     <div className="col-lg-6 col-md-6 col-sm-12 px-2">
//                       <Field
//                         as={TextField}
//                         name="email"
//                         label="Email Address"
//                         variant="outlined"
//                         className="form-control"
//                         error={touched.email && !!errors.email}
//                         helperText={touched.email && errors.email}
//                       />
//                     </div>
//                   </div>

//                   <div className="row mt-1 gy-3">
//                     <div className="col-lg-6 col-md-6 col-sm-12 px-2">
//                       <Field
//                         as={TextField}
//                         name="password"
//                         label="Password"
//                         type="password"
//                         autoComplete="current-password"
//                         className="form-control"
//                         error={touched.password && !!errors.password}
//                         helperText={touched.password && errors.password}
//                       />
//                     </div>
//                     <div className="col-lg-6 col-md-6 col-sm-12 px-2">
//                       <Field
//                         as={TextField}
//                         name="confirmPassword"
//                         label="Confirm Password"
//                         type="password"
//                         autoComplete="current-password"
//                         className="form-control"
//                         error={
//                           touched.confirmPassword && !!errors.confirmPassword
//                         }
//                         helperText={
//                           touched.confirmPassword && errors.confirmPassword
//                         }
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-2 px-2 ms-1">
//                     <label htmlFor="gender" className="w-100">
//                       Gender
//                     </label>
//                     <FormControl
//                       component="fieldset"
//                       error={touched.gender && !!errors.gender}
//                     >
//                       <Field
//                         as={RadioGroup}
//                         aria-label="gender"
//                         name="gender"
//                         row
//                       >
//                         <FormControlLabel
//                           value="male"
//                           control={<Radio />}
//                           label="Male"
//                         />
//                         <FormControlLabel
//                           value="female"
//                           control={<Radio />}
//                           label="Female"
//                         />
//                       </Field>
//                       <ErrorMessage
//                         name="gender"
//                         component="div"
//                         className="error-message"
//                       />
//                     </FormControl>
//                   </div>
//                   <div className="mt-1 px-2">
//                     <Field
//                       as={TextField}
//                       name="phone"
//                       label="Phone"
//                       type="number"
//                       autoComplete="current-password"
//                       className="form-control"
//                       error={touched.phone && !!errors.phone}
//                       helperText={touched.phone && errors.phone}
//                     />
//                   </div>

//                   <div className="mt-2 px-2">
//                     <label htmlFor="role">Role</label>
//                     <Field as="select" name="role" className="form-select">
//                       <option value="">Select Role</option>
//                       <option value="admin">Admin</option>
//                       <option value="client">Client</option>
//                     </Field>
//                     <ErrorMessage
//                       name="role"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div>

//                   {/* <div className="mt-2 px-2">
//                     <InputLabel htmlFor="role">Role</InputLabel>
//                     <FormControl
//                       variant="outlined"
//                       className="w-100"
//                       // value={'value'}
//                       error={touched.role && !! errors.role}
//                     >
//                       <Field as={Select} name="role" className="form-select">
//                         <MenuItem value="admin">Admin</MenuItem>
//                         <MenuItem value="client">Client</MenuItem>
//                       </Field>
//                       <ErrorMessage
//                         name="role"
//                         component="div"
//                         className="error-message"
//                       />
//                     </FormControl>
//                   </div> */}

//                   <Box className="text-center mt-3 mb-3">
//                     <button type="submit" className="btn btn-primary w-50">
//                       Sign Up
//                     </button>
//                   </Box>
//                 </Form>
//               )}
//             </Formik>
//           </Box>
//         </div>
//       </Container>
//     </>
//   );
// };

// export default SignUp;

import React, { useEffect } from "react";
import signupimage from "../Images/tos.webp";
import {
  Box,
  Container,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { Field, Form, Formik, ErrorMessage } from "formik";
import { NavLink, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import axios from "axios";
import { logDOM } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../Redux/slices/Slices";

const SignUp = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const userState = useSelector((state) => state.NewsApi.user);
  useEffect(() => {
    if (userState && userState.length > 0) {
      console.log("User Full Name:", userState[0].newUser.fullName);
      console.log("User Email:", userState[0].newUser.email);
    }
  }, [userState]);

  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    role: "",
  };

  // const loginState = useSelector((state) => state.NewsApi.user);
  // console.log("==========================>",loginState.fullName);

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    fullName: Yup.string().required("Please Enter the Name"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Password is not matched")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string().required("Please Enter the phone number"),
    gender: Yup.string().required("Please select your gender"),
    role: Yup.string().required("Please select your role"),
  });

  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
      "http://localhost:3000/api/user/create",values);
      console.log(values);
      console.log("Response:", response.data);
      let data = localStorage.setItem('data',JSON.stringify(values));
      console.log(data);
      dispatch(signup(response.data));
      actions.resetForm();
      navigate("/login");
    } catch (error) {
      console.error("Error creating user:", error);
    }
  };

  return (
    <>
      <Container className="signup-container">
        <div
          className="row gx-0 p-0 m-0"
          style={{ display: "flex", justifyContent: "center" }}
        >
          <Box className="col-lg-4 col-sm-12 m-0 p-0">
            <img
              src={signupimage}
              alt="Signup"
              className="img-fluid h-100 image-signup"
              style={{ objectFit: "cover" }}
            />
          </Box>
          <Box className="col-lg-6 col-sm-12 shadow-lg px-3 py-3 signup-form">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit} // Handle form submission
            >
              {({ errors, touched }) => (
                <Form className="mx-auto rounded-3">
                  <div className="d-flex justify-content-between mx-3 my-2">
                    <div>
                      <h5>Sign Up</h5>
                    </div>
                    <div>
                      <h6>
                        <NavLink
                          to="/login"
                          style={{
                            color: "rgb(22, 119, 255)",
                            textDecoration: "none",
                            marginLeft: "7px",
                          }}
                        >
                          Already have an account?
                        </NavLink>
                      </h6>
                    </div>
                  </div>
                  <hr />

                  <div className="row gy-3 pt-2">
                    <div className="col-lg-6 col-md-6 col-sm-12 px-2">
                      <Field
                        as={TextField}
                        name="fullName"
                        label="Full Name"
                        variant="outlined"
                        className="form-control"
                        error={touched.fullName && !!errors.fullName}
                        helperText={touched.fullName && errors.fullName}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 px-2">
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
                  </div>

                  <div className="row mt-1 gy-3">
                    <div className="col-lg-6 col-md-6 col-sm-12 px-2">
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
                    <div className="col-lg-6 col-md-6 col-sm-12 px-2">
                      <Field
                        as={TextField}
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        autoComplete="current-password"
                        className="form-control"
                        error={
                          touched.confirmPassword && !!errors.confirmPassword
                        }
                        helperText={
                          touched.confirmPassword && errors.confirmPassword
                        }
                      />
                    </div>
                  </div>

                  <div className="mt-2 px-2 ms-1">
                    <label htmlFor="gender" className="w-100">
                      Gender
                    </label>
                    <FormControl
                      component="fieldset"
                      error={touched.gender && !!errors.gender}
                    >
                      <Field
                        as={RadioGroup}
                        aria-label="gender"
                        name="gender"
                        row
                      >
                        <FormControlLabel
                          value="male"
                          control={<Radio />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Radio />}
                          label="Female"
                        />
                      </Field>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="error-message"
                      />
                    </FormControl>
                  </div>
                  <div className="mt-1 px-2">
                    <Field
                      as={TextField}
                      name="phone"
                      label="Phone"
                      type="text"
                      autoComplete="current-password"
                      className="form-control"
                      error={touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                    />
                  </div>

                  <div className="mt-2 px-2">
                    <label htmlFor="role">Role</label>
                    <Field as="select" name="role" className="form-select">
                      <option value="">Select Role</option>
                      <option value="admin">Admin</option>
                      {/* <option value="client">Client</option> */}
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="error-message"
                    />
                  </div>

                  <Box className="text-center mt-3 mb-3">
                    <button type="submit" className="btn btn-primary w-50">
                      Sign Up
                    </button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Box>
        </div>
      </Container>
    </>
  );
};

export default SignUp;
