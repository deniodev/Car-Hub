import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import carsReducer from './CarsSlice';
import reservationsReducer from './ReservationsSlice';

const store = configureStore({
  reducer: {
    user: userReducer,
    cars: carsReducer,
    reservations: reservationsReducer,
  },
});

export default store;
