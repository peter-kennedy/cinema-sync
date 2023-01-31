import { Router } from 'express';
import movieController from '../controllers/movieController.js';

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

// gets own watchlist from pg DB
movieRouter.get('/watchlist/:id', movieController.getWatchlist, (_req, res) => {
  res.json(res.locals.watchlist);
});

movieRouter.put('/watchlist/:id', (_req, res) => {
  res.json({ data: 'some data' });
});

movieRouter.delete('/watchlist/:id', (_req, res) => {
  res.json({ data: 'some data' });
});

movieRouter.get(
  '/watchlist/intersection',
  movieController.getWatchlistIntersection,
  (req, res) => {
    res.json(res.locals.watchlistIntersection);
  }
);

export default movieRouter;
