import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import fs, { createWriteStream } from 'node:fs';

import uploadConfig from '@config/upload';

import ISaveFileDTO from '../dtos/ISaveFileDTO';

import IStorageProvider from '../models/IStorageProvider';

import handleOnData from '../utils/handleOnData';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile({ file, filename }: ISaveFileDTO): Promise<number> {
    const filePath = path.join(uploadConfig.tmpFolder, filename);
    const writableStream = createWriteStream(filePath);

    await pipeline(file, handleOnData({ filename }), writableStream);

    const filesize = writableStream.bytesWritten;

    return filesize;
  }

  public async deleteFile(filename: string): Promise<void> {
    const filePath = path.join(uploadConfig.tmpFolder, filename);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
