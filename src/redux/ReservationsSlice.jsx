import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

export const fetchReservations = createAsyncThunk(
    'reservations/fetchReservations',
    async () => {
        const response = await axios.get('https://reservation-api-3po5.onrender.com/api/v1/reservations')
        return response.data
    }
)

export const postReservation = createAsyncThunk('reservations/postReservation',async (reservation) => {
       try {
        const response = await axios.post('https://reservation-api-3po5.onrender.com/api/v1/reservations', reservation)
        return response.data
       } catch (error) {
           console.log(error)
       }
    }
)

const initialState = {
    reservations: [],
    loading: false,
    hasErrors: false,
}

const reservationsSlice = createSlice({
    name: 'reservations',
    initialState,
    reducers: {
        addReservation: (state, action) => {
            const reservationItem = action.payload
            state.reservations.push(reservationItem)
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchReservations.pending, (state) => {
                state.loading = true
            })
            .addCase(fetchReservations.fulfilled, (state, { payload }) => {
                state.reservations = payload
                state.loading = false
                state.hasErrors = false
            })
            .addCase(fetchReservations.rejected, (state) => {
                state.loading = false
                state.hasErrors = true
            })
            .addCase(postReservation.pending, (state) => {
                state.loading = true
            })
            .addCase(postReservation.fulfilled, (state, { payload }) => {
                state.reservations.push(payload)
                state.loading = false
                state.hasErrors = false
            })
            .addCase(postReservation.rejected, (state) => {
                state.loading = false
                state.hasErrors = true
            })

    }
})

export const { addReservation } = reservationsSlice.actions
export default reservationsSlice.reducer