import { configureStore } from "@reduxjs/toolkit";
import NewsReducer from '../slices/Slices'

export default configureStore({
    reducer:{
       NewsApi:NewsReducer 
    }
})
