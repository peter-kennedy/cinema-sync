import query from './model.js';
import { Movie } from './types.js';

const Watchlist = {
  async getWatchlist(id: string) {
    const queryString = `SELECT id, title, title_card 
      FROM movies m 
      INNER JOIN watchlist w 
      ON w.movie_id = m.id 
      WHERE w.user_id = $1;`;

    const VALUES = [id];

    const queryRes = await query(queryString, VALUES, true);

    return queryRes.rows as Movie[];
  },

  async insertMovie(
    movieId: string,
    title: string,
    titleCard: string,
    userId: string
  ) {
    const queryString = `WITH new_movie AS (
        INSERT INTO movies (id, title, title_card)
        VALUES ($1, $2, $3)
        WHERE NOT EXISTS (SELECT $4 FROM movies WHERE id = $1)
        RETURNING id AS movie_id
      )
      INSERT INTO watchlist (user_id, movie_id)
      SELECT $4, movie_id
      FROM new_movie;`;

    const VALUES = [movieId, title, titleCard, userId];

    const queryRes = await query(queryString, VALUES, true);

    return queryRes;
  },

  async getIntersection(user1: string, user2: string) {
    const queryString = `SELECT id as movie_id, title, title_card 
    FROM movies m 
    INNER JOIN watchlist w 
    ON w.movie_id = m.id 
    WHERE (w.user_id = $1) 
    INTERSECT
    SELECT id as movie_id, title, title_card 
    FROM movies m 
    INNER JOIN watchlist w 
    ON w.movie_id = m.id 
    WHERE (w.user_id = $2);`;

    const VALUES = [user1, user2];

    const queryRes = await query(queryString, VALUES, true);

    return queryRes.rows as Movie[];
  },

  async removeMovie(userId: string, movieId: string) {
    const queryString =
      'DELETE FROM watchlist WHERE user_id=$1::integer AND movie_id=$2::integer;';

    const VALUES = [userId, movieId];

    const queryRes = await query(queryString, VALUES, true);

    return queryRes;
  },
};

export default Watchlist;
