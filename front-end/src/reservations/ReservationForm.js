import React from "react";
import { useHistory } from "react-router-dom";

function ReservationForm(props) {
    const { title, reservation, setReservation, submitHandler } = props;
    const history = useHistory();


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
        <div className="card my-3 border-secondary">
            <h3 className="card-header text-white bg-secondary">{title} Reservation</h3>
            <div className="card-body"></div>
                <form onSubmit={submitHandler}>
                <div className="col-10 form-group">
                    <label className="form-label" htmlFor="first_name">First name: </label>
                    <input  
                        className="form-control"
                        id="first_name"
                        name="first_name"
                        type="text"
                        value={reservation.first_name ||''}
                        onChange={changeHandler}
                        required={true}
                    />
                    <label className="form-label" htmlFor="last_name">Last name:</label>
                    <input  
                        className="form-control"
                        id="last_name"
                        name="last_name"
                        type="text"
                        value={reservation.last_name ||''}
                        onChange={changeHandler}
                        required={true}
                    /><br/>
                    <label className="form-label" htmlFor="mobile_number">Mobile number: </label>
                    <input  
                        className="form-control"
                        id="mobile_number"
                        name="mobile_number"
                        type="text"
                        value={reservation.mobile_number ||''}
                        onChange={changeHandler}
                        required={true}
                        placeholder="(xxx) xxx-xxxx"
                    /><br/>
                    <label className="form-label" htmlFor="reservation_date">Reservation date: </label>
                    <input  
                        className="form-control"
                        id="reservation_date"
                        name="reservation_date"
                        type="date"
                        placeholder="YYYY-MM-DD"
                        pattern="\d{4}-\d{2}-\d{2}"
                        value={reservation.reservation_date ||''}
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
                        value={reservation.reservation_time ||''}
                        onChange={changeHandler}
                        required={true}
                    /><br/>
                    <label className="form-label" htmlFor="people">Number of people: </label>
                    <input  
                        className="form-control"
                        id="people"
                        name="people"
                        type="number"
                        min={1}
                        value={reservation.people ||''}
                        onChange={changeHandler}
                        required={true}
                    /><br/>
                    <div>
                        <button type="button" className="btn btn-secondary m-2" onClick={()=>  history.goBack()}> Cancel </button>
                        <button type="submit" className="btn btn-primary m-2"> Submit </button>
                    </div>
                </div>
            </form>
        </div>   
    );
}

export default ReservationForm;