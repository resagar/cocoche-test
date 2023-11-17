import { Repository } from '../domain/Repository';
import { User } from '../domain/User';

export class UserCreator {
  constructor(private readonly repository: Repository) {}

  async run(user: User): Promise<{ id: string; createdAt: Date }> {
    const result = await this.repository.save(user);
    return result;
  }
}
