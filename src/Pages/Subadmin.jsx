// import * as Yup from "yup";
// import React, { useEffect, useState } from "react";
// import {
//   Box,
//   Container,
//   TextField,
//   FormControl,
//   FormControlLabel,
//   Radio,
//   RadioGroup,
// } from "@mui/material";
// import { Field, Form, Formik, ErrorMessage } from "formik";
// import { Hoc } from "../Components/Hoc";
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';

// const Subadmin = () => {
//   const initialValues = {
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     gender: "",
//     role: "",
//     area:"",
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
//     phone: Yup.string().required("Please Enter the phone number"),
//     gender: Yup.string().required("Please select your gender"),
//     role: Yup.string().required("Please select your role"),
//     area: Yup.string().required("Please select your area"),
    
//   });

//   const handleSubmit = async (values, actions) => {
//     // try {
//     //   const response = await axios.post(
//     //   "http://localhost:3000/api/user/create",values);
//     //   console.log(values);
//     //   console.log("Response:", response.data);
//     //   let data = localStorage.setItem('data',JSON.stringify(values));
//     //   console.log(data);
//     //   dispatch(signup(response.data));
//     //   actions.resetForm();
//     //   navigate("/login");
//     // } catch (error) {
//     //   console.error("Error creating user:", error);
//     // }
//   };
//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);


//   return (
//     <>
//     <button className="btn btn-warning" onClick={handleShow}>SubAdmin</button>
//         <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Modal heading</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleClose}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleClose}>
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     <Container className="signup-container">
//         <div
//           className="row gx-0 p-0 m-0"
//           style={{ display: "flex", justifyContent: "center" }}>
//             <Box className="col-lg-6 col-sm-12 shadow-lg px-3 py-3 signup-form">
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit} // Handle form submission
//             >
//               {({ errors, touched }) => (
//                 <Form className="mx-auto rounded-3">
//                   <div className="d-flex justify-content-between mx-3 my-2">
//                     <div>
//                       <h5>SubAdmin Form</h5>
//                     </div>
//                    </div>
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
//                       type="text"
//                       className="form-control"
//                       error={touched.phone && !!errors.phone}
//                       helperText={touched.phone && errors.phone}
//                     />
//                   </div>
//                   <div className="mt-3 mb-2 px-2">
//                     <Field
//                       as={TextField}
//                       name="area"
//                       label="Area"
//                       type="text"
//                       className="form-control"
//                       error={touched.area && !!errors.area}
//                       helperText={touched.area && errors.area}
//                     />
//                   </div>
//                   <div className="mt-2 px-2">
//                     <label htmlFor="role">Role</label>
//                     <Field as="select" name="role" className="form-select">
//                       <option value="">Select Role</option>
//                       <option value="subadmin">SubAdmin</option>
//                       {/* <option value="client">Client</option> */}
//                     </Field>
//                     <ErrorMessage
//                       name="role"
//                       component="div"
//                       className="error-message"
//                     />
//                   </div>
//                     <Box className="text-center mt-3 mb-3">
//                     <button type="submit" className="btn btn-primary w-50">
//                       Submit
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
// export default Hoc(Subadmin);

import * as Yup from "yup";
import React from "react";
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
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Hoc } from "../Components/Hoc";

const Subadmin = () => {
  const initialValues = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    gender: "",
    role: "",
    area: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().email("Invalid email address").required("Email is required"),
    fullName: Yup.string().required("Please Enter the Name"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string().required("Please Enter the phone number"),
    gender: Yup.string().required("Please select your gender"),
    role: Yup.string().required("Please select your role"),
    area: Yup.string().required("Please enter your area"),
  });

  const handleSubmit = async (values, actions) => {
    // Handle form submission logic here
    console.log(values);
    actions.setSubmitting(false); // Example: reset the submitting state
    actions.resetForm(); // Example: reset the form after submission
  };

  const [show, setShow] = React.useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="warning" onClick={handleShow}>
        SubAdmin
      </Button>
       <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>SubAdmin Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({ errors, touched }) => (
                <Form>
                  <Box>
                    <Field
                      as={TextField}
                      name="fullName"
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.fullName && !!errors.fullName}
                      helperText={touched.fullName && errors.fullName}
                    />
                  </Box>
                  <Box>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Box>
                  <Box>
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                  </Box>
                  <Box>
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.confirmPassword && !!errors.confirmPassword}
                      helperText={touched.confirmPassword && errors.confirmPassword}
                    />
                  </Box>
                  <Box>
                    <FormControl component="fieldset" margin="normal" fullWidth>
                      <RadioGroup aria-label="gender" name="gender" row>
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
                      </RadioGroup>
                      <ErrorMessage
                        name="gender"
                        component="div"
                        className="error-message"
                      />
                    </FormControl>
                  </Box>
                  <Box>
                    <Field
                      as={TextField}
                      name="phone"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                    />
                  </Box>
                  <Box>
                    <Field
                      as={TextField}
                      name="area"
                      label="Area"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      error={touched.area && !!errors.area}
                      helperText={touched.area && errors.area}
                    />
                  </Box>
                  <Box>
                    <Field
                      as="select"
                      name="role"
                      variant="outlined"
                      fullWidth
                      margin="normal"
                      className="form-select"
                    >
                      <option value="">Select Role</option>
                      <option value="subadmin">SubAdmin</option>
                      {/* <option value="client">Client</option> */}
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="error-message"
                    />
                  </Box>
                  <Box mt={3} display="flex" justifyContent="center">
                    <Button variant="secondary" onClick={handleClose} className="me-2">
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Hoc(Subadmin);
