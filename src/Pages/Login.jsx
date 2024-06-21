// import { Box, Container, TextField } from "@mui/material";
// import { Formik, Form, Field } from "formik";
// import * as Yup from "yup";
// import login from "../Images/tos.webp";
// import React, { useEffect } from "react";
// import { NavLink, json, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";
// import { setError } from "../Redux/slices/Slices";

// const Login = () => {

//   const dispatch = useDispatch()
//   const navigate = useNavigate();

//   // const loginState = useSelector((state) => state.NewsApi.login);
//   // console.log(loginState);

//    const loginState1 = useSelector((state)=>state.NewsApi.user[0]?.newUser.email);
//    console.log(loginState1);
//    const loginState2 = useSelector((state)=>state.NewsApi.user[0]?.newUser.password)
//    console.log(loginState2);

//   const initialValues = {
//     email:"",
//     password:"",
//   };

//   useEffect(() => {
//     let user = JSON.parse(localStorage.getItem('data'));
//     console.log(user.email);
//     console.log(user.password);
//   },[]);

//   const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     password: Yup.string().required("Password is required"),
//   });

//   // const handleSubmit = async (values, actions) => {
//   //   try {
//   //     let data = await axios.post('http://localhost:3000/api/user/login',values);
//   //     console.log(data.data);
//   //     console.log(values);
//   //     dispatch(login(data.data))
//   //     actions.resetForm();
//   //     alert('hello krishna')
//   //     navigate('/dashboard');
//   //   } catch (error) {
//   //     console.log(error);
//   //   }
//   // };

//  const handleSubmit = (values, actions) => {
//     console.log(values);
//     actions.resetForm();
//     AdminCreateApi(values);// Pass values and actions to AdminCreateApi
//     navigate('/dashboard');
//   };

//   const AdminCreateApi = async (values) => {
//     try {
//       let data = await axios.post('http://localhost:3000/api/user/login', values);
//       console.log("================>",data.data);
//       dispatch(login(data.data));
//      } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <Container className="login-wrapper">
//       <Box className="row justify-content-center">
//         <Box className="col-xl-8 col-lg-6 col-md-10 col-sm-12 p-0 login-box">
//           <Box className="row">
//             <Box className="col-md-4 col-sm-12 p-0">
//               <img
//                 src={login}
//                 alt="login image"
//                 className="img-fluid  login-image"
//                 style={{ objectFit: "cover" }}
//               />
//             </Box>
//             <Box className="col-md-8 col-sm-12 p-4 shadow-lg login-form">
//               <Formik
//                 initialValues={initialValues}
//                 validationSchema={validationSchema}
//                 onSubmit={handleSubmit}
//               >
//                 {({ errors, touched }) => (
//                   <Form className="mx-auto rounded-3">
//                     <h4 className="mt-2">Sign In</h4>
//                     <hr />
//                     <div className="mt-4 px-2">
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
//                     <div className="mt-4 px-2">
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
//                     <Box sx={{ textAlign: "right", marginTop: '12px' }}>
//                       <span>
//                         <NavLink to='/forgotpassword' style={{ textDecoration: 'none' }}>Forgot Password ?</NavLink>
//                       </span>
//                     </Box>
//                     <Box className="text-center mt-3 mb-3">
//                       <button type= "submit" className="btn btn-primary w-75">
//                         Sign In
//                       </button>
//                     </Box>

//                     <h6 className="text-center mb-4">
//                       Don't have an account? <NavLink to='/signup' style={{ textDecoration: 'none', fontSize: '16px' }}> Sign up </NavLink>
//                     </h6>
//                   </Form>
//                 )}
//               </Formik>
//             </Box>
//           </Box>
//         </Box>
//       </Box>
//     </Container>
//   );
// };
// export default Login;

//Optinals

import React from "react";
import { Box, Container, TextField } from "@mui/material";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import loginImage from "../Images/tos.webp";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { login, signup } from "../Redux/slices/Slices"; // Adjust the path as necessary
import { Bounce, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginState1 = useSelector((state) => state.user?.email);
  const loginState2 = useSelector((state) => state.user?.password);

  console.log("Email:", loginState1);
  console.log("Password:", loginState2);

  const initialValues = {
    email: "",
    password: "",
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    password: Yup.string().required("Password is required"),
  });
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/user/login",values);
      console.log(values);
      console.log(response.data);
      localStorage.setItem('token',(response.data.token));
      dispatch(login(response.data));
      actions.resetForm();
      navigate("/dashboard");
      toast.success('Successfully logged in!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      } catch (error) {
      console.error("Login failed:", error);
      toast.error('Invalid email or password', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };
  return (
    <>
      <ToastContainer />
      <Container className="login-wrapper">
      <Box className="row justify-content-center">
        <Box className="col-xl-8 col-lg-6 col-md-10 col-sm-12 p-0 login-box">
          <Box className="row">
            <Box className="col-md-4 col-sm-12 p-0">
              <img
                src={loginImage}
                alt="login"
                className="img-fluid login-image"
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
                    <Box sx={{ textAlign: "right", marginTop: "12px" }}>
                      <span>
                        <NavLink
                          to="/forgotpassword"
                          style={{ textDecoration: "none" }}
                        >
                          Forgot Password ?
                        </NavLink>
                      </span>
                    </Box>
                    <Box className="text-center mt-3 mb-3">
                      <button type="submit" className="btn btn-primary w-75">
                        Sign In
                      </button>
                    </Box>
                    <h6 className="text-center mb-4">
                      Don't have an account?{" "}
                      <NavLink
                        to="/signup"
                        style={{ textDecoration: "none", fontSize: "16px" }}
                      >
                        {" "}
                        Sign up{" "}
                      </NavLink>
                    </h6>
                  </Form>
                )}
              </Formik>
            </Box>
          </Box>
        </Box>
      </Box>
    </Container>
    </>
  );
};
export default Login;
