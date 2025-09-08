import '../styles/DatePicker.scss'
import DatePickerCalendar from "./DatePickerCalendar.tsx";

export default function DatePicker(props: {
    onApplyClick: () => void;
    onResetClick: () => void;
    dateClickCounter: number;
}) {

    const leftDate = new Date()

    const rightMonthDate = new Date(leftDate)
    rightMonthDate.setMonth(leftDate.getMonth() + 1)

    return <div className="datePicker">
        <div className="datePicker-box">
            <div className="datePicker-calendar-contaier">
                <p>{leftDate.toLocaleDateString('en-EN', {month: 'long'})}</p>
                <DatePickerCalendar shownMonth={leftDate} startDateClickCounter={props.dateClickCounter}/>
            </div>
            <div className="datePicker-calendar-contaier">
                <p>{rightMonthDate.toLocaleDateString('en-EN', {month: 'long'})}</p>
                <DatePickerCalendar shownMonth={rightMonthDate} startDateClickCounter={props.dateClickCounter}/>
            </div>
        </div>
        <div className="datePicker-box">
            <div></div>
            <div className="datePicker-buttonsContainer">
                <button type="button" className="resetButton" onClick={props.onResetClick}>Reset</button>
                <button type="button" onClick={props.onApplyClick}>Apply</button>
            </div>
        </div>
    </div>
}