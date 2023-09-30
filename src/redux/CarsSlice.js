import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cars: [],
  isLoading: true,
  err: true,
  carDetails: {},
  hasErrors: false,
};

const url = 'http://localhost:3000/api/v1/cars';

export const getCars = createAsyncThunk(
  'cars/getCars',
  async (_, { rejectWithValue }) => {
    try {
      const resp = await axios(url);
      return resp.data;
    } catch (e) {
      return rejectWithValue('unable to access data');
    }
  }
);

export const delCarItems = createAsyncThunk(
  'cars/delCarItems',
  async (car, thunkAPI) => {
    try {
      const resp = await axios.delete(`${url}/${car}`);
      resp.data = car;
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

// export const updateCarItem = createAsyncThunk(
//   'cars/updateCarItem',
//   async (car, thunkAPI) => {
//     try {
//       const response = await axios.put(`${url}/${car.id}`, car.updatedData);
//       return { id: car.id, updatedData: response.data }
//       // return response.data
//     } catch (error) {
//       return thunkAPI.rejectWithValue(error)
//     }
//   }
// )

export const fetchCarDetails = createAsyncThunk(
  'carDetails/fetchCarDetails',

  async (id) => {
    try {
      const response = await axios.get(`${url}/${id}`);
      return response.data;
    } catch (error) {
      return error.message;
    }
  }
);

export const createCars = createAsyncThunk(
  'cars/createCars',
  async (carData, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, carData);
      return response.data;
    } catch (err) {
      return rejectWithValue('Unable to create car');
    }
  }
);

const carsSlice = createSlice({
  name: 'cars',
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(getCars.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getCars.fulfilled, (state, { payload }) => ({
        ...state,
        cars: payload,
        isLoading: false,
      }))
      .addCase(getCars.rejected, (state, { payload }) => ({
        ...state,
        cars: payload,
        isLoading: false,
      }))

      .addCase(fetchCarDetails.pending, (state) => {
        state.isLoadingloading = true
      })
      .addCase(fetchCarDetails.fulfilled, (state, { payload }) => {
        state.carDetails = payload
        state.isLoading = false
        state.hasErrors = false
      })
      .addCase(fetchCarDetails.rejected, (state) => {
        state.isLoading = false
        state.hasErrors = true
      })
      .addCase(createCars.fulfilled, (state, { payload }) => ({
        ...state,
        cars: [...state.cars, payload], // Add the created car to the existing list
        isLoading: false,
      }))
      .addCase(createCars.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))

      .addCase(delCarItems.fulfilled, (state, { payload }) => ({
        ...state,
        cars: [...state.cars.filter((car) => car.id !== payload)],
        isLoading: false,
      }))
      .addCase(delCarItems.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))

      // .addCase(updateCarItem.fulfilled, (state, { payload }) => ({
      // ...state,
      // cars: state.cars.map((car) =>
      //   car.id === payload.id ? { ...car, ...payload.updatedData } : car
      // ),
      // isLoading: false,
      // }))
      // .addCase(updateCarItem.rejected, (state, { payload }) => ({
      //   ...state,
      //   isLoading: false,
      //   error: payload,
      // }));

      // .addCase(updateCarItem.fulfilled, (state, { payload }) => {
      //   // Find the index of the updated car in the cars array
      //   const updatedCarIndex = state.cars.findIndex(
      //     (car) => car.id === payload.id
      //   )

      //   // Create a new array of cars with the updated car data
      //   const updatedCars = [...state.cars]
      //   updatedCars[updatedCarIndex] = {
      //     ...updatedCars[updatedCarIndex],
      //     ...payload.updatedData,
      //   }

      //   return {
      //     ...state,
      //     cars: updatedCars,
      //     isLoading: false,
      //   }
      // })
      // .addCase(updateCarItem.rejected, (state, { payload }) => ({
      //   ...state,
      //   isLoading: false,
      //   error: payload,
      // }))

  },
});

// export const { deleteItem } = carsSlice.actions;
export default carsSlice.reducer;
