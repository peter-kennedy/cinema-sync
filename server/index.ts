import express, { Request, Response } from 'express';
import movieRouter from './routes/movies';
import userRouter from './routes/users';

const PORT = 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req: Request, res: Response) => {
  res.json('hello from the server, baby');
});

app.use('/movies', movieRouter);
app.use('/movies', userRouter);

app.use('*', (req: Request, res: Response) => {
  res.status(404).json("couldn't find that lad");
});

app.listen(PORT, () => console.log(`Listening on port ${PORT} :)`));
