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
//   TablePagination,
//   Table,
//   Paper,
//   TableRow,
//   styled,
// } from "@mui/material";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import EditIcon from "@mui/icons-material/Edit";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import { Field, Form, Formik, ErrorMessage } from "formik";
// import Button from "react-bootstrap/Button";
// import Modal from "react-bootstrap/Modal";
// import { Hoc } from "../Components/Hoc";
// import AddIcon from "@mui/icons-material/Add";
// import { getAllAdminData } from "./api";
// import { useDispatch } from "react-redux";
// import { HashLoader } from "react-spinners";
// import 'aos/dist/aos.css';
// import AOS from 'aos';

// const Subadmin = () => {
//   const initialValues = {
//     fullName: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     phone: "",
//     gender: "",
//     role: "",
//     area: "",
//   };

//   const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     fullName: Yup.string().required("Please Enter the Name"),
//     password: Yup.string().required("Password is required"),
//     confirmPassword: Yup.string()
//       .required("Confirm Password is required")
//       .oneOf([Yup.ref("password"), null], "Passwords must match"),
//     phone: Yup.string().required("Please Enter the phone number"),
//     gender: Yup.string().required("Please select your gender"),
//     role: Yup.string().required("Please select your role"),
//     area: Yup.string().required("Please enter your area"),
//   });

//   //? Usestate Define Here

//   const [show, setShow] = React.useState(false);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [ShowSubadminData, setShowSubadminData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [isLoading,setIsLoading]=useState(true);
//   const dispatch = useDispatch();

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   let token = localStorage.getItem("token");
//   console.log("===================>", token);

//   //? Style Component

//   const StyledTableCell = styled(TableCell)(({ theme }) => ({
//     [`&.${tableCellClasses.head}`]: {
//       backgroundColor: "#121621",
//       color: theme.palette.common.white,
//     },
//     [`&.${tableCellClasses.body}`]: {
//       fontSize: 14,
//     },
//   }));

//   const StyledTableRow = styled(TableRow)(({ theme }) => ({
//     "&:nth-of-type(odd)": {
//       backgroundColor: theme.palette.action.hover,
//     },
//     "&:last-child td, &:last-child th": {
//       border: 0,
//     },
//   }));

//   //? Style components Ends Here

//   //?pagination page Change
//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   //? Pagination Show
//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 5));
//     setPage(0);
//   };

//   //? Serach Filter the data
//   const filteredData = ShowSubadminData.filter((data) =>
//     data.fullName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   //? serching the naming by Character
//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   //? Pagination function
//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const auth = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   //?Loader
//   useEffect(() => {
//     AOS.init({
//       duration:1500,
//     });
//   }, [])

//   //? Get All SubadminData

//   useEffect(() => {
//     setIsLoading(true);
//     getAllAdminData(auth, setShowSubadminData, dispatch)
//       .then(() => {
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       });
//   }, [dispatch, token]);

//   const handleSubmit = (values, actions) => {
//     console.log('values===========>', values);
//     actions.setSubmitting(false);
//     actions.resetForm();
//     alert('Form submitted successfully');
//   };

//   return (
//     <>
//      {isLoading ? (
//         <HashLoader
//           color="#121621"
//           style={{
//             height: "100vh",
//             display: "flex",
//             justifyContent: "center",
//           }}
//         />
//       ):(

//         <div className="responsive-container mt-5" data-aos="fade-down">
//           <TableContainer component={Paper}>
//             <Table sx={{ minWidth: 700 }} aria-label="customized table">
//               <TableHead>
//                 <TableRow className="m-0 p-0">
//                   <StyledTableCell colSpan={7} align="right">
//                     <div
//                       style={{
//                         display: "flex",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <div>
//                         <button
//                           className="btn btn-outline-secondary"
//                           onClick={handleShow}
//                         >
//                           <AddIcon style={{ fontSize: "18px" }} />
//                           SubAdmin
//                         </button>
//                       </div>
//                       <div>
//                         <TextField
//                           placeholder="Search"
//                           value={searchQuery}
//                           onChange={handleSearch}
//                           variant="outlined"
//                           size="medium"
//                           style={{
//                             marginBottom: "0px",
//                             width: "300px",
//                             backgroundColor: "white",
//                             color: "black",
//                             borderRadius: "3px",
//                             height: "35px",
//                             fontSize: "16px",
//                           }}
//                           InputProps={{
//                             style: {
//                               color: "black",
//                             },
//                             classes: {
//                               notchedOutline: {
//                                 borderColor: "white",
//                               },
//                             },
//                           }}
//                           InputLabelProps={{
//                             style: { color: "black" },
//                           }}
//                         />
//                       </div>
//                     </div>
//                   </StyledTableCell>
//                 </TableRow>
//                 <TableRow>
//                   <StyledTableCell align="center">ID</StyledTableCell>
//                   <StyledTableCell align="center">FullName</StyledTableCell>
//                   <StyledTableCell align="center">Email</StyledTableCell>
//                   <StyledTableCell align="center">Phone</StyledTableCell>
//                   <StyledTableCell align="center">Gender</StyledTableCell>
//                   <StyledTableCell align="center">Role</StyledTableCell>
//                   <StyledTableCell align="center">Area</StyledTableCell>
//                   <StyledTableCell align="center">Action</StyledTableCell>
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedData.filter((data) => data.role === "subadmin") // Filter only subadmin roles
//                   .map((data, i) => (
//                     <StyledTableRow key={i}>
//                       <StyledTableCell align="center">
//                         {data.user_id}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {data.fullName}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {data.email}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {data.phone}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {data.gender}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {data.role}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         {data.area}
//                       </StyledTableCell>
//                       <StyledTableCell align="center">
//                         <EditIcon
//                           className="text-primary me-1"
//                           style={{ cursor: "pointer" }}
//                         />
//                         <VisibilityIcon
//                           className="ms-1"
//                           style={{ cursor: "pointer" }}
//                         />
//                       </StyledTableCell>
//                     </StyledTableRow>
//                   ))}
//               </TableBody>
//             </Table>
//             <TablePagination
//               rowsPerPageOptions={[5, 10, 25]}
//               component="div"
//               count={filteredData.length}
//               rowsPerPage={rowsPerPage}
//               page={page}
//               onPageChange={handleChangePage}
//               onRowsPerPageChange={handleChangeRowsPerPage}

//             />
//           </TableContainer>
//         </div>
//       )}

//       {/* Modal Starts Here */}

//       <Modal show={show} onHide={handleClose} centered>
//         <Modal.Header closeButton>
//           <h5>SubAdmin Form</h5>
//         </Modal.Header>
//         <Modal.Body>
//           <Container>
//             <Formik
//               initialValues={initialValues}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//             >
//               {({ errors, touched}) => (
//                 <Form>
//                   <Box sx={{ marginBottom: "15px" }}>
//                     <Field
//                       as={TextField}
//                       name="fullName"
//                       label="Full Name"
//                       variant="outlined"
//                       fullWidth
//                       error={touched.fullName && !!errors.fullName}
//                       helperText={touched.fullName && errors.fullName}
//                     />
//                   </Box>
//                   <Box sx={{ marginBottom: "15px" }}>
//                     <Field
//                       as={TextField}
//                       name="email"
//                       label="Email Address"
//                       variant="outlined"
//                       fullWidth
//                       error={touched.email && !!errors.email}
//                       helperText={touched.email && errors.email}
//                     />
//                   </Box>
//                   <Box sx={{ marginBottom: "15px" }}>
//                     <Field
//                       as={TextField}
//                       name="password"
//                       label="Password"
//                       type="password"
//                       variant="outlined"
//                       fullWidth
//                       error={touched.password && !!errors.password}
//                       helperText={touched.password && errors.password}
//                     />
//                   </Box>
//                   <Box sx={{ marginBottom: "15px" }}>
//                     <Field
//                       as={TextField}
//                       name="confirmPassword"
//                       label="Confirm Password"
//                       type="password"
//                       variant="outlined"
//                       fullWidth
//                       error={
//                         touched.confirmPassword && !!errors.confirmPassword
//                       }
//                       helperText={
//                         touched.confirmPassword && errors.confirmPassword
//                       }
//                     />
//                   </Box>

//                   <Box sx={{ marginBottom: "15px" }}>
//                     <FormControl component="fieldset" >
//                       <RadioGroup aria-label="gender" name="gender" row>
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
//                       </RadioGroup>
//                       {/* <ErrorMessage
//                         name="gender"
//                         component="div"
//                         className="error-message"
//                       /> */}
//                     </FormControl>
//                   </Box>

//                   <Box sx={{ marginBottom: "15px" }}>
//                     <Field
//                       as={TextField}
//                       name="phone"
//                       label="Phone"
//                       variant="outlined"
//                       fullWidth
//                       error={touched.phone && !!errors.phone}
//                       helperText={touched.phone && errors.phone}
//                     />
//                   </Box>

//                   <Box sx={{ marginBottom: "15px" }}>
//                     <Field
//                       as={TextField}
//                       name="area"
//                       label="Area"
//                       variant="outlined"
//                       fullWidth
//                       error={touched.area && !!errors.area}
//                       helperText={touched.area && errors.area}
//                     />
//                   </Box>

//                   <Box sx={{ marginBottom: "15px" }}>
//                     <Field
//                       as="select"
//                       name="role"
//                       variant="outlined"
//                       fullWidth
//                       className="form-select"
//                     >
//                       <option value="">Select Role</option>
//                       <option value="subadmin">SubAdmin</option>
//                       {/* <option value="client">Client</option> */}
//                     </Field>
//                     <ErrorMessage
//                       name="role"
//                       component="div"
//                       className="error-message"
//                     />
//                   </Box>

//                   <Box mt={2} display="flex" justifyContent="end">
//                     <Button
//                       variant="secondary"
//                       onClick={handleClose}
//                       className="me-2">
//                       Close
//                     </Button>
//                     <button className='btn btn-primary' type="submit">
//                       Submit
//                     </button>
//                   </Box>
//               </Form>
//               )}
//             </Formik>
//           </Container>
//         </Modal.Body>
//       </Modal>

//     </>
//   );
// };

// export default Hoc(Subadmin);

import * as Yup from "yup";
import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  TablePagination,
  Table,
  Paper,
  TableRow,
  styled,
  Modal as MuiModal,
  Tooltip,
} from "@mui/material";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { Field, Form, Formik, ErrorMessage } from "formik";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Hoc } from "../Components/Hoc";
import AddIcon from "@mui/icons-material/Add";
import { getAllAdminDataSubAdmin } from "./api";
import { useDispatch } from "react-redux";
import { HashLoader } from "react-spinners";
import "aos/dist/aos.css";
import AOS from "aos";
import axios from "axios";
import deleteicon from "../Images/icons8-delete-24.png";
import editicon from "../Images/icons8-edit-64.png";
import viewicon from "../Images/icons8-view-64.png";
import Swal from "sweetalert2";
import Backdrop from "@mui/material/Backdrop";
import Fade from "@mui/material/Fade";
import Typography from "@mui/material/Typography";

const Subadmin = () => {
  //?InitialValues Defines
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

  //?Usestate Defines
  const [show, setShow] = useState(false);
  const [Subadminuserbyid, SetSubadminuserbyid] = useState([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ShowSubadminData, setShowSubadminData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [SubAdmincurrentObject, SetAdmincurrentObject] =
    useState(initialValues);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    SetAdmincurrentObject(initialValues); // Reset form values on close
  };
  const handleShow = () => setShow(true);
  const handleOpen = () => setOpen(true);
  const handleband = () => setOpen(false);

  let token = localStorage.getItem("token");
  console.log("===================>", token);

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  //?Validation for All Fields
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email address")
      .required("Email is required"),
    fullName: Yup.string().required("Please Enter the Name"),
    password: Yup.string().required("Password is required"),
    confirmPassword: Yup.string()
      .required("Confirm Password is required")
      .oneOf([Yup.ref("password"), null], "Passwords must match"),
    phone: Yup.string()
      .required("Please Enter the phone number")
      .matches(
        /^(\+?\d{1,4}[\s-])?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}$/,
        "Phone number is not valid"
      ),
    gender: Yup.string().required("Please select your gender"),
    role: Yup.string().required("Please select your role"),
    area: Yup.string().required("Please enter your area"),
  });

  //?Styled the MUI Table
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: "#121621",
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  //?modal style for ViewData
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #DAA520",
    boxShadow: 24,
    p: 4,
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredData = ShowSubadminData.filter((data) =>
    data.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  // useEffect(() => {
  //   setShowSubadminData((prevData) =>
  //     prevData.filter((x) => x.role === "subadmin")
  //   );
  // }, [ShowSubadminData]);

  useEffect(() => {
    setIsLoading(true);
    getAllAdminDataSubAdmin(auth, setShowSubadminData, dispatch)//reset the api
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [dispatch, token]);

  //?Old
  // const handleSubmit = (values, actions) => {
  //   console.log("values===========>", values);
  //   actions.setSubmitting(false);
  //   actions.resetForm();
  //   CreateSubadminuser(values);
  // };
  //?new
  // const handleSubmit = async (values, actions) => {
  //   console.log("values===========>", values);
  //   actions.setSubmitting(false);

  //   if (values.user_id) {
  //     // If user_id exists, update existing subadmin
  //      await EditSubAdminUserData(values,actions);
  //   } else {
  //     CreateSubadminuser(values);
  //     // Otherwise, create a new subadmin
  //   }
  //   actions.resetForm();
  //   handleClose();
  // };

  //?Updated New
  const handleSubmit = async (values, actions) => {
    console.log("values===========>", values);
    actions.setSubmitting(false);

    if (values.user_id) {
      await EditSubAdminUserData(values, actions);
    } else {
      CreateSubadminuser(values);
    }
    actions.resetForm();
    SetAdmincurrentObject(initialValues);
    handleClose();
  };

  //?Old Function
  // const CreateSubadminuser = async (values) => {
  //   try {
  //     let response = await axios.post(
  //       "http://localhost:3000/api/admin/createAdmin",
  //       values,
  //       auth
  //     );
  //     console.log(response.data);
  //     getAllAdminData(auth, setShowSubadminData, dispatch);
  //     Swal.fire({
  //       position: "center",
  //       icon: "success",
  //       title: "Your work has been saved",
  //       showConfirmButton: false,
  //       timer: 1500
  //     });
  //     handleClose();
  //   } catch (error) {
  //     console.log(error);
  //     if (error.response && error.response.data && error.response.data.message) {
  //       Swal.fire({
  //         position: "center",
  //         icon: "error",
  //         title: "Oops...",
  //         text: error.response.data.message
  //       });
  //     } else {
  //       Swal.fire({
  //         position: "center",
  //         icon: "error",
  //         title: "Oops...",
  //         text: "Something went wrong! Unable to create subadmin user."
  //       });
  //     }
  //   }
  // };

  //? New Udated Code
  //? CREATE FUNCTION
  const CreateSubadminuser = async (values) => {
    try {
      let response = await axios.post(
        "http://localhost:3000/api/admin/createAdmin",
        values,
        auth
      );
      console.log(response.data);
      await getAllAdminDataSubAdmin(auth, setShowSubadminData, dispatch); // Wait for data update
      Swal.fire({
        position: "center",
        icon: "success",
        title: "SubAdmin created successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      handleClose(); // Close modal after success
    } catch (error) {
      console.log(error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: error.response.data.message,
        });
      } else {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Unable to create subadmin user.",
        });
      }
    }
  };

  // ? DELETE FUNCTION
    const DeleteSubadminUser = async (id) => {
    try {
      const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
          confirmButton: "btn btn-success",
          cancelButton: "btn btn-danger",
        },
        buttonsStyling: false,
      });

      const result = await swalWithBootstrapButtons.fire({
        title: "Are you sure?",
        text: "You won't Delete this Data!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, cancel!",
        reverseButtons: true,
      });
      if (result.isConfirmed) {
        let response = await axios.delete(
          `http://localhost:3000/api/admin/deleteSubAdminAndReporter/${id}`,
          auth
        );
        console.log(response.data);
        getAllAdminDataSubAdmin(auth, setShowSubadminData, dispatch); // Wait for data update
        Swal.fire({
          title: "Deleted!",
          text: "Your subadmin user has been deleted.",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your subadmin user is safe :)",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Unable to delete subadmin user.",
      });
    }
  };

  //? View SubAdmin Data Function
  const ViewSubAdminuserdata = async (id) => {
    console.log(id);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/getuser/${id}`,
        auth
      );
      console.log(response.data);
      SetSubadminuserbyid(response.data);
    } catch (error) {
      console.log(error);
    }
    handleOpen();
  };

  //? Edit SubAdmin Data
  const EditSubAdminUserData = async (obj) => {
    console.log("obj=========>", obj);
    console.log("id==========>", obj.user_id);
    try {
      let response = await axios.put(
        `http://localhost:3000/api/admin/UpdateSubAdmin/${obj.user_id}`,
        obj,
        auth
      );
      console.log(response.data);
      await getAllAdminDataSubAdmin(auth, setShowSubadminData, dispatch); // Wait for data update
      SetAdmincurrentObject({});
    } catch (error) {
      console.log(error);
    }
    SetAdmincurrentObject(obj);
  };

  return (
    <>
      {isLoading ? (
        <HashLoader
          color="#121621"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
          }}
        />
      ) : (
        <div className="responsive-container mt-5" data-aos="fade-down">
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow className="m-0 p-0">
                  <StyledTableCell colSpan={7} align="right">
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <button
                          className="btn btn-outline-secondary"
                          onClick={handleShow}
                        >
                          <AddIcon style={{ fontSize: "18px" }} />
                          SubAdmin
                        </button>
                      </div>
                      <div>
                        <TextField
                          placeholder="Search"
                          value={searchQuery}
                          onChange={handleSearch}
                          variant="outlined"
                          size="medium"
                          style={{
                            marginBottom: "0px",
                            width: "300px",
                            backgroundColor: "white",
                            color: "black",
                            borderRadius: "3px",
                            height: "35px",
                            fontSize: "16px",
                          }}
                          InputProps={{
                            style: {
                              color: "black",
                            },
                            classes: {
                              notchedOutline: {
                                borderColor: "white",
                              },
                            },
                          }}
                          InputLabelProps={{
                            style: { color: "black" },
                          }}
                        />
                      </div>
                    </div>
                  </StyledTableCell>
                </TableRow>
                <TableRow>
                  <StyledTableCell align="center">ID</StyledTableCell>
                  <StyledTableCell align="center">FullName</StyledTableCell>
                  <StyledTableCell align="center">Email</StyledTableCell>
                  <StyledTableCell align="center">Phone</StyledTableCell>
                  <StyledTableCell align="center">Gender</StyledTableCell>
                  <StyledTableCell align="center">Role</StyledTableCell>
                  <StyledTableCell align="center">Area</StyledTableCell>
                  <StyledTableCell align="center">Action</StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedData.map((data, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center">
                        {data.user_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.fullName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.phone}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.gender}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.role}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {data.area}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {/* <EditIcon
                          className="text-primary me-1"
                          style={{ cursor: "pointer" }}
                        /> */}
                        <Tooltip title='Edit'>
                        <img
                          src={editicon}
                          alt=""
                          height={23}
                          width={23}
                          className="img-fluid"
                          onClick={() => {
                            EditSubAdminUserData(data);
                            handleShow();
                          }}
                          style={{ cursor: "pointer" }}
                        />
                        </Tooltip>
                          <Tooltip title='Delete'>
                        <img
                          src={deleteicon}
                          alt=""
                          height={21}
                          width={21}
                          className="img-fluid"
                          onClick={() => DeleteSubadminUser(data.user_id)}
                          style={{
                            cursor: "pointer",
                            color: "red",
                            marginLeft: "1px",
                          }}
                        />
                        </Tooltip>
                          <Tooltip title='View'>
                        <img
                          src={viewicon}
                          alt=""
                          height={24}
                          width={24}
                          className="img-fluid"
                          onClick={() => ViewSubAdminuserdata(data.user_id)}
                          style={{ cursor: "pointer", marginLeft: "1px" }}
                        />
                        </Tooltip>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
              </TableBody>
            </Table>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableContainer>
        </div>
      )}

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <h5>SubAdmin Form</h5>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Formik
              initialValues={SubAdmincurrentObject}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <Form>
                  <Box sx={{ marginBottom: "15px" }}>
                    <Field
                      as={TextField}
                      name="fullName"
                      label="Full Name"
                      variant="outlined"
                      fullWidth
                      error={touched.fullName && !!errors.fullName}
                      helperText={touched.fullName && errors.fullName}
                    />
                  </Box>
                  <Box sx={{ marginBottom: "15px" }}>
                    <Field
                      as={TextField}
                      name="email"
                      label="Email Address"
                      variant="outlined"
                      fullWidth
                      error={touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Box>
                  <Box sx={{ marginBottom: "15px" }}>
                    <Field
                      as={TextField}
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      error={touched.password && !!errors.password}
                      helperText={touched.password && errors.password}
                    />
                  </Box>
                  <Box sx={{ marginBottom: "15px" }}>
                    <Field
                      as={TextField}
                      name="confirmPassword"
                      label="Confirm Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      error={
                        touched.confirmPassword && !!errors.confirmPassword
                      }
                      helperText={
                        touched.confirmPassword && errors.confirmPassword
                      }
                    />
                  </Box>

                  <Box sx={{ marginBottom: "15px" }}>
                    <FormControl component="fieldset">
                      <RadioGroup aria-label="gender" name="gender" row>
                        <FormControlLabel
                          value="male"
                          control={<Field as={Radio} name="gender" />}
                          label="Male"
                        />
                        <FormControlLabel
                          value="female"
                          control={<Field as={Radio} name="gender" />}
                          label="Female"
                        />
                      </RadioGroup>
                    </FormControl>
                    <ErrorMessage
                      name="gender"
                      component="div"
                      className="error-message"
                    />
                  </Box>

                  <Box sx={{ marginBottom: "15px" }}>
                    <Field
                      as={TextField}
                      name="phone"
                      label="Phone"
                      variant="outlined"
                      fullWidth
                      error={touched.phone && !!errors.phone}
                      helperText={touched.phone && errors.phone}
                    />
                  </Box>

                  <Box sx={{ marginBottom: "15px" }}>
                    <Field
                      as={TextField}
                      name="area"
                      label="Area"
                      variant="outlined"
                      fullWidth
                      error={touched.area && !!errors.area}
                      helperText={touched.area && errors.area}
                    />
                  </Box>

                  <Box sx={{ marginBottom: "15px" }}>
                    <Field
                      as="select"
                      name="role"
                      variant="outlined"
                      fullWidth
                      className="form-select"
                    >
                      <option value="">Select Role</option>
                      <option value="subadmin">SubAdmin</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="error-message"
                    />
                  </Box>

                  <Box mt={2} display="flex" justifyContent="end">
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      className="me-2"
                    >
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      {/* {SubAdmincurrentObject.user_id ? "Update" : "Add User"} */}
                      Add User
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Container>
        </Modal.Body>
      </Modal>

      <MuiModal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleband}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Subadmin User
            </Typography>
            <div className="d-flex justify-content-evenly px-2 py-2 main-container mt-3">
              <div className="">
                <div className="mb-3 fs-6">
                  <strong>ID:</strong>
                </div>
                <div className="mb-3 fs-6">
                  <strong>Full Name:</strong>
                </div>
                <div className="mb-3 fs-6">
                  <strong>Email:</strong>
                </div>
                <div className="mb-3 fs-6">
                  <strong>Phone:</strong>
                </div>
                <div className="mb-3 fs-6">
                  <strong>Gender:</strong>
                </div>
                <div className="mb-3 fs-6">
                  <strong>Area:</strong>
                </div>
                <div className="mb-3 fs-6">
                  <strong>Role:</strong>
                </div>
              </div>
              <div className="">
                <div className="mb-3 fs-6">{Subadminuserbyid?.user_id}</div>
                <div className="mb-3 fs-6">{Subadminuserbyid?.fullName}</div>
                <div className="mb-3 fs-6">{Subadminuserbyid?.email}</div>
                <div className="mb-3 fs-6">{Subadminuserbyid?.phone}</div>
                <div className="mb-3 fs-6">{Subadminuserbyid?.gender}</div>
                <div className="mb-3 fs-6">{Subadminuserbyid?.area}</div>
                <div className="mb-3 fs-6">{Subadminuserbyid?.role}</div>
              </div>
            </div>
          </Box>
        </Fade>
      </MuiModal>
    </>
  );
};

export default Hoc(Subadmin);
