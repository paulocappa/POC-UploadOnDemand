import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('AuthenticateUserService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUserService = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate an user with correct data', async () => {
    const email = 'userfake1@email.com';
    const password = 'fake-password';

    const user = await fakeUsersRepository.create({
      name: 'user-fake-1',
      email,
      password,
    });

    const auth = await authenticateUserService.execute({
      email,
      password,
    });

    expect(auth).toHaveProperty('token');
    expect(auth.user).toEqual(user);
  });

  it('should not be able to authenticate a non-existing user', async () => {
    await expect(
      authenticateUserService.execute({
        email: 'non-existing-email',
        password: 'non-existing-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate an user with wrong password', async () => {
    const email = 'userfake1@email.com';
    const password = 'fake-password';

    await fakeUsersRepository.create({
      name: 'user-fake-1',
      email,
      password,
    });

    await expect(
      authenticateUserService.execute({
        email,
        password: 'non-existing-password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
