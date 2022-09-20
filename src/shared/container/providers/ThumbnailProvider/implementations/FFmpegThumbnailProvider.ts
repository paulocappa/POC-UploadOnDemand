import FFmpeg from 'ffmpeg';
import path from 'node:path';
import uploadConfig from '@config/upload';
import IThumbnailProvider from '../models/IThumbnailProvider';
import IGenerateThumbnail from '../dtos/IGenerateThumbnail';

class FFmpegThumbnailProvider implements IThumbnailProvider {
  public async generate({ filename }: IGenerateThumbnail): Promise<string> {
    const basename = path.basename(filename, path.extname(filename));
    const originalFilepath = path.join(uploadConfig.tmpFolder, filename);

    const response = await (
      await new FFmpeg(originalFilepath)
    ).fnExtractFrameToJPG(uploadConfig.thumbsFolder, {
      file_name: `${basename}-thumbnail`,
      number: 5,
      frame_rate: 60,
    });

    const thumbFilename = response.pop().split('/').pop();

    return thumbFilename;
  }
}

export default FFmpegThumbnailProvider;
