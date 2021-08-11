import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm(props) {
    const { reservation, changeHandler, submitHandler } = props;
    const history = useHistory();

    return (
        <form onSubmit={submitHandler} className="mb-4">
        <div className="row mb-3">
           <div className="col-6 form-group">
                <label className="form-label" htmlFor="first_name">First name: </label>
                <input  
                    className="form-control"
                    id="first_name"
                    name="first_name"
                    type="text"
                    value={reservation.first_name}
                    onChange={changeHandler}
                    required={true}
                />
                <label className="form-label" htmlFor="last_name">Last name:</label>
                <input  
                    className="form-control"
                    id="last_name"
                    name="last_name"
                    type="text"
                    value={reservation.last_name}
                    onChange={changeHandler}
                    required={true}
                />
                <label className="form-label" htmlFor="mobile_number">Mobile number: </label>
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
                <label className="form-label" htmlFor="reservation_date">Reservation date: </label>
                <input  
                    className="form-control"
                    id="reservation_date"
                    name="reservation_date"
                    type="date"
                    placeholder="YYYY-MM-DD"
                    pattern="\d{4}-\d{2}-\d{2}"
                    value={reservation.reservation_date}
                    onChange={changeHandler}
                    required={true}
                />
                <label className="form-label" htmlFor="reservation_time">Reservation time: </label>
                <input  
                    className="form-control"
                    id="reservation_time"
                    name="reservation_time"
                    type="time"
                    placeholder="HH:MM"
                    pattern="[0-9]{2}:[0-9]:{2}"
                    value={reservation.reservation_time}
                    onChange={changeHandler}
                    required={true}
                />
                <label className="form-label" htmlFor="people">Number of people: </label>
                <input  
                    className="form-control"
                    id="people"
                    name="people"
                    type="number"
                    min={1}
                    value={reservation.people}
                    onChange={changeHandler}
                    required={true}
                />
              <div>
                    <button type="button" className="btn btn-secondary m-2" onClick={()=> history.push("/")}> Cancel </button>
                    <button type="submit" className="btn btn-primary m-2"> Submit </button>
              </div>
            </div>
        </div>
        </form>
    );
}

export default ReservationForm;