import { Repository } from '../../../../src/Contexts/Users/domain/Repository';
import { User } from '../../../../src/Contexts/Users/domain/User';

export class UserRepositoryMock implements Repository {
  private mockSave: jest.Mock;
  private mockGet: jest.Mock;

  constructor() {
    this.mockSave = jest.fn();
    this.mockGet = jest.fn();
  }

  async save(user: User): Promise<{ id: string; createdAt: Date }> {
    this.mockSave(user);
    const mock = this.mockSave.mock;
    const lastSavedCourse = mock.calls[mock.calls.length - 1][0] as User;
    const { id, createdAt } = lastSavedCourse;
    expect(lastSavedCourse).toBeInstanceOf(User);
    return { id, createdAt };
  }

  async get(email: string): Promise<boolean> {
    const mock = this.mockGet.mockReturnValue(1);
    return mock() === 1;
  }
}
