import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    Signupuser:[],
    status:'idle',
    error: null,
    login:[],
    getadmin:[],
    getAdmindatabyID:[],
    getSubADminData:[],
    getReporterData:[]
};
const NewsSlices = createSlice({
    name: 'TOS',
    initialState,
    reducers: {
        signup:(state, action) => {
            console.log("action.payload: " + JSON.stringify(action.payload));
            state.Signupuser.push(action.payload);
            state.status = 'succeeded';
            state.error = null;
        },
        login:(state,action)=>{
            console.log("action.payload: " + JSON.stringify(action.payload));
            state.login = action.payload;
            state.status='succeeded';
            state.error=null;
        },
        getAdmindata:(state,action)=>{
            state.getadmin = action.payload;
            console.log("action.payload: " + JSON.stringify(action.payload));
            state.status ='succeeded';
            state.error = null;     
        },
        getAdmindatabyID:(state,action)=>{
            state.getAdmindatabyID = action.payload;
            state.status ='succeeded';
            state.error = null;
        },
        getSubAdmindata:(state,action)=>{
            state.getSubADminData = action.payload;
            state.status ='succeeded';
            state.error = null;
        },
        getReporterdata:(state,action)=>{
            state.getReporterData = action.payload;
            state.status ='succeeded';
            state.error = null;
        }
    }
});

export const { signup,login,getAdmindata,getAdmindatabyID,getSubAdmindata,getReporterdata} = NewsSlices.actions;
export default NewsSlices.reducer;




