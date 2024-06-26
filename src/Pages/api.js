import axios from "axios";
import { getAdmindata } from "../Redux/slices/Slices";

export const getAllAdminData = async (auth, setshowdata,setShowSubadminData,dispatch) => {
    try {
      let response = await axios.get("http://localhost:3000/api/admin/getAllUsers", auth);
      console.log(response.data);
      setshowdata(response.data);
      setShowSubadminData(response.data);
      dispatch(getAdmindata(response.data));
    } catch (error) {
      console.log(error);
    }
  };



  