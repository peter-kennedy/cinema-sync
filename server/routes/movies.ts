import { Router } from 'express';

const movieRouter = Router();

movieRouter.get('/', (_req, res) => {
  res.json({ data: 'some data' });
});

export default movieRouter;
