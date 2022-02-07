import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';

import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import AppError from '@shared/errors/AppError';

import routes from './routes';

const server = express();

server.use(express.json());

server.use(routes);

server.use((err: Error, _: Request, res: Response, __: NextFunction) => {
  if (err instanceof AppError) {
    return res
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  console.error(err);

  return res.status(500).json({
    status: 'internal error',
    message: 'Internal Server Error',
  });
});

server.listen(3333, () => {
  console.log('Server is running on port 3333');
});
