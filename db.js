const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "changethis",
    host: "localhost",
    port: 5432,
    database: "prettydb"
});

module.exports = pool;
