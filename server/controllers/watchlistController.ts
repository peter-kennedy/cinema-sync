import { Request, Response, NextFunction } from 'express';
import query from '../models/model.js';
import Watchlist from '../models/Watchlist.js';
import WatchedMovies from '../models/WatchedMovies.js';

const watchlistController = {
  async getWatchlist(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      res.locals.watchlist = await Watchlist.getWatchlist(id);

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

    try {
      const queryRes = await Watchlist.insertMovie(
        movieId,
        title,
        titleCard,
        userId
      );

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
      res.locals.watchlistIntersection = await Watchlist.getIntersection(
        user1,
        user2
      );
      return next();
    } catch (err) {
      return next({
        log: `Error in watchlistController.getWatchlistIntersection: ERROR: ${err}`,
        status: 500,
        message: 'Could not get watchlist intersection',
      });
    }
  },

  async removeWatchlistItem(req: Request, _res: Response, next: NextFunction) {
    const { userId, movieId } = req.params;

    try {
      await Watchlist.removeMovie(userId, movieId);

      return next();
    } catch (err) {
      return next({
        log: `Error in watchlistController.removeWatchlistItem: ${err}`,
        status: 500,
        message: 'Could not remove from watchlist',
      });
    }
  },

  async moveToWatched(req: Request, _res: Response, next: NextFunction) {
    const { title, titleCard } = req.body;
    const { userId, movieId } = req.params;
    try {
      await query('BEGIN');

      await Watchlist.removeMovie(userId, movieId);
      await WatchedMovies.insertMovie(movieId, title, titleCard, userId);

      await query('COMMIT');

      return next();
    } catch (err) {
      await query('ROLLBACK');
      return next({
        log: `Error in watchlistController.moveToWatched: ${err}`,
        status: 500,
        message: 'Could not mark item as watched',
      });
    }
  },
};

export default watchlistController;
