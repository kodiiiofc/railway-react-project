import {type MouseEventHandler, useState} from "react";
import '../styles/DatePicker.scss'
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import toValidDateOrNull from "../utils/toValidDateOrNull.ts";
import {setDepartDate, setReturnDate} from "../store/slices/bookingSlice.ts";

interface Props {
    shownMonth: Date;
    startDateClickCounter: number;
}

export default function (props: Props) {
    const dispatch: AppDispatch = useDispatch();
    const state = useSelector((state: RootState) => state.booking);

    const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S']
    const date = props.shownMonth

    const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1)
    const lastDayOfMonth = new Date(date.getFullYear(), date.getMonth() + 1, 0)

    const countEmptyDaysInMonth = firstDayOfMonth.getDay() - 2

    let monthDates: number[] = []
    for (let i = -countEmptyDaysInMonth; i <= 0; i++) {
        monthDates.push(i)
    }
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        monthDates.push(i)
    }

    const [counter, setCount] = useState<number>(props.startDateClickCounter)

    const onDateClick: MouseEventHandler<HTMLParagraphElement> = (e) => {
        const value = e.currentTarget.getAttribute('data-key')

        if (value) {
            const validationDate = toValidDateOrNull(value)
            if (validationDate) {

                if (state.booking.tripType === "One way") {
                    dispatch(setDepartDate(value))
                } else {
                    const newDate = toValidDateOrNull(value)
                    const departDate = toValidDateOrNull(state.booking.departDate)
                    const returnDate = toValidDateOrNull(state.booking.returnDate)
                    if (newDate) {
                        switch (counter % 2) {
                            case 0: {
                                if (returnDate && newDate.getTime() > returnDate.getTime()) {
                                    dispatch(setDepartDate(state.booking.returnDate!!))
                                    dispatch(setReturnDate(value))
                                    setCount(1)
                                } else {
                                    dispatch(setDepartDate(value))
                                }
                                break
                            }
                            case 1:
                                if (departDate && newDate.getTime() < departDate.getTime()) {
                                    dispatch(setReturnDate(state.booking.departDate!!))
                                    dispatch(setDepartDate(value))
                                    setCount(0)
                                } else {
                                    dispatch(setReturnDate(value))
                                }
                                break
                        }
                        setCount(prevCount => prevCount + 1)
                    }

                }
            }
        }
    }


    return (
        <div className="datePicker-calendar">
            {daysOfWeek.map((day) => (<p>{day}</p>))}
            {monthDates.map(dayOfMonth => {
                const key: string = [firstDayOfMonth.getFullYear(), firstDayOfMonth.getMonth() + 1, dayOfMonth].join("-");
                let coloredDate = false
                let dateBetweenChosen = false

                const keyDate = toValidDateOrNull(key)
                const departDate = toValidDateOrNull(state.booking.departDate);
                const returnDate = toValidDateOrNull(state.booking.returnDate);

                if (keyDate) {
                    const keyDateTime = keyDate.getTime()
                    if (state.booking.departDate && departDate && keyDateTime === departDate.getTime()
                        || state.booking.returnDate && returnDate && keyDateTime === returnDate.getTime()) {
                        coloredDate = true
                    } else if (state.booking.departDate && departDate && keyDateTime > departDate.getTime()
                        && state.booking.returnDate && returnDate && keyDateTime < returnDate.getTime()) {
                        dateBetweenChosen = true
                    }
                }
                return <p key={key} data-key={dayOfMonth > 0 && key} onClick={onDateClick}
                          className={coloredDate ? "coloredDate" : dateBetweenChosen ? "dateBetweenChosen" : ""}>{dayOfMonth > 0 ? dayOfMonth : ""}</p>
            })}
        </div>
    )
}