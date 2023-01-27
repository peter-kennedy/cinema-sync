import pg from 'pg';
import * as dotenv from 'dotenv';
import colors from 'colors';

dotenv.config();

const pool = new pg.Pool({
  connectionString: process.env.PG_URI,
});

/**
 * Queries the database
 * @param {string} queryString
 * @param {any[]} params
 * @param {boolean} log Whether or not to log the query to the console. Default `false`
 */
export default function query(
  queryString: string,
  params?: Array<unknown>,
  log = false
) {
  if (log) console.log('Running query:\n', colors.cyan(queryString));
  return pool.query(queryString, params);
}
