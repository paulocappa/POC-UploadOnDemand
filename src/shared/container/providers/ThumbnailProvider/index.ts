import { container } from 'tsyringe';

import IThumbnailProvider from './models/IThumbnailProvider';
import FFmpegThumbnailProvider from './implementations/FFmpegThumbnailProvider';

const providers = {
  ffmpeg: FFmpegThumbnailProvider,
};

container.registerSingleton<IThumbnailProvider>(
  'ThumbnailProvider',
  providers.ffmpeg,
);
