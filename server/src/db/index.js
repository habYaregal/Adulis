import pg from "pg";
import env from "dotenv";
env.config();

const pool = new pg.Client({
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
});

pool.connect();
export const db = {
    query: (text, params) => pool.query(text, params),
  }