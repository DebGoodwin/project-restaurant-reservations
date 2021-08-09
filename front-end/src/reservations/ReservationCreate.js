import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { createReservation } from "../utils/api";
import ErrorAlert from "../layout/ErrorAlert";

function ReservationCreate() {
    const history = useHistory();
    const [error, setError] = useState(null);

    const [reservation, setReservation] = useState({
        first_name: "",
        last_name: "",
        mobile_number: "",
        reservation_date: "",
        reservation_time:"",
        people: 1,
    })


    function cancelHandler() {
        history.push("/");
    }

    function submitHandler(event) {
        event.preventDefault();
        createReservation(reservation)
            .then(() => {
            history.push(`/dashboard?date=${reservation.reservation_date}`);
            })
            .catch(setError);
    }

    function changeHandler({ target: { name, value } }) {
        setReservation((previousReservation) => ({
            ...previousReservation,
            [name]: value,

        }));
    }
    
  

  return (
    <main>
        <h1 className="mb-3">Create Reservation</h1>
        <ErrorAlert error={error} />
        <form onSubmit = {submitHandler} className="mb-4">
        <div className="row mb-3">
           <div className="col-6 form-group">
                <label className="form-label" htmlFor="first_name">
                    First name:
                </label>
                <input  
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={reservation.first_name}
                    onChange={changeHandler}
                    required={true}
                />

                <label className="form-label" htmlFor="last_name">
                    Last name:
                </label>
                <input  
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={reservation.last_name}
                    onChange={changeHandler}
                    required={true}
                />
                    
                <label className="form-label" htmlFor="mobile_number">
                    Mobile number:
                </label>
                <input  
                    className="form-control"
                    id="mobile_number"
                    name="mobile_number"
                    type="text"
                    value={reservation.mobile_number}
                    onChange={changeHandler}
                    required={true}
                    placeholder="(xxx) xxx-xxxx"
                />

                <label className="form-label" htmlFor="reservation_date">
                    Date of reservation:
                </label>
                <input  
                    className="form-control"
                    id="reservation_date"
                    name="reservation_date"
                    type="date"
                    value={reservation.reservation_date}
                    onChange={changeHandler}
                    required={true}
                />

                <label className="form-label" htmlFor="reservation_time">
                    Time of reservation:
                </label>
                <input  
                    className="form-control"
                    id="reservation_time"
                    name="reservation_time"
                    type="time"
                    value={reservation.reservation_time}
                    onChange={changeHandler}
                    required={true}
                />

                <label className="form-label" htmlFor="people">
                    Number of people in the party:
                </label>
                <input  
                    className="form-control"
                    id="people"
                    name="people"
                    type="number"
                    min="1"
                    value={reservation.people}
                    onChange={changeHandler}
                    required={true}
                />

              <div>
                    <button
                    type="button"
                    className="btn btn-secondary m-2"
                    onClick={cancelHandler}
                    >
                        Cancel
                    </button>
                    <button 
                    type="submit"
                        className="btn btn-primary m-2">
                            Submit
                    </button>
              </div>
            </div>
        </div>
        </form>
    </main>
  );

}

export default ReservationCreate;