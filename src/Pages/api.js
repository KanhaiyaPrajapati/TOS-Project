import axios from "axios";
import { getAdmindata, getReporterdata, getSubAdmindata } from "../Redux/slices/Slices";


//Show All USer like Admin,subadmin,reporter etc.
export const getAllAdminData = async (auth, setshowdata,dispatch) => {
    try {
      let response = await axios.get("http://localhost:3000/api/admin/getAllUsers", auth);
      console.log(response.data);
      setshowdata(response.data);
      dispatch(getAdmindata(response.data));
    } catch (error) {
      console.log(error);
    }
  };



//Only Show SubAdmin DATA

  export const getAllAdminDataSubAdmin = async (auth, setShowSubadminData,dispatch) => {
    try {
      let response = await axios.get("http://localhost:3000/api/admin/getAllUsers", auth);
      const data = response.data;
      let Subadminuser = data.filter((x)=>x.role === 'subadmin')
      console.log('Subadminuser=========>',Subadminuser);
      setShowSubadminData(Subadminuser);
      dispatch(getSubAdmindata(Subadminuser))
      } catch (error) {
      console.log(error);
    }
  };


  //only Show Reporter DATA

  export const getAllAdminReporterData = async (auth, setShowReporterData,dispatch) => {
    try {
      let response = await axios.get("http://localhost:3000/api/admin/getAllUsers",auth)
      const data = response.data;
      let Reporteruser= data.filter((x)=>x.role === 'reporter')
      console.log('Reporteruser=========>',Reporteruser);
      setShowReporterData(Reporteruser)
      dispatch(getReporterdata(Reporteruser))
      } catch (error) {
      console.log(error);
    }
  }


  



  