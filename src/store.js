import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./redux/appreducer";

export const store = configureStore({
    reducer: {
        conter: appReducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false
    }), 
   
  
})