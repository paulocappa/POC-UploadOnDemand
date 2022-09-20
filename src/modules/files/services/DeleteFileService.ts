import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IFilesRepository from '../repositories/IFilesRepository';

@injectable()
class DeleteFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async execute(file_id: string): Promise<void> {
    const file = await this.filesRepository.findById(file_id);

    if (!file) {
      throw new AppError('File not found!');
    }

    await this.storageProvider.deleteFile(file.filename);
    await this.filesRepository.delete(file_id);
  }
}

export default DeleteFileService;
