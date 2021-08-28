import React, { useEffect, useState } from "react";
import { listReservations, listTables, finishTable } from "../utils/api";
import { previous, next, today } from "../utils/date-time";
import useQuery from "../utils/useQuery";
import { Link } from "react-router-dom";
import TableList from "../tables/TableList";
import ReservationDetails from "../reservations/ReservationDetails";
import ErrorAlert from "../layout/ErrorAlert";

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
  const [reservationsErrors, setReservationsErrors] = useState([]);


  // Format the date
  const dateObj = new Date(`${date} PDT`);
  const dateString = dateObj.toDateString();


  useEffect(loadDashboard, [date]);

  function loadDashboard() {
    const abortController = new AbortController();

    listReservations({ date }, abortController.signal)
      .then(setReservations)
      .catch(setReservationsErrors);


    listTables()
     .then(setTables)
     .catch(setReservationsErrors);

    return () => abortController.abort();
  }

  

  const tableRows = reservations.map((reservation) => {
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

  async function finishHandler(table_id) {
    const abortController = new AbortController();
    const result = window.confirm(
      "Is this table ready to seat new guests? This cannot be undone."
    );

    if (result) {
      await finishTable(table_id, abortController.signal);
      loadDashboard();
    }

    return () => abortController.abort();
  }

  return (
    <main>  
      <ErrorAlert errors={reservationsErrors} />
      <div className="card my-3 border-secondary text-center">
        <h3 className="card-header text-white bg-secondary">Dashboard</h3>
        <div className="card-body">
          <h4 className="card-title">Reservations for: { dateString }</h4>
          <Link to={`/dashboard?date=${previous(date)}`}>
            <button
              type="button"
              className="mob-table btn btn-secondary btn-sm m-2">
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
          <div className="table-responsive-sm">
          <table className= "mob-table table table-condensed table-sm table-striped">
          <thead>
            <tr>
              <th scope = "col">First:</th>
              <th scope = "col">Last:</th>
              <th scope = "col">Mobile:</th>
              <th scope = "col">Date:</th>
              <th scope = "col">Time:</th>
              <th scope = "col">Party size:</th>
              <th scope = "col">Status:</th>
              <th scope = "col">Seat:</th>
              <th scope = "col">Edit:</th>
              <th scope = "col">Cancel:</th>

            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
          </table>
          </div>
        </div>
        </div>
        </div>
        <div className="card my-3 border-secondary text-center">
          <h2 className="card-header text-white bg-secondary">Tables</h2>
          <TableList tables={tables} finishHandler={finishHandler}/>
        </div>   
    </main>
  );
}

export default Dashboard;
