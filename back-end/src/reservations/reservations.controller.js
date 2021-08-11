const service = require("./reservations.service");
const asyncErrorBoundary = require('../errors/asyncErrorBoundary');
const hasProperties = require("../errors/hasProperties");
const hasValidProperties = require("../errors/hasValidProperties");

const REQUIRED_PROPERTIES = [
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  
]

const VALID_PROPERTIES = [
  "first_name",
  "last_name",
  "people",
  "mobile_number",
  "reservation_date",
  "reservation_time",
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
  const { reservation_time } = req.body.data ;
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
  const valid = Number.isInteger(people);
 
  if(valid && people > 0) {
    return next();
  }
  next ({
    status: 400,
    message: `people is not a valid number ${people}.`,
  })
}

function notTuesday(req, res, next) {
  const { reservation_date } = req.body.data;
  const date = new Date(reservation_date);
  const day = date.getUTCDay();

  if(day !== 2) {
    return next()
  }
  next ({
      status: 400,
      message: "The restaurant is closed on Tuesday.",
  });
}

function notPastDate(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;

  const currDate = Date.now();
  const reservationDate = new Date(`${reservation_date} ${reservation_time}`);
  const newResDate = reservationDate.valueOf();
  console.log("Reservation Date***",reservationDate)
  

  if(isNaN(Date.parse(reservation_date))) {
    return next ({
      status: 400,
      message: "reservation_date is invalid",
    })
  }
  if(newResDate < currDate) {
    return next ({
      status: 400,
      message: "New reservations must be in the future.",
    })
  }
  next();
}



function duringOperationHours(req, res, next) {
  const { reservation_date, reservation_time } = req.body.data;
  const reservationDate = new Date(`${reservation_date} ${reservation_time}`);

  const hours = reservationDate.getHours();
  const mins = reservationDate.getMinutes();
  
  const compareTime = hours * 100 + mins; 
  if(compareTime >= 1030 && compareTime < 2130) {
    return next();
  }
  next ({
    status: 400,
    message: "Reservations must be between 10:30 AM and 9:30 PM.",
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
  create:  [hasProperties(...REQUIRED_PROPERTIES), 
            hasValidProperties(...VALID_PROPERTIES), 
            dateIsValid, 
            timeIsValid, 
            peopleIsValidNumber,
            notTuesday,
            notPastDate,
            duringOperationHours,
            asyncErrorBoundary(create)],
};
