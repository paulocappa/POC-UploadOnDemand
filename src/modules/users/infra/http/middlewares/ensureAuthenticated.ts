import { Response, Request, NextFunction } from 'express';
import { verify, JwtPayload } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import authConfig from '@config/auth';

export default function ensureAuthenticated(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT Token is missing', 401);
  }

  const token = authHeader.split(' ').pop();

  try {
    const decoded = verify(token, authConfig.jwt.secret) as JwtPayload;

    req.user_id = decoded.sub;

    next();
  } catch (error) {
    throw new AppError('Invalid JWT Token', 401);
  }
}
