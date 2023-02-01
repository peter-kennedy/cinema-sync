import { Router } from 'express';
import watchlistController from '../controllers/watchlistController.js';
import watchedController from '../controllers/watchedController.js';

const movieRouter = Router();

// gets movies from movie DB API
// movieRouter.get('/', (_req, res) => {
//   res.json({ data: 'some data' });
// });

// gets list of watched movies from pg DB
movieRouter.get(
  '/watched/:id',
  watchedController.getWatchedItems,
  (_req, res) => {
    res.json(res.locals.watchedMovies);
  }
);

// adds movie to list of watched movies
movieRouter.put(
  '/watched/:userId/:movieId',
  watchedController.addWatchedItem,
  (_req, res) => {
    res.json('Successfully added movie to watched movies');
  }
);

// removes movie from list of watched movies
movieRouter.delete(
  '/watched/:userId/:movieId',
  watchedController.removeWatchedItem,
  (_req, res) => {
    res.json('Successfully removed movie from watched movies');
  }
);

// gets a users watchlist
movieRouter.get(
  '/watchlist/:id',
  watchlistController.getWatchlist,
  (_req, res) => {
    res.json(res.locals.watchlist);
  }
);

// adds a movie to a users watchlist
movieRouter.put(
  '/watchlist',
  watchlistController.addWatchlistItem,
  (_req, res) => {
    res.json('Successfully added watchlist item');
  }
);

// removes an item from a users watchlist
movieRouter.delete(
  '/watchlist/:userId/:movieId',
  watchedController.removeWatchedItem,
  (_req, res) => {
    res.json('Successfully removed movie from watchlist');
  }
);

// gets the intersection between two users watchlists
// TO DO: add functionality to intersect an arbitrary number of user watchlists
movieRouter.get(
  '/watchlist/intersection',
  watchlistController.getWatchlistIntersection,
  (_req, res) => {
    res.json(res.locals.watchlistIntersection);
  }
);

// Moves a movie from a users watchlist to their watched movies
movieRouter.put(
  '/watchlist/move-to-watched/:userId/:movieId',
  watchlistController.moveToWatched,
  (_req, res) => {
    res.json(res.locals.watchlistIntersection);
  }
);

export default movieRouter;
