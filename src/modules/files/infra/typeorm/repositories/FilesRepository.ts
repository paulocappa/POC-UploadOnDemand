import { ObjectId } from 'bson';
import { MongoRepository, getMongoRepository } from 'typeorm';

import IFilesRepository from '@modules/files/repositories/IFilesRepository';
import ICreateFileDTO from '@modules/files/dtos/CreateFileDTO';
import IListFilesResponseDTO from '@modules/files/dtos/ListFilesResponseDTO';
import IPagination from 'types/IPagination';

import Files from '../schemas/Files';

class FilesRepository implements IFilesRepository {
  private ormRepository: MongoRepository<Files>;

  constructor() {
    this.ormRepository = getMongoRepository(Files, 'mongodb');
  }

  public async findById(file_id: string): Promise<Files> {
    const file = await this.ormRepository.findOne(file_id);

    return file;
  }

  public async listFiles({
    page = 1,
    per_page = 10,
  }: IPagination): Promise<IListFilesResponseDTO> {
    const [totalFiles, files] = await Promise.all([
      this.ormRepository.count({}),
      this.ormRepository.find({
        where: {},
        take: per_page,
        skip: (page - 1) * per_page,
        order: {
          created_at: 'DESC',
          id: 'DESC',
        },
      }),
    ]);

    return {
      files,
      count: totalFiles,
    };
  }

  public async create({
    filename,
    filesize,
    type,
    thumbnail,
  }: ICreateFileDTO): Promise<Files> {
    const file = this.ormRepository.create({
      filename,
      type,
      size: filesize,
      thumbnail,
    });

    await this.ormRepository.save(file);

    return file;
  }

  public async update(file: Files): Promise<Files> {
    return this.ormRepository.save(file);
  }

  public async delete(file_id: string): Promise<void> {
    const fileIdBSON = new ObjectId(file_id);

    await this.ormRepository.deleteOne({
      _id: fileIdBSON,
    });
  }
}

export default FilesRepository;
