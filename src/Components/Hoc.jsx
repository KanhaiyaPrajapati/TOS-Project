// import React, { useEffect, useState } from "react";
// import { Drawer, IconButton, InputBase } from "@mui/material";
// import { styled, alpha } from "@mui/material/styles";
// import { NavLink } from "react-router-dom";
// import DashboardIcon from "@mui/icons-material/Dashboard";
// import AccountCircleIcon from "@mui/icons-material/AccountCircle";
// import FeedIcon from "@mui/icons-material/Feed";
// import MenuIcon from "@mui/icons-material/Menu";
// import img1 from "../Images/avatar_25.jpg";
// import logo from "../Images/logo.png";
// import useMediaQuery from "@mui/material/useMediaQuery";
// import SearchIcon from "@mui/icons-material/Search";
// import LogoutIcon from "@mui/icons-material/Logout";
// import Box from "@mui/material/Box";
// import Avatar from "@mui/material/Avatar";
// import Menu from "@mui/material/Menu";
// import MenuItem from "@mui/material/MenuItem";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import Divider from "@mui/material/Divider";
// import Tooltip from "@mui/material/Tooltip";
// import Settings from "@mui/icons-material/Settings";
// import HomeIcon from "@mui/icons-material/Home";
// import { useSelector } from "react-redux";
// import axios from "axios";

// // Custom styled components for the search bar
// const Search = styled("div")(({ theme }) => ({
//   position: "relative",
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.black, 0.15),
//   "&:hover": {
//     backgroundColor: alpha(theme.palette.common.black, 0.25),
//   },
//   marginRight: theme.spacing(2),
//   marginLeft: 0,
//   width: "100%",
//   [theme.breakpoints.up("sm")]: {
//     marginLeft: theme.spacing(3),
//     width: "auto",
//   },
// }));

// const SearchIconWrapper = styled("div")(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: "100%",
//   position: "absolute",
//   pointerEvents: "none",
//   display: "flex",
//   alignItems: "center",
//   justifyContent: "center",
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: "inherit",
//   "& .MuiInputBase-input": {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create("width"),
//     width: "100%",
//     [theme.breakpoints.up("md")]: {
//       width: "20ch",
//     },
//   },
// }));

// let token = localStorage.getItem("token");
// export const Hoc = (Component) => {
//   const NewComponent = () => {
//     const [anchorEl, setAnchorEl] = React.useState(null);
//     const [showfullname, setshowfullname] = useState('');
//     const [email, setemail] = useState('')
//     const open = Boolean(anchorEl);
    
//     const handleClick = (event) => {
//       setAnchorEl(event.currentTarget);
//     };
    
//     const handleClose = () => {
//       setAnchorEl(null);
//     };

//     const [drawerOpen, setDrawerOpen] = useState(false);
//     const isMobile = useMediaQuery("(max-width: 768px)");

//     const toggleDrawer = () => {
//       setDrawerOpen(!drawerOpen);
//     };

//     useEffect(() => {
//       const auth = {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       };
//         const getuserdata = async () => {
//         try {
//           let response = await axios.get(
//             "http://localhost:3000/api/user/userdata/",
//             auth
//           );
//           console.log('getuserdata====================>', response.data.message);
//           setshowfullname(response.data.message.fullName)
//           setemail(response.data.message.email)
//         } catch (error) {
//           console.log("Error fetching user data:", error);
//         }
//       };
//       getuserdata(); 
//       }, []);

//     return (
//       <div className="dashboard-container">
//         {isMobile ? (
//           <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
//             <div className="sidebar">
//               <div className="logo">
//                 <h2>
//                   <img
//                     src={logo}
//                     className="bg-white"
//                     alt=""
//                     height={28}
//                     width={32}
//                   />{" "}
//                   TOS
//                 </h2>
//               </div>
//               <div className="sidebar-menu">
//                 <div className="menu-item">
//                   <NavLink to="/dashboard" onClick={toggleDrawer}>
//                     <span>
//                       <DashboardIcon />
//                       Dashboard
//                     </span>
//                   </NavLink>
//                 </div>
//                 <div className="menu-item">
//                   <NavLink to="/user" onClick={toggleDrawer}>
//                     <span>
//                       <AccountCircleIcon /> Users
//                     </span>
//                   </NavLink>
//                 </div>
//                 <div className="menu-item">
//                   <NavLink to="/newsfeed" onClick={toggleDrawer}>
//                     <span>
//                       <FeedIcon /> NewsFeed
//                     </span>
//                   </NavLink>
//                 </div>
//               </div>
//             </div>
//           </Drawer>
//         ) : (
//           <div className="sidebar">
//             <div className="logo">
//               <h2>
//                 <img
//                   src={logo}
//                   className="bg-white"
//                   alt=""
//                   height={28}
//                   width={32}
//                 />{" "}
//                 TOS
//               </h2>
//             </div>
//             <div className="sidebar-menu">
//               <h6 className=" text-white ms-3 mb-4">Main Menu</h6>
//               <div className="menu-item">
//                 <NavLink to="/dashboard">
//                   <span>
//                     <DashboardIcon className="icons" />
//                     Dashboard
//                   </span>
//                 </NavLink>
//               </div>
//               <div className="menu-item">
//                 <NavLink to="/user">
//                   <span>
//                     <AccountCircleIcon />Users
//                   </span>
//                 </NavLink>
//               </div>
//               <div className="menu-item">
//                 <NavLink to="/newsfeed">
//                   <span>
//                     <FeedIcon />
//                     NewsFeed
//                   </span>
//                 </NavLink>
//               </div>
//             </div>
//           </div>
//         )}
//         <div className="main-content">
//           <div className="header d-flex justify-content-between px-lg-5 px-sm-0">
//             {isMobile ? (
//               <IconButton onClick={toggleDrawer}>
//                 <MenuIcon />
//               </IconButton>
//             ) : (
//               <Search>
//                 <SearchIconWrapper>
//                   <SearchIcon />
//                 </SearchIconWrapper>
//                 <StyledInputBase
//                   placeholder="Search…"
//                   inputProps={{ "aria-label": "search" }}
//                 />
//               </Search>
//             )}
//             <Box
//               sx={{
//                 display: "flex",
//                 alignItems: "center",
//                 textAlign: "center",
//               }}
//             >
//               <Tooltip title="Account settings">
//                 <IconButton
//                   onClick={handleClick}
//                   size="small"
//                   sx={{ ml: 2, }}
//                   aria-controls={open ? "account-menu" : undefined}
//                   aria-haspopup="true"
//                   aria-expanded={open ? "true" : undefined}
//                 >
//                   <Avatar sx={{ width: 45, height: 45 }}>
//                     <div className="profile-menu">
//                       <img
//                         src={img1}
//                         alt=""
//                         className="img-fluid rounded-pill"
//                         width={40}
//                         height={40}
//                       />
//                     </div>
//                   </Avatar>
//                 </IconButton>
//               </Tooltip>
//             </Box>
//             <Menu
//               anchorEl={anchorEl}
//               id="account-menu"
//               open={open}
//               onClose={handleClose}
//               onClick={handleClose}
//               PaperProps={{
//                 elevation: 0,
//                 sx: {
//                   overflow: "visible",
//                   filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
//                   mt: 1.5,
                  
//                   // maxWidth:100,
//                   // maxHeight:100,
//                   "& .MuiAvatar-root": {
//                     width: 32,
//                     height: 32,
//                     ml: -0.5,
//                     mr: 1,
//                   },
//                   "&::before": {
//                     content: '""',
//                     display: "block",
//                     position: "absolute",
//                     top: 0,
//                     right: 14,
//                     width: 10,
//                     height: 10,
//                     bgcolor: "background.paper",
//                     transform: "translateY(-50%) rotate(45deg)",
//                     zIndex: 0,
//                   },
//                 },
//               }}
//               transformOrigin={{ horizontal: "right", vertical: "top" }}
//               anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
//             >
//               <MenuItem onClick={handleClose}>
//               {showfullname} <br />
//               {email}
//               </MenuItem>
//               <Divider />
//               <MenuItem onClick={handleClose}>
//                 <HomeIcon
//                   className="me-3"
//                   style={{ color: "#bdbdbd", fontSize: "23px" }}
//                 />
//                 Home
//               </MenuItem>
//               <MenuItem onClick={handleClose}>
//                 <AccountCircleIcon
//                   className="me-3"
//                   style={{ color: "rgb(0 0 0 / 54%)" }}
//                 />
//                 Profile
//               </MenuItem>
//               <NavLink
//                 to="/resetpassword"
//                 style={{
//                   textDecoration: "none",
//                   color: "#212636",
//                 }}
//               >
//                 <MenuItem onClick={handleClose}>
//                   <ListItemIcon>
//                     <Settings fontSize="small" />
//                   </ListItemIcon>
//                   Settings
//                 </MenuItem>
//               </NavLink>
//               <Divider />
//               <NavLink
//                 to="/login"
//                 style={{
//                   color: "red",
//                   textDecoration: "none",
//                   marginLeft: "7px",
//                 }}
//               >
//                 <MenuItem onClick={handleClose}>
//                   <LogoutIcon />
//                   <span className="ms-1">Logout</span>
//                 </MenuItem>
//               </NavLink>
//               <Divider />
//             </Menu>
//           </div>
//           <div className="content">
//             <Component />
//           </div>
//         </div>
//       </div>
//     );
//   };
//   return NewComponent;
// };

import React, { useEffect, useState } from "react";
import { Drawer, IconButton, InputBase } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { NavLink } from "react-router-dom";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FeedIcon from "@mui/icons-material/Feed";
import MenuIcon from "@mui/icons-material/Menu";
import img1 from "../Images/avatar_25.jpg";
import logo from "../Images/logo.png";
import useMediaQuery from "@mui/material/useMediaQuery";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import Tooltip from "@mui/material/Tooltip";
import Settings from "@mui/icons-material/Settings";
import HomeIcon from "@mui/icons-material/Home";
import { useSelector } from "react-redux";
import axios from "axios";
import { TreeView, TreeItem } from "@mui/lab";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Dashboardicon from '../Images/dashboard4.png';
import reporter from '../Images/reporter.png';
;

// Custom styled components for the search bar
const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

let token = localStorage.getItem("token");
export const Hoc = (Component) => {
  const NewComponent = () => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [showfullname, setshowfullname] = useState('');
    const [email, setemail] = useState('')
    const open = Boolean(anchorEl);
    
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
      setAnchorEl(null);
    };

    const [drawerOpen, setDrawerOpen] = useState(false);
    const isMobile = useMediaQuery("(max-width: 768px)");

    const toggleDrawer = () => {
      setDrawerOpen(!drawerOpen);
    };

    useEffect(() => {
      const auth = {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      };
        const getuserdata = async () => {
        try {
          let response = await axios.get(
            "http://localhost:3000/api/user/userdata/",
            auth
          );
          console.log('getuserdata====================>', response.data.message);
          setshowfullname(response.data.message.fullName)
          setemail(response.data.message.email)
        } catch (error) {
          console.log("Error fetching user data:", error);
        }
      };
      getuserdata(); 
      }, []);

    return (
      <div className="dashboard-container">
        {isMobile ? (
          <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
            <div className="sidebar">
              <div className="logo">
                <h2>
                  <img
                    src={logo}
                    className="bg-white"
                    alt=""
                    height={28}
                    width={32}
                  />{" "}
                  TOS
                </h2>
              </div>
              <div className="sidebar-menu">
                <div className="menu-item">
                  <NavLink to="/dashboard" onClick={toggleDrawer}>
                    <span>
                      <DashboardIcon />
                      <img src="" alt="" srcset="" />
                      Dashboard
                    </span>
                  </NavLink>
                </div>
                <div className="menu-item">
                  <NavLink to="/user" onClick={toggleDrawer}>
                    <span>
                      <AccountCircleIcon /> Users
                    </span>
                  </NavLink>
                </div>
                
                <div className="menu-item">
                  <NavLink to="/subadmin" onClick={toggleDrawer}>
                    <span>
                      <FeedIcon /> SubAdmin
                    </span>
                  </NavLink>
                </div>
                <div className="menu-item">
                  <NavLink to="/reporter" onClick={toggleDrawer}>
                    <span>
                      <FeedIcon /> Reporter
                    </span>
                  </NavLink>
                </div>
                <div className="menu-item">
                  <NavLink to="/newsfeed" onClick={toggleDrawer}>
                    <span>
                      <FeedIcon /> NewsFeed
                    </span>
                  </NavLink>
                </div>
              </div>
            </div>
          </Drawer>
        ) : (
          <div className="sidebar">
            <div className="logo">
              <h2>
                <img
                  src={logo}
                  className="bg-white"
                  alt=""
                  height={28}
                  width={32}
                />{" "}
                TOS
              </h2>
            </div>
            <div className="sidebar-menu">
              <h6 className=" text-white ms-3 mb-4">Main Menu</h6>
              <div className="menu-item">
                <NavLink to="/dashboard">
                  <span>
                    {/* <DashboardIcon className="icons" /> */}
                    <img src={Dashboardicon} alt="" className="img-fluid me-1" height={20} width={20} />
                    Dashboard
                  </span>
                </NavLink>
              </div>
              <div className="menu-item">
                <NavLink to="/user">
                  <span>
                    <AccountCircleIcon />Users
                  </span>
                </NavLink>
              </div>
              
              <div className="menu-item">
                <NavLink to="/subadmin">
                  <span>
                  <AccountCircleIcon />
                    SubAdmin
                  </span>
                </NavLink>
              </div>
              <div className="menu-item">
                <NavLink to="/reporter">
                  <span>
                    {/* <FeedIcon /> */}
                    {/* <img src={reporter} alt="" height={20} width={20} style={{color:'black'}} /> */}
                    <AccountCircleIcon />
                    Reporter
                  </span>
                </NavLink>
              </div>
              <div className="menu-item">
                <NavLink to="/newsfeed">
                  <span>
                    <FeedIcon />
                    NewsFeed
                  </span>
                </NavLink>
              </div>
            </div>
          </div>
        )}
        <div className="main-content">
          <div className="header d-flex justify-content-between px-lg-5 px-sm-0">
            {isMobile ? (
              <IconButton onClick={toggleDrawer}>
                <MenuIcon />
              </IconButton>
            ) : (
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            )}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              <Tooltip title="Account settings">
                <IconButton
                  onClick={handleClick}
                  size="small"
                  sx={{ ml: 2, }}
                  aria-controls={open ? "account-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}>
                  <Avatar sx={{ width: 45, height: 45 }}>
                    <div className="profile-menu">
                      <img
                        src={img1}
                        alt=""
                        className="img-fluid rounded-pill"
                        width={40}
                        height={40}
                      />
                    </div>
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Box>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: "visible",
                  filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                  mt: 1.5,
                  "& .MuiAvatar-root": {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  "&::before": {
                    content: '""',
                    display: "block",
                    position: "absolute",
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: "background.paper",
                    transform: "translateY(-50%) rotate(45deg)",
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: "right", vertical: "top" }}
              anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
              <MenuItem onClick={handleClose}>
              {showfullname} <br />
              {email}
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleClose}>
                <HomeIcon
                  className="me-3"
                  style={{ color: "#bdbdbd", fontSize: "23px" }}
                />
                Home
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <AccountCircleIcon
                  className="me-3"
                  style={{ color: "rgb(0 0 0 / 54%)" }}
                />
                Profile
              </MenuItem>
              <NavLink
                to="/resetpassword"
                style={{
                  textDecoration: "none",
                  color: "#212636",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
              </NavLink>
              <Divider />
              <NavLink
                to="/login"
                style={{
                  color: "red",
                  textDecoration: "none",
                  marginLeft: "7px",
                }}
              >
                <MenuItem onClick={handleClose}>
                  <LogoutIcon />
                  <span className="ms-1">Logout</span>
                </MenuItem>
              </NavLink>
              <Divider />
            </Menu>
          </div>
          <div className="content">
            <Component />
          </div>
        </div>
      </div>
    );
  };
  return NewComponent;
};


