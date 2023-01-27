import { Router } from 'express';
import movieController from '../controllers/movieController.js';

const movieRouter = Router();

// gets movies from movie DB API
// movieRouter.get('/', (_req, res) => {
//   res.json({ data: 'some data' });
// });

// gets list of watched movies from pg DB
movieRouter.get('/ownWatched', (_req, res) => {
  res.json('some data');
});

movieRouter.put('/ownWatched', (_req, res) => {
  res.json({ data: 'some data' });
});

movieRouter.delete('/ownWatched', (_req, res) => {
  res.json({ data: 'some data' });
});

// gets own watchlist from pg DB
movieRouter.get(
  '/ownWatchlist/:id',
  movieController.getWatchlist,
  (_req, res) => {
    res.json(res.locals.watchlist);
  }
);

// movieRouter.put('/ownWatchlist', (_req, res) => {
//   res.json({ data: 'some data' });
// });

movieRouter.delete('/ownWatched', (_req, res) => {
  res.json({ data: 'some data' });
});

movieRouter.get('/friendsWatched', (_req, res) => {
  res.json(res.locals.movies);
});

movieRouter.get('/friendsWatchlist', (_req, res) => {
  res.json(res.locals.movies);
});

export default movieRouter;
