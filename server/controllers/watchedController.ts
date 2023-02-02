import { Request, Response, NextFunction } from 'express';
import WatchedMovies from '../models/WatchedMovies.js';

const WatchedMoviesController = {
  async getWatchedItems(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    try {
      res.locals.watchedMovies = await WatchedMovies.getWatchedMovies(id);

      return next();
    } catch (err) {
      return next({
        log: `Error in WatchedMoviesController.getWatched: ERROR: ${err}`,
        status: 500,
        message: 'Could not get watched movies',
      });
    }
  },

  async addWatchedItem(req: Request, _res: Response, next: NextFunction) {
    const { movieId, title, titleCard, userId } = req.body;

    try {
      const queryRes = await WatchedMovies.insertMovie(
        movieId,
        title,
        titleCard,
        userId
      );
      console.log(`ROW COUNT: ${queryRes.rowCount}`);
      if (queryRes.rowCount === 0) {
        return next({
          log: `Conflict in WatchedMoviesController.addWatchedItem: Item already exist in users watched movies`,
          status: 409,
          message: 'Item already exists in watched movies',
        });
      }

      return next();
    } catch (err) {
      return next({
        log: `Error in WatchedMoviesController.addWatchedItem: ERROR: ${err}`,
        status: 500,
        message: 'Could not add to watched movies',
      });
    }
  },

  async removeWatchedItem(req: Request, _res: Response, next: NextFunction) {
    const { userId, movieId } = req.params;

    try {
      await WatchedMovies.removeMovie(userId, movieId);

      return next();
    } catch (err) {
      return next({
        log: `Error in WatchedMoviesController.removeWatchedItem: ERROR: ${err}`,
        status: 500,
        message: 'Could not remove from watched movies',
      });
    }
  },
};

export default WatchedMoviesController;
