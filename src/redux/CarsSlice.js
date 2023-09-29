import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  cars: [],
  isLoading: true,
  err: true,
  carDetails: {},
  hasErrors: false,
};

const url = 'http://localhost:3000/api/v1/cars';

export const getCars = createAsyncThunk('cars/getCars', async (_, { rejectWithValue }) => {
  try {
    const resp = await axios(url);
    return resp.data;
  } catch (e) {
    return rejectWithValue('unable to access data')
  }
});

export const fetchCarDetails = createAsyncThunk(
  'carDetails/fetchCarDetails',
  // async (id) => {
  //     const response = await axios.getaxios.get(`${url}/${id}`)
  //     return response.data
  // }

  async (id) => {
    try {
      const response = await axios.get(`${url}/${id}`)
      return response.data
    } catch (error) {
      return error.message
    }
  }
)

export const createCars = createAsyncThunk(
  'cars/createCars',
  async (carData, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, carData)
      return response.data
    } catch (err) {
      return rejectWithValue('Unable to create car')
    }
  }
)

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
  }
})

export default carsSlice.reducer;
