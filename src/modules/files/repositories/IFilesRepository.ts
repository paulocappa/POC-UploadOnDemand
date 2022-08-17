import Files from '../infra/typeorm/schemas/Files';

import ICreateFileDTO from '../dtos/CreateFileDTO';

export default interface IFilesRepository {
  findById(file_id: string): Promise<Files | undefined>;
  findByUserId(user_id: string): Promise<Files[]>;
  create(data: ICreateFileDTO): Promise<Files>;
  update(file: Files): Promise<Files>;
}
