import Busboy from 'busboy';
import { NextFunction, Request, Response } from 'express';

export default function uploadFilesMiddleware(
  req: Request,
  _: Response,
  next: NextFunction,
) {
  const { headers } = req;

  const busboy = Busboy({
    headers,
    limits: {
      fieldNameSize: 255,
    },
  });

  req.busboy = busboy;

  next();
}
