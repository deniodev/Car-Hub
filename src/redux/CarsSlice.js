import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const initialState = {
  cars: [],
  isLoading: true,
  err: true,
  // errMsg: '',
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

// const getCars = createAsyncThunk('cars/getCars', async (thunkAPI) => {
//   try {
//     const resp = await axios.get(url)
//     // console.log('API response:', response.data)
//     return resp.data
//   } catch (e) {
//     // console.error('API error:', e)
//     return thunkAPI.rejectWithValue({ error: e.message })
//   }
// })

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
  }
})

export default carsSlice.reducer;
