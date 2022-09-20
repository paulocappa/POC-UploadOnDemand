import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';

import http from 'node:http';
import cors from 'cors';

import 'express-async-errors';

import '@shared/infra/typeorm';
import '@shared/container';

import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import routes from './routes';

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use(routes);

app.use('/file', express.static(uploadConfig.tmpFolder));
app.use('/thumb', express.static(uploadConfig.thumbsFolder));

app.use((err: Error, _: Request, res: Response, __: NextFunction) => {
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
