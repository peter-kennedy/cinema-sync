import { Router } from 'express';
import watchlistController from '../controllers/watchlistController.js';
import watchedController from '../controllers/watchedController.js';

const movieRouter = Router();

// gets movies from movie DB API
// movieRouter.get('/', (_req, res) => {
//   res.json({ data: 'some data' });
// });

// gets list of watched movies from pg DB
movieRouter.get('/watched/:id', (_req, res) => {
  res.json('some data');
});

movieRouter.put('/watched/:id', (_req, res) => {
  res.json({ data: 'some data' });
});

movieRouter.delete('/watched/:id', (_req, res) => {
  res.json({ data: 'some data' });
});

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
movieRouter.delete('/watchlist/:id', (_req, res) => {
  res.json({ data: 'some data' });
});

// gets the intersection between two users watchlists
// TO DO: add functionality to intersect an arbitrary number of user watchlists
movieRouter.get(
  '/watchlist/intersection',
  watchlistController.getWatchlistIntersection,
  (_req, res) => {
    res.json(res.locals.watchlistIntersection);
  }
);

export default movieRouter;
