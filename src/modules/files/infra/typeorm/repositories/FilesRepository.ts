import { MongoRepository, getMongoRepository, ObjectID } from 'typeorm';

import IFilesRepository from '@modules/files/repositories/IFilesRepository';

import ICreateFileDTO from '@modules/files/dtos/CreateFileDTO';
import Files from '../schemas/Files';

class FilesRepository implements IFilesRepository {
  private ormRepository: MongoRepository<Files>;

  constructor() {
    this.ormRepository = getMongoRepository(Files, 'mongodb');
  }

  public async findById(file_id: string): Promise<Files> {
    const fileIdBSON = new ObjectID(file_id);

    const file = await this.ormRepository.findOne(fileIdBSON);

    return file;
  }

  public async findByUserId(user_id: string): Promise<Files[]> {
    const files = await this.ormRepository.find({ user_id });

    return files;
  }

  public async create({
    user_id,
    filename,
    filesize,
  }: ICreateFileDTO): Promise<Files> {
    const file = this.ormRepository.create({
      user_id,
      filename,
      size: filesize,
    });

    await this.ormRepository.save(file);

    return file;
  }

  public async update(file: Files): Promise<Files> {
    return this.ormRepository.save(file);
  }
}

export default FilesRepository;
