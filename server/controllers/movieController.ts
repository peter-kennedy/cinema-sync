import { Request, Response, NextFunction, request } from 'express';
import { QueryResult } from 'pg';
import query from '../models/model.js';

interface Movie {
  id: number;
  title: string;
  title_card: string;
}

const movieController = {
  async getWatchlist(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const VALUES: Array<unknown> = [id];
      const data: QueryResult<Movie> = await query(
        `SELECT id, title, title_card 
      FROM movies m 
      inner join watchlist w 
      on w.movie_id = m.id 
      where w.user_id = $1`,
        VALUES,
        true
      );
      res.locals.watchlist = data.rows;
      return next();
    } catch (err) {
      return next({
        log: `Error in movieController.getWatchlist: ERROR: ${err}`,
        status: 500,
        message: 'Counld not get watchlist',
      });
    }
  },

  async getWatched(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      const VALUES: Array<unknown> = [id];
      const data: QueryResult<Movie> = await query(
        `SELECT id as movie_id, title, title_card 
        FROM movies m 
        inner join watched w 
        on w.movie_id = m.id 
        where w.user_id = $1`,
        VALUES,
        true
      );
      res.locals.watchedMovies = data;
      return next();
    } catch (err) {
      return next({
        log: `Error in movieController.getWatched: ERROR: ${err}`,
        status: 500,
        message: 'Counld not get watched movies',
      });
    }
  },
};

export default movieController;
