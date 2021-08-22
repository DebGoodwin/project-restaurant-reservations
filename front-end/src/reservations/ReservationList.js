import React from "react";
import { Link } from "react-router-dom";

function ReservationList(props) {
    const { reservation_id, first_name, last_name, mobile_number, reservation_date, reservation_time, people } = props;

    return (   
        <tr key={reservation_id}>
            <td>{first_name}</td>
            <td>{last_name}</td>
            <td>{mobile_number}</td>
            <td>{reservation_date}</td>
            <td>{reservation_time}</td>
            <td>{people}</td>
            <Link to={`/reservations/${reservation_id}/seat`}>
                <button href={`/reservations/${reservation_id}/seat`} type="button" className="btn btn-secondary btn-sm m-2">Seat</button>
            </Link>
        </tr> 
    );
}

export default ReservationList;