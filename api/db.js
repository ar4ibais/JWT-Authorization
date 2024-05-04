import pg from "pg";

const pool = new pg.Pool({
  user: "postgres",
  password: "root",
  host: "localhost",
  port: "5433",
  database: "auth",
});

export default pool;
