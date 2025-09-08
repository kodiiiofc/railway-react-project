import {createSlice, type PayloadAction} from '@reduxjs/toolkit';

export interface Booking {
    tripType: 'Round trip' | 'One way';
    persons: number;
    departure?: string;
    arrival?: string;
    departDate?: string;
    returnDate?: string;
}

interface BookingState {
    booking: Booking
}

const initialState: BookingState = {
    booking: {
        tripType: 'Round trip',
        persons: 1,
        departure: undefined,
        arrival: undefined,
        departDate: undefined,
        returnDate: undefined,
    }
}

const bookingSlice = createSlice({
    name: 'booking',
    initialState,
    reducers: {
        setTripType: (state, action: PayloadAction<"Round trip" | "One way">) => {
            state.booking.tripType = action.payload;
            updateSessionStorage(state)
            if (state.booking.tripType === "One way") {
                state.booking.returnDate = undefined;
            }
        },
        setPersonsCount: (state, action: PayloadAction<number>) => {
            state.booking.persons = action.payload;
            updateSessionStorage(state);
        },
        setDeparture: (state, action: PayloadAction<string>) => {
            state.booking.departure = action.payload;
            updateSessionStorage(state);
        },
        setArrival: (state, action: PayloadAction<string>) => {
            state.booking.arrival = action.payload;
            updateSessionStorage(state);
        },
        setDepartDate: (state, action: PayloadAction<string | undefined>) => {
            state.booking.departDate = action.payload;
            updateSessionStorage(state);
        },
        setReturnDate: (state, action: PayloadAction<string | undefined>) => {
            state.booking.returnDate = action.payload;
            updateSessionStorage(state);
        },
        switchDates: (state) => {
            const temp = state.booking.departDate
            state.booking.departDate = state.booking.returnDate;
            state.booking.returnDate = temp;
        },
        setBookingState: (state, action: PayloadAction<Booking>) => {
            state.booking = action.payload;
            updateSessionStorage(state);
        }
    }
})

export const {
    setTripType,
    setPersonsCount,
    setDeparture,
    setArrival,
    setDepartDate,
    setReturnDate,
    setBookingState,
    switchDates,
} = bookingSlice.actions;

export default bookingSlice.reducer;

function updateSessionStorage(state: BookingState) {
    sessionStorage.setItem("booking", JSON.stringify(state.booking));
}