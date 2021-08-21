import React, { useEffect, useState } from "react";
import { listReservations, listTables } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import { Link } from "react-router-dom";
import TableList from "../tables/TableList";

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
  const [tables, setTables] = useState([]);


  // Format the date
  const dateObj = new Date(`${date} PDT`);
  const dateString = dateObj.toDateString();


  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();

    listReservations({ date }, abortController.signal)
      .then(setReservations);

    //listTables()
    //  .then(setTables);

    return () => abortController.abort();
  }


  useEffect(loadTables, []);

  function loadTables() {
    listTables()
    .then(setTables);
  }
  

  

  const tableRows = reservations.map((reservation) => (
    <tr key={reservation.reservation_id}>
      <td>{reservation.first_name}</td>
      <td>{reservation.last_name}</td>
      <td>{reservation.mobile_number}</td>
      <td>{reservation.reservation_date}</td>
      <td>{reservation.reservation_time}</td>
      <td>{reservation.people}</td>
      <Link to={`/reservations/${reservation.reservation_id}/seat`}>
      <button href={`/reservations/${reservation.reservation_id}/seat`} type="button" className="btn btn-secondary btn-sm m-2">Seat</button>
      </Link>
    </tr>
  ));


  return (
    <main>  
      <div className="card my-3 border-secondary text-center">
        <h3 className="card-header text-white bg-secondary">Dashboard</h3>
        <div className="card-body">
          <h4 className="card-title">Reservations for: { dateString }</h4>
          <Link to={`/dashboard?date=${previous(date)}`}>
            <button
              type="button"
              className="btn btn-secondary btn-sm m-2">
                <span className="oi oi-arrow-thick-left" />
                  &nbsp;Previous
            </button>
          </Link>
          <Link to={`/dashboard?date=${today()}`}>
            <button
              type="button"
              className="btn btn-secondary btn-sm m-2">
                Today
            </button>
          </Link>
          <Link to={`/dashboard?date=${next(date)}`}>
            <button
              type="button"
              className="btn btn-secondary btn-sm m-2"
            >
                Next&nbsp;
                <span className="oi oi-arrow-thick-right" />
            </button>
          </Link>
          <div className="headingBar d-md-flex my-3 p-2">
          <table className= "table table-condensed table-sm">
          <thead>
            <tr>
              <th scope = "col">First:</th>
              <th scope = "col">Last:</th>
              <th scope = "col">Mobile:</th>
              <th scope = "col">Date:</th>
              <th scope = "col">Time:</th>
              <th scope = "col">Party size:</th>
              <th scope = "col">Seat:</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
          </table>
        </div>
        </div>
        </div>
        <div className="card my-3 border-secondary text-center">
          <h2 className="card-header text-white bg-secondary">Tables</h2>
          <TableList tables={tables} />
        </div>   
    </main>
  );
}

export default Dashboard;
