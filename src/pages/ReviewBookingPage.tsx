import '../styles/index.scss'
import '../styles/ReviewBookingPage.scss'
import Header from "../components/Header.tsx";
import Footer from "../components/Footer.tsx";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import {type FoodItem, foodItems} from "../utils/FoodMenu.ts";
import {useEffect, useState} from "react";
import {updateTicketFromSessionStorage} from "../store/slices/ticketSlice.ts";

export default function ReviewBookingPage() {
    const dispatch: AppDispatch = useDispatch();
    const ticketState = useSelector((state: RootState) => state.ticket).ticket;

    useEffect(() => {
        dispatch(updateTicketFromSessionStorage());
    }, [])

    const [pickedFoodState, setPickedFood] = useState(-1)
    const [extraBaggageState, setExtraBaggageState] = useState<0 | 500>(0)

    const [totalPriceState, setTotalPriceState] = useState<number>(0)

    const [discountState, setDiscountState] = useState<number>(0)

    useEffect(() => {
        setTotalPriceState(((ticketState.place?.price ? ticketState.place.price : 0)
            + (pickedFoodState > 1 ? foodItems[pickedFoodState].price : 0)
            + (extraBaggageState === 500 ? 500 : 0)) - discountState)
    })

    let ticketStateDepartTime = new Date();

    if (ticketState.departTimeString) {
        ticketStateDepartTime = new Date(ticketState.departTimeString)
    }

    let ticketStateArriveTime = new Date();

    if (ticketState.arriveTimeString) {
        ticketStateArriveTime = new Date(ticketState.arriveTimeString)
    }

    const departDayString = ticketStateDepartTime.toLocaleString("en-US", {
        month: "short",
        day: "numeric"
    });
    const departTimeString = ticketStateDepartTime.toLocaleString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "numeric"
    }).toLowerCase();

    const arriveDayString = ticketStateArriveTime.toLocaleString("en-US", {
        month: "short",
        day: "numeric"
    });
    const arriveTimeString = ticketStateArriveTime.toLocaleString("en-US", {
        hour12: true,
        hour: "numeric",
        minute: "numeric"
    }).toLowerCase();

    const travelTimeInHours = (ticketStateArriveTime.getTime() - ticketStateDepartTime.getTime()) / (1000 * 60 * 60);

    return (
        <>
            <Header theme="light"/>
            <div className="page ReviewBookingPage">
                <div className="content">
                    <h2>Review your booking</h2>

                    <div className={"boardingDetails"}>
                        <h3>Boarding details</h3>
                        <h4>{ticketState.routeNumber} - {ticketState.railCarrier}</h4>
                        <div className={"dates"}>
                            <div>
                                <p className={"date"}>{departDayString}</p>
                                <p>{departTimeString}</p>
                                <p>{ticketState.departPoint}</p>
                            </div>
                            <div className={"travelTime"}>{travelTimeInHours} hours</div>
                            <div>
                                <p className={"date"}>{arriveDayString}</p>
                                <p>{arriveTimeString}</p>
                                <p>{ticketState.arrivePoint}</p>
                            </div>
                        </div>
                        <div>
                            <p>Class: {ticketState.place ? ticketState.place.class : ""}</p>
                            <p>Place number: {ticketState.place ? ticketState.place.number : ""}</p>
                            <p>Price: {ticketState.place ? "$" + ticketState.place.price : ""}</p>
                        </div>
                    </div>

                    <div className={"food"}>
                        {foodItems.map((foodItem: FoodItem, id: number) => {
                            return (
                                <div className={"food-item block" + (pickedFoodState === id ? " active" : "")}
                                     onClick={() => {
                                         setPickedFood(id)
                                     }}>
                                    <img src={foodItem.image} alt={foodItem.name}/>
                                    <p className={"name"}>{foodItem.name}</p>
                                    <p className={"price"}>${foodItem.price}</p>
                                </div>
                            )
                        })}
                    </div>

                    <div className={"offers block"}>
                        <h3>Offers</h3>
                        <ul>
                            <li><p>50% off up to $100 | Use code BOOKNOW</p>
                                <button type={"button"} className={"button"}
                                        onClick={(e) => setDiscountState((prev) => {
                                            if (e.target.innerText === "Apply") {
                                                e.target.innerText = "Applied"
                                                const total = ((ticketState.place?.price ? ticketState.place.price : 0)
                                                    + (pickedFoodState > 1 ? foodItems[pickedFoodState].price : 0)
                                                    + (extraBaggageState === 500 ? 500 : 0))

                                                if (total * 0.5 > 100) {
                                                    return prev + 100;
                                                } else {
                                                    return prev + total * 0.5
                                                }
                                            } else
                                                return prev;
                                        })}
                                >Apply
                                </button>
                            </li>
                            <li>
                                <p>20% off | Use code FIRSTTIME</p>
                                <button type={"button"} className={"button"}
                                        onClick={(e) => setDiscountState((prev) => {
                                            if (e.target.innerText === "Apply") {
                                                e.target.innerText = "Applied"
                                                const total = ((ticketState.place?.price ? ticketState.place.price : 0)
                                                    + (pickedFoodState > 1 ? foodItems[pickedFoodState].price : 0)
                                                    + (extraBaggageState === 500 ? 500 : 0))
                                                return (prev + total * 0.2)
                                            } else return prev;
                                        })}>Apply
                                </button>
                            </li>
                        </ul>
                    </div>

                    <div className={"extraBaggage block"}>
                        <h3>Extra Baggage</h3>
                        <button type={"button"} className={"button" + (extraBaggageState === 500 ? " active" : "")}
                                onClick={() => setExtraBaggageState((prevState) => prevState === 0 ? 500 : 0)}
                                onMouseEnter={(e) => {
                                    if (extraBaggageState === 500) e.target.innerText = "Remove"
                                }}
                                onMouseLeave={(e) => {
                                    e.target.innerText = extraBaggageState === 0 ? "Add to Ticket" : "Added"
                                }}
                        > {extraBaggageState === 0 ? "Add to Ticket" : "Added"}</button>
                    </div>

                    <div className={"billDetails block"}>
                        <h3>Bill details</h3>
                        <ul>
                            <li><p>Base Ticket Fare</p>
                                <p className={"value"}>$ {(ticketState.place?.price ? ticketState.place.price : 0)}</p>
                            </li>
                            {pickedFoodState > -1 && <li>
                                <p>{foodItems[pickedFoodState].name}</p>
                                <p className={"value"}>$ {foodItems[pickedFoodState].price}</p>
                            </li>}
                            {extraBaggageState === 500 && <li>
                                <p>Extra Baggage</p>
                                <p className={"value"}>${extraBaggageState}</p>
                            </li>}
                            {extraBaggageState === 500 && <li>
                                <p>Extra Baggage</p>
                                <p className={"value"}>${extraBaggageState}</p>
                            </li>}
                        </ul>
                        <div className={"total"}>
                            <h3>Total Charge</h3>
                            <h3>$ {totalPriceState}</h3>
                        </div>
                    </div>

                    <div className={"bookNowContainer"}>
                        <button className="bookNow" onClick={() => {
                            console.log("-" + totalPriceState)
                        }}>Book Now
                        </button>
                    </div>


                </div>
            </div>
            <Footer/>
        </>

    )
}