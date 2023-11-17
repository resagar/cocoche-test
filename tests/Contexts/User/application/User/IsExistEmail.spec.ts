import faker from 'faker';
import { UserRepositoryMock } from '../../__mocks__/UserRepositoryMock';
import { IsExistsEmail } from '../../../../../src/Contexts/Users/application/IsExistsEmail';

describe('IsExistsEmail', () => {
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('should is exist email', async () => {
    const userRepositoryMock = new UserRepositoryMock();
    const isExistsEmail = new IsExistsEmail(userRepositoryMock);

    const email = faker.internet.email();
    const spyOnUserCreatorGet = userRepositoryMock.get.mockResolvedValue(true);

    const result = await isExistsEmail.run(email);

    expect(spyOnUserCreatorGet).toHaveBeenCalled();
    expect(spyOnUserCreatorGet).toHaveBeenCalledWith(email);
    expect(result).toStrictEqual(true);
  });
});
