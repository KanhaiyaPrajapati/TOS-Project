import React from 'react'
import * as Yup from "yup";
import { NavLink, useNavigate } from 'react-router-dom';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Box, Container, TableContainer, TextField } from '@mui/material'
import { Hoc } from '../Components/Hoc'


// forget Password then send Email to the User = email
// Reset Password = password ,confirmPassword

const ResetPassWord = () => {
  const initialValues = {
    password: "",
    confirmPassword: "",
  };
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Password is not matched")
      .oneOf([Yup.ref("password"), null], "Passwords  is not match"),
  });

  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.resetForm();
    // navigate('/dashboard')
  };
  return (
    <>
        <Container className='px-3 py-3 w-75 resetpassword-wrapper border border-1'>
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ errors, touched }) => (
              <Form className="mx-auto rounded-3">
                <h4 className="mt-2"> <VpnKeyRoundedIcon style={{fontSize:'25px'}}/> Security</h4>
                <hr />
                {/* <h5 className="text-center mt-2">Hi,Welcome Back</h5> */}
                <div className="mt-4 px-2">
                  <Field
                    as={TextField}
                    name="password"
                    label="Old Password"
                    variant="outlined"
                    className="form-control"
                     type="password"
                    error={touched.password && !!errors.password}
                    helperText={touched.password && errors.password}
                  />
                </div>
                <div className="mt-4 px-2">
                  <Field
                    as={TextField}
                    name="confirmPassword"
                    label="Confirm Password"
                    type="password"
                    autoComplete="current-password"
                    className="form-control"
                    error={touched.confirmPassword && !!errors.confirmPassword}
                    helperText={touched.confirmPassword && errors.confirmPassword}
                  />
                </div>

                <Box className="text-center mt-4 mb-3 pt-2">
                  <button type="submit" className="btn btn-primary">
                   Save Changes
                  </button>
                </Box>
                
                </Form>
            )}
          </Formik>
        </Container>
    </>
  )
}

export default Hoc(ResetPassWord)