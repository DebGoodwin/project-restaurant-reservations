import React from "react";

function TableList (props) {
    const { tables, finishHandler } = props;

    const tableRows = tables.map((table) => (
        <tr key={table.table_id}>
          <td className="align-middle">{table.table_name}</td>
          <td className="align-middle">{table.capacity}</td>
          <td className="align-middle" data-table-id-status={table.table_id} >
            {table.occupied ? "occupied" : "free"}</td>
          <td>  {table.occupied ? (<button data-table-id-finish={table.table_id} className="btn btn-secondary btn-sm m-2" onClick={() => finishHandler(table.table_id)}>Finish</button>):""}</td>
        </tr>
      ));

      
    return (
        <div>
            <div className="headingBar d-md-flex my-3 p-2">
                <table className = "table table-condensed table-striped">
                <thead>
                    <tr>
                        <th scope = "col">Table name: </th>
                        <th scope = "col">Seats: </th>
                        <th scope = "col">Status: </th>
                        <th scope = "col">Complete: </th>
                    </tr>
                </thead>
                <tbody>
                    {tableRows}
                </tbody>
                </table>
            </div>
        </div>
    );
}

export default TableList;