const knex = require("knex");

let { booksDbSetup } = require("./BookService");

let bookTable;

let sqlDb = knex({
  client: 'pg',
  version: '7.2',
  connection: {
    host : '127.0.0.1',
    user : 'postgres',
    password : 'vegagc',
    database : 'api'
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

  bookTable = booksDbSetup(sqlDb)
  return bookTable;
}

module.exports = { database: sqlDb, setupDataLayer };
