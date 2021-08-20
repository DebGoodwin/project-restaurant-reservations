const knex = require("../db/connection");



async function create(newReservation) {
    return knex("reservations")
        .insert(newReservation)
        .returning("*")
        .then((result) => result[0]);
}

async function list() {
    return knex("reservations").select("*");
}

async function listByDate(date) {
    return knex("reservations").select("*")
        .where({ reservation_date: date })
        .orderBy("reservation_time");
}

async function read(reservationId) {
    return knex("reservations")
    .where("reservation_id", reservationId)
    .select("*")
    .first();
}



module.exports = {
    create,
    list,
    listByDate,
    read,
};