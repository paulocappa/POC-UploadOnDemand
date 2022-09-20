import { Readable } from 'node:stream';

export default interface ISaveFileDTO {
  file: Readable;
  filename: string;
}
