const service = require("./reservations.service");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasProperties = require("../errors/hasProperties");
const hasValidProperties = require("../errors/hasValidProperties");

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
]



/**
 * Middleware validation functions
 * 
 * 
 */
function dateIsValid (req, res, next) {
  const { reservation_date } = req.body.data;
  const date = Date.parse(reservation_date);
  if (date && date > 0) {
    return next();
  } else {
    return next({ 
        status: 400,
        message: `reservation_date field is invalid: ${reservation_date}.`
      })
  }
}

function timeIsValid (req, res, next) {
  const { reservation_time } = req.body.data;
  const regex = new RegExp("([01]?[0-9]|2[0-3]):[0-5][0-9]");

  if (regex.test(reservation_time)) {
    return next();
  } 
  next ({ 
      status: 400,
      message: `reservation_time is invalid: ${reservation_time}.`,
  });
}

function peopleIsValidNumber (req, res, next) {
  const { people } = req.body.data;
  const num = parseInt(people);
  //const isInt = Number.isInteger(num);
  if(num) {
    return next();
  }
  next ({
    status: 400,
    message: `people is not a valid number ${people}.`,
  })
}

/**
 * List handler for reservation resources
 */
async function list(req, res) {
  const { date } = req.query;

  if(date) {
    const data = await service.listByDate(date);
    res.json({ data });
  } else {
    const data = await service.list();
    res.json({ data });
  }
}

async function create(req, res) {
  const newReservation = req.body.data;
  const data = await service.create(newReservation);
  res.status(201).json({ data: newReservation });
}

module.exports = {
  list,
  create:  asyncErrorBoundary(create),
};
