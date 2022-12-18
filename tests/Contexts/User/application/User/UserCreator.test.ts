import faker from 'faker';
import { User } from '../../../../../src/Contexts/Users/domain/User';
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';
import { UserCreator } from '../../../../../src/Contexts/Users/application/UserCreator';

describe('UserCreator', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should create a valid user', async () => {
    const userRepositoryMock = new UserRepositoryMock();
    const userCreator = new UserCreator(userRepositoryMock);

    const id = '9d95782a-96d2-4bb4-922b-81aa2fb75a84';
    const name = faker.name.firstName();
    const email = faker.internet.email();
    const phone = faker.phone.phoneNumber('#########');
    const createdAt = faker.date.future();

    const user = new User({ id, name, phone, email, createdAt });
    const result = await userCreator.run(user);
    expect(result).toStrictEqual({ id: id, createdAt: createdAt });
  });
});
