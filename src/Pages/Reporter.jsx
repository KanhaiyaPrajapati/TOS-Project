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
import deleteicon from "../Images/deleticon8.png";
import editicon from "../Images/icons8-edit-64.png";
import viewicon from "../Images/icons8-view-64.png";
import "aos/dist/aos.css";
import AOS from "aos";
import { getAllAdminReporterData } from "./api";
import axios from "axios";
import Swal from "sweetalert2";

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
  const handleOpen = () => setOpen(true);
  const handleband = () => setOpen(false);
  const [open, setOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // New state for edit mode

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
    console.log("values===========>", values);
    actions.setSubmitting(false);
    if (values.user_id) {
      await EditReporteruser(values);
    } else {
      CreateReporterUser(values);
    }

    actions.resetForm();
    handleClose();
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
    } catch (error) {
      console.log(error);
    }
    handleOpen();
  };

  //?Upadte Function
  // const EditReporteruser = async (obj) => {
  //   try {
  //     let response = await axios.put(
  //       `http://localhost:3000/api/admin/UpdateReporter/${obj.user_id}`,
  //       obj,
  //       auth
  //     );
  //     console.log(response.data);
  //     setReportercurrentObject(obj);
  //     await getAllAdminReporterData(auth, setShowReporterData, dispatch);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // };

  const EditReporteruser = async (values) => {
    try {
      let response = await axios.put(
        `http://localhost:3000/api/admin/UpdateReporter/${values.user_id}`,
        values,
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
      handleClose();
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
                          onClick={() => {
                            setIsEditMode(false); // Set edit mode to false
                            setReportercurrentObject(initialValues); // Reset form values
                            handleShow();
                          }}
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
                {paginatedData
                  .filter((data) => data.role === "reporter")
                  .map((data, i) => (
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
                        <img
                          src={editicon}
                          alt=""
                          height={25}
                          width={25}
                          onClick={() => {
                            setIsEditMode(true); // Set edit mode to true
                            setReportercurrentObject(data);
                            handleShow();
                          }}
                          style={{ cursor: "pointer" }}
                        />

                        <img
                          src={deleteicon}
                          alt=""
                          height={25}
                          width={25}
                          onClick={() => DeleteReporterUser(data.user_id)}
                          style={{
                            cursor: "pointer",
                            color: "red",
                            marginLeft: "1px",
                          }}
                        />


                        <img
                          src={viewicon}
                          alt=""
                          height={27}
                          width={27}
                          onClick={() => ViewReporterUser(data.user_id)}
                          style={{ cursor: "pointer", marginLeft: "1px" }}
                        />
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

      {/* Modal Starts Here */}
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Typography id="modal-title" variant="h6" component="h2">
            {isEditMode ? "Edit Reporter" : "Add Reporter"}
          </Typography>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Formik
              initialValues={ReportercurrentObject}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize
            >
              {({ errors, touched }) => (
                <Form>
                  {!isEditMode && (
                    <>
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
                  )}
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
                      onClick={handleClose}
                      className="me-2"
                    >
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      {/* {ReportercurrentObject.user_id ? "Update User" : "Add User"} */}
                      {isEditMode ? "Update" : "Add"}
                    </Button>
                  </Box>
                </Form>
              )}
            </Formik>
          </Container>
        </Modal.Body>
      </Modal>

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
