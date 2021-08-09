import React, { useEffect, useState } from "react";
import { listReservations } from "../utils/api";
//import ErrorAlert from "../layout/ErrorAlert";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import { Link } from "react-router-dom";

/**
 * Defines the dashboard page.
 * @param date
 *  the date for which the user wants to view reservations.
 * @returns {JSX.Element}
 */
function Dashboard({ date }) {

   // Check the url for a date query
   const dateQuery = useQuery().get("date");
   if(dateQuery) {
     date = dateQuery;
   }

  const [reservations, setReservations] = useState([]);
  const [reservationsError, setReservationsError] = useState(null);


  // Format the date
  const dateObj = new Date(`${date} PDT`);
  const dateString = dateObj.toDateString();


  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();
    setReservationsError(null);

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsError);
    return () => abortController.abort();
  }

  

  const tableRows = reservations.map((reservation) => (
    <tr key={reservation.reservation_id}>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
    </tr>
  ));


  return (
    <main>
            <div className="headingBar d-md-flex my-3 p-2">
      <h1>Dashboard</h1>
      </div>
        <h4 className="mb-0">Reservations for: { dateString }</h4>
          <Link to={`/dashboard?date=${previous(date)}`}>
          <button
            type="button"
            className="btn btn-secondary m-2">
              <span className="oi oi-arrow-thick-left" />
                &nbsp;Previous
          </button>
          </Link>
          <Link to={`/dashboard?date=${today()}`}>
          <button
            type="button"
            className="btn btn-secondary m-2">
              Today
          </button>
          </Link>
          <Link to={`/dashboard?date=${next(date)}`}>
          <button
          type="button"
          className="btn btn-secondary m-2"
>
              Next&nbsp;
              <span className="oi oi-arrow-thick-right" />
          </button>
          </Link>

        <table className = "table">
          <thead>
          <tr>
            <th scope = "col">First name:</th>
            <th scope = "col">Last name:</th>
            <th scope = "col">Mobile number:</th>
            <th scopt = "col">Reservation date:</th>
            <th scope = "col">Time of reservation:</th>
            <th scope = "col">Number of people:</th>
          </tr>
          </thead>
        <tbody>
        {tableRows}
        </tbody>
        </table>
        
    </main>
  );
}

export default Dashboard;
