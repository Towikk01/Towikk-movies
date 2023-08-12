import { configureStore } from "@reduxjs/toolkit";
import filmsReducer from './filmSlice';


const store = configureStore({
  reducer: {
    films: filmsReducer
  }
})


export default store