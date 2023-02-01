import { Request, Response, NextFunction } from 'express';
import { QueryResult } from 'pg';
import query from '../models/model.js';
import { Movie } from '../models/types.js';
// TODO: add removeWatchlistItem, and controller for marking an item watched
const watchlistController = {
  async getWatchlist(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const getWatchlistQuery = `SELECT id, title, title_card 
    FROM movies m 
    INNER JOIN watchlist w 
    ON w.movie_id = m.id 
    WHERE w.user_id = $1;`;

    const VALUES: Array<unknown> = [id];

    try {
      const getWatchlistQueryRes: QueryResult<Movie> = await query(
        getWatchlistQuery,
        VALUES,
        true
      );
      res.locals.watchlist = getWatchlistQueryRes.rows;
      return next();
    } catch (err) {
      return next({
        log: `Error in movieController.getWatchlist: ERROR: ${err}`,
        status: 500,
        message: 'Could not get watchlist',
      });
    }
  },
  async addWatchlistItem(req: Request, res: Response, next: NextFunction) {
    const { movieId, title, titleCard, userId } = req.body;

    const addWatchlistItemQuery = `WITH new_movie AS (
        INSERT INTO movies (id, title, title_card)
        VALUES ($1, $2, $3)
        WHERE NOT EXISTS (SELECT $4 FROM movies WHERE id = $1)
        RETURNING id AS movie_id
      )
      INSERT INTO watchlist (user_id, movie_id)
      SELECT $4, movie_id
      FROM new_movie;`;

    const VALUES = [movieId, title, titleCard, userId];

    try {
      const queryRes = await query(addWatchlistItemQuery, VALUES, true);

      if (queryRes.rowCount === 0) {
        return next({
          log: `Conflict in watchlistController.addWatchlistItem: Item already exist in users watchlist`,
          status: 409,
          message: 'Item already exists in watchlist',
        });
      }

      return next();
    } catch (err) {
      return next({
        log: `Error in watchlistController.addWatchlistItem: ERROR: ${err}`,
        status: 500,
        message: 'Could not add to watchlist',
      });
    }
  },

  async getWatchlistIntersection(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    const { user1, user2 } = req.body;

    try {
      const VALUES = [user1, user2];
      const queryRes: QueryResult<Movie> = await query(
        `SELECT id as movie_id, title, title_card 
        FROM movies m 
        INNER JOIN watchlist w 
        ON w.movie_id = m.id 
        WHERE (w.user_id = $1) 
        INTERSECT
        SELECT id as movie_id, title, title_card 
        FROM movies m 
        INNER JOIN watchlist w 
        ON w.movie_id = m.id 
        WHERE (w.user_id = $2);`,
        VALUES,
        true
      );
      res.locals.watchlistIntersection = queryRes.rows;
      return next();
    } catch (err) {
      return next({
        log: `Error in watchlistController.getWatchlistIntersection: ERROR: ${err}`,
        status: 500,
        message: 'Could not get watchlist intersection',
      });
    }
  },
};

export default watchlistController;
