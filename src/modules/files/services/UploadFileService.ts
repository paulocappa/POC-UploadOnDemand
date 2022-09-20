import { Readable } from 'node:stream';
import { inject, injectable } from 'tsyringe';

import { extname } from 'node:path';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import generateFilename from '@shared/utils/generateFilename';
import IThumbnailProvider from '@shared/container/providers/ThumbnailProvider/models/IThumbnailProvider';
import IFilesRepository from '../repositories/IFilesRepository';
import Files from '../infra/typeorm/schemas/Files';

interface IRequest {
  file: Readable;
  type: string;
  original_name: string;
}

@injectable()
class UploadFileService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('ThumbnailProvider')
    private thumbnailProvider: IThumbnailProvider,
  ) {}

  public async execute({
    file,
    type,
    original_name,
  }: IRequest): Promise<Files> {
    const filename = `${generateFilename()}${extname(original_name)}`;

    const filesize = await this.storageProvider.saveFile({
      file,
      filename,
    });

    let thumbnail = null;

    if (type.includes('video/')) {
      thumbnail = await this.thumbnailProvider.generate({
        filename,
      });
    }

    const fileData = await this.filesRepository.create({
      filename,
      filesize,
      type,
      thumbnail,
    });

    return fileData;
  }
}

export default UploadFileService;
