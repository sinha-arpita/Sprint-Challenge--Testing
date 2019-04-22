const knex = require("knex");
const dbConfig = require("../knexfile.js");
const db = knex(dbConfig.development);

module.exports = {
  find,
  findBy,
  remove,
  insert,
  update,
  truncate
};

async function find() {
  return db("games");
}

async function findBy(id) {
  return db("games").where({ id });
}
async function insert(game) {
  const [id] = await db("games").insert(game);
  console.log("Id ", id);

  return db("games")
    .where({ id })
    .first();
}

function remove(id) {
  return db("games")
    .where("id", id)
    .del();
}
function update(id, changes) {
  return db("games")
    .where({ id })
    .update(changes);
}

function truncate() {
  return db("games").truncate();
}
