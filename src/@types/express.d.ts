/* eslint-disable @typescript-eslint/naming-convention */
declare namespace Express {
  export interface Request {
    busboy: import('busboy').Busboy;
  }
}
