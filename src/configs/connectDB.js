// get the client
const sql = require("mssql/msnodesqlv8");

// create the connection to database
const config = {
  server: "CHUNGVIPPRO\\MSSQLSERVER01",
  database: "qlnv1",
  driver: "msnodesqlv8",
  options: {
    trustedConnection: true,
  },
};

const conn = new sql.ConnectionPool(config).connect().then((pool) => {
  return pool;
});

module.exports = {
  conn: conn,
  sql: sql,
};
