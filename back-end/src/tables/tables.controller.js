
const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const hasProperties = require("../errors/hasProperties");



const hasRequiredProperties = hasProperties("table_name", "capacity");
const hasReservationId = hasProperties("reservation_id");

// validation middleware
async function tableExists(req, res, next) {
    const { table_id } = req.params;
    const data = await service.read(table_id);
    if(data) {
        res.locals.table = data;
        return next();
    }
    return next({
        status: 404,
        message: `Table: ${table_id} does not exist.`
    });
}

function nameIsValid(req, res, next) {
    const { table_name } = req.body.data;
    if(table_name.length < 2) {
        return next({
            status: 400,
            message: "Invalid table name",
        })
    }
    return next();
}

function capacityIsValid(req, res, next) {
    const { capacity } = req.body.data;
    if(capacity < 1 || isNaN(capacity)) {
        return next({
            status: 400,
            message: "Invalid capacity",
        })
    }
    return next();
}

function hasSufficientCapacity(req, res, next) {
    const { capacity, people } = req.body.data;
    if(capacity < people) {
        return next({
            status: 400,
            message: "Table does not have enough seating for party size."
        })
    }
    return next();
}

function tableisOccupied(req, res, next) {
    const { occupied } = req.body.data;
    if(occupied) {
        return next({
            status: 400,
            message: "Table is occupied.",
        })
    }
    return next();
}

async function list(req, res) {
      const data = await service.list();
      res.json({ data });
  }
  
  async function create(req, res) {
    const newTable = req.body.data;
    const data = await service.create(newTable);
    res.status(201).json({ data });
  }

  async function update(req, res) {
    const { table } = res.locals;
    const { reservation_id } = req.body.data;
    const { table_id } = req.params;

    const updatedTable = {
        ...table,
        table_id: table_id,
        reservation_id: reservation_id,
        occupied: true,
    }
    const data = await service.update(updatedTable);
    res.status(200).json({ data });
  }
  
  module.exports = {
    list: asyncErrorBoundary(list),
    create: [
        hasRequiredProperties, 
        nameIsValid,
        capacityIsValid,
        asyncErrorBoundary(create)],
    update: [
        asyncErrorBoundary(tableExists),
        hasReservationId,
        hasSufficientCapacity,
        tableisOccupied,
        asyncErrorBoundary(update)],
  };
