import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { readReservation, updateReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ValidateReservation from "./ValidateReservation";
import ReservationForm from "./ReservationForm";
import { formatAsDate } from "../utils/date-time";

function ReservationEdit() {

    const history = useHistory();
    const { reservation_id } = useParams();

    const [reservation, setReservation] = useState({});
    const [reservationErrors, setReservationErrors] = useState([]);

    const getReservationData = async(reservation_id) => {
        const reservation = await readReservation(reservation_id);
        
        reservation.reservation_date = formatAsDate(reservation.reservation_date);

        setReservation(reservation);
    }

    useEffect(() => {
        getReservationData(reservation_id);
    }, [reservation_id]);

    const submitHandler = (event) => {
        event.preventDefault();

        const errors = ValidateReservation(reservation);
        if(errors.length) {
            console.log(errors)
            setReservationErrors(errors);
        } else {
            updateReservation(reservation)
                .then(() => {
                history.push(`/dashboard?date=${reservation.reservation_date}`);
                })
                .catch(setReservationErrors);
        }
    }
    
 
    const changeHandler = ({ target: { name, value } }) => { 
      
        if(name === "people") {
            setReservation((previousReservation)=> ({
                ...previousReservation,
                [name]: Number(value),
            }));
        } else {
            setReservation((previousReservation) => ({
              ...previousReservation,
                [name]: value,
            }));
        }
    }
    

    return (
        <>
            <ErrorAlert errors={reservationErrors} />
            <ReservationForm
                title="Edit"
                reservation={reservation}
                changeHandler={changeHandler}
                submitHandler={submitHandler}
            />
        </>
    )
}

export default ReservationEdit;