import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { listTables, updateTable, readReservation } from "../utils/api";


function ReservationSeat() {
    const history = useHistory();
    const { reservation_id } = useParams();

    const [reservation, setReservation] = useState({});
    const [tables, setTables] = useState([]);
    const [tableId, setTableId] = useState("");
    //const [seatError, setSeatError] = useState([]);

    
    useEffect(loadData, [reservation_id]);

    function loadData() {
      const abortController = new AbortController();
  
      listTables(abortController.signal)
        .then(res => res.filter(table => !table.occupied))
        .then(setTables);
        //.catch(setSeatError);

     readReservation(reservation_id, abortController.signal)
        .then(setReservation);
        //.catch(setSeatError);

  
      return () => abortController.abort();
    }


    const changeHandler = (event) => {
       setTableId(event.target.value);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        await updateTable(reservation.reservation_id, tableId);

        history.push("/dashboard");
    }


    return (  
        <div className="card my-3 border-secondary text-center w-85">  
            <h3 className="card-header text-white bg-secondary">Seat </h3>
            <div class="card-body">
            <form onSubmit={submitHandler}>
            <div className="form-group">
                <h5 class="card-title">Table Number:</h5>
                    <label htmlFor="table-id">
                    <select className="form-control"
                            id="table_id" 
                            name="table_id" 
                            value={tableId} 
                            required={true} 
                            onChange={changeHandler}>
                            <option value="">-- Select a Table --</option>
                            {tables.map((table)=> (
                                <option key={table.table_id} 
                                        value={table.table_id}
                                        disabled={table.capacity < reservation.people || table.occupied}>
                                    {table.table_name} - {table.capacity}
                                </option> 
                            ))}
                    </select> 
                    </label>  
                </div>
                <div>
                    <button type="button" className="btn btn-secondary m-2" onClick={()=> history.push("/")}> Cancel </button>
                    <button type="submit" className="btn btn-primary m-2"> Submit </button>
                </div>
            </form>
        </div>
    </div>
    )
}

export default ReservationSeat;