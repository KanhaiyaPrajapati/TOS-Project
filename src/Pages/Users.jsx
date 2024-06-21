// import { Container } from "react-bootstrap";
// import { DataGrid } from "@mui/x-data-grid";
// import React, { useEffect, useState } from "react";
// import { Hoc } from "../Components/Hoc";
// import { styled } from "@mui/material/styles";
// import Table from "@mui/material/Table";
// import TableBody from "@mui/material/TableBody";
// import TableCell, { tableCellClasses } from "@mui/material/TableCell";
// import TableContainer from "@mui/material/TableContainer";
// import TableHead from "@mui/material/TableHead";
// import TableRow from "@mui/material/TableRow";
// import Paper from "@mui/material/Paper";
// import { HashLoader } from "react-spinners";
// import axios from "axios";
// import { useDispatch, useSelector } from "react-redux";
// import { getAdmindata } from "../Redux/slices/Slices";

// const Users = () => {
//   const dispatch = useDispatch();

//   const [isLoading, setIsLoading] = useState(true);
//   const [showdata,setshowdata] = useState([])
//   console.log('data================>',showdata);
//   useEffect(() => {
//     setTimeout(() => {
//       setIsLoading(false);
//     }, 1500);
//   },[]);

//   const selector = useSelector((state) => state.NewsApi.getadmin);
//   console.log("selector=============>", selector);

//   let token = localStorage.getItem("token");
//   console.log("===================>", token);

//   useEffect(() => {
//     const getAllAdmindata = async () => {
//       try {
//         let response = await axios.get(
//           "http://localhost:3000/api/admin/getAllUsers",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         console.log(response.data);
//         setshowdata(response.data);
//         dispatch(getAdmindata(response.data));
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     getAllAdmindata();
//   }, []);

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

//   return (
//     <>
//       {isLoading && (
//         <HashLoader
//           color="#121621"
//           style={{
//             height: "100vh",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         />
//       )}
//       <div className="container px-3 py-3">
//         <TableContainer component={Paper}>
//           <Table sx={{ minWidth: 700 }} aria-label="customized table">
//             <TableHead>
//               <TableRow>
//                 <StyledTableCell align="center">ID</StyledTableCell>
//                 <StyledTableCell align="center">FullName</StyledTableCell>
//                 <StyledTableCell align="center">Email</StyledTableCell>
//                 <StyledTableCell align="center">Phone</StyledTableCell>
//                 <StyledTableCell align="center">Gender</StyledTableCell>
//                 <StyledTableCell align="center">Role</StyledTableCell>
//                 <StyledTableCell align="center">Area</StyledTableCell>
//               </TableRow>
//             </TableHead>
//             <TableBody>
//                  {showdata.map((data, i) => (
//                 <StyledTableRow key={i}>
//                   <StyledTableCell align="center">{data.user_id}</StyledTableCell>
//                   <StyledTableCell align="center">{data.fullName}</StyledTableCell>
//                   <StyledTableCell align="center">{data.email}</StyledTableCell>
//                   <StyledTableCell align="center">{data.phone}</StyledTableCell>
//                   <StyledTableCell align="center">{data.gender}</StyledTableCell>
//                   <StyledTableCell align="center">{data.role}</StyledTableCell>
//                   <StyledTableCell align="center">{data.area}</StyledTableCell>
//                 </StyledTableRow>
//               ))}
//             </TableBody>
//           </Table>
//         </TableContainer>
//       </div>
//     </>
//   );
// };
// export default Hoc(Users);

import React, { useEffect, useState } from "react";
import { Hoc } from "../Components/Hoc";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { HashLoader } from "react-spinners";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getAdmindata, getAdmindatabyID, signup } from "../Redux/slices/Slices";
import { Container, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from 'react-bootstrap/Modal';
import { CSSTransition } from "react-transition-group";
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import TablePagination from '@mui/material/TablePagination';
import Swal from 'sweetalert2';
import { getAllAdminData } from "./api";


const Users = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [showdata, setshowdata] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [show, setShow] = useState(false);
  const [showadmindata, setshowadmindata] = useState('')
  const [smShow, setSmShow] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  console.log('===========================', showadmindata);
  console.log("data================>", showdata);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  },[]);


  const selector1 = useSelector((state) => state.NewsApi.getadmin);
  console.log("selector 1 =============>", selector1);

  const selector2 = useSelector((state) => state.NewsApi.getAdmindatabyID);
  console.log("selector 2 =============>", selector2);

  let token = localStorage.getItem("token");
  console.log("===================>", token);

  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().required('Required'),
  });
  
  const handleSubmit = (values, actions) => {
    console.log(values);
    actions.setSubmitting(false); // This line resets the form's submission state
    actions.resetForm();
    DeleteAdminDatabyID(values)
  };
  const auth = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
    
  //? GetAllloginAdmin Data showing in  all the user and admin this function and api ===================
  // useEffect(() => {
  //   const getAllAdmindata = async () => {
  //     try {
  //       let response = await axios.get("http://localhost:3000/api/admin/getAllUsers",auth);
  //       console.log(response.data);
  //       setshowdata(response.data);
  //       dispatch(getAdmindata(response.data));
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };
  //   getAllAdmindata();
  // }, [dispatch, token]);

  useEffect(() => {
    getAllAdminData(auth, setshowdata, dispatch);
  }, [dispatch, token]);


  //? ViewAdmindatabyID Data showing in own data ==================================

  const ViewAdmindatabyID = async (id) => {
    try {
      let response = await axios.get(
        `http://localhost:3000/api/admin/getuser/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data);
      dispatch(getAdmindatabyID(response.data));
      setshowadmindata(response.data)
    } catch (error) {
      console.log(error);
    }
    handleShow()
  };


  //? DeleteAdminDatabyID to delete the own Data ======================

  // const DeleteAdminDatabyID = async (id) => {
  //   console.log(id);
  //   try {
  //     const response = await axios.delete(`http://localhost:3000/api/user/delete/${id}`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  //   setSmShow(true)
  // }

  // const DeleteAdminDatabyID = async (id) => {
  //   let obj = {
  //     email: '',
  //     password: ''
  //   };
  //   console.log(id);
  //   try {
  //     const response = await axios.delete('http://localhost:3000/api/user/delete',{
  //       headers: {
  //         Authorization:`Bearer ${token}`,
  //         'Content-Type': 'application/json'
  //       },
  //       data:obj
  //     });
  //     console.log(response.data);
  //   } catch (error) {
  //     console.error(error);
  //   }
  //   Swal.fire({
  //     title: "Are you sure?",
  //     text: "You won't be able to revert this!",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonColor: "#3085d6",
  //     cancelButtonColor: "#d33",
  //     confirmButtonText: "Yes, delete it!"
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       Swal.fire({
  //         title: "Deleted!",
  //         text: "Your file has been deleted.",
  //         icon: "success"
  //       });
  //     }
  //   });
  //   setSmShow(false)
  // };



// const DeleteAdminDatabyID = async (id) => {
//   let obj = {
//     email: 'nynojybise@mailinator.com',
//     password: 'Pa$$w0rd!'
//   };
  
//   Swal.fire({
//     title: "Are you sure?",
//     text: "You won't be able to revert this!",
//     icon: "warning",
//     showCancelButton: true,
//     confirmButtonColor: "#3085d6",
//     cancelButtonColor: "#d33",
//     confirmButtonText: "Yes, delete it!"
//   }).then(async (result) => {
//     if (result.isConfirmed) {
//       try {
//         const response = await axios.delete('http://localhost:3000/api/user/delete', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//             'Content-Type': 'application/json'
//           },
//           data:obj
//         });
//         console.log(response.data);
//         console.log(response.data.result.message);
//         Swal.fire({
//           title: "Deleted!",
//           text: "Your file has been deleted.",
//           icon: "success"
//         });
//         getAllAdminData(auth, setshowdata, dispatch); //call the fuction fetching the data
//       } catch (error) {
//         console.error('============Error',error);
//         Swal.fire({
//           title: "Error!",
//           text: "There was an issue deleting your file.",
//           icon: "error"
//         });
//       }
//     }
//   });
//   setSmShow(false);
//  };

const DeleteAdminDatabyID = async (id, token, auth, setshowdata, dispatch) => {
  let obj = {
    email: '',
    password: ''
  };

  if (!token) {
    Swal.fire({
      title: "Error!",
      text: "Invalid token. Please log in again.",
      icon: "error"
    });
    return;
  }
  
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  }).then(async (result) => {
    if (result.isConfirmed) {
      try {
        const response = await axios.delete('http://localhost:3000/api/user/delete', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          data:obj
        });
        if (response.data.result && response.data.result.message) {
          console.log(response.data.result.message);

          if (response.data.result.message === "User not found") {
            Swal.fire({
              title: "Error!",
              text: "User not found.",
              icon: "error"
            });
          } else {
            Swal.fire({
              title: "Deleted!",
              text: response.data.result.message,
              icon: "success"
            });

            // Fetch all admin data after deletion
            getAllAdminData(auth, setshowdata, dispatch);
          }
        }
      } catch (error) {
        console.error('============Error', error);

        let errorMessage = "There was an issue deleting your file.";
        if (error.response) {
          if (error.response.status === 401) {
            errorMessage = "Invalid token. Please log in again.";
          } else if (error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
        }

        Swal.fire({
          title: "Error!",
          text: errorMessage,
          icon: "error"
        });
      }
    }
  });
  setSmShow(false);
};

  //? Style component to styling the table ===============================

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

  //? Search filter data functnality

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredData = showdata.filter((data) =>
    data.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  //? Modal Stying Starts Here ===========================================

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  //? Pagination function 
 const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      {isLoading && (
        <HashLoader
          color="#121621"
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",

          }}
        />
      )}
      <div className="responsive-container mt-5">
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow className="m-0 p-0">
                <StyledTableCell colSpan={7} align="right">
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
                </StyledTableCell>
              </TableRow>
              <TableRow>
                <StyledTableCell align="center">ID</StyledTableCell>
                <StyledTableCell align="center">FullName</StyledTableCell>
                <StyledTableCell align="center">Email</StyledTableCell>
                <StyledTableCell align="center">Phone</StyledTableCell>
                <StyledTableCell align="center">Gender</StyledTableCell>
                <StyledTableCell align="center">Role</StyledTableCell>
                <StyledTableCell align="center">Action</StyledTableCell>
                {/* <StyledTableCell align="center">Area</StyledTableCell> */}
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
                  <StyledTableCell align="center">{data.email}</StyledTableCell>
                  <StyledTableCell align="center">{data.phone}</StyledTableCell>
                  <StyledTableCell align="center">
                    {data.gender}
                  </StyledTableCell>
                  <StyledTableCell align="center">{data.role}</StyledTableCell>
                  <StyledTableCell align="center">
                    {data.role !== "admin" && <EditIcon
                      className="text-primary me-1"
                      style={{ cursor: "pointer" }}
                    />}
                    <VisibilityIcon
                      className="ms-1"
                      style={{ cursor: "pointer" }}
                      onClick={() => ViewAdmindatabyID(data.user_id)}
                    />
                    {/* <DeleteIcon
                      className="ms-1 text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={()=>setSmShow(true)}
                    /> */}
                  </StyledTableCell>
                  {/* <StyledTableCell align="center">{data.area}</StyledTableCell> */}
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


        {/* Modal Starts Here  */}
        <div>
           <CSSTransition
            in={show}
            timeout={500}
            classNames="modal"
            unmountOnExit
          >
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>User Data</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <div className="d-flex justify-content-evenly px-2 py-2 main-container mt-3">
                  <div className="">
                    <div className="mb-3 fs-6">ID</div>
                    <div className="mb-3 fs-6">Full Name</div>
                    <div className="mb-3 fs-6">Email</div>
                    <div className="mb-3 fs-6">Phone</div>
                    <div className="mb-3 fs-6">Gender</div>
                    <div className="mb-3 fs-6">Role</div>
                  </div>
                  <div className="">
                    <div className="mb-3 fs-6">{showadmindata?.user_id}</div>
                    <div className="mb-3 fs-6">{showadmindata?.fullName}</div>
                    <div className="mb-3 fs-6">{showadmindata?.email}</div>
                    <div className="mb-3 fs-6">{showadmindata?.phone}</div>
                    {console.log('=============>',showadmindata?.phone)}
                    <div className="mb-3 fs-6">{showadmindata?.gender}</div>
                    <div className="mb-3 fs-6">{showadmindata?.role}</div>
                  </div>
                </div>
              </Modal.Body>
             
            </Modal>
          </CSSTransition>

          {/* username or passwor modal starts here */}

          {/* <Modal
            size="sm"
            show={smShow}
            onHide={() => setSmShow(false)}
            aria-labelledby="example-modal-sizes-title-sm"
          >
            <Modal.Header closeButton></Modal.Header>
            <Modal.Body>
              <div className="d-flex justify-content-center align-items-center  flex-column mt-3">

                <form>
                  <div className="mb-3">
                    <TextField
                      label="Username"
                      variant="outlined"
                      type="text"
                      name='email'
                   
                    />
                  </div>
                  <div>

                    <TextField
                      label="Password"
                      type="password"
                      variant="outlined"
                      name='password'

                    />
                  </div>
                  <div className="text-center mt-3">
                    <button className="btn btn-danger" type="button">Delete</button>
                  </div>
                </form>
              </div>

            </Modal.Body>
          </Modal> */}

        <Modal
          size="sm"
          show={smShow}
          onHide={() => setSmShow(false)}
          aria-labelledby="example-modal-sizes-title-sm"
        >
          <Modal.Header closeButton>
            <Modal.Title>Username & Password</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center  flex-column mt-1">
              <Formik
                initialValues={{
                  email: '',
                  password: ''
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="mb-3">
                      <Field
                        as={TextField}
                        label="Username"
                        variant="outlined"
                        type="email"
                        name="email"
                        error={errors.email && touched.email}
                        helperText={touched.email && errors.email}
                      />
                    </div>
                    <div className="mb-3">
                      <Field
                        as={TextField}
                        label="Password"
                        variant="outlined"
                        type="password"
                        name="password"
                        error={errors.password && touched.password}
                        helperText={touched.password && errors.password}
                      />
                    </div>
                    <div className="text-center mt-3">
                      <Button variant="contained" color="primary" type="submit" onClick={ DeleteAdminDatabyID(1, token, auth, setshowdata, dispatch)}>
                        Delete
                      </Button>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </Modal.Body>
        </Modal>
        </div>
      </div>
    </>
  );
};
export default Hoc(Users);
