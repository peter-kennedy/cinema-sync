import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import query from '../models/model.js';
import { Movie } from '../models/types.js';

const watchedController = {
  async getWatchedItems(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const getWatchedQuery = `SELECT id as movie_id, title, title_card 
    FROM movies m 
    INNER JOIN watched w 
    ON w.movie_id = m.id 
    WHERE w.user_id = $1`;

    const VALUES: Array<unknown> = [id];

    try {
      const queryRes: QueryResult<Movie> = await query(
        getWatchedQuery,
        VALUES,
        true
      );

      res.locals.watchedMovies = queryRes.rows;

      return next();
    } catch (err) {
      return next({
        log: `Error in watchedController.getWatched: ERROR: ${err}`,
        status: 500,
        message: 'Could not get watched movies',
      });
    }
  },

  async addWatchedItem(req: Request, _res: Response, next: NextFunction) {
    const { movieId, title, titleCard, userId } = req.body;

    const addWatchedItemQuery = `WITH new_movie AS (
        INSERT INTO movies (id, title, title_card)
        VALUES ($1, $2, $3)
        WHERE NOT EXISTS (SELECT $4 FROM movies WHERE id = $1)
        RETURNING id AS movie_id
      )
      INSERT INTO watched (user_id, movie_id)
      SELECT $4, movie_id
      FROM new_movie;`;

    const VALUES = [movieId, title, titleCard, userId];

    try {
      const queryRes = await query(addWatchedItemQuery, VALUES, true);

      if (queryRes.rowCount === 0) {
        return next({
          log: `Conflict in watchedController.addWatchedItem: Item already exist in users watched movies`,
          status: 409,
          message: 'Item already exists in watched movies',
        });
      }

      return next();
    } catch (err) {
      return next({
        log: `Error in watchedController.addWatchedItem: ERROR: ${err}`,
        status: 500,
        message: 'Could not add to watched movies',
      });
    }
  },

  async removeWatchedItem(req: Request, _res: Response, next: NextFunction) {
    const { userId, movieId } = req.params;

    const removeWatchedItemQuery =
      'DELETE FROM watched WHERE user_id = $1 AND movie_id = $2;';

    const VALUES = [userId, movieId];

    try {
      await query(removeWatchedItemQuery, VALUES, true);

      return next();
    } catch (err) {
      return next({
        log: `Error in watchedController.removeWatchedItem: ERROR: ${err}`,
        status: 500,
        message: 'Could not remove from watched movies',
      });
    }
  },
};

export default watchedController;
