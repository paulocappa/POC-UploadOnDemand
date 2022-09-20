import path from 'node:path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'disk' | 'heroku';

  tmpFolder: string;
  thumbsFolder: string;
}

export default {
  driver: process.env.STORAGE_DRIVER,

  tmpFolder,
  thumbsFolder: path.resolve(tmpFolder, 'thumbnails'),
} as IUploadConfig;
