import { inject, injectable } from 'tsyringe';
import Files from '../infra/typeorm/schemas/Files';
import IFilesRepository from '../repositories/IFilesRepository';

@injectable()
class ListFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
  ) {}

  public async execute(user_id: string): Promise<Files[]> {
    const files = await this.filesRepository.findByUserId(user_id);

    return files;
  }
}

export default ListFileService;
