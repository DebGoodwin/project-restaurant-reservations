import React from "react";
import ReservationDetails from "./ReservationDetails";


function ReservationList({ reservations }) {

    const reservationRows = reservations.map((reservation) => {
        return (
       
        <ReservationDetails 
            key={reservation.reservation_id}
            reservation_id={reservation.reservation_id}
            first_name={reservation.first_name}
            last_name={reservation.last_name}
            mobile_number={reservation.mobile_number}
            reservation_date={reservation.reservation_date}
            reservation_time={reservation.reservation_time}
            people={reservation.people} 
            status={reservation.status}
        />
        
        )
    });

    if(reservations[0] !== "No reservations found") {
    return (
        <div className="headingBar d-md-flex my-3 p-2">
          <table className= "mob-table table table-condensed table-sm">
          <thead>
            <tr>
              <th scope = "col">First:</th>
              <th scope = "col">Last:</th>
              <th scope = "col">Mobile:</th>
              <th scope = "col">Date:</th>
              <th scope = "col">Time:</th>
              <th scope = "col">Party size:</th>
              <th scope = "col">Status:</th>
            </tr>
          </thead>
          <tbody>
            {reservationRows}
          </tbody>
          </table>
        </div>
     
    )
    } else {
        return (
            <h4 className="headingBar d-md-flex my-3 p-2"> No reservations found</h4>
        )
    }
}
  
export default ReservationList;