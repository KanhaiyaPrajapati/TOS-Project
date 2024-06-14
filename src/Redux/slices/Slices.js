import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    item:['krishna prajapati']
}

const NewsSlices= createSlice({
    name:'TOS',
    initialState,
    reducers:{
        signup:((state,action)=>{
            return state;
        })
    }

})

export const {signup} = NewsSlices.actions;
export default NewsSlices.reducer;