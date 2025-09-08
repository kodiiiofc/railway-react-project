import {configureStore} from "@reduxjs/toolkit";
import bookingReducer from "./slices/bookingSlice"
import ticketSlice from "./slices/ticketSlice.ts";

export const store = configureStore({
    reducer: {
        booking: bookingReducer,
        ticket: ticketSlice
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;