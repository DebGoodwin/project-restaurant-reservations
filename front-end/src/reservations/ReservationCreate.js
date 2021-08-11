import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";
import ValidateReservation from "./ValidateReservation";
import ReservationForm from "./ReservationForm";


function ReservationCreate() {
    const history = useHistory();
    const [reservationErrors, setReservationErrors] = useState([]);
    
    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time:"",
        people: 1,
    });

    
    const submitHandler = (event) => {
        event.preventDefault();

        const errors = ValidateReservation(reservation);
        if(errors.length) {
            console.log(errors)
            setReservationErrors(errors);
        } else {
            createReservation(reservation)
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
    <div>
        <h1 className="mb-3">Create Reservation</h1>
        <ErrorAlert errors={reservationErrors} />
        <ReservationForm
            reservation={reservation}
            changeHandler={changeHandler}
            submitHandler={submitHandler}
        />
       
    </div>
  );

}

export default ReservationCreate;