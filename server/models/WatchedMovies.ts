import query from './model.js';
import { Movie } from './types.js';

const WatchedMovies = {
  async getWatchedMovies(id: string) {
    const queryString = `SELECT id as movie_id, title, title_card 
    FROM movies m 
    INNER JOIN watched w 
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
        SELECT $1::integer, $2, $3
        WHERE NOT EXISTS (SELECT FROM movies WHERE id = $1::integer)
        RETURNING id::integer
        ),
        new_watched AS (
        INSERT INTO watched (user_id, movie_id)
        SELECT $4::integer, id
        FROM new_movie
        WHERE NOT EXISTS (SELECT FROM watched WHERE user_id = $4::integer AND movie_id = $1::integer)
        RETURNING *
        )
        SELECT *
        FROM new_watched;`;

    const VALUES = [movieId, title, titleCard, userId];
    const queryRes = await query(queryString, VALUES, true);
    return queryRes;
  },

  async removeMovie(userId: string, movieId: string) {
    const queryString =
      'DELETE FROM watched WHERE user_id = $1 AND movie_id = $2;';

    const VALUES = [userId, movieId];

    const queryRes = await query(queryString, VALUES, true);
    console.log(`WatchedMovies.removeMovie queryRes: ${queryRes}`);
    return queryRes;
  },
};

export default WatchedMovies;
