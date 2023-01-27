import { Router } from 'express';

const userRouter = Router();

userRouter.get('/', (_req, res) => {
  res.json('some data');
});

export default userRouter;
