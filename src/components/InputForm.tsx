import {type ChangeEvent, useEffect, useState} from "react"
import '../styles/InputForm.scss'
import PlusIcon from "./PlusIcon.tsx";
import MinusIcon from "./MinusIcon.tsx";
import DatePicker from "./DatePicker.tsx";
import {useDispatch, useSelector} from "react-redux";
import {type AppDispatch, type RootState} from "../store/store.ts";
import {
    type Booking,
    setPersonsCount,
    setTripType,
    setBookingState, setDepartDate, setReturnDate
} from "../store/slices/bookingSlice.ts";
import {Link} from "react-router-dom";

interface InputFormProps {
    theme: 'dark' | 'light';
}

export default function (props: InputFormProps) {
    const dispatch: AppDispatch = useDispatch();
    const state = useSelector((state: RootState) => state.booking);

    const roundTrip = "Round trip";
    const oneWay = "One way";
    const tripTypeGroup = "Trip type";

    const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === oneWay || e.target.value === roundTrip) {
            dispatch(setTripType(e.target.value));
        }
    }

    useEffect(() => {
        const storedBookingString = sessionStorage.getItem("booking");
        if (storedBookingString) {
            try {
                const storedBooking: Booking = JSON.parse(storedBookingString);
                dispatch(setBookingState(storedBooking));
            } catch (e) {
                console.error("Ошибка при парсинге storedBookingString" + e);
            }
        }
    }, []);

    const decrementPersons = () => {
        if (state.booking.persons > 1) {
            const newValue = state.booking.persons - 1;
            dispatch(setPersonsCount(newValue));
        }
    }

    const incrementPersons = () => {
        if (state.booking.persons < 8) {
            const newValue = state.booking.persons + 1;
            dispatch(setPersonsCount(newValue));
        }
    }

    const [datePickerShown, setDatePickerShow] = useState(false)
    const showDatePicker = () => {
        if (!datePickerShown) setDatePickerShow(true)
    }
    const hideDatePicker = () => {
        setDatePickerShow(false)
    }

    function onApplyDateClick() {
        hideDatePicker()
    }

    function onResetDateClick() {
        dispatch(setDepartDate(""));
        dispatch(setReturnDate(""));
    }

    const [dateClickCounter, setDateClickCounter] = useState<number>(0)

    useEffect(()=>{
        if (state.booking.tripType === "One way") {
            dispatch(setReturnDate(""));
}
    }, [state.booking.tripType]);

    return (
        <div className="inputForm">
            <div className="radioContainer field">
                <label>
                    <input type="radio" id={roundTrip} name={tripTypeGroup} value={roundTrip}
                           onChange={onChangeRadio}
                           checked={state.booking.tripType === roundTrip}/>
                    {roundTrip}
                </label>
                <label>
                    <input type="radio" id={oneWay} name={tripTypeGroup} value={oneWay} onChange={onChangeRadio}
                           checked={state.booking.tripType === oneWay}/>
                    {oneWay}
                </label>
                <div className="personCounter">
                    <div className="personIcon"></div>
                    <button onClick={decrementPersons}>
                        <MinusIcon color={state.booking.persons > 1 ? "#5E4AE3" : "#808180"}/>
                    </button>
                    <p>{state.booking.persons}</p>
                    <button onClick={incrementPersons}>
                        <PlusIcon color={state.booking.persons < 8 ? "#5E4AE3" : "#808180"}/>
                    </button>

                </div>
            </div>
            <div className="cityContainer">
                <label className={props.theme === 'dark' ? 'dark' : 'light'}>
                    Departure
                    <input className="field" type="text" placeholder="Your City/Station" onClick={hideDatePicker}></input>
                </label>
                <label className={props.theme === 'dark' ? 'dark' : 'light'}>
                    Arrival
                    <input className="field" type="text" placeholder="Where to?" onClick={hideDatePicker}></input>
                </label>
            </div>
            <div className="dateContainer">
                <label className={props.theme === 'dark' ? 'dark' : 'light'}>
                    Pick your lucky day
                </label>
                <div className="dateInputContainer">
                    <input className={datePickerShown? "field active" : "field"} type="text" placeholder="Depart" onFocus={() => {setDateClickCounter(0); showDatePicker()}}
                           value={state.booking.departDate} readOnly={true}></input>
                    <input className={datePickerShown && state.booking.tripType === "Round trip" ? "field active" : "field"} type="text" placeholder="Return" onFocus={() => {setDateClickCounter(1); showDatePicker()}}
                           value={state.booking.returnDate} readOnly={true} id="returnDateInput"></input>
                </div>
                {datePickerShown && <DatePicker onApplyClick={onApplyDateClick} onResetClick={onResetDateClick}
                                                dateClickCounter={dateClickCounter}/>}
            </div>
            <Link to="/booking"><button className="submitButton">Ticket, Please!</button></Link>
        </div>
    )
}