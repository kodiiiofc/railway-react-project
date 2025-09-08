import {createSlice, type PayloadAction} from "@reduxjs/toolkit";
import type {Place} from "../../utils/Tickets.ts";


export interface ITicket {
    routeNumber?: number;
    railCarrier?: string;
    departTimeString?: string;
    arriveTimeString?: string;
    departPoint?: string;
    arrivePoint?: string;
    place?: Place;
}

const initialTicket: ITicket = {
    routeNumber: undefined,
    railCarrier: undefined,
    departTimeString: undefined,
    arriveTimeString: undefined,
    departPoint: undefined,
    arrivePoint: undefined,
    place: undefined,
}


interface TicketState {
    ticket: ITicket
}

const initialState: TicketState = {
    ticket: initialTicket,
}

const ticketSlice = createSlice({
    name: "ticket",
    initialState,
    reducers: {
        setTicket: (state, action: PayloadAction<ITicket>) => {
            state.ticket = action.payload;
            updateSessionStorage(state);
        },
        updateTicketFromSessionStorage: (state: TicketState) => {
            const storedTicketString = sessionStorage.getItem("ticket")
            if (storedTicketString) {
                try {
                    const storedTicket: ITicket = JSON.parse(storedTicketString);
                    state.ticket = storedTicket;
                } catch (e) {
                    console.error("Ошибка при парсинге storedTicketString" + e);
                }
            }
        }
    }
})

function updateSessionStorage(state: TicketState) {
    sessionStorage.setItem("ticket", JSON.stringify(state.ticket));
}

export const {
    setTicket,
    updateTicketFromSessionStorage,
} = ticketSlice.actions;

export default ticketSlice.reducer;