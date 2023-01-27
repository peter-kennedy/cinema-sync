import pg from 'pg';
import colors from 'colors';
import config from './model.config.json' assert { type: 'json' };

const pool = new pg.Pool({
  connectionString: config.PG_URI,
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
