import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import customApi from "../utils/axios";
import { saveToken } from "../utils/localStorage";
import axios from 'axios';

const initialState = {
  user: [],
  currentUser: JSON.parse(localStorage.getItem('currentUser')) ?? null,
  isAuthenticated: JSON.parse(localStorage.getItem('isAuthenticated')) ?? false,
  isLoading: false,
  error: null,
}

const url = 'http://localhost:3000/api/v1/users';

const makeApiCall = async (endpoint, user, thunkAPI) => {
  try {
    const response = await customApi.post(endpoint, user);

    const data = await response.data;

    const token = response.headers['authorization'];

    if (response.status === 201 || response.status === 200) {
      saveToken(token)
      return { user: data };
    }

  } catch (error) {
    if (error.response && (error.response.status === 401 || error.response.status === 422)) {
      return thunkAPI.rejectWithValue(error.response.data.errors[0]);
    }
    return thunkAPI.rejectWithValue(error.response?.data.errors || "Unknown error");
  }
};

const registerUser = createAsyncThunk(
  'user/registerUser',
  async (user, thunkAPI) => makeApiCall('/auth', user, thunkAPI)
);

const logInUser = createAsyncThunk(
  'user/logInUser',
  async (user, thunkAPI) => makeApiCall('/auth/sign_in', user, thunkAPI)
);

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios(url)
      return response.data
      // console.log('API response:', response.data)
    } catch (err) {
      return rejectWithValue('Unable to fetch users')
    }
  }
);

export const createUser = createAsyncThunk(
  'users/createUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(url, userData)
      localStorage.setItem('currentUser', JSON.stringify(response.data))
      localStorage.setItem('isAuthenticated', true)
      return response.data
    } catch (err) {
      return rejectWithValue('Unable to create user')
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    clearError: (state) => ({
      ...state,
      error: null,
    }),
  },

  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user.data
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })

      .addCase(logInUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(logInUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = true
        state.user = action.payload.user.data
      })
      .addCase(logInUser.rejected, (state, action) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = null
        state.error = action.payload
      })

      .addCase(getUsers.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(getUsers.fulfilled, (state, { payload }) => ({
        ...state,
        user: payload,
        isLoading: false,
      }))
      .addCase(getUsers.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))

      .addCase(createUser.pending, (state) => ({
        ...state,
        isLoading: true,
      }))
      .addCase(createUser.fulfilled, (state, { payload }) => ({
        ...state,
        user: [...state.users, payload], // Add the created user to the existing list
        currentUser: payload,
        isAuthenticated: true,
        isLoading: false,
      }))
      .addCase(createUser.rejected, (state, { payload }) => ({
        ...state,
        isLoading: false,
        error: payload,
      }))
  },
})

export const { clearError } = userSlice.actions
export { registerUser, logInUser };
export default userSlice.reducer;