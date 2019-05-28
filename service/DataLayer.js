const knex = require("knex");

let { booksDbSetup } = require("./BookService");
let { authorsDbSetup } = require("./AuthorService");

let errorTables;

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

// let sqlDb = knex({
//   client: 'pg',
//   version: '7.2',
//   connection: {
//     host : 'ec2-46-137-113-157.eu-west-1.compute.amazonaws.com',
//     user : 'ponoeqaltnrjyrs7',
//     password : '83a5a5af81fdb3bd4ef4daba1e12fb4e808862741291086e39b8e20b3a5777d6',
//     database : 'd56shm4iul4en7'
//   }
// });

function setupDataLayer() {
  console.log("Setting up data layer");

  errorTables = booksDbSetup(sqlDb);
  if (!errorTables) return false;
  errorTables = authorsDbSetup(sqlDb);
  if (!errorTables) return false;


  return true;
}

module.exports = { database: sqlDb, setupDataLayer };
