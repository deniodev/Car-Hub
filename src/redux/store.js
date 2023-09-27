import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import carsReducer from './CarsSlice';


const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carsReducer,
  }
});

export default store;