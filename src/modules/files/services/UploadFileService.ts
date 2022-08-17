import { Readable } from 'node:stream';
import { inject, injectable } from 'tsyringe';

import { extname } from 'node:path';

import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import generateFilename from '@shared/utils/generateFilename';
import IFilesRepository from '../repositories/IFilesRepository';

interface IRequest {
  user_id: string;
  socket_id: string;
  file: Readable;
  original_name: string;
}

@injectable()
class UploadFileService {
  constructor(
    @inject('StorageProvider')
    private storageProvider: IStorageProvider,

    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
  ) {}

  public async execute({
    user_id,
    socket_id,
    file,
    original_name,
  }: IRequest): Promise<void> {
    const filename = `${generateFilename()}${extname(original_name)}`;

    const filesize = await this.storageProvider.saveFile({
      file,
      filename,
      socket_id,
    });

    await this.filesRepository.create({ user_id, filename, filesize });
  }
}

export default UploadFileService;
