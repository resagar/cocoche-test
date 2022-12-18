import { Repository } from '../../../../src/Contexts/Users/domain/Repository';

export class UserRepositoryMock implements Repository {
  constructor() {}

  save = jest.fn();
  get = jest.fn();
}
