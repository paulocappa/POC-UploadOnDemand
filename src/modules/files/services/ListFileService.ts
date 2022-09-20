import { inject, injectable } from 'tsyringe';

import IPagination from 'types/IPagination';
import IFilesRepository from '../repositories/IFilesRepository';

import Files from '../infra/typeorm/schemas/Files';

interface IResponse {
  files: Files[];
  pagination: {
    totalFiles: number;
    totalPages: number;
  };
}

@injectable()
class ListFileService {
  constructor(
    @inject('FilesRepository')
    private filesRepository: IFilesRepository,
  ) {}

  public async execute({
    page = 1,
    per_page = 10,
  }: IPagination): Promise<IResponse> {
    const { files, count } = await this.filesRepository.listFiles({
      page,
      per_page,
    });

    const countByPages = Math.floor(count / per_page);
    const hasRestOfDivision = count % per_page !== 0;
    const totalPages = countByPages + (hasRestOfDivision ? 1 : 0);

    const pagination = {
      totalFiles: count,
      totalPages,
    };

    return {
      files,
      pagination,
    };
  }
}

export default ListFileService;
