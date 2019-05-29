const knex = require("knex");

let { booksDbSetup } = require("./BookService");
let { authorsDbSetup } = require("./AuthorService");
let { eventsDbSetup } = require("./EventService");
let { groupDbSetup } = require ("./GroupService");


let errorTables;

/*

let sqlDb = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host : 'ec2-54-225-106-93.compute-1.amazonaws.com',
    user : 'rpucwjwdsauhfr',
    password : '5d8743de4b1d6827fc9021f3a5954f3ab2cd54cf25b78b7c922d6d03c6665c2c',
    database : 'dd1s7vajsoabk3'
  }
});

*/

let sqlDb = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host : 'localhost',
    user : 'blanca',
    //password : 'vegagc',
    database : 'BooksDb'
  }
});


function setupDataLayer() {
  console.log("Setting up data layer");

  errorTables = booksDbSetup(sqlDb);
  if (!errorTables) return false;
  errorTables = authorsDbSetup(sqlDb);
  if (!errorTables) return false;
  errorTables = eventsDbSetup(sqlDb);
  if (!errorTables) return false;
  errorTables = groupDbSetup(sqlDb);
  if(!errorTables) return false;
  return true;

  return true;
}

module.exports = { database: sqlDb, setupDataLayer };
