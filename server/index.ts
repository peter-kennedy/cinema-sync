import express, { NextFunction, Request, Response } from 'express';
import movieRouter from './routes/movies.js';
import userRouter from './routes/users.js';

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
  res.json('hello from the server');
});

// API
app.use('/movies', movieRouter);
app.use('/users', userRouter);

// Catch-all route
app.use('*', (_req: Request, res: Response) => {
  res.status(404).json("couldn't find that");
});

// global error handler
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 400,
    message: { err: 'An error occurred' },
  };
  const errorObj = { ...defaultErr, ...err };
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} :)`));
