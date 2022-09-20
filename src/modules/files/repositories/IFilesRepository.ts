import IPagination from 'types/IPagination';

import Files from '../infra/typeorm/schemas/Files';

import ICreateFileDTO from '../dtos/CreateFileDTO';
import IListFilesResponseDTO from '../dtos/ListFilesResponseDTO';

export default interface IFilesRepository {
  findById(file_id: string): Promise<Files | undefined>;
  listFiles(data: IPagination): Promise<IListFilesResponseDTO>;
  create(data: ICreateFileDTO): Promise<Files>;
  update(file: Files): Promise<Files>;
  delete(file_id: string): Promise<void>;
}
