const knex = require("../db/connection");


async function create(newTable) {
    return knex("tables")
        .insert(newTable)
        .returning("*")
        .then((result) => result[0]);
}

async function list() {
    return knex("tables").select("*")
        .orderBy("table_name");
}

async function read(table_id) {
    return knex("tables")
    .select("*")
    .where({ table_id: table_id })
    .then((result) => result[0]);
}

async function update(table) {
    return knex("tables")
    .select("*")
    .where({ table_id: table.table_id })
    .update(table, "*")
    .then((result) => result[0]);
}

async function finish(table) {
    return knex("tables")
    .select("*")
    .where({ table_id: table.table_id })
    .update(table, "*")
    .then((result) => result[0]);
}

module.exports = {
    create,
    list,
    read,
    update,
    finish,
};