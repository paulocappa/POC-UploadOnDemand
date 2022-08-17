import { container } from 'tsyringe';

import IFilesRepository from './repositories/IFilesRepository';
import FilesRepository from './infra/typeorm/repositories/FilesRepository';

container.registerSingleton<IFilesRepository>(
  'FilesRepository',
  FilesRepository,
);
