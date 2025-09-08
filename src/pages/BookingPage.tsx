import '../styles/index.scss'
import '../styles/BookingPage.scss'
import Header from "../components/Header.tsx";
import InputForm from "../components/InputForm.tsx";
import tickets from "../utils/Tickets.ts";
import Footer from "../components/Footer.tsx";
import {useNavigate} from "react-router-dom";
import type {AppDispatch} from "../store/store.ts";
import {useDispatch} from "react-redux";
import {type ITicket, setTicket} from "../store/slices/ticketSlice.ts";

export default function BookingPage() {

    const onlyThreeTickets = tickets.slice(0, 3)
    const navigate = useNavigate();
    const dispatch: AppDispatch = useDispatch();
    return (
        <>
            <Header theme="light"/>
            <div className="page BookingPage">
                <div className="content">
                    <h2>Search Results</h2>
                    <InputForm theme="light"/>
                    <div className={"banner planningHolidays"}><p className={"text"}>Planning your holidays</p>
                    </div>
                    <div className={"banner trainPackages"}><p className={"text"}>Train tourism packages</p>
                    </div>
                    <p className={"info"}>Our trains don't just transport people, they transport emotions and stories!
                        From the mountains
                        of Darjeeling to the beaches of Goa, we connect more than just stations. As Raj Koothrappali
                        would say, "In India, we don't just ride trains, we experience cosmic journeys with occasional
                        cow delays." Book now and embrace the colorful chaos!</p>
                    <h2>Available Trains</h2>

                    {onlyThreeTickets.map(ticket => {

                        const departDayString = ticket.departTime.toLocaleString("en-US", {
                            month: "short",
                            day: "numeric"
                        });
                        const departTimeString = ticket.departTime.toLocaleString("en-US", {
                            hour12: true,
                            hour: "numeric",
                            minute: "numeric"
                        }).toLowerCase();

                        const arriveDayString = ticket.arriveTime.toLocaleString("en-US", {
                            month: "short",
                            day: "numeric"
                        });
                        const arriveTimeString = ticket.arriveTime.toLocaleString("en-US", {
                            hour12: true,
                            hour: "numeric",
                            minute: "numeric"
                        }).toLowerCase();

                        const travelTimeInHours = (ticket.arriveTime.getTime() - ticket.departTime.getTime()) / (1000 * 60 * 60);

                        return <div key={ticket.routeNumber} className={"ticketsContainer"}>
                            <h3>{ticket.routeNumber} - {ticket.railCarrier}</h3>
                            <div className={"runsOnContainer"}>
                                <h4>Runs on</h4>
                                <div>
                                    {ticket.runsOnDays.map(day => <p key={ticket.routeNumber + day}>{day}</p>)}
                                </div>
                            </div>
                            <div className={"dates"}>
                                <div>
                                    <p className={"date"}>{departDayString}</p>
                                    <p>{departTimeString}</p>
                                    <p>{ticket.departPoint}</p>
                                </div>
                                <div className={"travelTime"}>{travelTimeInHours} hours</div>
                                <div>
                                    <p className={"date"}>{arriveDayString}</p>
                                    <p>{arriveTimeString}</p>
                                    <p>{ticket.arrivePoint}</p>
                                </div>
                            </div>
                            <div className={"places"}>
                                {ticket.places.map(place => {
                                    return <div onClick={()=>{
                                        const reduxTicket: ITicket = {
                                            railCarrier: ticket.railCarrier,
                                            routeNumber: ticket.routeNumber,
                                            departTimeString: ticket.departTime.toISOString(),
                                            arriveTimeString: ticket.arriveTime.toISOString(),
                                            departPoint: ticket.departPoint,
                                            arrivePoint: ticket.arrivePoint,
                                            place: place
                                        };
                                        dispatch(setTicket(reduxTicket));
                                        navigate("review")
                                    }}>
                                        <p key={ticket.routeNumber + place.class + place.number + place.type + place.price + "class"}>{place.class}</p>
                                        <p key={ticket.routeNumber + place.class + place.number + place.type + place.price + "number"}>{place.number}</p>
                                        <p key={ticket.routeNumber + place.class + place.number + place.type + place.price + "type"}>{place.type}</p>
                                        <p key={ticket.routeNumber + place.class + place.number + place.type + place.price + "price"}>${place.price}</p>
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            </div>
            <Footer/>
        </>

    )
}