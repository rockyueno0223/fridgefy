import { AuthObject, clerkMiddleware } from '@clerk/express';
import { NextFunction, Request, Response, Router } from 'express';
import { UserModel } from '../models/user.model';
import { userRouter } from './user.routes';

declare global {
  namespace Express {
    interface Request {
      auth: AuthObject;
    }
  }
}

export const protectedRouter = Router();

// middleware
protectedRouter.use(clerkMiddleware());

protectedRouter.use(async (req: Request, res: Response, next: NextFunction) => {
  // need to check if the user is validated
  const userId = req.auth.userId;

  if (!userId) {
    res.status(401).json({ code: 401, message: 'Unauthorized' });
    return;
  }

  // user must exist in the database
  const userInMongoDB = await UserModel.findOne({ userId });

  if (!userInMongoDB) {
    await UserModel.create({ userId });
  }

  next();
});

protectedRouter.use('/', userRouter);
