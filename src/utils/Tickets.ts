
export interface Ticket {
    routeNumber: number;
    railCarrier: string;
    runsOnDays: string[];
    departTime: Date;
    arriveTime: Date;
    departPoint: string;
    arrivePoint: string;
    places: Place[];
}

export interface Place {
    number: string;
    type: string;
    class: string;
    price: number;
}

const ticketOne: Ticket = {
    routeNumber: 22426,
    railCarrier: "Vande Bharat",
    runsOnDays: ["Everyday"],
    departTime: new Date("2025-11-16T23:25"),
    arriveTime: new Date("2025-11-17T07:25"),
    departPoint: "New Delhi - NDLS",
    arrivePoint: "Lucknow - LJN",
    places: [
        {
            number: "Avl - 046",
            type: "Tatkal",
            class: "3A",
            price: 800
        },
        {
            number: "Avl - 006",
            type: "Tatkal",
            class: "2A",
            price: 1000
        },
        {
            number: "WL - 36",
            type: "Tatkal",
            class: "1A",
            price: 1200
        },
    ]
}


const ticketTwo: Ticket = {
    routeNumber: 22412,
    railCarrier: "Arunachal exp",
    runsOnDays: ["Everyday"],
    departTime: new Date("2025-11-16T23:45"),
    arriveTime: new Date("2025-11-17T07:45"),
    departPoint: "New Delhi - NDLS",
    arrivePoint: "Lucknow - LJN",
    places: [
        {
            number: "Avl - 446",
            type: "Tatkal",
            class: "3A",
            price: 800
        },
        {
            number: "Avl - 166",
            type: "Tatkal",
            class: "2A",
            price: 1000
        },
        {
            number: "WL - 6",
            type: "Tatkal",
            class: "1A",
            price: 1400
        },
    ]
}


const ticketThree: Ticket = {
    routeNumber: 22426,
    railCarrier: "Shatabdi Express",
    runsOnDays: ["Everyday"],
    departTime: new Date("2025-11-16T23:50"),
    arriveTime: new Date("2025-11-17T09:50"),
    departPoint: "New Delhi - NDLS",
    arrivePoint: "Lucknow - LJN",
    places: [
        {
            number: "Avl - 446",
            type: "Tatkal",
            class: "3A",
            price: 800
        },
        {
            number: "Avl - 166",
            type: "Tatkal",
            class: "2A",
            price: 1000
        },
    ]
}

export default [ticketOne, ticketTwo, ticketThree];
