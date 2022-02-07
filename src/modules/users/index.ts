import { container } from 'tsyringe';

import './providers';

import IUsersRepository from './repositories/IUsersRepository';
import UsersRepository from './infra/typeorm/repositories/UsersRepository';

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
