import { Repository } from '../../../src/Contexts/Cars/domain/Repository';

export class redisRepositoryMock implements Repository {
  get = jest.fn();
  save = jest.fn();
}
