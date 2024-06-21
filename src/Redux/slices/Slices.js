import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user:[],
    status:'idle',
    error: null,
    login:[],
    currantuser: null,
    getadmin:[],
    getAdmindatabyID:[]
};
const NewsSlices = createSlice({
    name: 'TOS',
    initialState,
    reducers: {
        signup:(state, action) => {
            console.log("action.payload: " + JSON.stringify(action.payload));
            state.user.push(action.payload);
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
            state.status ='succeeded';
            state.error = null;     
        },
        getAdmindatabyID:(state,action)=>{
            state.getAdmindatabyID = action.payload;
            state.status ='succeeded';
            state.error = null;
        }
    }
});

export const { signup,login,getAdmindata,getAdmindatabyID} = NewsSlices.actions;
export default NewsSlices.reducer;




