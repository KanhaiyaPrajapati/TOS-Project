// import React, { useEffect, useState } from "react";
// import * as Yup from "yup";
// import { Hoc } from "../Components/Hoc";
// import AddIcon from "@mui/icons-material/Add";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import {
//   Box,
//   Container,
//   FormControl,
//   FormControlLabel,
//   Paper,
//   Radio,
//   RadioGroup,
//   Table,
//   TablePagination,
//   TableRow,
//   TextField,
//   Typography,
//   styled,
//   Modal as MuiModal,
//   Backdrop,
//   Fade,
// } from "@mui/material";

// import { ErrorMessage, Field, Form, Formik } from "formik";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import { HashLoader } from "react-spinners";
// import { useDispatch } from "react-redux";
// import deleteicon from "../Images/deleticon8.png";
// import editicon from "../Images/icons8-edit-64.png";
// import viewicon from "../Images/icons8-view-64.png";
// import "aos/dist/aos.css";
// import AOS from "aos";
// import { getAllAdminReporterData } from "./api";
// import axios from "axios";
// import Swal from "sweetalert2";

// const Reporter = () => {
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


//   //?Usestates Define Here
//   const [show, setShow] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [ShowReporterData, setShowReporterData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [ViewReporteruserdata, setViewReporteruserdata] = useState([]);
//   const [ReportercurrentObject, setReportercurrentObject] =
//   useState(initialValues);
//   const handleOpen = () => setOpen(true);
//   const handleband = () => setOpen(false);
//   const [open, setOpen] = useState(false);


//   const handleClose = () => {
//       setShow(false);
//       setReportercurrentObject(initialValues); // Reset form values on close
//     };
//   const handleShow = () => setShow(true);
//   const dispatch = useDispatch();

//   let token = localStorage.getItem("token");
//   console.log("===================>", token);
  
//   const auth = {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   };

//   //?Create Validation Function

//   const validationSchema = Yup.object().shape({
//     email: Yup.string()
//       .email("Invalid email address")
//       .required("Email is required"),
//     fullName: Yup.string().required("Please Enter the Name"),
//     password: Yup.string().required("Password is required"),
//     confirmPassword: Yup.string()
//       .required("Confirm Password is required")
//       .oneOf([Yup.ref("password"), null], "Passwords must match"),
//     phone: Yup.string()
//       .required("Please Enter the phone number")
//       .matches(
//         /^(\+?\d{1,4}[\s-])?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}$/,
//         "Phone number is not valid"
//       ),
//     gender: Yup.string().required("Please select your gender"),
//     role: Yup.string().required("Please select your role"),
//     area: Yup.string().required("Please enter your area"),
//   });

//   //? Styled in Tabel
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

//     //?modal style for ViewData
//     const style = {
//       position: "absolute",
//       top: "50%",
//       left: "50%",
//       transform: "translate(-50%, -50%)",
//       width: 400,
//       bgcolor: "background.paper",
//       border: "2px solid #DAA520",
//       boxShadow: 24,
//       p: 4,
//     };

//   //? Update Handlesubmit function
//   const handleSubmit = async (values, actions) => {
//     console.log("values===========>", values);
//     actions.setSubmitting(false);
//     if (values.user_id) {
//       await EditReporteruser(values);
//     } else {
//       CreateReporterUser(values);
//     }

//     actions.resetForm();
//     handleClose();
//   };

//   //?Filter the data Fullname Wise
//   const filteredData = ShowReporterData.filter((data) =>
//     data.fullName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     setIsLoading(true);
//     getAllAdminReporterData(auth, setShowReporterData, dispatch) //reset the api
//       .then(() => {
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       });
//   }, [dispatch, token]);

//   //? Aos Animation Timing
//   useEffect(() => {
//     AOS.init({
//       duration: 1500,
//     });
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   //?Pagination functions
//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

 

//   //? Create Reporter Function
//   const CreateReporterUser = async (obj) => {
//     try {
//       let response = await axios.post(
//         "http://localhost:3000/api/admin/createReporter",
//         obj,
//         auth
//       );
//       console.log(response.data);
//       await getAllAdminReporterData(auth, setShowReporterData, dispatch); // Wait for data update
//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Reporter created successfully!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       handleClose(); // Close modal after success
//     } catch (error) {
//       console.log(error);
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         Swal.fire({
//           position: "center",
//           icon: "error",
//           title: "Oops...",
//           text: error.response.data.message,
//         });
//       } else {
//         Swal.fire({
//           position: "center",
//           icon: "error",
//           title: "Oops...",
//           text: "Something went wrong! Unable to create subadmin user.",
//         });
//       }
//     }
//   };

//   //? Delete Reporter Function
//   const DeleteReporterUser = async (id) => {
//     try {
//       const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//           confirmButton: "btn btn-success",
//           cancelButton: "btn btn-danger",
//         },
//         buttonsStyling: false,
//       });

//       const result = await swalWithBootstrapButtons.fire({
//         title: "Are you sure?",
//         text: "You won't Delete this Data!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true,
//       });
//       if (result.isConfirmed) {
//         let response = await axios.delete(
//           `http://localhost:3000/api/admin/deleteSubAdminAndReporter/${id}`,
//           auth
//         );
//         console.log(response.data);
//         await getAllAdminReporterData(auth, setShowReporterData, dispatch);
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your Reporter user has been deleted.",
//           icon: "success",
//         });
//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         Swal.fire({
//           title: "Cancelled",
//           text: "Your Reporter user is safe :)",
//           icon: "error",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong! Unable to delete Reporter user.",
//       });
//     }
//   };

//   //?ViewReporterdata Function
//   const ViewReporterUser = async (id) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/admin/getuser/${id}`,
//         auth
//       );
//       console.log(response.data);
//       setViewReporteruserdata(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//     handleOpen();
//   };

//   //?Upadte Function
//   const EditReporteruser = async (obj) => {
//     try {
//       let response = await axios.put(
//         `http://localhost:3000/api/admin/UpdateReporter/${obj.user_id}`,
//         obj,
//         auth
//       );
//       console.log(response.data);
//       setReportercurrentObject(obj);
//       await getAllAdminReporterData(auth, setShowReporterData, dispatch);
//     } catch (error) {
//       console.log(error.message);
//     }
//   };


//   return (
//     <>
//       {isLoading ? (
//         <HashLoader
//           color="#121621"
//           style={{
//             height: "100vh",
//             display: "flex",
//             justifyContent: "center",
//           }}
//         />
//       ) : (
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
//                           Reporter
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
//                 {paginatedData
//                   .filter((data) => data.role === "reporter")
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
//                         <img
//                           src={editicon}
//                           alt=""
//                           height={25}
//                           width={25}
//                           onClick={() => {
//                             EditReporteruser(data);
//                             handleShow();
//                           }}
//                           style={{ cursor: "pointer" }}
//                         />

//                         <img
//                           src={deleteicon}
//                           alt=""
//                           height={25}
//                           width={25}
//                           onClick={() => DeleteReporterUser(data.user_id)}
//                           style={{
//                             cursor: "pointer",
//                             color: "red",
//                             marginLeft: "1px",
//                           }}
//                         />
//                         <img
//                           src={viewicon}
//                           alt=""
//                           height={27}
//                           width={27}
//                           onClick={() => ViewReporterUser(data.user_id)}
//                           style={{ cursor: "pointer", marginLeft: "1px" }}
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
//           <Typography id="modal-title" variant="h6" component="h2">
//             Reporter Form
//           </Typography>
//         </Modal.Header>
//         <Modal.Body>
//           <Container>
//             <Formik
//               initialValues={ReportercurrentObject}
//               validationSchema={validationSchema}
//               onSubmit={handleSubmit}
//               enableReinitialize
//             >
//               {({ errors, touched }) => (
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
//                     <FormControl component="fieldset">
//                       <RadioGroup aria-label="gender" name="gender" row>
//                         <FormControlLabel
//                           value="male"
//                           control={<Field as={Radio} name="gender" />}
//                           label="Male"
//                         />
//                         <FormControlLabel
//                           value="female"
//                           control={<Field as={Radio} name="gender" />}
//                           label="Female"
//                         />
//                       </RadioGroup>
//                     </FormControl>
//                     <ErrorMessage
//                       name="gender"
//                       component="div"
//                       className="error-message"
//                     />
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
//                       <option value="reporter">Reporter</option>
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
//                       className="me-2"
//                     >
//                       Close
//                     </Button>
//                     <Button variant="primary" type="submit">
//                       {ReportercurrentObject.user_id ? "Update User" : "Add User"}
//                     </Button>
//                   </Box>
//                 </Form>
//               )}
//             </Formik>
//           </Container>
//         </Modal.Body>
//       </Modal>

//       {/* View Modal Starts Here */}
//       <MuiModal
//         aria-labelledby="transition-modal-title"
//         aria-describedby="transition-modal-description"
//         open={open}
//         onClose={handleband}
//         closeAfterTransition
//         BackdropComponent={Backdrop}
//         BackdropProps={{
//           timeout: 500,
//         }}
//       >
//         <Fade in={open}>
//           <Box sx={style}>
//             <Typography id="transition-modal-title" variant="h6" component="h2">
//               Subadmin User
//             </Typography>
//             <div className="d-flex justify-content-evenly px-2 py-2 main-container mt-3">
//               <div className="">
//                 <div className="mb-3 fs-6">
//                   <strong>ID:</strong>
//                 </div>
//                 <div className="mb-3 fs-6">
//                   <strong>Full Name:</strong>
//                 </div>
//                 <div className="mb-3 fs-6">
//                   <strong>Email:</strong>
//                 </div>
//                 <div className="mb-3 fs-6">
//                   <strong>Phone:</strong>
//                 </div>
//                 <div className="mb-3 fs-6">
//                   <strong>Gender:</strong>
//                 </div>
//                 <div className="mb-3 fs-6">
//                   <strong>Area:</strong>
//                 </div>
//                 <div className="mb-3 fs-6">
//                   <strong>Role:</strong>
//                 </div>
//               </div>
//               <div className="">
//                 <div className="mb-3 fs-6">{ViewReporteruserdata?.user_id}</div>
//                 <div className="mb-3 fs-6">
//                   {ViewReporteruserdata?.fullName}
//                 </div>
//                 <div className="mb-3 fs-6">{ViewReporteruserdata?.email}</div>
//                 <div className="mb-3 fs-6">{ViewReporteruserdata?.phone}</div>
//                 <div className="mb-3 fs-6">{ViewReporteruserdata?.gender}</div>
//                 <div className="mb-3 fs-6">{ViewReporteruserdata?.area}</div>
//                 <div className="mb-3 fs-6">{ViewReporteruserdata?.role}</div>
//               </div>
//             </div>
//           </Box>
//         </Fade>
//       </MuiModal>
//     </>
//   );
// };
// export default Hoc(Reporter);


//! =======================================  New Updated Code For Show Only Area Field  ===================================================

import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { Hoc } from "../Components/Hoc";
import AddIcon from "@mui/icons-material/Add";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  Box,
  Container,
  FormControl,
  FormControlLabel,
  Paper,
  Radio,
  RadioGroup,
  Table,
  TablePagination,
  TableRow,
  TextField,
  Typography,
  styled,
  Modal as MuiModal,
  Backdrop,
  Fade,
} from "@mui/material";

import { ErrorMessage, Field, Form, Formik } from "formik";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import { HashLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import deleteicon from "../Images/icons8-delete-24.png";
import editicon from "../Images/icons8-edit-64.png";
import viewicon from "../Images/icons8-view-64.png";
import "aos/dist/aos.css";
import AOS from "aos";
import { getAllAdminReporterData } from "./api";
import axios from "axios";
import Swal from "sweetalert2";
import Tooltip from '@mui/material/Tooltip';

const Reporter = () => {
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

  //?Usestates Define Here
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [ShowReporterData, setShowReporterData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [ViewReporteruserdata, setViewReporteruserdata] = useState([]);
  const [ReportercurrentObject, setReportercurrentObject] =
    useState(initialValues);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);


    const [currentReporter, setCurrentReporter] = useState(null);


  const handleOpen = () => setOpen(true);
  const handleband = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for edit mode


    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);


    const handleShowEditModal = (reporter) => {
          setCurrentReporter(reporter);
          setShowEditModal(true);
        };

    const handleCloseEditModal = () => {
     setCurrentReporter(null);
     setShowEditModal(false);
  };

  const handleClose = () => {
    setShow(false);
    setReportercurrentObject(initialValues); // Reset form values on close
    setIsEditMode(false);
  };
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();

  let token = localStorage.getItem("token");
  console.log("===================>", token);

  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,                  
    },
  };

  //?Create Validation Function

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

  const validationSchemaEdit = Yup.object().shape({
    area: Yup.string().required("Please enter your area"),
  });


  //? Styled in Tabel
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

  //? Update Handlesubmit function
  const handleSubmit = async (values, actions) => {
        if (currentReporter) {
          await EditReporteruser(values);
        } else {
          await CreateReporterUser(values);
        }
        actions.resetForm();
        handleCloseAddModal();
        handleCloseEditModal();
      };
  

  //?Filter the data Fullname Wise
  const filteredData = ShowReporterData.filter((data) =>
    data.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    setIsLoading(true);
    getAllAdminReporterData(auth, setShowReporterData, dispatch) //reset the api
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, [dispatch, token]);

  //? Aos Animation Timing
  useEffect(() => {
    AOS.init({
      duration: 1500,
    });
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  //?Pagination functions
  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  //? Create Reporter Function
  const CreateReporterUser = async (obj) => {
    try {
      let response = await axios.post(
        "http://localhost:3000/api/admin/createReporter",
        obj,
        auth
      );
      console.log(response.data);
      await getAllAdminReporterData(auth, setShowReporterData, dispatch); // Wait for data update
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Reporter created successfully!",
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

  //? Delete Reporter Function
  const DeleteReporterUser = async (id) => {
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
        await getAllAdminReporterData(auth, setShowReporterData, dispatch);
        Swal.fire({
          title: "Deleted!",
          text: "Your Reporter user has been deleted.",
          icon: "success",
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Cancelled",
          text: "Your Reporter user is safe :)",
          icon: "error",
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong! Unable to delete Reporter user.",
      });
    }
  };

  //?ViewReporterdata Function
  const ViewReporterUser = async (id) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/admin/getuser/${id}`,
        auth
      );
      console.log(response.data);
      setViewReporteruserdata(response.data);
      handleOpen();
    } catch (error) {
      console.log(error);
      Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong! Unable to fetch Reporter user details.",
        });
    }
   
  };


  //?Upadte Function
  const EditReporteruser = async (reporter) => {
    try {
      let response = await axios.put(
        `http://localhost:3000/api/admin/UpdateReporter/${currentReporter.user_id}`,
        reporter,
        auth
      );
      console.log(response.data);
      await getAllAdminReporterData(auth, setShowReporterData, dispatch);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Reporter updated successfully!",
        showConfirmButton: false,
        timer: 1500,
      });
      // handleClose();
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
          text: "Something went wrong! Unable to update reporter user.",
        });
      }
    };
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
                          onClick= {handleShowAddModal}
                        >
                          <AddIcon style={{ fontSize: "18px" }} />
                          Add Reporter
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
                {paginatedData.map((reporter, i) => (
                    <StyledTableRow key={i}>
                      <StyledTableCell align="center">
                        {reporter.user_id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {reporter.fullName}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {reporter.email}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {reporter.phone}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {reporter.gender}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {reporter.role}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {reporter.area}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                      <Tooltip title='Edit'>
                        <img
                          src={editicon}
                          title="edit"
                          alt=""
                          height={24}
                          width={24}
                           className="img-fluid"
                          onClick={()=>handleShowEditModal(reporter)}
                          style={{ cursor: "pointer" }}
                        />
                        </Tooltip>
                        <Tooltip title='Delete'>
                         <img
                          src={deleteicon}
                          alt=""
                          height={21}
                          className="img-fluid"
                          width={21}
                          onClick={() => DeleteReporterUser(reporter.user_id)}
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
                          onClick={() => ViewReporterUser(reporter.user_id)}
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

      {/*ADD  Modal Starts Here */}
      <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
        <Modal.Header closeButton>
          <Typography id="modal-title" variant="h6" component="h2">
            ADD Reporter
          </Typography>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Formik
              initialValues={ReportercurrentObject}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
            >
              {({isSubmitting }) => (
                <Form>
                
                    <>
                      <Box sx={{ marginBottom: "15px" }}>
                        <Field
                          as={TextField}
                          name="fullName"
                          label="Full Name"
                          variant="outlined"
                          fullWidth
                          // error={touched.fullName && !!errors.fullName}
                          // helperText={touched.fullName && errors.fullName}
                        />
                          <ErrorMessage name="fullName" component="div"   className="error-message"/>
                      </Box>
                      <Box sx={{ marginBottom: "15px" }}>
                        <Field
                          as={TextField}
                          name="email"
                          label="Email Address"
                          variant="outlined"
                          fullWidth
                          // error={touched.email && !!errors.email}
                          // helperText={touched.email && errors.email}
                        />
                         <ErrorMessage name="email" component="div" className="error-message" />
                      </Box>
                      <Box sx={{ marginBottom: "15px" }}>
                        <Field
                          as={TextField}
                          name="password"
                          label="Password"
                          type="password"
                          variant="outlined"
                          fullWidth
                          // error={touched.password && !!errors.password}
                          // helperText={touched.password && errors.password}
                        />
                        <ErrorMessage name="password" component="div"  className="error-message" />
                      </Box>
                      <Box sx={{ marginBottom: "15px" }}>
                        <Field
                          as={TextField}
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          variant="outlined"
                          fullWidth
                          // error={
                          //   touched.confirmPassword && !!errors.confirmPassword
                          // }
                          // helperText={
                          //   touched.confirmPassword && errors.confirmPassword
                          // }
                        />
                        <ErrorMessage name="confirmPassword" component="div"  className="error-message" />
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
                          // error={touched.phone && !!errors.phone}
                          // helperText={touched.phone && errors.phone}
                        />
                          <ErrorMessage name="phone" component="div"  className="error-message" />
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
                      <option value="reporter">Reporter</option>
                    </Field>
                    <ErrorMessage
                      name="role"
                      component="div"
                      className="error-message"
                    />
                  </Box>
                    </>
                
                  <Box sx={{ marginBottom: "15px" }}>
                    <Field
                      as={TextField}
                      name="area"
                      label="Area"
                      variant="outlined"
                      fullWidth
                      // error={touched.area && !!errors.area}
                      // helperText={touched.area && errors.area}
                    />
                      <ErrorMessage name="area" component="div"   className="error-message"/>
                  </Box>
                  <Box mt={2} display="flex" justifyContent="end">
                    <Button
                      variant="secondary"
                      onClick={handleClose}
                      className="me-2"
                    >
                      Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Add Reporter"}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Container>
        </Modal.Body>
      </Modal>

      {/* Edit Modal Is Starts HERE */}
      <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
        <Modal.Header closeButton>
          <Typography id="modal-title" variant="h6" component="h2">
          Edit Reporter
          </Typography>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Formik
              initialValues={currentReporter || initialValues}
              validationSchema={validationSchemaEdit}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, touched,isSubmitting }) => (
                <Form>
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
              
                  <Box mt={2} display="flex" justifyContent="end">
                    <Button
                      variant="secondary"
                      onClick={handleCloseEditModal}
                      className="me-2"
                    >
                      Close
                    </Button>
                    <Button variant="primary" type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Update Reporter"}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Container>
        </Modal.Body>
      </Modal>
      {/* Edit MODal Ends HERE */}

              
      {/* View Modal Starts Here */}
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
                <div className="mb-3 fs-6">{ViewReporteruserdata?.user_id}</div>
                <div className="mb-3 fs-6">
                  {ViewReporteruserdata?.fullName}
                </div>
                <div className="mb-3 fs-6">{ViewReporteruserdata?.email}</div>
                <div className="mb-3 fs-6">{ViewReporteruserdata?.phone}</div>
                <div className="mb-3 fs-6">{ViewReporteruserdata?.gender}</div>
                <div className="mb-3 fs-6">{ViewReporteruserdata?.area}</div>
                <div className="mb-3 fs-6">{ViewReporteruserdata?.role}</div>
              </div>
            </div>
          </Box>
        </Fade>
      </MuiModal>
    </>
  );
};
export default Hoc(Reporter);


//!================================================= Create Two Form and 3 modal ==================================================

// import React, { useEffect, useState } from "react";
// import * as Yup from "yup";
// import { Hoc } from "../Components/Hoc";
// import AddIcon from "@mui/icons-material/Add";
// import Modal from "react-bootstrap/Modal";
// import Button from "react-bootstrap/Button";
// import {
//   Box,
//   Container,
//   FormControl,
//   FormControlLabel,
//   Paper,
//   Radio,
//   RadioGroup,
//   Table,
//   TablePagination,
//   TableRow,
//   TextField,
//   Typography,
//   styled,
//   Modal as MuiModal,
//   Backdrop,
//   Fade,
// } from "@mui/material";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import { HashLoader } from "react-spinners";
// import { useDispatch } from "react-redux";
// import deleteicon from "../Images/icons8-delete-24.png";
// import editicon from "../Images/icons8-edit-64.png";
// import viewicon from "../Images/icons8-view-64.png";
// import "aos/dist/aos.css";
// import AOS from "aos";
// import { getAllAdminReporterData } from "./api";
// import axios from "axios";
// import Swal from "sweetalert2";
// import Tooltip from '@mui/material/Tooltip';

// const Reporter = () => {
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

//   const [showAddModal, setShowAddModal] = useState(false);
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [isLoading, setIsLoading] = useState(true);
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(5);
//   const [ShowReporterData, setShowReporterData] = useState([]);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [ViewReporteruserdata, setViewReporteruserdata] = useState([]);
//   const [currentReporter, setCurrentReporter] = useState(null);
//   const [open, setOpen] = useState(false);

//   const handleOpen = () => setOpen(true);
//   const handleband = () => setOpen(false);

//   const handleShowAddModal = () => setShowAddModal(true);
//   const handleCloseAddModal = () => setShowAddModal(false);

//   const handleShowEditModal = (reporter) => {
//     setCurrentReporter(reporter);
//     setShowEditModal(true);

//   };
//   const handleCloseEditModal = () => setShowEditModal(false);

//   const dispatch = useDispatch();

//   let token = localStorage.getItem("token");
//   console.log("===================>", token);

//   const auth = {
//     headers: {
//       Authorization: `Bearer ${token}`,                  
//     },
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
//     phone: Yup.string()
//       .required("Please Enter the phone number")
//       .matches(
//         /^(\+?\d{1,4}[\s-])?(\(?\d{3}\)?[\s-]?)?[\d\s-]{7,10}$/,
//         "Phone number is not valid"
//       ),
//     gender: Yup.string().required("Please select your gender"),
//     role: Yup.string().required("Please select your role"),
//     area: Yup.string().required("Please enter your area"),
//   });

//   const validationSchemaEdit = Yup.object().shape({
//     area: Yup.string().required("Please enter your area"),
//   });

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

//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 400,
//     bgcolor: "background.paper",
//     border: "2px solid #DAA520",
//     boxShadow: 24,
//     p: 4,
//   };

//   const handleSubmit = (values, actions) =>{
//      console.log('Values',values);
//      CreateReporterUser(values)
//      EditReporteruser(values)
//      actions.resetForm(); // Reset form fields after successful submission
//      handleCloseAddModal();
//      handleCloseEditModal();
//   }

//   const filteredData = ShowReporterData.filter((data) =>
//     data.fullName.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   useEffect(() => {
//     setIsLoading(true);
//     getAllAdminReporterData(auth, setShowReporterData, dispatch) //reset the api
//       .then(() => {
//         setIsLoading(false);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//         setIsLoading(false);
//       });
//   }, [dispatch, token]);

//   useEffect(() => {
//     AOS.init({
//       duration: 1500,
//     });
//   }, []);

//   const handleSearch = (e) => {
//     setSearchQuery(e.target.value);
//   };

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const CreateReporterUser = async (obj) => {
//     try {
//       let response = await axios.post(
//         "http://localhost:3000/api/admin/createReporter",
//         obj,
//         auth
//       );
//       console.log(response.data);
//       await getAllAdminReporterData(auth, setShowReporterData, dispatch); // Wait for data update
//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Reporter created successfully!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       handleCloseAddModal(); // Close modal after success
//     } catch (error) {
//       console.log(error);
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         Swal.fire({
//           position: "center",
//           icon: "error",
//           title: "Oops...",
//           text: error.response.data.message,
//         });
//       } else {
//         Swal.fire({
//           position: "center",
//           icon: "error",
//           title: "Oops...",
//           text: "Something went wrong! Unable to create subadmin user.",
//         });
//       }
//     }
//   };

//   const DeleteReporterUser = async (id) => {
//     try {
//       const swalWithBootstrapButtons = Swal.mixin({
//         customClass: {
//           confirmButton: "btn btn-success",
//           cancelButton: "btn btn-danger",
//         },
//         buttonsStyling: false,
//       });

//       const result = await swalWithBootstrapButtons.fire({
//         title: "Are you sure?",
//         text: "You won't Delete this Data!",
//         icon: "warning",
//         showCancelButton: true,
//         confirmButtonText: "Yes, delete it!",
//         cancelButtonText: "No, cancel!",
//         reverseButtons: true,
//       });
//       if (result.isConfirmed) {
//         let response = await axios.delete(
//           `http://localhost:3000/api/admin/deleteSubAdminAndReporter/${id}`,
//           auth
//         );
//         console.log(response.data);
//         await getAllAdminReporterData(auth, setShowReporterData, dispatch);
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your Reporter user has been deleted.",
//           icon: "success",
//         });
//       } else if (result.dismiss === Swal.DismissReason.cancel) {
//         Swal.fire({
//           title: "Cancelled",
//           text: "Your Reporter user is safe :)",
//           icon: "error",
//         });
//       }
//     } catch (error) {
//       console.log(error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong! Unable to delete Reporter user.",
//       });
//     }
//   };

//   const ViewReporterUser = async (id) => {
//     try {
//       const response = await axios.get(
//         `http://localhost:3000/api/admin/getuser/${id}`,
//         auth
//       );
//       console.log(response.data);
//       setViewReporteruserdata(response.data);
//       handleOpen();
//     } catch (error) {
//       console.log(error);
//       Swal.fire({
//         icon: "error",
//         title: "Oops...",
//         text: "Something went wrong! Unable to fetch Reporter user details.",
//       });
//     }
//   };

//   // const EditReporterData = async (id, updatedData) => {
//   //   try {
//   //     let response = await axios.patch(
//   //       `http://localhost:3000/api/admin/editSubAdminAndReporter/${id}`,
//   //       updatedData,
//   //       auth
//   //     );
//   //     console.log(response.data);
//   //     await getAllAdminReporterData(auth, setShowReporterData, dispatch); // Wait for data update
//   //     Swal.fire({
//   //       position: "center",
//   //       icon: "success",
//   //       title: "Reporter updated successfully!",
//   //       showConfirmButton: false,
//   //       timer: 1500,
//   //     });
//   //     handleCloseEditModal(); // Close modal after success
//   //   } catch (error) {
//   //     console.log(error);
//   //     if (
//   //       error.response &&
//   //       error.response.data &&
//   //       error.response.data.message
//   //     ) {
//   //       Swal.fire({
//   //         position: "center",
//   //         icon: "error",
//   //         title: "Oops...",
//   //         text: error.response.data.message,
//   //       });
//   //     } else {
//   //       Swal.fire({
//   //         position: "center",
//   //         icon: "error",
//   //         title: "Oops...",
//   //         text: "Something went wrong! Unable to update reporter data.",
//   //       });
//   //     }
//   //   }
//   // };

//   const EditReporteruser = async (reporter) => {
//     // console.log('edited object is:',reporter.reporter._id);
//     try {
//       let response = await axios.put(
//         `http://localhost:3000/api/admin/UpdateReporter/${reporter.user_id}`, reporter,auth
//       );
//       console.log(response.data);
//       await getAllAdminReporterData(auth, setShowReporterData, dispatch); // Wait for data update
//       Swal.fire({
//         position: "center",
//         icon: "success",
//         title: "Reporter updated successfully!",
//         showConfirmButton: false,
//         timer: 1500,
//       });
//       handleCloseEditModal(); // Close modal after success
//     } catch (error) {
//       console.log(error);
//       if (
//         error.response &&
//         error.response.data &&
//         error.response.data.message
//       ) {
//         Swal.fire({
//           position: "center",
//           icon: "error",
//           title: "Oops...",
//           text: error.response.data.message,
//         });
//       } else {
//         Swal.fire({
//           position: "center",
//           icon: "error",
//           title: "Oops...",
//           text: "Something went wrong! Unable to update reporter data.",
//         });
//       }
//     }
//   };
  

//   return (
//     <div>
//       <Box className="container">
//         <Box className="container-fluid mt-5">
//           <Box className="d-sm-flex align-items-center justify-content-between mb-4">
//             <Box>
//               <Typography
//                 variant="h4"
//                 gutterBottom
//                 sx={{
//                   fontFamily: "sans-serif",
//                   fontWeight: "bold",
//                   textAlign: "left",
//                 }}
//               >
//                 Reporter
//               </Typography>
//               <Typography
//                 variant="subtitle2"
//                 gutterBottom
//                 sx={{
//                   fontFamily: "sans-serif",
//                   textAlign: "left",
//                   color: "#969494",
//                 }}
//               >
//                 Create, remove and edit Reporter
//               </Typography>
//             </Box>
//             <Box>
//               <Button
//                 variant="contained"
//                 startIcon={<AddIcon />}
//                 onClick={handleShowAddModal}
//                 sx={{
//                   textTransform: "capitalize",
//                   fontFamily: "Poppins-Regular",
//                   backgroundColor: "#020e4f",
//                   borderRadius: "10px",
//                   mt: 2,
//                 }}
//               >
//                 Add Reporter
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       </Box>

//       {/* Add Reporter Modal */}
//       <Modal show={showAddModal} onHide={handleCloseAddModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Reporter</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Formik
//             initialValues={initialValues}
//             validationSchema={validationSchema}
//             onSubmit={handleSubmit}
//           >
//             {({ errors, touched }) => (
//               <Form>
//                 <div className="form-group">
//                   <label htmlFor="fullName">Full Name</label>
//                   <Field
//                     name="fullName"
//                     className={`form-control ${touched.fullName && errors.fullName ? "is-invalid" : ""
//                       }`}
//                   />
//                   <ErrorMessage
//                     component="div"
//                     name="fullName"
//                     className="invalid-feedback"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="email">Email</label>
//                   <Field
//                     name="email"
//                     type="email"
//                     className={`form-control ${touched.email && errors.email ? "is-invalid" : ""
//                       }`}
//                   />
//                   <ErrorMessage
//                     component="div"
//                     name="email"
//                     className="invalid-feedback"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="password">Password</label>
//                   <Field
//                     name="password"
//                     type="password"
//                     className={`form-control ${touched.password && errors.password ? "is-invalid" : ""
//                       }`}
//                   />
//                   <ErrorMessage
//                     component="div"
//                     name="password"
//                     className="invalid-feedback"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="confirmPassword">Confirm Password</label>
//                   <Field
//                     name="confirmPassword"
//                     type="password"
//                     className={`form-control ${touched.confirmPassword && errors.confirmPassword
//                       ? "is-invalid"
//                       : ""
//                       }`}
//                   />
//                   <ErrorMessage
//                     component="div"
//                     name="confirmPassword"
//                     className="invalid-feedback"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="phone">Phone</label>
//                   <Field
//                     name="phone"
//                     className={`form-control ${touched.phone && errors.phone ? "is-invalid" : ""
//                       }`}
//                   />
//                   <ErrorMessage
//                     component="div"
//                     name="phone"
//                     className="invalid-feedback"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="gender">Gender</label>
//                   <Field
//                     name="gender"
//                     as="select"
//                     className={`form-control ${touched.gender && errors.gender ? "is-invalid" : ""
//                       }`}
//                   >
//                     <option value="" label="Select gender" />
//                     <option value="male" label="Male" />
//                     <option value="female" label="Female" />
//                     <option value="other" label="Other" />
//                   </Field>
//                   <ErrorMessage
//                     component="div"
//                     name="gender"
//                     className="invalid-feedback"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="role">Role</label>
//                   <Field
//                     name="role"
//                     as="select"
//                     className={`form-control ${touched.role && errors.role ? "is-invalid" : ""
//                       }`}
//                   >
//                     <option value="" label="Select role" />
//                     <option value="reporter" label="Reporter" />
//                     <option value="admin" label="Admin" />
//                     <option value="subadmin" label="Subadmin" />
//                   </Field>
//                   <ErrorMessage
//                     component="div"
//                     name="role"
//                     className="invalid-feedback"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label htmlFor="area">Area</label>
//                   <Field
//                     name="area"
//                     className={`form-control ${touched.area && errors.area ? "is-invalid" : ""
//                       }`}
//                   />
//                   <ErrorMessage
//                     component="div"
//                     name="area"
//                     className="invalid-feedback"
//                   />
//                 </div>

//                 <Button type="submit" variant="contained" color="primary">
//                   Add Reporter
//                 </Button>
//               </Form>
//             )}
//           </Formik>
//         </Modal.Body>
//       </Modal>

//       {/* Edit Reporter Modal */}
//       <Modal show={showEditModal} onHide={handleCloseEditModal} centered>
//         <Modal.Header closeButton>
//           <Modal.Title>Edit Reporter Area</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Formik
//             initialValues={currentReporter || { area: "" }}
//             validationSchema={validationSchemaEdit}
//             onSubmit={(values, actions) => handleSubmit(values, actions)}
//           >
//             {({ errors, touched }) => (
//               <Form>
//                 <div className="form-group">
//                   <label htmlFor="area">Area</label>
//                   <Field
//                     name="area"
//                     className={`form-control ${touched.area && errors.area ? "is-invalid" : ""
//                       }`}
//                   />
//                   <ErrorMessage
//                     component="div"
//                     name="area"
//                     className="invalid-feedback"
//                   />
//                 </div>

//                 <Button type="submit" variant="contained" color="primary">
//                   Update Reporter
//                 </Button>
//               </Form>
//             )}
//           </Formik>
//         </Modal.Body>
//       </Modal>

//       <Container>
//         <Box className="card">
//           <Box className="card-body">
//             <Paper>
//               <div className="search-bar">
//                 <input
//                   type="text"
//                   placeholder="Search reporters..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//               </div>
//               <TableContainer>
//                 <Table>
//                   <TableHead>
//                     <TableRow>
//                       <TableCell>Full Name</TableCell>
//                       <TableCell>Email</TableCell>
//                       <TableCell>Phone</TableCell>
//                       <TableCell>Gender</TableCell>
//                       <TableCell>Role</TableCell>
//                       <TableCell>Area</TableCell>
//                       <TableCell>Actions</TableCell>
//                     </TableRow>
//                   </TableHead>
//                   <TableBody>
//                     {paginatedData.map((reporter, index) => (
//                       <TableRow key={index}>
//                         <TableCell>{reporter.user_id}</TableCell>
//                         <TableCell>{reporter.fullName}</TableCell>
//                         <TableCell>{reporter.email}</TableCell>
//                         <TableCell>{reporter.phone}</TableCell>
//                         <TableCell>{reporter.gender}</TableCell>
//                         <TableCell>{reporter.role}</TableCell>
//                         <TableCell>{reporter.area}</TableCell>
//                         <TableCell>
//                           <Button
//                             variant="contained"
//                             color="primary"
//                             onClick={() => handleShowEditModal(reporter)}
//                           >
//                             Edit Area
//                           </Button>
//                           <Button
//                             variant="contained"
//                             color="secondary"
//                             onClick={() => DeleteReporterUser(reporter._id)}
//                           >
//                             Delete
//                           </Button>
//                         </TableCell>
//                       </TableRow>
//                     ))}
//                   </TableBody>
//                 </Table>
//               </TableContainer>
//             </Paper>
//           </Box>
//         </Box>
//       </Container>
//     </div>
//   );
// };

// export default Hoc(Reporter);
