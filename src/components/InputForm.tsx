import {type ChangeEvent, useEffect, useState} from "react"
import '../styles/InputForm.scss'

export default function () {
    const roundTrip = "Round trip";
    const oneWay = "One way";
    const tripTypeGroup = "Trip type";

    const [tripType, setTripType] = useState<string>(roundTrip);

    useEffect(() => {
        const storedTripType = sessionStorage.getItem(tripTypeGroup);
        if (storedTripType) setTripType(storedTripType);
    })

    const onChangeRadio = (e: ChangeEvent<HTMLInputElement>) => {
        setTripType(e.target.value);
        sessionStorage.setItem(tripTypeGroup, e.target.value);
    }

    return (
        <div className="inputForm">
            <div className="radioContainer">

                <label>
                    <input type="radio" id={roundTrip} name={tripTypeGroup} value={roundTrip} onChange={onChangeRadio}
                           checked={tripType === roundTrip}/>
                    {roundTrip}
                </label>
                <label>
                    <input type="radio" id={oneWay} name={tripTypeGroup} value={oneWay} onChange={onChangeRadio}
                           checked={tripType === oneWay}/>
                    {oneWay}
                </label>

            </div>

        </div>
    )
}